import React from "react";
import {
  connectAccount,
  getChainId,
  getConnectedAccount,
  onChainChange,
  switchOrAddChain,
} from "../utils/metamask";
import { networks } from "../utils/networks";

export const WalletContext = React.createContext({
  connect: () => Promise.reject(),
  switchNetwork: () => Promise.reject(),
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
    try {
      const connectedAccount = await getConnectedAccount();
      setAccount(connectedAccount);
    } catch (e) {}
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

  const switchNetwork = React.useCallback((chainId) => {
    switchOrAddChain(chainId);
  }, []);

  const value = { account, network, connect, switchNetwork };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
}
