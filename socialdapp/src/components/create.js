
import { useState } from 'react';
import './Home.css';
import { create as ipfsHttpClient } from 'ipfs-http-client';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');

function Create() {

    const [title,setTitle] = useState("");
    const [postImage,setImage] = useState("");
    const [u,setFileUrl] = useState("");
    const [signer,setSigner] = useState("");

    async function onChangeFile(e) {
        const file = e.target.files[0];
        try {
            const added = await client.add(file);
            const url = `https://ipfs.infura.io/ipfs/${added.path}`;
            setFileUrl(url);
            console.log(url);
        } catch (error) {
            console.log('Error uploading file:', error);
        }
    }

  return (
    <div className="App">
      <header className="App-header">
       <h2>Create Post</h2>
       <button className='View' onClick={async(e)=>{
            e.preventDefault();
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const s = provider.getSigner();
            setSigner(s);
       }}>Connect</button>
       <form>
        <input type="text" placeholder='Enter Title' onChange={(e)=>{
            setTitle(e.target.value);
        }}></input>
        <input type="file" placeholder='Input Image' onChange={async (e)=>{
            
            await onChangeFile(e);
            setImage(e.target.files[0]);
        }}></input>
        { u != "" && signer != "" ? <button className='Post' onClick={async (e)=>{
            e.preventDefault();
            const add = "0x723E3C0DCAf1CEFa0b64831d8fe59A9063496295";
            const abi = [
                {
                  "inputs": [
                    {
                      "internalType": "string",
                      "name": "t",
                      "type": "string"
                    },
                    {
                      "internalType": "string",
                      "name": "u",
                      "type": "string"
                    }
                  ],
                  "name": "createPost",
                  "outputs": [],
                  "stateMutability": "nonpayable",
                  "type": "function"
                },
                {
                  "inputs": [],
                  "name": "id",
                  "outputs": [
                    {
                      "internalType": "uint256",
                      "name": "",
                      "type": "uint256"
                    }
                  ],
                  "stateMutability": "view",
                  "type": "function"
                },
                {
                  "inputs": [
                    {
                      "internalType": "uint256",
                      "name": "",
                      "type": "uint256"
                    }
                  ],
                  "name": "posts",
                  "outputs": [
                    {
                      "internalType": "string",
                      "name": "title",
                      "type": "string"
                    },
                    {
                      "internalType": "string",
                      "name": "url",
                      "type": "string"
                    }
                  ],
                  "stateMutability": "view",
                  "type": "function"
                }
              ];
              let contract = new ethers.Contract(add,abi,signer);
              console.log(contract);
              const t = await contract.createPost(title,u);
              await t.wait();
              console.log(t);
        }}>Create</button> : ""}
       </form>
       {title !== "" && postImage !== "" ? <div><h1>Display Post</h1><h4>{title}</h4><img className='imR' src={URL.createObjectURL(postImage)}></img></div> : ""}
        
      </header>
    </div>
  );
}

export default Create;