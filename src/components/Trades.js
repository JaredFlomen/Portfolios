function Trades({ trades }) {
  return trades.map((position, index) => (
    <div key={index}>
      <p>Ticker: {position.ticker}</p>
      <p>
        {position.newPrice > position.oldPrice
          ? `Buy ${position.newShares - position.oldShares} shares`
          : 'Sell'}
      </p>
    </div>
  ));
}

export default Trades;
