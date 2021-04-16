import { useState } from 'react';
import lastPrice from './helpers/lastPrice';
import Portfolio from './components/Portfolio';
import Stats from './components/Stats';
import AddStock from './components/AddStock';
import Actions from './components/Actions';
import AddFunds from './components/AddFunds';
import './styles/App.css';
import Trades from './components/Trades';
import Warning from './components/Warning';

function App() {
  const [ticker, setTicker] = useState('');
  const [weight, setWeight] = useState('');
  const [funds, setFunds] = useState('');
  const [trades, setTrades] = useState([]);
  const [portfolio, setPortfolio] = useState([
    { ticker: 'AAPL', price: 100, weight: 50, shares: 1 },
    { ticker: 'TSLA', price: 600.34, weight: 30, shares: 0.45 },
    { ticker: 'SHOP', price: 1000.12, weight: 10, shares: 0.09 },
  ]);

  const marketValue = portfolio.reduce(
    (accumulator, position) => accumulator + position.price * position.shares,
    parseInt(funds) || 0
  );

  const allocated = portfolio.reduce(
    (accumulator, position) => accumulator + position.weight,
    0
  );

  const updatePosition = (newWeight, ticker) => {
    const updatedPortfolio = portfolio.map(position => {
      if (position.ticker === ticker) {
        return { ...position, weight: parseInt(newWeight) };
      } else {
        return position;
      }
    });
    setPortfolio(updatedPortfolio);
    setTrades([]);
  };

  const updatePortfolio = () => {
    const trades = [];
    Promise.all(
      portfolio.map(async position => {
        const price = await lastPrice(position.ticker);
        const shares = (marketValue * position.weight) / 100 / price;
        trades.push({
          ticker: position.ticker,
          oldShares: parseFloat(position.shares).toFixed(5),
          newShares: parseFloat(shares).toFixed(5),
        });
        if (!price) return { ...position, price: 'API Error' };
        return { ...position, price, shares: shares.toFixed(10) };
      })
    ).then(res => setPortfolio(res));
    setTrades(trades);
    setFunds('');
  };

  async function addPosition() {
    if (!ticker || !weight) return null;
    const price = await lastPrice(ticker);
    if (!price) {
      setTicker('');
      setWeight('');
      return null;
    } else {
      const shares = (marketValue * weight) / 100 / price;
      setPortfolio([
        ...portfolio,
        { ticker, price, weight: parseInt(weight), shares: shares.toFixed(2) },
      ]);
      setTicker('');
      setWeight('');
      setTrades([]);
    }
  }

  const deleteStock = ticker => {
    const updatedPortfolio = portfolio.filter(x => x.ticker !== ticker);
    setPortfolio(updatedPortfolio);
    setTrades([]);
  };

  return (
    <div className='app'>
      <AddStock
        setTicker={setTicker}
        ticker={ticker}
        weight={weight}
        setWeight={setWeight}
      />
      <Actions
        allocated={allocated}
        addPosition={addPosition}
        updatePortfolio={updatePortfolio}
      />
      <AddFunds
        funds={funds}
        setFunds={setFunds}
        updatePortfolio={updatePortfolio}
      />
      {allocated > 100 && <Warning />}
      <Portfolio
        portfolio={portfolio}
        deleteStock={deleteStock}
        updatePosition={updatePosition}
      />
      <Stats marketValue={marketValue} allocated={allocated} />
      <Trades trades={trades} />
    </div>
  );
}

export default App;
