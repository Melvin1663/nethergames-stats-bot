const mongoose = require('mongoose');

module.exports = mongoose.model('NG-Blade-Data', mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: String,
    data: Array,
}, { versionKey: false }), 'ng-blade-data');