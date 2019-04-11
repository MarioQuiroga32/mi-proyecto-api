
const stockService = require('../services/stockService.service');

const names = ['axp', 'aapl', 'ba', 'cat', 'cvx', 'csco', 'ko', 'dwdp', 'dis', 'xom', 'gs', 'hd', 'ibm', 'intc', 'jnj', 'jpm', 'mcd', 'mrk', 'msft', 'nke', 'pfe', 'pg', 'trv', 'utx', 'unh', 'vz', 'v', 'wba', 'wmt'];

const time = 1000 * 24;


var CronJob = require('cron').CronJob;
new CronJob('*/7 15-23 * * *', function() {
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
}, null, true, 'America/Los_Angeles');


