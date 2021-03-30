import { useState } from 'react';
import findPrice from './helpers';

function App() {
  const [ticker, setTicker] = useState('');
  const [price, setPrice] = useState('');
  const [portfolio, setPortfolio] = useState([
    { ticker: 'AAPL', price: 100 },
    { ticker: 'TSLA', price: 200 },
  ]);
  const updatePortfolio = e => {
    e.preventDefault();
    const newPortfolio = portfolio.map(item => {
      if (item.ticker === ticker) {
        return { ticker, price };
      } else {
        return item;
      }
    });
    setPortfolio(newPortfolio);
    setTicker('');
    setPrice('');
  };
  return (
    <div>
      <input
        type='text'
        placeholder='Symbol'
        value={ticker}
        onChange={e => setTicker(e.target.value)}
      />
      <button onClick={() => findPrice(ticker).then(res => setPrice(res))}>
        Find The Latest Price
      </button>
      <button onClick={updatePortfolio}>Update Portfolio</button>
      {price ? (
        <p>
          {ticker} Price: {price}
        </p>
      ) : (
        <p>Enter A Stock</p>
      )}
      {portfolio &&
        portfolio.map((item, index) => {
          return (
            <div key={index}>
              <p>{item.ticker}</p>
              <p>{item.price}</p>
            </div>
          );
        })}
    </div>
  );
}

export default App;
