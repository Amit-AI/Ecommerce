const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config({ path: './config/.env' });

const dbURL = process.env.DBURL;

const connectDB = ()=>{

    mongoose.connect(dbURL).then(()=>{
        console.log('Connected to DataBase successfully.')
    })
    .catch((err)=>{
        console.log(err.message);
    })
}

module.exports = connectDB;