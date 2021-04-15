function Trades({ trades }) {
  return trades.map((trade, index) => (
    <div key={index}>
      <p>Ticker: {trade.ticker}</p>
      <p>
        {trade.newShares > trade.oldShares
          ? `Buy ${trade.newShares - trade.oldShares} shares`
          : `Sell`}
      </p>
    </div>
  ));
}

export default Trades;
