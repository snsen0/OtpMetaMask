import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert, Button } from "react-bootstrap";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useUserAuth } from "../context/UserAuthContext";


const PhoneSignUp = () => {
  const [error, setError] = useState("");
  const [firstname, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [number, setNumber] = useState("");
  const [flag, setFlag] = useState(false);
  const [otp, setOtp] = useState("");
  const [result, setResult] = useState("");
  const { setUpRecaptha } = useUserAuth();
  const [setWalletAddress] = useState("");
  const navigate = useNavigate();

  const connectWallet = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        /* MetaMask is installed */
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      } catch (err) {
        console.error(err.message);
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
    }
  };

  const getOtp = async (e) => {
    e.preventDefault();
    console.log(number);
    setError("");
  
    if (!number) {
      setError("Please enter a valid phone number!");
      return;
    }
  
    try {
      const response = await setUpRecaptha(number);
      setResult(response);
      setFlag(true);
    } catch (err) {
      setError(err.message);
    }
  };
  
  const verifyOtp = async (e) => {
    e.preventDefault();
    setError("");
  
    if (!otp) {
      return;
    }
  
    try {
      await result.confirm(otp);
      navigate("/EmptyPage");
    } catch (err) {
      setError(err.message);
    }
  };
  

  return (
    <>
      <div className="p-4 box">
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={getOtp} style={{ display: !flag ? "block" : "none" }}>
          <Form.Group className="mb-3" controlId="formBasicPhone">
          <h2 className="mb-3">Girişinizi yapınız.</h2>
          <input type="text" value={firstname} onChange={(e) => setName(e.target.value)} placeholder="Ad" />
          <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} placeholder="Soyad" />
              <PhoneInput
              defaultCountry="TR"
              value={number}
              onChange={setNumber}
              placeholder="5xx xxx xx xx"
            />
            <div className="button-metamask">
              <Button className="custom-button2" type="submit" variant="primary" onClick={connectWallet}>
                Giriş
              </Button>
            </div>

            <div id="recaptcha-container"></div>
          </Form.Group>
        </Form>
        <Form onSubmit={verifyOtp} style={{ display: flag ? "block" : "none" }}>
          <Form.Group className="mb-3" controlId="formBasicOtp">
          <h2 className="mb-3">Telefonunuza gelen OTP kodunu giriniz.</h2>
            <Form.Control
              type="otp"
              placeholder="OTP kodunu girin"
              onChange={(e) => setOtp(e.target.value)}
            />
          </Form.Group>
          <div className="button-right">
            <Link to="/">
              <Button className="custom-button-iptal" variant="secondary">İptal</Button>
            </Link>
            &nbsp;
            <Button className="custom-button" type="submit" variant="primary">
              Doğrula
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default PhoneSignUp;
