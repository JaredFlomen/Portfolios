import React from 'react';

function Position({ ticker, price, shares }) {
  return (
    <div>
      <p>{ticker}</p>
      <p>{price}</p>
      <p>{shares}</p>
    </div>
  );
}

export default Position;
