import { Col, Form, Row } from 'react-bootstrap';

function AddStock({ setTicker, ticker, weight, setWeight }) {
  return (
    <Form.Group id='some-id'>
      <Row>
        <Col>
          <Form.Control
            type='text'
            placeholder='Symbol'
            value={ticker}
            onChange={e => setTicker(e.target.value)}
          />
        </Col>
        <Col>
          <Form.Control
            type='number'
            placeholder='Portfolio Weight'
            value={weight}
            onChange={e => setWeight(e.target.value)}
          />
        </Col>
      </Row>
    </Form.Group>
  );
}

export default AddStock;
