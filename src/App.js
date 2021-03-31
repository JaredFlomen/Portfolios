import { useState } from 'react';
import Position from './components/Position';
import findPrice from './helpers';

function App() {
  const [ticker, setTicker] = useState('');
  const [portfolio, setPortfolio] = useState([
    { ticker: 'AAPL', price: 100.12, shares: 1 },
    { ticker: 'TSLA', price: 600.34, shares: 1 },
    { ticker: 'SHOP', price: 1000, shares: 1 },
  ]);
  const updatePortfolio = () => {
    Promise.all(
      portfolio.map(async i => {
        const newPrice = await findPrice(i.ticker);
        return { ...i, price: parseFloat(newPrice).toFixed(2) };
      })
    ).then(res => setPortfolio(res));
  };

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
      <button onClick={updatePortfolio}>Update All Positions</button>
      <div>Market value: {marketValue}</div>
      <div>
        {portfolio &&
          portfolio.map((item, index) => {
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
