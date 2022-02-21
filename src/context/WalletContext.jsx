import React from "react";
import { connectAccount, getConnectedAccount } from "../utils/metamask";

export const WalletContext = React.createContext({
  connect: () => {},
});

export function WalletContextProvider({ children }) {
  const [account, setAccount] = React.useState();

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
    checkConnectedAccount();
  }, [checkConnectedAccount]);

  const value = { account, connect };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
}
