const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const connectDB = require('./models/connectDB.js');
const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');
const errorMiddleWare = require('./middleware/error.js');

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use('/api', productRouter);
app.use('/api', userRouter);


connectDB(); //connecting to database

dotenv.config({ path: './config/.env' });

app.get('/', (req, res)=>{
    res.send('ALL IS WELL!');
})

const server = app.listen(process.env.PORT, ()=>{
    console.log('Server running on http://localhost:'+process.env.PORT);
})


process.on("CastError", (err)=>{
    console.log(err.message)
})

app.use(errorMiddleWare); //for handling errors using next()


