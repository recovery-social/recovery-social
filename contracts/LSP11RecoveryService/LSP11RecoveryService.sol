// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import {LSP11BasicSocialRecovery} from "../LSP11BasicSocialRecovery/LSP11BasicSocialRecovery.sol";

// libraries
import {ERC165Checker} from "../Custom/ERC165Checker.sol";
import {LSP6Utils} from "../LSP6KeyManager/LSP6Utils.sol";
import {TicketLib} from "../Utils/TicketLib.sol";

// modules
import {ERC725} from "@erc725/smart-contracts/contracts/ERC725.sol";
import {OwnableUnset} from "@erc725/smart-contracts/contracts/custom/OwnableUnset.sol";
import {ERC165} from "@openzeppelin/contracts/utils/introspection/ERC165.sol";
import {EnumerableSet} from "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import {LSP6KeyManager} from "../LSP6KeyManager/LSP6KeyManager.sol";
import {ERC725YCore} from "@erc725/smart-contracts/contracts/ERC725YCore.sol";


// constants
import {_INTERFACEID_LSP6, _ALL_DEFAULT_PERMISSIONS} from "../LSP6KeyManager/LSP6Constants.sol";
import {_INTERFACEID_LSP11_RECOVERY_SERVICE} from "./LSP11RecoveryServiceConstants.sol";

/**
 * @title  proposal of LSP11-RecoveryService standard
 * @author NBR2807
 * @notice Stores information about recovery service to vote and verify LSP11-Social Recovery
 */
contract LSP11RecoveryService is OwnableUnset, ERC165 {
    using EnumerableSet for EnumerableSet.AddressSet;
    using EnumerableSet for EnumerableSet.Bytes32Set;
  
   /** 
        STATE VARIABLES
    **/ 
    
    //addresses able to control the contract
    mapping(address => bool) private authorizedOwners;

    //stores the publicKey for every registred LSP11Address
    mapping(address => address) private LSP11AddressPublicKey;

    //stores the price to recover for every registred LSP11Address (lowest price guarantee)
    mapping(address => uint) private priceRecoverforAddress;

    //current price to recover
    uint public currentPricetoRecover = 0;

    //url of the recovery service
    string public apiEndpoint;
    //name of the recovery service
    string public recoveryServiceName;
    //url to the logo of the recovery service
    string public recoveryServiceImageUrl;


   /** 
        MODIFIERES
    **/ 

    modifier isAuthorizedOwner() {
        require(
            authorizedOwners[msg.sender],
            "You are not authorized to perform this action"
        );
        _;
    }

    constructor(string memory _recoveryServiceName, string memory _apiEndpoint, string memory _recoveryServiceImageUrl) {
        authorizedOwners[msg.sender] = true;
        recoveryServiceName = _recoveryServiceName;
        recoveryServiceImageUrl = _recoveryServiceImageUrl;
        apiEndpoint = _apiEndpoint;
    }


   /** 
        PUBLIC VIEW FUNCTIONS
    **/ 


    function getApiEndpoint() public view returns (string memory) {
        return apiEndpoint;
    }

    function getRecoveryServiceName() public view returns (string memory) {
        return recoveryServiceName;
    }    

    function getRecoveryServiceImageUrl() public view returns (string memory) {
        return recoveryServiceImageUrl;
    }    

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function getCurrentPricetoRecover() public view returns (uint) {
        return currentPricetoRecover;
    }

    function getPriceforAddress(address _contracAddress) public view returns (uint) {
        return priceRecoverforAddress[_contracAddress];
    }


   /** 
        PUBLIC FUNCTIONS
    **/ 


    //LSP11 always has to be called by the LSP11 contract
    function addLSP11(address _publicKey) public {
        require(LSP11AddressPublicKey[msg.sender] == address(0x0), "Provided LSP11 address is already added");
        priceRecoverforAddress[msg.sender] = currentPricetoRecover;
        LSP11AddressPublicKey[msg.sender] = _publicKey;
    }


    //only for support reasons, if something goes wrong
    function changeLSP11(address lsp11ContractAddress, address publicKey) public isAuthorizedOwner{
        LSP11AddressPublicKey[lsp11ContractAddress] = publicKey;
    }

    function voteToRecover(
        address lsp11Address,
        bytes32 recoverProcessId,
        address newOwner
    ) public virtual isAuthorizedOwner {
        LSP11BasicSocialRecovery LSP11 = LSP11BasicSocialRecovery(lsp11Address);
        LSP11.voteToRecover(recoverProcessId, newOwner);
    }


    function voteToRecoverWithTicket(
        bytes32 recoverProcessId,
        address newOwner,
        TicketLib.Ticket memory ticket
    ) public payable {
        require(LSP11AddressPublicKey[msg.sender] != address(0x0), "Has to be called from LSP11 Contract");
        require((priceRecoverforAddress[msg.sender] == msg.value || currentPricetoRecover == msg.value), "Payment is not enough");

        bytes32 digest = keccak256(abi.encode(newOwner));

        require(
            _isVerifiedTicket(digest, ticket, LSP11AddressPublicKey[msg.sender]),
            "Invalid ticket"
        );

        LSP11BasicSocialRecovery LSP11 = LSP11BasicSocialRecovery(msg.sender);
        LSP11.voteToRecover(recoverProcessId, newOwner);
    }


    /** 
        OVERRIDE FUNCTIONS
    **/ 


    /**
     * @inheritdoc ERC165
     */
    function supportsInterface(bytes4 _interfaceId)
        public
        view
        virtual
        override(ERC165)
        returns (bool)
    {
        return
            _interfaceId == _INTERFACEID_LSP11_RECOVERY_SERVICE ||
            super.supportsInterface(_interfaceId);
    }



    /** 
        CONTRACT MANAGEMENT FUNCTIONS 
    **/ 


    function toggleAuthorizedOwner(address newAddress)
        public
        isAuthorizedOwner
    {
        require(msg.sender != newAddress, "You can't revoke your own access");

        authorizedOwners[newAddress] = !authorizedOwners[newAddress];
    }

    function changePricetoRecover(uint _newPrice) public isAuthorizedOwner{
        currentPricetoRecover = _newPrice;
    }

    function changeApiEndpoint(string memory _apiEndpoint) public isAuthorizedOwner{
        apiEndpoint = _apiEndpoint;
    }

    function changeRecoveryServiceName(string memory _recoveryServiceName) public isAuthorizedOwner{
        recoveryServiceName = _recoveryServiceName;
    }

    function changeRecoveryServiceImageUrl(string memory _recoveryServiceImageUrl) public isAuthorizedOwner{
        recoveryServiceImageUrl = _recoveryServiceImageUrl;
    }


    function withdrawFunds(address withdrawalAddress) public isAuthorizedOwner {
        payable(withdrawalAddress).transfer(address(this).balance);
    }

    /** 
       INTERNAL FUNCTIONS
    **/ 

    /* @dev Throws if:
     * - the ticket was not signed with the privateKey or/and the newOwner
     */
    function _isVerifiedTicket(
        bytes32 digest,
        TicketLib.Ticket memory ticket,
        address publicKey
    ) internal pure returns (bool) {
        address signer = ecrecover(digest, ticket.v, ticket.r, ticket.s);
        require(signer != address(0), "ECDSA: invalid signature");
        return signer == publicKey;
    }

}
