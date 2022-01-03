// load mongoose since we need it to define a model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
StdSchema = new Schema({
    name : String,
    contact : Number,
	rollno : Number
});
module.exports = mongoose.model('Student', StdSchema);