import React, { useState } from "react";
import { ReactQueryDevtools } from "react-query-devtools";
import "./App.css";
import { useQuery } from "react-query";

export default function App() {
  return (
    <div className="App-header" color="blue">
      <CurrencyExchange />
      <ReactQueryDevtools initialIsOpen={false} />
    </div>
  );
}

const fetchExchange = async (currency) => {
  const response = await fetch(
    `https://api.ratesapi.io/api/latest?base=${currency}`
  );
  return await response.json();
};

function CurrencyExchange() {
  const [currency, setCurrency] = useState("NOK");
  const { status, data, error } = useQuery(currency, fetchExchange);

  if (status === "loading") return <div>loading...</div>;
  if (status === "error") return <div>Error loading data</div>;

  return (
    <div>
      <h2>The Best Foreign Exchange Rate In {currency}</h2>
      <button onClick={() => setCurrency("NOK")}>NOK</button>
      <button onClick={() => setCurrency("PHP")}>PHP</button>
      <button onClick={() => setCurrency("CAD")}>CAD</button>
      <button onClick={() => setCurrency("USD")}>USD</button>
      <button onClick={() => setCurrency("EUR")}>EUR</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
