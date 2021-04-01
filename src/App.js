import { useState } from 'react';
import Header from './components/Header';
import Position from './components/Position';
import lastPrice from './helpers/lastPrice';

function App() {
  const [ticker, setTicker] = useState('');
  const [weight, setWeight] = useState('');
  const [portfolio, setPortfolio] = useState([
    { ticker: 'AAPL', price: 100.12, weight: 10, shares: 1 },
    { ticker: 'TSLA', price: 600.34, weight: 5, shares: 2 },
    { ticker: 'SHOP', price: 1000, weight: 20, shares: 1 },
  ]);
  const updatePortfolio = () => {
    Promise.all(
      portfolio.map(async position => {
        const price = await lastPrice(position.ticker);
        if (!price) return { ...position, price: 'API Error' };
        return { ...position, price };
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
      setPortfolio([...portfolio, { ticker, price, weight, shares: 1 }]);
      setTicker('');
      setWeight('');
    }
  }

  const marketValue = portfolio.reduce(
    (accumulator, position) => accumulator + position.price * position.shares,
    0
  );

  return (
    <div>
      <input
        type='text'
        placeholder='Symbol'
        value={ticker}
        onChange={e => setTicker(e.target.value)}
      />
      <input
        type='number'
        placeholder='Portfolio Weight'
        value={weight}
        onChange={e => setWeight(e.target.value)}
      />
      <button onClick={addPosition}>Add A Position</button>
      <button onClick={updatePortfolio}>Update All Positions</button>
      <div>
        <Header />
        {portfolio.map((item, index) => {
          return <Position key={index} item={item} />;
        })}
      </div>
      <div>Market value: ${parseFloat(marketValue).toFixed(2)}</div>
    </div>
  );
}

export default App;
