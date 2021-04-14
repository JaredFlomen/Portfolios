import React from 'react';

function Trades({ trades }) {
  return trades.map((position, index) => (
    <div key={index}>
      <p>Ticker: {position.ticker}</p>
      <p>Old price: {position.oldPrice}</p>
      <p>New price: {position.newPrice}</p>
      <p>{position.newPrice > position.oldPrice ? 'Buy' : 'Sell'}</p>
    </div>
  ));
}

export default Trades;
