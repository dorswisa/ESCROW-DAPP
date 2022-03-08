// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract Escrow
{
    address [] public buyers;
    address [] public sellers;

    uint public n_escrows;

    uint public balance;           //escrow balance amount

    event notify(string notification);      //notification to the sender

    enum state{AWAITING_BUYER_PAYMENT,AWAITING_DELIVERY,COMPLETE}//state of the smart contract
    state [] public states;

    bool [] public buyerOK;
    bool [] public sellerOK;


    string [] public items;
    uint [] public itemsprices;

    constructor() {
        n_escrows = 0;
        balance = 0;
    }

    function init_escrow(address payable _seller, string memory name,uint price) public //buyer is the escrow creater
    {
        buyers.push(msg.sender);
        sellers.push(_seller);
        buyerOK.push(false);
        sellerOK.push(false);
        n_escrows = buyers.length;
        items.push(name);
        itemsprices.push(price * 1000000000000000000);
        states.push(state.AWAITING_BUYER_PAYMENT);
        emit notify("The Escrow has been added to the contract.");
    }

    fallback() external payable //fallback function
    {
        int index = isBuyer(msg.sender);
        require(index != -1,"Can only be accessed by the buyer.");
        require(states[uint(index)]==state.AWAITING_BUYER_PAYMENT,"Payment has already been made.");
        require(msg.value==itemsprices[uint(index)],"Entered amount is not the required amount.");
        balance = balance + msg.value;
        states[uint(index)]=state.AWAITING_DELIVERY;
        emit notify("Buyer has deposited the required amount in the Escrow account.");
    }

    function isBuyer(address _sender) public view returns (int) {
        for (uint i = 0; i < buyers.length; i++)
            if (buyers[uint(i)] == _sender && states[uint(i)] != state.COMPLETE)
                return int(i);
        return -1;
    }

    function isSeller(address _sender) public view returns (int) {
        for (uint i = 0; i < sellers.length; i++)
            if (sellers[uint(i)] == _sender && states[uint(i)] != state.COMPLETE)
                return int(i);
        return -1;
    }

    function seller_deny_service() public
    {
        int index = isSeller(msg.sender);
        require(index!=-1,"Can only be accessed by the seller.");
        require(states[uint(index)]==state.AWAITING_DELIVERY,"Can not deny service yet.");
        (bool sent,) = buyers[uint(index)].call{value: itemsprices[uint(index)]}("");
        require(sent, "Failed to send Ether.");
        balance = balance - itemsprices[uint(index)];
        states[uint(index)]=state.COMPLETE;
        emit notify("The service has been denied, the money returned to buyer and the escrow completed.");
    }

    function seller_send_product() public
    {
        int index = isSeller(msg.sender);
        require(index!=-1,"Can be accessed only by the seller.");
        require(states[uint(index)]==state.AWAITING_DELIVERY,"The action is not possible at the moment.");
        sellerOK[uint(index)]=true;
        emit notify("The action has been completed successfully.");
    }

    function b_delivery_received() public
    {
        int index = isBuyer(msg.sender);
        require(index!=-1,"Can only be accessed by the buyer");
        require(states[uint(index)]==state.AWAITING_DELIVERY&&sellerOK[uint(index)],"The action is not possible at the moment");
        buyerOK[uint(index)]=true;
        if(buyerOK[uint(index)]&&sellerOK[uint(index)])
        {
            (bool sent,) = sellers[uint(index)].call{value: itemsprices[uint(index)]}("");
            require(sent, "Failed to send Ether");
            balance = balance - itemsprices[uint(index)];
            states[uint(index)]=state.COMPLETE;
            emit notify("The action has been completed, the money has been transfered to the seller.");
        }
    }
}