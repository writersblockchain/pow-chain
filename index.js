const jayson = require('jayson');
const {startMining, stopMining} = require('./mine');
const {PORT} = require('./config');
const {utxos} = require('./db');

// create a server
const server = jayson.server({
  startMining: function(_, callback) {
    callback(null, 'success!');
    startMining();
  },
  stopMining: function(_, callback) {
    callback(null, 'success!');
    stopMining();
  }, 
  getBalance: function([address], callback) {
    const ourUTXOS = utxos.filter(x => {
      return x.owner === address && !x.spent; 
    });  
    const sum = ourUTXOS.reduce((p, c) => p + c.amount, 0);
    callback(null, sum);
  }
});

server.http().listen(PORT);
