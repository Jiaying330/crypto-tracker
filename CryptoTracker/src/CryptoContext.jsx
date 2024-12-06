import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useAuth0 } from "@auth0/auth0-react";

const Crypto = createContext();

CryptoContext.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function CryptoContext({ children }) {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("$");
  // const [user, setUser] = useState(null);
  // const {isAuthenticated} = useAuth0();

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
