import React from "react";
import { getContract } from "../utils/metamask";
import Domains from "../contracts/Domains.json";
import { WalletContext } from "./WalletContext";

export const CONTRACT_ADDRESS = "0x1Cd988185bD2D2639508C4D850037Ff5514996f0";
export const TLD = ".D_D";

export const ContractContext = React.createContext({
  mint: () => Promise.reject(),
  setRecord: () => Promise.reject(),
  mints: [],
});

export const ContractContextProvider = function ({ children }) {
  const { account, network } = React.useContext(WalletContext);
  const [contract, setContract] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [mints, setMints] = React.useState([]);

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

  // all names
  const getAllNames = React.useCallback(async () => {
    try {
      const names = await contract.getAllNames();

      const mintRecords = await Promise.all(
        names.map(async (name, id) => {
          const { twitter, discord } = await contract
            .records(name)
            .catch(() => ({ twitter: "N/A", discord: "N/A" }));
          const owner = await contract.domains(name).catch(() => "N/A");
          return {
            id,
            name,
            record: {
              twitter,
              discord,
            },
            owner,
          };
        })
      );

      setMints(mintRecords);
    } catch (e) {
      console.error(e);
    }
  }, [contract]);

  React.useEffect(() => {
    if (account && contract && network === "Polygon Mumbai Testnet") {
      getAllNames();
    }
  }, [account, contract, network, getAllNames]);

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

        getAllNames();
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    },
    [contract, getPrice, getAllNames]
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

        getAllNames();
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    },
    [contract, getAllNames]
  );

  // value
  const value = {
    mint,
    setRecord,
    mints,
    loading,
  };

  return (
    <ContractContext.Provider value={value}>
      {children}
    </ContractContext.Provider>
  );
};
