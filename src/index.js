import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import { WalletContextProvider } from "./context/WalletContext";
import { ContractContextProvider } from "./context/ContractContext";

ReactDOM.render(
  <React.StrictMode>
    <WalletContextProvider>
      <ContractContextProvider>
        <App />
      </ContractContextProvider>
    </WalletContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
