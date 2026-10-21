import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import routes from './routes/index.mjs'
import { connection } from './db.mjs';
import cookieParser from 'cookie-parser';
import session from "express-session";
import MySQLStoreFactory from "express-mysql-session";
import passport from "./strategies/localStrategy.mjs";
const app = express();
const MySQLStore = MySQLStoreFactory(session);

const sessionStore = new MySQLStore({},connection);
app.use(cors());
app.use(express.json());
app.use('/static',express.static('../frontend'));
app.use(cookieParser());

app.use(session({
  store: sessionStore,
  secret: 'fgfghyjyj',
  resave: false,
  saveUninitialized: false,
  // cookie: { secure: true, maxAge: 60000 * 60 * 2 }
  cookie: { maxAge: 60000 * 60 * 2 }

}));
app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.listen(3000,()=>{
  console.log(`Running on port ${3000}`);
});