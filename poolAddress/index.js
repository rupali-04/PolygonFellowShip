const {ethers} = require('ethers')
const {abi: UniswapV3Factory} = require('@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json')

const add0 = "0x769a191c174690DD8272b0b07F7dF8BE208C812d";
const add1 = "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889";
const infura = "https://polygon-mumbai.g.alchemy.com/v2/CNeLrJsyOC_cIBTQDlh3dhV5u3xY7FYt"
const factory = "0x1F98431c8aD98523631AE4a59f267346ea31F984";

async function main() {
    const p = new ethers.providers.JsonRpcProvider(infura);

    const factoryContract = new ethers.Contract(factory,UniswapV3Factory,p);

    const poolAddress = await factoryContract.getPool(add1,add0,500);

    console.log(poolAddress);
}
main();