import React, { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import Position from './Position';

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
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        {portfolio.map((position, index) => {
          return <Position position={position} index={index} />;
        })}
      </tbody>
    </Table>
  );
}

export default Portfolio;
