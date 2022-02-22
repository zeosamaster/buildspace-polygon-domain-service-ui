import React from "react";
import { ContractContext } from "./ContractContext";
import { WalletContext } from "./WalletContext";

export const FormContext = React.createContext({
  domain: "",
  record: { twitter: "", discord: "" },
  setDomain: () => {},
  setRecord: () => {},
  setMint: () => {},
});

export const FormContextProvider = function ({ children }) {
  const { account } = React.useContext(WalletContext);
  const { mints } = React.useContext(ContractContext);
  const [domain, setDomain] = React.useState("");
  const [record, setRecord] = React.useState({ twitter: "", discord: "" });
  const [isMinted, setIsMinted] = React.useState(false);
  const [canSetRecord, setCanSetRecord] = React.useState(false);

  const setMint = React.useCallback((mint) => {
    setDomain(mint.name);
    setRecord(mint.record);
  }, []);

  React.useEffect(() => {
    const existingMint = mints && mints.find((mint) => mint.name === domain);
    setIsMinted(!!existingMint);
    setCanSetRecord(
      account &&
        existingMint &&
        existingMint.owner.toLowerCase() === account.toLowerCase()
    );
  }, [domain, account, mints]);

  // value
  const value = {
    domain,
    record,
    isMinted,
    canSetRecord,
    setDomain,
    setRecord,
    setMint,
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};
