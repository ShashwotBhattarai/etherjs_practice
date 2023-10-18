const { ethers } = require("ethers");

const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/89243f5609d9411f83b188e1de0a3897`)///we must connect to the particular blockchain where this contract was deployed

const ERC20_ABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint)",

    "event Transfer(address indexed from, address indexed to, uint amount)"
];

const address = '0x6B175474E89094C44Da98b954EedeAC495271d0F' // DAI Contract
const contract = new ethers.Contract(address, ERC20_ABI, provider)

const main = async () => {
    const block = await provider.getBlockNumber()

    const transferEvents = await contract.queryFilter('Transfer',block-5,block)
    console.log(transferEvents)
}

main()