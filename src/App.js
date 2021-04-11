import { useState } from 'react';
import lastPrice from './helpers/lastPrice';
import Portfolio from './components/Portfolio';
import Stats from './components/Stats';
import { Col, Form, Row, Button } from 'react-bootstrap';
import './styles/App.css';
import AddStock from './components/AddStock';
import Actions from './components/Actions';

function App() {
  const [ticker, setTicker] = useState('');
  const [weight, setWeight] = useState('');
  const [funds, setFunds] = useState('');
  const [portfolio, setPortfolio] = useState([
    { ticker: 'AAPL', price: 122.15, weight: 50, shares: 1 },
    { ticker: 'TSLA', price: 600.34, weight: 30, shares: 0.45 },
    { ticker: 'SHOP', price: 1000.12, weight: 10, shares: 0.09 },
  ]);

  const marketValue = portfolio.reduce(
    (accumulator, position) => accumulator + position.price * position.shares,
    parseInt(funds) || 0
  );

  const allocated = portfolio.reduce(
    (accumulator, position) => accumulator + position.weight,
    0
  );

  const updatePosition = (newWeight, ticker) => {
    const updatedPortfolio = portfolio.map(position => {
      if (position.ticker === ticker) {
        return { ...position, weight: parseInt(newWeight) };
      } else {
        return position;
      }
    });
    setPortfolio(updatedPortfolio);
  };

  const updatePortfolio = () => {
    Promise.all(
      portfolio.map(async position => {
        const price = await lastPrice(position.ticker);
        const shares = (marketValue * position.weight) / 100 / price;
        if (!price) return { ...position, price: 'API Error' };
        return { ...position, price, shares: shares.toFixed(2) };
      })
    ).then(res => setPortfolio(res));
    setFunds('');
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

  const deleteStock = ticker => {
    const updatedPortfolio = portfolio.filter(x => x.ticker !== ticker);
    setPortfolio(updatedPortfolio);
  };

  return (
    <div className='app'>
      <AddStock
        setTicker={setTicker}
        ticker={ticker}
        weight={weight}
        setWeight={setWeight}
      />
      <Actions
        allocated={allocated}
        addPosition={addPosition}
        updatePortfolio={updatePortfolio}
      />
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
      <Portfolio
        portfolio={portfolio}
        deleteStock={deleteStock}
        updatePosition={updatePosition}
      />
      <Stats marketValue={marketValue} allocated={allocated} />
    </div>
  );
}

export default App;
