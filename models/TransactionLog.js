var mongoose = require('mongoose');

var TransactionLogSchema = new mongoose.Schema({
  user: String,
  created_at: { type: Date, default: Date.now },
  queryResult: { type : mongoose.Schema.Types, ref : 'TerminalLocation' }
},{ collection: 'transactionlogs',
	strict: false });

module.exports = mongoose.model('TransactionLogs', TransactionLogSchema);
