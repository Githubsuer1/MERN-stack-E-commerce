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
// Use the CORS middleware
app.use(cors({
    origin: 'https://shopistyle.vercel.app',
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization'
  }));

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://shopistyle.vercel.app');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
  
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