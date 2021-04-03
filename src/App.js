import { useEffect, useState } from 'react';
// import Header from './components/Header';
// import Position from './components/Position';
import lastPrice from './helpers/lastPrice';
import Button from 'react-bootstrap/Button';
import Portfolio from './components/Portfolio';
// import useVisualMode from './helpers/useVisualMode';

// const SHOW = 'SHOW';
// const EDIT = 'EDIT';

function App() {
  const [ticker, setTicker] = useState('');
  const [weight, setWeight] = useState('');
  const [portfolio, setPortfolio] = useState([
    { ticker: 'AAPL', price: 100.122, weight: 50, shares: 10 },
    { ticker: 'TSLA', price: 600.34, weight: 30, shares: 1 },
    { ticker: 'SHOP', price: 1000.12, weight: 10, shares: 0.5 },
  ]);

  const testMarketValue = portfolio.reduce(
    (accumulator, position) => accumulator + position.price * position.shares,
    0
  );

  console.log({ testMarketValue });

  const marketValue = 1000;

  const allocated = portfolio.reduce(
    (accumulator, position) => accumulator + position.weight,
    0
  );

  const updatePortfolio = () => {
    Promise.all(
      portfolio.map(async position => {
        const price = await lastPrice(position.ticker);
        const shares = (marketValue * position.weight) / 100 / price;
        // console.log({ price });
        // console.log({ shares });
        if (!price) return { ...position, price: 'API Error' };
        return { ...position, price, shares: shares.toFixed(2) };
      })
    ).then(res => setPortfolio(res));
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
    }
  }

  // const positions = portfolio.map((item, index) => {
  //   return <Position key={index} item={item} />;
  // });

  // const { mode, transition, back } = useVisualMode(portfolio ? SHOW : EDIT);

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
      <Button
        disabled={allocated >= 100 ? true : false}
        onClick={addPosition}
        variant={allocated >= 100 ? 'secondary' : 'primary'}
      >
        {allocated >= 100 ? 'Fully Allocated' : 'Add A Position'}
      </Button>
      <Button onClick={updatePortfolio} variant='primary'>
        Update All Positions
      </Button>
      <div>
        {/* <Header /> */}
        {/* {positions} */}
        <Portfolio portfolio={portfolio} />
      </div>
      <div>Market value: ${parseFloat(marketValue).toFixed(2)}</div>
      <div>Percent Allocated: {allocated}%</div>
    </div>
  );
}

export default App;
