import { ethers } from "ethers";

function getEthereum() {
  const { ethereum } = window;

  if (!ethereum) {
    throw new Error("Ethereum object doesn't exist!");
  }

  return ethereum;
}

export const getContract = (contractId, abi) => {
  const provider = new ethers.providers.Web3Provider(getEthereum());
  const signer = provider.getSigner();
  return new ethers.Contract(contractId, abi, signer);
};

export const getConnectedAccount = async () => {
  const accounts = await getEthereum().request({ method: "eth_accounts" });

  if (accounts.length === 0) {
    throw new Error("No authorized account found");
  }

  return accounts[0];
};

export const getChainId = async () => {
  return await getEthereum().request({ method: "eth_chainId" });
};

export const addChain = async (params) => {
  await getEthereum().request({
    method: "wallet_addEthereumChain",
    params: [params],
  });
};

export const switchChain = async (chainId) => {
  await getEthereum().request({
    method: "wallet_switchEthereumChain",
    params: [{ chainId }],
  });
};

export const switchOrAddChain = async (chainId) => {
  try {
    await switchChain(chainId);
  } catch (error) {
    if (error.code === 4902) {
      await addChain({
        chainId: "0x13881",
        chainName: "Polygon Mumbai Testnet",
        rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
        nativeCurrency: {
          name: "Mumbai Matic",
          symbol: "MATIC",
          decimals: 18,
        },
        blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
      });
    } else {
      throw error;
    }
  }
};

export const addToken = async ({ address, symbol }) => {
  await getEthereum().request({
    method: "wallet_watchAsset",
    params: {
      type: "ERC20",
      options: { address, symbol },
    },
  });
};

export const onChainChange = (cb) => {
  getEthereum().on("chainChanged", cb);
};

export const connectAccount = async () => {
  const accounts = await getEthereum().request({
    method: "eth_requestAccounts",
  });
  return accounts[0];
};

export const onAccountChange = (cb) => {
  window.ethereum.on("accountsChanged", (accounts) => cb(accounts[0]));
};
