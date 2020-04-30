var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config = require('config');

mongoose.Promise = global.Promise;

const DomoSchema = new Schema({
    points: Number,
    description: String,
    title: String,
    introduction: String,
    url: String,
    category: String
}, { collection: 'domotests'});

var options = {
    //useMongoClient: true,
    socketTimeoutMS: 0,
    keepAlive: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000
};
//
//mongoose.connect(config.get('dbURL'), options);
mongoose.connect(config.get('dbURL'), options, function(err) {
    if (err) throw err;
    console.log("connect mongodb done");
});

exports.DomoSchema = mongoose.model('DomoSchema', DomoSchema);
