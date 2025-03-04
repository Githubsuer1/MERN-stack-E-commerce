import dotenv from 'dotenv';
import {connectMongoDB} from './db/connectDB.js';
import app from './app.js';


// dotenv
dotenv.config({});

// Connect to MongoDB
connectMongoDB()
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port http://localhost:${process.env.PORT}`);
    });
}) 
.catch((error) => {
  console.log("Mongodb connection failed.", error);
});