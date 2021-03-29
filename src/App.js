import './App.css';
import { useState } from 'react';
import findPrice from './helpers';

function App() {
  const [ticker, setTicker] = useState('');
  const [price, setPrice] = useState('');
  const [portfolio, setPortfolio] = useState([{ ticker: 'AAPL', price: 100 }]);
  const updatePortfolio = (ticker, price) => {
    console.log('Worked', ticker, price);
    setPortfolio([...portfolio, { ticker, price }]);
  };
  return (
    <div>
      <input
        type='text'
        placeholder='Symbol'
        onChange={e => setTicker(e.target.value)}
      />
      <button onClick={() => findPrice(ticker).then(res => setPrice(res))}>
        Find
      </button>
      <button onClick={() => updatePortfolio(ticker, price)}>
        Update Portfolio
      </button>
      {price ? (
        <p>
          {ticker} Price: {price}
        </p>
      ) : (
        <p>Enter A Stock</p>
      )}
      {portfolio &&
        portfolio.map(item => {
          return (
            <div>
              <p>{item.ticker}</p>
              <p>{item.price}</p>
            </div>
          );
        })}
    </div>
  );
}

export default App;
