import { useState } from 'react';
import Header from './components/Header';
import Position from './components/Position';
import lastPrice from './helpers/lastPrice';

function App() {
  const [ticker, setTicker] = useState('');
  const [weight, setWeight] = useState(0);
  const [portfolio, setPortfolio] = useState([
    { ticker: 'AAPL', price: 100.12, weight: 10, shares: 1 },
    { ticker: 'TSLA', price: 600.34, weight: 5, shares: 2 },
    { ticker: 'SHOP', price: 1000, weight: 20, shares: 1 },
  ]);
  const updatePortfolio = () => {
    Promise.all(
      portfolio.map(async position => {
        const price = await lastPrice(position.ticker);
        if (!price) return 'API error';
        return { ...position, price };
      })
    ).then(res => setPortfolio(res));
  };

  async function addPosition() {
    const price = await lastPrice(ticker);
    if (!price) {
      setTicker('');
      return null;
    } else {
      setPortfolio([...portfolio, { ticker, price, weight }]);
      setTicker('');
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
      <button onClick={addPosition}>Add Position</button>
      <button onClick={updatePortfolio}>Update All Positions</button>
      <div>Market value: {parseFloat(marketValue).toFixed(2)}</div>
      <div>
        <Header />
        {portfolio.map((item, index) => {
          return (
            <Position
              key={index}
              ticker={item.ticker}
              price={item.price}
              weight={item.weight}
              shares={item.shares}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
