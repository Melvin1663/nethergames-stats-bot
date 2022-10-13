const mongoose = require('mongoose');

const prefixSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: String,
    prefix: String
});

module.exports = mongoose.model('NG-Prefix', prefixSchema, 'ng-prefix');