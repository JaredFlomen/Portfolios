import React, { useState } from 'react';
import { Button, Table } from 'react-bootstrap';

function Portfolio({ portfolio, deleteStock }) {
  const [edit, setEdit] = useState(false);
  console.log({ edit });
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Ticker</th>
          <th>Price</th>
          <th>Weight</th>
          <th>Shares</th>
          <th>Delete</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        {portfolio.map((position, index) => {
          return (
            <tr key={index}>
              <td>{position.ticker}</td>
              <td>{position.price}</td>
              <td>{position.weight}%</td>
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
                  Edit
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
