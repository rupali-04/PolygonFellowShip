import './App.css';
import {daiAddress,borrowDappAddress,borrowABI,ERC20ABI} from "./constant";
import React, { useEffect, useState} from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";

function App() {
  const [signer, setSigner] = useState("");
  const [address,setAdd] = useState("");
  const [loanValue,setValue] = useState("");
  const [repayValue,setRepay] = useState("");
  const [amt,setPayAmt] = useState("0");

  useEffect(()=>{
    const t = async()=>{
      const ba = new ethers.Contract(borrowDappAddress,borrowABI,signer);
    const totalRepay = await ba.applicant(address);
    console.log(totalRepay);
    setPayAmt(totalRepay.toString() / (10 ** 18))
    }
    t();
    
  },[signer])
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Borrowing Application</h1>
        <button className='btn' onClick={async () => {
          console.log("Connect");
          const web3Modal = new Web3Modal();
          const connection = await web3Modal.connect();
          let provider = new ethers.providers.Web3Provider(connection);
          setAdd(await provider.getSigner().getAddress());
          setSigner(provider.getSigner());
          
        }}>Connect</button>
        {signer === "" ? "" : <h4>{address}</h4>}
        <form>
          <input className='inputHeader' placeholder='Enter Ether Collateral' onChange={(e)=>{setValue(e.target.value)}}></input>
          <button className='btn' onClick={async (e)=>{
            e.preventDefault();
            console.log(loanValue);
            const ba = new ethers.Contract(borrowDappAddress,borrowABI,signer);
            const tx = await ba.applyLoan({value: loanValue*(10**18)});
            await tx.wait();
            console.log(tx);
            const totalRepay = await ba.applicant(address);
            console.log(totalRepay);
            setPayAmt(totalRepay.toString() / (10 ** 18))
          }}>Apply Loan</button>
          <br>
          </br>
          <input className='inputHeader' placeholder='Enter DAI Amount' onChange={(e)=>{setRepay(e.target.value)}}></input>
          <button className='btn' onClick={async (e)=>{
            e.preventDefault();
            const ba = new ethers.Contract(borrowDappAddress,borrowABI,signer);
            const dc = new ethers.Contract(daiAddress,ERC20ABI,signer);
            console.log(ba,dc)
            const tx = await dc.approve(borrowDappAddress,repayValue*(10**18));
            await tx.wait();
            const txt = await ba.repayLoan(repayValue*(10**18));
            await txt.wait();
            console.log(repayValue,txt);
            setPayAmt("0");
          }}>Repay Loan</button>
        
        </form>
        <h1>Total Loan Stack: {amt}</h1>
        <h1>Repay DAI Amount:{amt/2}</h1>
      </header>
    </div>
  );
}

export default App;
