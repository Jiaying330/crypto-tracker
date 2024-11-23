import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const Crypto = createContext();

CryptoContext.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function CryptoContext({ children }) {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("$");

  useEffect(() => {
    if (currency === "CNY") setSymbol("¥");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);
  return (
    <Crypto.Provider value={{ currency, symbol, setCurrency }}>
      {children}
    </Crypto.Provider>
  );
}

export function CryptoState() {
  return useContext(Crypto);
}
