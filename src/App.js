import './App.css';
import axios from 'axios';
import { useState } from 'react';

function App() {
  const [ticker, setTicker] = useState('');
  const [portfolio, setPortfolio] = useState([]);

  return (
    <div>
      <input
        type='text'
        placeholder='Symbol'
        onChange={e => setTicker(e.target.value)}
      />
      <button onClick={find}>Find</button>
    </div>
  );
}

export default App;
