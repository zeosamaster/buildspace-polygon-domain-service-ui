import React from "react";
import { CONTRACT_ADDRESS, TLD } from "../context/ContractContext";

export function Mint({ mint }) {
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
      </div>

      {Object.entries(mint.record).map(([key, value]) => (
        <p>
          {key}: {value}
        </p>
      ))}
    </div>
  );
}
