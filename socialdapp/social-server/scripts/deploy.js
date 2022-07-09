async function main() {
    const SocialDapp = await ethers.getContractFactory("SocialDapp");
 
    // Start deployment, returning a promise that resolves to a contract object
    const social_dapp = await SocialDapp.deploy();
    console.log("Contract deployed to address:", social_dapp.address);
 }
 
 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });