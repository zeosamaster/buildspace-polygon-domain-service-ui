import React from "react";
import { WalletContext } from "./WalletContext";
import { getTokens } from "../utils/web3provider";

export const ERC721Context = React.createContext({
  tokens: undefined,
});

export const ERC721ContextProvider = function ({ children }) {
  const { account } = React.useContext(WalletContext);
  const [tokens, setTokens] = React.useState();

  React.useEffect(() => {
    async function fetchTokens() {
      const tokenIds = await getTokens(account);
      setTokens(tokenIds);
    }
    fetchTokens();
  }, [account]);

  // value
  const value = {
    tokens,
  };

  return (
    <ERC721Context.Provider value={value}>{children}</ERC721Context.Provider>
  );
};
