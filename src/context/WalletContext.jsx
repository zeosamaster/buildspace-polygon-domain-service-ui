import React from "react";
import {
  connectAccount,
  getChainId,
  getConnectedAccount,
  onChainChange,
} from "../utils/metamask";
import { networks } from "../utils/networks";

export const WalletContext = React.createContext({
  connect: () => {},
});

export function WalletContextProvider({ children }) {
  const [account, setAccount] = React.useState();
  const [network, setNetwork] = React.useState();

  const connect = React.useCallback(async () => {
    try {
      await connectAccount();
      const connectedAccount = await getConnectedAccount();
      setAccount(connectedAccount);
    } catch (e) {
      setAccount();
    }
  }, [setAccount]);

  const checkConnectedAccount = React.useCallback(async () => {
    const connectedAccount = await getConnectedAccount();
    setAccount(connectedAccount);
  }, []);

  React.useEffect(() => {
    function updateNetwork(chainId) {
      setNetwork(networks[chainId]);
    }

    async function getNetwork() {
      const chainId = await getChainId();
      updateNetwork(chainId);
    }

    getNetwork();
    onChainChange(updateNetwork);
  }, []);

  React.useEffect(() => {
    checkConnectedAccount();
  }, [checkConnectedAccount]);

  const value = { account, network, connect };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
}
