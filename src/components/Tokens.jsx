import React from "react";
import { ERC721Context } from "../context/ERC721Context";

export function Tokens() {
  const { tokens } = React.useContext(ERC721Context);

  if (tokens !== undefined) {
    return <p>Tokens: {tokens?.length || 0}</p>;
  }

  return <p>...</p>;
}
