function Trades({ trades }) {
  return trades.map((position, index) => (
    <div key={index}>
      <p>Ticker: {position.ticker}</p>
      <p>Old shares: {position.oldShares}</p>
      <p>New shares: {position.newShares}</p>
      <p>{position.newPrice > position.oldPrice ? 'Buy' : 'Sell'}</p>
    </div>
  ));
}

export default Trades;
