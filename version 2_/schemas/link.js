const mongoose = require('mongoose');

module.exports = mongoose.model('NG-Linked', mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: String,
    data: Object
}), 'ng-linked');