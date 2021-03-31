import { useEffect, useState } from 'react';
import Position from './components/Position';
import findPrice from './helpers';

function App() {
  const [ticker, setTicker] = useState('');
  // const [price, setPrice] = useState('');
  const [portfolio, setPortfolio] = useState([
    { ticker: 'AAPL', price: 100.12, shares: 1 },
    { ticker: 'TSLA', price: 600.34, shares: 1 },
  ]);
  const updatePortfolio = async e => {
    e.preventDefault();
    const newPrice = await findPrice(ticker);
    const newPortfolio = portfolio.map(item => {
      if (item.ticker === ticker) {
        return { ...item, ticker, price: parseFloat(newPrice).toFixed(2) };
      } else {
        return item;
      }
    });
    setPortfolio(newPortfolio);
    setTicker('');
    // setPrice('');
  };

  const marketValue = portfolio.reduce(
    (accumulator, position) => accumulator + position.price * position.shares,
    0
  );

  // useEffect(() => {
  //   console.log('Market value changed');
  // }, [marketValue]);

  return (
    <div>
      <input
        type='text'
        placeholder='Symbol'
        value={ticker}
        onChange={e => setTicker(e.target.value)}
      />
      {/* <button onClick={() => findPrice(ticker).then(res => setPrice(res))}>
        Find The Latest Price
      </button> */}
      <button onClick={updatePortfolio}>Update A Position</button>
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
