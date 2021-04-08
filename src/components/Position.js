import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

function Position({ position, index, deleteStock }) {
  const [edit, setEdit] = useState(true);
  const [newWeight, setNewWeight] = useState('');
  // console.log({ newWeight });
  return (
    <tr key={index}>
      <td>{position.ticker}</td>
      <td>{position.price}</td>
      {edit ? (
        <td>{position.weight}%</td>
      ) : (
        <td>
          <input
            placeholder='Edit'
            type='text'
            pattern='[0-9]*'
            defaultValue={position.weight}
            onChange={e => setNewWeight(e.target.value)}
          />
        </td>
      )}
      <td>
        {position.shares} share{position.shares > 1 ? 's' : ''}
      </td>
      <td>
        <Button variant='danger' onClick={() => deleteStock(position.ticker)}>
          Delete
        </Button>
      </td>
      <td>
        <Button variant='secondary' onClick={() => setEdit(!edit)}>
          {edit ? 'Edit' : 'Save'}
        </Button>
      </td>
    </tr>
  );
}

export default Position;
