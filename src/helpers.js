import axios from 'axios';

//Finds the last closing price given a stock symbol
const findPrice = async ticker => {
  const options = {
    method: 'GET',
    url: 'https://alpha-vantage.p.rapidapi.com/query',
    params: { function: 'GLOBAL_QUOTE', symbol: `${ticker}` },
    headers: {
      'x-rapidapi-key': `${process.env.REACT_APP_ALPHA_KEY}`,
      'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data['Global Quote']['08. previous close']);
    return response.data['Global Quote']['08. previous close'];
  } catch (error) {
    return console.error(error.message);
  }
};

export default findPrice;
