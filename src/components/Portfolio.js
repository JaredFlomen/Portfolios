import React from 'react';
import { Badge } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

function Portfolio({ portfolio, deleteStock }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Ticker</th>
          <th>Price</th>
          <th>Weight</th>
          <th>Shares</th>
          <th>Delete</th>
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
                <Badge
                  variant='danger'
                  onClick={() => deleteStock(position.ticker)}
                >
                  Delete
                </Badge>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default Portfolio;
