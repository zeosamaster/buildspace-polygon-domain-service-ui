import React from "react";
import { WalletContext } from "../context/WalletContext";

export function ConnectWalletButton() {
  const { connect } = React.useContext(WalletContext);

  return (
    <div className="connect-wallet-container">
      <img src="/developer.gif" alt="Developer gif" />
      <button className="cta-button connect-wallet-button" onClick={connect}>
        Connect Wallet
      </button>
    </div>
  );
}
