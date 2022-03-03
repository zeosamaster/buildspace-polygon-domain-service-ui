import React from "react";
import { CONTRACT_ADDRESS, TLD } from "../context/ContractContext";
import { WalletContext } from "../context/WalletContext";
import { FormContext } from "../context/FormContext";

export function Mint({ mint }) {
  const { account } = React.useContext(WalletContext);
  const { setMint } = React.useContext(FormContext);

  return (
    <div className="mint-item">
      <div className="mint-row">
        <a
          className="link"
          href={`https://testnets.opensea.io/assets/mumbai/${CONTRACT_ADDRESS}/${mint.id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="underlined">
            {mint.name}
            {TLD}
          </p>
        </a>

        {mint.owner.toLowerCase() === account.toLowerCase() && (
          <button className="edit-button" onClick={() => setMint(mint)}>
            <img
              className="edit-icon"
              src="https://img.icons8.com/metro/26/000000/pencil.png"
              alt="Edit button"
            />
          </button>
        )}
      </div>

      {Object.entries(mint.record).map(([key, value]) => (
        <p key={key}>
          {key}: {value}
        </p>
      ))}
    </div>
  );
}
