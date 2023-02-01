import express from 'express';
import { connectToDB } from './config/db_config.js';
import configureJwtStrategy from "./security/passport-jwt.js";
import cookieParser from "cookie-parser";
import passport from 'passport';
import dotenv from 'dotenv';
import cors from 'cors';
import authRouter from './routers/auth.js';

const app = express();
dotenv.config();
const config ={
    origin:"*",

}
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors(config));

//! use passport and initialize
app.use(passport.initialize());

configureJwtStrategy(passport);

/** DB CONNECTION */
connectToDB();

//Routers
app.use("/api", authRouter)

//serve the frontend pix from uploads
app.use("/uploads", express.static("uploads"));

/** SET PORT NUMBER */
const port = process.env.PORT || 5555;
app.listen (port, console.log(`Server is up on port ${port} 👻`));