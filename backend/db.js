const mongoose = require('mongoose');
const mongoUri = process.env.MONGODB_URI;

const MongoDB = async()=>{
    try {
        await mongoose.connect(mongoUri, { useNewUrlParser: true,useUnifiedTopology: true, });
    } catch (error) {
        console.log(error);
    }
}

module.exports = MongoDB