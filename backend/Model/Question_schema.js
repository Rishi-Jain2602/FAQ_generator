const mongoose = require('mongoose');
const {Schema} = mongoose


const QuestionSchema = new Schema({
    "location":{type:String,required:true},
    "query":{type:String,required:true},
    "Response":{type:String,required:true},
    "DB_Source":{type:String,required:true},
    "Website":{type:[String],required:true},
},{collection:'FAQ_diff_location'})

module.exports = mongoose.model('QuestionSchema',QuestionSchema)