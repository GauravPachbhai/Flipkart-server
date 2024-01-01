import express  from "express";

const routers = express.Router();
import { userSignup, userLogin } from "../controller/user-controller.js";
import  { getproducts} from "../controller/products-controller.js";
import { getProductById } from "../controller/products-controller.js";
import { addPaymentGateway,paytmResponse } from "../controller/payment-controller.js";

routers.post('/signup',userSignup);
routers.post('/login',userLogin);

routers.get('/products',getproducts);
routers.get('/product/:id', getProductById)

routers.post('/payment', addPaymentGateway);
routers.post('/callback',paytmResponse);
export default routers;