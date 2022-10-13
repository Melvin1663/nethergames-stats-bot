const mongoose = require('mongoose');

module.exports = mongoose.model('NG-Prefix', mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: String,
    prefix: String
}), 'ng-prefix');