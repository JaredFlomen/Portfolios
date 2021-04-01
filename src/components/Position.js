import React from 'react';
import '../styles/position.css';

function Position({ item }) {
  const { ticker, price, weight, shares } = item;
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
