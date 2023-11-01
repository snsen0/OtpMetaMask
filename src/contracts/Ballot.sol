//SPDX-License-Identifier: SPDX-License
//Lisans tanımlayıcıları
pragma solidity >=0.7.0 <0.9.0;

contract Ballot {

    struct Voter{
        string name;
        string surname;
        uint phoneNumber;
        bool hasVoted;
        uint vote;
    }
  
    mapping (address => Voter) public voters;
    address[] public voterList;
    // uint tipindeki anahtarları uint tipindeki değerlere eşler
    mapping (uint => uint) public voteCount; 
    // her anahtar bir seçenek, değer ise oyların sayısı


    // seçmen kaydı
    function registerVoter(
        string memory name, 
        string memory surname, 
        uint phoneNumber) 
        public {
        require (voters[msg.sender].phoneNumber == 0,
        "Zaten kayit oldunuz");
        voters[msg.sender].name = name;
        voters[msg.sender].surname = surname;
        voters[msg.sender].phoneNumber = phoneNumber;
        voterList.push(msg.sender);
    }


    // oy kullanma
    function toVote(uint toVote_) public{
        require(voters[msg.sender].hasVoted == false,
        "Zaten oy verdiniz.");
        voters[msg.sender].vote = toVote_;
        voters[msg.sender].hasVoted = true;
        voteCount[toVote_]++;    
    }

    //partiye verilen oy sayısı
    function getVoteCount(uint vote_) 
    public view 
    returns(uint) { //view okuma işlemi yapılır, değişiklik yapılamaz
        return voteCount[vote_];
    }


    
/*
    //kayıtlı seçmenlerin listesi
    function getVoterList() public view returns(address[] memory) {
        return voterList;
    }*/
}