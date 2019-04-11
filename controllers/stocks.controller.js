const Stock = require('../models/stock.model')

module.exports.getStocks = (req, res, next) => {
  Stock.find()
    .then(stocks => {
      stocks = stocks.reduce((stocks, stock) => {
        if (!stocks[stock.symbol]) {
          stocks[stock.symbol] = [];
        }
        stocks[stock.symbol].push(stock);
        return stocks;
      }, {});
      res.json(stocks);
    })
    .catch(next)
}