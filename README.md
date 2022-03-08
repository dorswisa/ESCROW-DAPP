# ESCROW SMART CONTRACT
***

<details>
<summary>Authors:</summary>
&emsp;&emsp;Dor Swisa - 316055144   
<br>
&emsp;&emsp;Tamir Abutbul - 311425912
<br>
&emsp;&emsp;Ami Bitan - 209261007
</details>

## Intro:
Escrow smart contract for ethereum using solidity

1. An escrow is a financial arrangement where a third party holds and regulates payment of the funds required for two parties involved in a given transaction.
It helps make transactions more secure by keeping the payment in a secure escrow account which is only released when all of the terms of an agreement are met as overseen by the escrow company.


2. When Buyer initializes an escrow transaction, his Ether is locked in the smart contract. Once Buyer confirms the Seller’s obligations are fulfilled, he can release funds to Seller.

IDE used : Remix and Webstorm

Ethereum wallet : Metamask (Ganache Test network)


Language : Solidity and JavaScript
***

## Installation:
### Install Project
1. Enter to dapp folder:

    <code> cd dapp</code>


2. Install truffle globally:

    <code>npm install truffle -g</code>

### Run Project
1. Run Ganache Network on port 7545,

in cmd:


2. Enter to dapp folder:

    <code>cd solidity</code>

3. Run truffle console:

    <code>truffle console</code>

4. Run migrate to compile the code and migrate the contact to network

   <code>'migrate'</code>

5. open project.html