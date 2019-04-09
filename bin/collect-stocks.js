const Stock = require('../models/stock.model');
const stockService = require('../services/stockService.service');

const names = ['axp', 'aapl', 'ba']
// , 'ba', 'cat', 'cvx', 'csco', 'ko', 'dd-b', 'xom', 'gs', 'hd', 'ibm', 'intc', 'jnj', 'jpm', 'mcd', 'mrk', 'msft', 'nke', 'pfe', 'pg', 'trv', 'utx', 'unh', 'vz', 'v', 'wba', 'wmt', 'dis'];
const time = 1000 * 24;
const delay = millis => (fn, name) => {
    setTimeout(async () => {
      try {
        const stocks = await fn.getStockInfo(name);
        const last = stocks[0];
        console.info(`STOCK | ${millis} millis => `, last)
        last.save()
      } catch(error) {
        console.info('ERROR => ', error)
      }
    }, millis)
}

setTimeout(() => {
  names.forEach(async (name, index) => {
    await delay(time * index)(stockService, name)
  })
})


