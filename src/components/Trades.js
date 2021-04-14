import React from 'react';

function Trades({ trades }) {
  return trades.map(i => <p>{i}</p>);
}

export default Trades;
