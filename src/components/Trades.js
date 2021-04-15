import ListGroup from 'react-bootstrap/ListGroup';

function Trades({ trades }) {
  return trades.map((trade, index) => (
    <ListGroup variant='flush' key={index}>
      <ListGroup.Item>
        <b>Ticker: {trade.ticker}</b>
      </ListGroup.Item>
      <ListGroup.Item>New: {trade.newShares}</ListGroup.Item>
      <ListGroup.Item>Old: {trade.oldShares}</ListGroup.Item>
      <ListGroup.Item>
        {trade.newShares > trade.oldShares
          ? `Buy ${(trade.newShares - trade.oldShares).toFixed(5)} shares`
          : `Sell ${(trade.oldShares - trade.newShares).toFixed(5)} shares`}
      </ListGroup.Item>
    </ListGroup>
  ));
}

export default Trades;
