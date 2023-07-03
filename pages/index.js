import { ethers } from "ethers";
import bank_abi from "../artifacts/contracts/Bank.sol/Bank.json";
import {useState, useEffect} from "react";
import React from "react";

export default function HomePage(){
    
        const [ethWallet, setEthWallet] = useState(undefined);
        const [account, setAccount] = useState(undefined);
        const [bank, setBank] = useState(undefined);
        const [balance, setBalance] = useState(undefined);
      
        const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
        const bankAbi = bank_abi.abi;
      
        
        const getWallet = async() => {
          if (window.ethereum) {
            setEthWallet(window.ethereum);
          }
      
          if (ethWallet) {
            const account = await ethWallet.request({method: "eth_accounts"});
            handleAccount(account);
          }
        }
      
        const handleAccount = (account) => {
          if (account) {
            console.log ("Account connected: ", account);
            setAccount(account);
          }
          else {
            console.log("No account found");
          }
        }
      
        const connectAccount = async() => {
          if (!ethWallet) {
            alert('MetaMask wallet is required to connect');
            return;
          }
        
          const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
          handleAccount(accounts);
          
          // once wallet is set we can get a reference to our deployed contract
          getBankContract();
        };
      
        const getBankContract = async() => {
          let signer = null;
          let provider;
          if (window.ethereum == null) {
              console.log("MetaMask not installed; using read-only defaults");
              provider = ethers.getDefaultProvider();
          } else {
              provider = new ethers.BrowserProvider(window.ethereum)
              signer = await provider.getSigner();
          }
          const bankContract = new ethers.Contract(contractAddress, bankAbi, signer);
       
          setBank(bankContract);
        }
      
        const getBalance = async() => {
          if (bank) {
            
            setBalance(Number(await bank.getBalance()));
          }
        }
      
        const deposit = async() => {
          if (bank) {
            let tx = await bank.deposit(10);
            await tx.wait()
            getBalance();
          }
        }
      
        const withdraw = async() => {
          if (bank) {
            let tx = await bank.withdraw(10);
            await tx.wait()
            getBalance();
          }
        }
        const initUser = () => {
          // Check to see if user has Metamask
          if (!ethWallet) {
            return <p>Please install Metamask in order to use this ATM.</p>
          }
      
          // Check to see if user is connected. If not, connect to their account
          if (!account) {
            return <button onClick={connectAccount}>Please connect your Metamask wallet</button>
          }
      
          if (balance == undefined) {
            getBalance();
          }
      
          return (
            <div>
              <p>Your Account: {account}</p>
              <p>Your Balance: {balance}</p>
              <button onClick={deposit}>Deposit 10 ETH</button>
              <button onClick={withdraw}>Withdraw 10 ETH</button>
            </div>
          )
        }
        
      
        useEffect(() => {getWallet();}, []);
    return(
    <main className="container">
      <header><h1>Welcome to the Bank</h1></header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center
        }
      `}
      </style>
    </main>
    )
}