const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
  
  source:{type:String,required:true},
  title: { type: String, required: true },        
  description: { type: String, required: true },             
  imageUrl: { type: String, default: null },
  newsUrl: { type: String, default:null},
  username:{type:String}

});

const News = mongoose.model('News', NewsSchema);

module.exports = News;

