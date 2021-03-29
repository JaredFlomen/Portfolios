import axios from 'axios';
const find = ticker => {
  const options = {
    method: 'GET',
    url: 'https://alpha-vantage.p.rapidapi.com/query',
    params: { function: 'GLOBAL_QUOTE', symbol: `${ticker}` },
    headers: {
      'x-rapidapi-key': `${process.env.REACT_APP_ALPHA_KEY}`,
      'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data['Global Quote']['08. previous close']);
    })
    .catch(function (error) {
      console.error(error.message);
    });
};

export { find };
