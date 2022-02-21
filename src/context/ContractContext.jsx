import React from "react";
import { getContract } from "../utils/metamask";
import Domains from "../contracts/Domains.json";
import { WalletContext } from "./WalletContext";

const CONTRACT_ADDRESS = "0x61719f0c2872D6408eA517191FDC12Da1c888eb3";

export const ContractContext = React.createContext({
  mint: () => Promise.reject(),
  setRecord: () => Promise.reject(),
});

export const ContractContextProvider = function ({ children }) {
  const { network } = React.useContext(WalletContext);
  const [contract, setContract] = React.useState();
  const [loading, setLoading] = React.useState(false);

  // contract
  const retrieveContract = React.useCallback(() => {
    try {
    const c = getContract(CONTRACT_ADDRESS, Domains.abi);
    setContract(c);
    } catch (e) {
      console.error(e);
    }
  }, []);

  React.useEffect(() => {
    if (network === "Polygon Mumbai Testnet") {
    retrieveContract();
    }
  }, [retrieveContract, network]);

  // price
  const getPrice = React.useCallback(async () => {
    const price = await contract.price();
    return price;
  }, [contract]);

  // mint
  const mint = React.useCallback(
    async (domain) => {
      if (!domain) {
        throw Error("Domain is required");
      }

      setLoading(true);

      try {
        const price = await getPrice();

        console.log("Going to pop wallet now to pay gas...");
        let tx = await contract.register(domain, {
          value: price,
        });

        const receipt = await tx.wait();

        if (receipt.status !== 1) {
          throw Error("Transaction failed! Please try again");
        }

        console.log(
          "Domain minted! https://mumbai.polygonscan.com/tx/" + tx.hash
        );
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    },
    [contract, getPrice]
  );

  // set record
  const setRecord = React.useCallback(
    async (domain, record) => {
      if (!domain) {
        throw Error("Domain is required");
      }

      setLoading(true);

      try {
        const tx = await contract.setRecord(domain, record);
        await tx.wait();

        console.log("Record set! https://mumbai.polygonscan.com/tx/" + tx.hash);
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    },
    [contract]
  );

  // value
  const value = {
    mint,
    setRecord,
    loading,
  };

  return (
    <ContractContext.Provider value={value}>
      {children}
    </ContractContext.Provider>
  );
};
