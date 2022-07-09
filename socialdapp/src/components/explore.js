import { useEffect, useState } from 'react';
import './Home.css';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';


function Explore() {
  const [d,setArr] = useState([]);
  useEffect(() => {
    loadPosts()
  }, []);

  const loadPosts = async () => {
    try{

    
    const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection);
        const add = '0x723E3C0DCAf1CEFa0b64831d8fe59A9063496295';
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
              const s = provider.getSigner();
              
        const contract = new ethers.Contract(add, abi,s);
        console.log(contract);
        const tx = await contract.id();
        
        console.log(tx.toString());
        if(tx > 0){
          console.log("View")
          let arr = [];
          for(let i=0;i<tx;i++){
            const data = await contract.posts(i);
            console.log(data);
            arr.push(data);
          }
          console.log(arr);
          setArr(arr);
        }
            }catch(e){
              console.log(e);
            }
  }

  return (
    <div className="App">
      <header className="App-header">
       <h2>View Post</h2>
       {
                        d.map((nft, i) => (
                            nft != undefined ? <div key={i} className="nftCard"
                                >
                                    
                                <img className="inft" src= {nft[1]} alt="" />
                                <span className="cardLower">
                                    <h3 className="title">{nft[0]}</h3>
                                    
                                    
                                </span>
                            </div> : ""
                        ))
                    }
      </header>
    </div>
  );
}

export default Explore;
