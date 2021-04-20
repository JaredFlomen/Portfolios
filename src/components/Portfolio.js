import { Table } from 'react-bootstrap';
import Position from './Position';

function Portfolio({ portfolio, deleteStock, updatePosition }) {
  return (
    <Table striped bordered hover id='portfolio-scroll'>
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
            <Position
              position={position}
              key={position.ticker}
              deleteStock={deleteStock}
              updatePosition={updatePosition}
            />
          );
        })}
      </tbody>
    </Table>
  );
}

export default Portfolio;
