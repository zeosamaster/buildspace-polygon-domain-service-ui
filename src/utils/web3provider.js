import { ethers } from "ethers";
import ERC721ABI from "../contracts/ERC721.abi.json";

const { REACT_APP_INFURA_API_ETHEREUM_KEY } = process.env;
const ERC721_ADDRESS = "0x25ed58c027921e14d86380ea2646e3a1b5c55a8b";

const provider = new ethers.providers.InfuraProvider(
  "homestead",
  REACT_APP_INFURA_API_ETHEREUM_KEY
);
const wallet = ethers.Wallet.createRandom();
const signer = wallet.connect(provider);
const contract = new ethers.Contract(ERC721_ADDRESS, ERC721ABI, signer);

export const getTokens = async (account) => {
  if (!account) {
    return;
  }

  const balance = await contract.balanceOf(account);
  const balanceNum = balance.toNumber();

  let tokens = [];
  for (let i = 0; i < balanceNum; i++) {
    const tokenId = await contract.tokenOfOwnerByIndex(account, i);
    tokens.push(tokenId.toNumber());
  }

  return tokens;
};
