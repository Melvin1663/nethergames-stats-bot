const mongoose = require('mongoose');

module.exports = mongoose.model('NG-Blade', mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    next: String,
    counters: Object,
    fetch: Object,
    data: Array
}), 'ng-blade');