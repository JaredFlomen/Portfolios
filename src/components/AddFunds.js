import { Form, Row, Col, Button } from 'react-bootstrap';

function AddFunds({ funds, setFunds, updatePortfolio }) {
  return (
    <Form.Group>
      <Row>
        <Col>
          <Form.Control
            type='number'
            placeholder='Add funds...'
            value={funds}
            onChange={e => setFunds(e.target.value)}
          />
        </Col>
        <Col className='button'>
          <Button onClick={() => updatePortfolio()} vairant='primary'>
            Add Funds
          </Button>
        </Col>
      </Row>
    </Form.Group>
  );
}

export default AddFunds;
