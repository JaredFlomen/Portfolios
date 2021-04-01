import React from 'react';
import '../styles/position.css';

function Position({ ticker, price, shares, weight }) {
  return (
    <div className='position'>
      <p>{ticker}</p>
      <p>{price}</p>
      <p>{weight}%</p>
      <p>
        {shares} share{shares > 1 ? 's' : ''}
      </p>
    </div>
  );
}

export default Position;
