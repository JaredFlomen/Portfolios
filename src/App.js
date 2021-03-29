import './App.css';
import { useState } from 'react';
import { find } from './helpers';

function App() {
  const [ticker, setTicker] = useState('');
  // const [portfolio, setPortfolio] = useState([]);

  return (
    <div>
      <input
        type='text'
        placeholder='Symbol'
        onChange={e => setTicker(e.target.value)}
      />
      <button onClick={() => find(ticker)}>Find</button>
    </div>
  );
}

export default App;
