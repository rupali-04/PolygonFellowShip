// main.js

const HDWalletProvider = require("@truffle/hdwallet-provider");
const {MaticPOSClient} = require('@maticnetwork/maticjs');
const {seed,mumbai,goeril} = require('./secrets.json')
//console.log();
const from = "0x495B7Fcb455d8539C59C092c8cca59EA86fbF374";
const rootToken = "0x5be6e37275c477fa53e67ce42a999ca280fc2586";
const amount = 100 * (10 ** 18);
//console.log(MaticPOSClient)
const parentProvider = new HDWalletProvider(seed,goeril); 
const maticProvider = new HDWalletProvider(seed,mumbai)  
const maticPOSClient =  new MaticPOSClient({
  network: "testnet",
  version: "mumbai",
  parentProvider,
  maticProvider,
});

(async () => {
  try {
    let result = await maticPOSClient.approveERC20ForDeposit(
      rootToken,
      amount.toString(),
      {
        from,
        gasPrice: "10000000000",
      }
    );
    let result_2 = await maticPOSClient.depositERC20ForUser(
      rootToken,
      from,
      amount.toString(),
      {
        from,
        gasPrice: "10000000000",
      }
    );
    console.log(result);
    console.log(result_2);
  } catch (error) {
    console.log(error);
  }
})();

