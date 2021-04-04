import { useState } from 'react';
import lastPrice from './helpers/lastPrice';
import Button from 'react-bootstrap/Button';
import Portfolio from './components/Portfolio';
import { Alert, Col, Form, Row } from 'react-bootstrap';
import './App.css';

function App() {
  const [ticker, setTicker] = useState('');
  const [weight, setWeight] = useState('');
  const [portfolio, setPortfolio] = useState([
    { ticker: 'AAPL', price: 112.15, weight: 50, shares: 4.09 },
    { ticker: 'TSLA', price: 600.34, weight: 30, shares: 0.45 },
    { ticker: 'SHOP', price: 1000.12, weight: 10, shares: 0.09 },
  ]);

  const marketValue = portfolio.reduce(
    (accumulator, position) => accumulator + position.price * position.shares,
    0
  );

  const allocated = portfolio.reduce(
    (accumulator, position) => accumulator + position.weight,
    0
  );

  const updatePortfolio = () => {
    Promise.all(
      portfolio.map(async position => {
        const price = await lastPrice(position.ticker);
        const shares = (marketValue * position.weight) / 100 / price;
        if (!price) return { ...position, price: 'API Error' };
        return { ...position, price, shares: shares.toFixed(2) };
      })
    ).then(res => setPortfolio(res));
  };

  async function addPosition() {
    if (!ticker || !weight) return null;
    const price = await lastPrice(ticker);
    if (!price) {
      setTicker('');
      setWeight('');
      return null;
    } else {
      const shares = (marketValue * weight) / 100 / price;
      setPortfolio([
        ...portfolio,
        { ticker, price, weight: parseInt(weight), shares: shares.toFixed(2) },
      ]);
      setTicker('');
      setWeight('');
    }
  }

  return (
    <div className='app'>
      <Form.Group>
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
      <div>
        <Portfolio portfolio={portfolio} />
      </div>
      <Alert variant='primary'>
        Market value: ${parseFloat(marketValue).toFixed(2)}
      </Alert>
      <Alert variant={allocated > 80 ? 'danger' : 'primary'}>
        Percent Allocated: {allocated}%
      </Alert>
      <Alert variant='secondary'>Percent Remaining: {100 - allocated}%</Alert>
    </div>
  );
}

export default App;
