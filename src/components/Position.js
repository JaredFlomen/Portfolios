import React from 'react';
import '../styles/position.css';

function Position({ item }) {
  return (
    <div className='position'>
      <p>{item.ticker}</p>
      <p>{item.price}</p>
      <p>{item.weight}%</p>
      <p>
        {item.shares} share{item.shares > 1 ? 's' : ''}
      </p>
    </div>
  );
}

export default Position;
