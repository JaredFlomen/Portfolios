import React from 'react';
import '../styles/position.css';

function Position({ item }) {
  const { ticker, price, weight, shares } = item;
  return (
    <div className='wrapper'>
      <p className='position'>{ticker}</p>
      <p className='position'>{price}</p>
      <p className='position'>{weight}%</p>
      <p className='position'>
        {shares} share{shares > 1 ? 's' : ''}
      </p>
    </div>
  );
}

export default Position;
