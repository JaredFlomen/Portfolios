import './App.css';
import axios from 'axios';
import { useState } from 'react';

function App() {
  const [ticker, setTicker] = useState('');
  const [portfolio, setPortfolio] = useState([]);
  const options = {
    method: 'GET',
    url: 'https://alpha-vantage.p.rapidapi.com/query',
    params: { function: 'GLOBAL_QUOTE', symbol: `${ticker}` },
    headers: {
      'x-rapidapi-key': '7d487c6018msh1781a0a2541286ap1434c3jsna8d90d7fdd8b',
      'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
    },
  };
  const find = () => {
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data['Global Quote']['08. previous close']);
      })
      .catch(function (error) {
        console.error(error.message);
      });
  };
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
