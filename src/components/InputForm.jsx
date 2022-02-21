import React from "react";

const tld = ".D_D";

export function InputForm({ onMint, onSetRecord }) {
  const [domain, setDomain] = React.useState("");
  const [record, setRecord] = React.useState({ twitter: "", discord: "" });

  return (
    <div className="form-container">
      <div className="first-row">
        <input
          type="text"
          value={domain}
          placeholder="Dev #"
          onChange={(e) => setDomain(e.target.value)}
        />
        <p className="tld"> {tld} </p>
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
          disabled={domain.length === 0}
          onClick={() => onMint(domain)}
        >
          Mint
        </button>
        <button
          className="cta-button mint-button"
          disabled={Object.values(record).join("").length === 0}
          onClick={onSetRecord}
        >
          Set data
        </button>
      </div>
    </div>
  );
}
