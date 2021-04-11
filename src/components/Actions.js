import { Form, Row, Col, Button } from 'react-bootstrap';

function Actions({ allocated, addPosition, updatePortfolio }) {
  return (
    <Form.Group>
      <Row>
        <Col className='button'>
          <Button
            disabled={allocated >= 100 ? true : false}
            onClick={addPosition}
            variant={allocated >= 100 ? 'secondary' : 'primary'}
          >
            {allocated >= 100 ? 'Fully Allocated' : 'Add A Position'}
          </Button>
        </Col>
        <Col className='button'>
          <Button onClick={updatePortfolio} variant='primary'>
            Update All Positions
          </Button>
        </Col>
      </Row>
    </Form.Group>
  );
}

export default Actions;
