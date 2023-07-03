# Bank Application Readme

This is a simple bank application built using React and Ethereum. It allows users to connect their MetaMask wallet, view their account balance, and perform deposit and withdrawal transactions.

## Setup

Install the required dependencies by running npm install.
Make sure you have MetaMask installed in your browser.

## Usage

Open the application in a web browser.
Click on the "Connect your Metamask wallet" button to connect your MetaMask wallet.
Once connected, your account address and balance will be displayed.
Use the "Deposit 10 ETH" button to deposit 10 Ether into your account.
Use the "Withdraw 10 ETH" button to withdraw 10 Ether from your account.

### Important Note

Make sure you have sufficient Ether in your connected MetaMask wallet before performing any deposit or withdrawal transactions.
The contract address 0x5FbDB2315678afecb367f032d93F642f64180aa3 is the address of the deployed Bank contract on the Ethereum network. You can change it if you have a different contract address.
The application uses the Bank contract's ABI (Application Binary Interface) to interact with the contract functions. Make sure the Bank.json file containing the contract ABI is located at "../artifacts/contracts/Bank.sol/Bank.json".
The application uses the ethers.js library to interact with the Ethereum network and MetaMask wallet.
