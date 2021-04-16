import Alert from 'react-bootstrap/Alert';

function Warning() {
  return (
    <Alert variant='danger'>
      <b>Over-Allocated! Please alter your position's weights</b>
    </Alert>
  );
}

export default Warning;
