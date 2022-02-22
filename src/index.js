import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import { WalletContextProvider } from "./context/WalletContext";
import { ContractContextProvider } from "./context/ContractContext";
import { FormContextProvider } from "./context/FormContext";

ReactDOM.render(
  <React.StrictMode>
    <WalletContextProvider>
      <ContractContextProvider>
        <FormContextProvider>
          <App />
        </FormContextProvider>
      </ContractContextProvider>
    </WalletContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
