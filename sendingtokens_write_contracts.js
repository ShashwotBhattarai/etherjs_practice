const { ethers } = require("ethers");

const INFURA_ID = ''
const provider = new ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/54f372a21e6e421cb4e95ed43cc57d2a`)

const account1 = '0x0Ed441E62368dE728C9cde8873CcAd94D105e12E' // sender Your account address 1
const account2 = '0x8E7eF3e412582069B8319B323190c5c23c6A823a' // receiver Your account address 2

const privateKey1 = 'fdcf6302505c77e657036e73b6b538be641ecc0f91f042ba7df0486ea751c2d0' // Private key of account 1 sender
const wallet = new ethers.Wallet(privateKey1, provider)

const ERC20_ABI = [
    "function balanceOf(address) view returns (uint)",
    "function transfer(address to, uint amount) returns (bool)",
];

const address = '0x779877A7B0D9E8603169DdbD7836e478b4624789'
const contract = new ethers.Contract(address, ERC20_ABI, provider)

const main = async () => {
    const balance = await contract.balanceOf(account1)

    console.log(`\nReading from ${address}\n`)
    console.log(`Balance of sender: ${balance}\n`)

    const contractWithWallet = contract.connect(wallet)

    const tx = await contractWithWallet.transfer(account2, balance)
    await tx.wait()

    console.log(tx)

    const balanceOfSender = await contract.balanceOf(account1)
    const balanceOfReciever = await contract.balanceOf(account2)

    console.log(`\nBalance of sender: ${balanceOfSender}`)
    console.log(`Balance of reciever: ${balanceOfReciever}\n`)
}

main()