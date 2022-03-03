import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import { WalletContextProvider } from "./context/WalletContext";
import { ContractContextProvider } from "./context/ContractContext";
import { FormContextProvider } from "./context/FormContext";
import { ERC721ContextProvider } from "./context/ERC721Context";

ReactDOM.render(
  <React.StrictMode>
    <WalletContextProvider>
      <ContractContextProvider>
        <ERC721ContextProvider>
          <FormContextProvider>
            <App />
          </FormContextProvider>
        </ERC721ContextProvider>
      </ContractContextProvider>
    </WalletContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
