import React from 'react';
import '../styles/position.css';

function Position({ ticker, price, shares }) {
  return (
    <div className='position'>
      <p>{ticker}</p>
      <p>{price}</p>
      <p>{shares}</p>
    </div>
  );
}

export default Position;
