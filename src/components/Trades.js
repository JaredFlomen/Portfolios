function Trades({ trades }) {
  return trades.map((trade, index) => (
    <div key={index}>
      <p>Ticker: {trade.ticker}</p>
      <p>New: {trade.newShares}</p>
      <p>Old: {trade.oldShares}</p>
      <p>
        {trade.newShares > trade.oldShares
          ? `Buy ${(trade.newShares - trade.oldShares).toFixed(5)} shares`
          : `Sell ${(trade.oldShares - trade.newShares).toFixed(5)}`}
      </p>
    </div>
  ));
}

export default Trades;
