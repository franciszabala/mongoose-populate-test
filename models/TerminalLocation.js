var mongoose = require('mongoose');

var TerminalLocationSchema = new mongoose.Schema({
  address: String,
  currentLocation: mongoose.Schema.Types.Mixed,
  locationRetrievalStatus: String,
  created_at: { type: Date, default: Date.now },
},{ collection: 'terminallocation',
	strict: false });


module.exports = mongoose.model('TerminalLocation', TerminalLocationSchema);
