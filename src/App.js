import React from "react";
import "./styles/App.css";
import twitterLogo from "./assets/twitter-logo.svg";
import { ConnectWalletButton } from "./components/ConnectWalletButton";
import { InputForm } from "./components/InputForm";
import { WalletContext } from "./context/WalletContext";
import { ContractContext } from "./context/ContractContext";
import polygonLogo from "./assets/polygonlogo.png";
import ethLogo from "./assets/ethlogo.png";

const App = () => {
  const { switchNetwork, account, network } = React.useContext(WalletContext);
  const { mint, setRecord, loading } = React.useContext(ContractContext);

  const wrongNetwork = network !== "Polygon Mumbai Testnet";

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <header>
            <div className="left">
              <p className="title">🧱🚀 Developer DAO Name Service</p>
              <p className="subtitle">Your D_D record on the blockchain!</p>
            </div>

            <div className="right">
              {network && (
                <img
                  alt="Network logo"
                  className="logo"
                  src={network.includes("Polygon") ? polygonLogo : ethLogo}
                />
              )}
              {!account && <p>Not connected</p>}
              {account && (
                <p>
                  Wallet: {account.slice(0, 6)}...
                  {account.slice(-4)}
                </p>
              )}
            </div>
          </header>
        </div>

        {wrongNetwork && (
          <div className="connect-wallet-container">
            <p>Please connect to the Polygon Mumbai Testnet</p>
            <button
              className="cta-button mint-button"
              onClick={() => switchNetwork("0x13881")}
            >
              Click here to switch
            </button>
          </div>
        )}

        {!wrongNetwork && !account && <ConnectWalletButton />}
        {!wrongNetwork && account && (
          <InputForm loading={loading} onMint={mint} onSetRecord={setRecord} />
        )}

        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <span className="footer-text">
            built by{" "}
            <a
              className="footer-link"
              href="https://twitter.com/zeox7_eth"
              target="_blank"
              rel="noreferrer"
            >
              @zeox7.eth
            </a>
            with{" "}
            <a
              className="footer-link"
              href="https://twitter.com/_buildspace"
              target="_blank"
              rel="noreferrer"
            >
              @_buildspace
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default App;
