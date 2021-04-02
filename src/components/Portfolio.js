import React from 'react';
import { Table } from 'react-bootstrap';
// import Header from './Header';

function Portfolio({ portfolio }) {
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
        {portfolio.map(position => {
          return (
            <tr>
              <td>{position.ticker}</td>
              <td>{position.price}</td>
              <td>{position.weight}%</td>
              <td>
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
