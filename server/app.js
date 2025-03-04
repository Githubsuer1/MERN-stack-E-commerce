import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
const app = express();
import cookieParser from 'cookie-parser';

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors(
    {origin:"*"}
));
app.use(cookieParser());

// Routes
import userRouter from './routes/user.routes.js';
app.use('/api/v1/users',userRouter);

import categoryRouter from './routes/category.routes.js';
app.use('/api/v1/category',categoryRouter);

import productRouter from './routes/product.routes.js';
app.use('/api/v1/product',productRouter);


// export app 
export default app;