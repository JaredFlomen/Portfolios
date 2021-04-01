import { useState } from 'react';
import Position from './components/Position';
import lastPrice from './helpers/lastPrice';

function App() {
  const [ticker, setTicker] = useState('');
  const [portfolio, setPortfolio] = useState([
    { ticker: 'AAPL', price: 100.12, shares: 1 },
    { ticker: 'TSLA', price: 600.34, shares: 1 },
    { ticker: 'SHOP', price: 1000, shares: 1 },
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
      setPortfolio([...portfolio, { ticker, price, shares: 1 }]);
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
      <button onClick={addPosition}>Add Position</button>
      <button onClick={updatePortfolio}>Update All Positions</button>
      <div>Market value: {parseFloat(marketValue).toFixed(2)}</div>
      <div>
        {portfolio.map((item, index) => {
          return (
            <Position
              key={index}
              ticker={item.ticker}
              price={item.price}
              shares={item.shares}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
