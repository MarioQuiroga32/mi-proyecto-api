const Stock = require('../models/stock.model');
const alpha = require('alphavantage')({ key: '05L7SRSYPYET3MRU' });

module.exports.getStockInfo = (name) => {
  return alpha.data.daily(name)
    .then(stocks => {
      stocks = Object.keys(stocks['Time Series (Daily)'])
        .map(date => {
          const info = stocks['Time Series (Daily)'][date];
          return new Stock({
            symbol: name,
            open: info['1. open'],
            high: info['2. high'],
            low: info['3. low'],
            close: info['4. close'],
            volume: info['5. volume']
          })
        });
      return Promise.resolve(stocks);
    })
}