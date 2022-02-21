import React from "react";
import "./styles/App.css";
import twitterLogo from "./assets/twitter-logo.svg";

const App = () => {
  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <header>
            <div className="left">
              <p className="title">🧱🚀 Developer DAO Name Service</p>
              <p className="subtitle">Your D_D record on the blockchain!</p>
            </div>
          </header>
        </div>

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
