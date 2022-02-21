import React from "react";
import { getContract } from "../utils/metamask";
import Domains from "../contracts/Domains.json";

const CONTRACT_ADDRESS = "0x61719f0c2872D6408eA517191FDC12Da1c888eb3";

export const ContractContext = React.createContext({
  mint: () => Promise.reject(),
  setRecord: () => Promise.reject(),
});

export const ContractContextProvider = function ({ children }) {
  const [contract, setContract] = React.useState();

  const retrieveContract = React.useCallback(() => {
    const c = getContract(CONTRACT_ADDRESS, Domains.abi);
    setContract(c);
  }, []);

  React.useEffect(() => {
    retrieveContract();
  }, [retrieveContract]);

  const getPrice = React.useCallback(async () => {
    const price = await contract.price();
    return price;
  }, [contract]);

  const mint = React.useCallback(
    async (domain) => {
      // Don't run if the domain is empty
      if (!domain) {
        throw Error("Domain is required");
      }

      // Get the price from the contract
      const price = await getPrice();

      try {
        console.log("Going to pop wallet now to pay gas...");
        let tx = await contract.register(domain, {
          value: price,
        });

        // Wait for the transaction to be mined
        const receipt = await tx.wait();

        // Check if the transaction was successfully completed
        if (receipt.status !== 1) {
          throw Error("Transaction failed! Please try again");
        }

        console.log(
          "Domain minted! https://mumbai.polygonscan.com/tx/" + tx.hash
        );
      } catch (error) {
        console.log(error);
      }
    },
    [contract, getPrice]
  );

  const setRecord = React.useCallback(
    async (domain, record) => {
      // Don't run if the domain is empty
      if (!domain) {
        throw Error("Domain is required");
      }

      // Set the record for the domain
      const tx = await contract.setRecord(domain, record);
      await tx.wait();

      console.log("Record set! https://mumbai.polygonscan.com/tx/" + tx.hash);
    },
    [contract]
  );

  const value = {
    mint,
    setRecord,
  };

  return (
    <ContractContext.Provider value={value}>
      {children}
    </ContractContext.Provider>
  );
};
