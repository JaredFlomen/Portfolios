import Alert from 'react-bootstrap/Alert';

function Stats({ marketValue, allocated }) {
  return (
    <div>
      <Alert variant='primary'>
        Market value: <b>${parseFloat(marketValue).toFixed(2)}</b>
      </Alert>
      <Alert variant={allocated > 80 ? 'danger' : 'primary'}>
        Percent Allocated: <b>{allocated}%</b>
      </Alert>
      <Alert variant={allocated > 80 ? 'danger' : 'primary'}>
        Percent Remaining: <b>{100 - allocated}%</b>
      </Alert>
    </div>
  );
}

export default Stats;
