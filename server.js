import express from 'express';
import connection from './database/db.js';
import dotenv from 'dotenv'

import DefaultData from './default.js';

const app = express();
app.use(cors({
    origin:["https://deploy-mern-1whq.vercel.app"],
    method:["POST", "GET"],
    Credential:true
}));

const PORT = process.env.PORT || 8000;
dotenv.config();

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const URL= process.env.MONGODB_URL`mongodb+srv://${USERNAME}:${PASSWORD}@ecommerce-web.3aenzff.mongodb.net/?retryWrites=true&w=majority`;

connection(URL);

if (process.env.NODE_ENV === 'production'){
    app.use(express.static('clint/build'))
}

app.listen(PORT, () => console.log(`Server is running successfully on ${PORT}-------------------------------------->`));

DefaultData();
export let paytmMerchentkey = process.env.PAYTM_MERCHENT_KEY;
export let paytmParams ={};
paytmParams['MID'] = process.env.PAYTM_MID;
paytmParams['WEBSITE'] = process.env.PAYTM_WEBSITE;
paytmParams['CHANNEL_ID'] = process.env.PAYTM_CHANNEL_ID;
paytmParams['INDUSTRY_TYPE_ID'] = process.env.PAYTM_INDUSTRY_TYPE_ID;
paytmParams['ORDER_ID'] = uuid();
paytmParams['CUST_ID'] = process.env.PAYTM_CUST_ID;
paytmParams['TXN_AMOUNT'] = '100';
paytmParams['CALLBACK_URL'] = 'callback';
paytmParams['EMAIL'] = 'Gauravpachbhai@gmail.com'
paytmParams['MOBILE_NO'] = '1234567890'; 
