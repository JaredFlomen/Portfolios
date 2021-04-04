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
                <Badge
                  variant='primary'
                  onClick={() => deleteStock(position.ticker)}
                >
                  X
                </Badge>
                {position.shares} share{position.shares > 1 ? 's' : ''}
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default Portfolio;
