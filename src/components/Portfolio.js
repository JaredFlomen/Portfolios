import React, { useState } from 'react';
import { Button, Table } from 'react-bootstrap';

function Portfolio({ portfolio, deleteStock }) {
  const [edit, setEdit] = useState(true);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Ticker</th>
          <th>Price</th>
          <th>Weight</th>
          <th>Shares</th>
          <th>Delete</th>
          <th>{edit ? 'Edit' : 'Save'}</th>
        </tr>
      </thead>
      <tbody>
        {portfolio.map((position, index) => {
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
                    defaultValue={position.weight}
                    onChange={e => console.log(e.target.value)}
                  />
                </td>
              )}
              <td>
                {position.shares} share{position.shares > 1 ? 's' : ''}
              </td>
              <td>
                <Button
                  variant='danger'
                  onClick={() => deleteStock(position.ticker)}
                >
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
        })}
      </tbody>
    </Table>
  );
}

export default Portfolio;
