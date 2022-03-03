import React from "react";
import { TLD } from "../context/ContractContext";
import { ERC721Context } from "../context/ERC721Context";
import { FormContext } from "../context/FormContext";
import TokensDropdown from "./TokensDropdown";

export function InputForm({ loading, onMint, onSetRecord }) {
  const { domain, record, isMinted, canSetRecord, setDomain, setRecord } =
    React.useContext(FormContext);
  const { tokens } = React.useContext(ERC721Context);

  const onToken = React.useCallback(
    (token) => {
      setDomain(token);
    },
    [setDomain]
  );

  return (
    <div className="form-container">
      <div className="domain-container">
        <div className="domain-input">
          <input
            type="text"
            value={domain}
            placeholder="Dev #"
            onChange={(e) => setDomain(e.target.value)}
          />
          <p className="tld"> {TLD} </p>
        </div>
        {tokens && <TokensDropdown tokens={tokens} onChange={onToken} />}
      </div>

      <input
        type="text"
        value={record.twitter}
        placeholder="Twitter handler"
        onChange={(e) =>
          setRecord((r) => ({
            ...r,
            twitter: e.target.value,
          }))
        }
      />

      <input
        type="text"
        value={record.discord}
        placeholder="Discord username (with #)"
        onChange={(e) =>
          setRecord((r) => ({
            ...r,
            discord: e.target.value,
          }))
        }
      />

      <div className="button-container">
        <button
          className="cta-button mint-button"
          disabled={loading || isMinted || domain.length === 0}
          onClick={() => onMint(domain)}
        >
          Mint
        </button>
        <button
          className="cta-button mint-button"
          disabled={loading || !canSetRecord}
          onClick={() => onSetRecord(domain, record)}
        >
          Set data
        </button>
      </div>
    </div>
  );
}
