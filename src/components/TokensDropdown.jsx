import React from "react";

export default function TokensDropdown({ tokens, onChange }) {
  const onSelectChange = React.useCallback(
    (e) => {
      e.preventDefault();

      const { value } = e.target;
      onChange(value);

      e.target.closest("select").value = "";
    },
    [onChange]
  );

  return (
    <select onChange={onSelectChange}>
      <option value="">Select your Dev4Rev</option>
      {tokens.map((token) => (
        <option key={token} value={token}>
          {token}
        </option>
      ))}
    </select>
  );
}
