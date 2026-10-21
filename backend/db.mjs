
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.join(__dirname, '.env')
});

async function connectDB(){
  try{
  const connection = await mysql.createPool({
    host: process.env.db_host,
    user: process.env.db_user,
    password: process.env.db_password,
    database: process.env.db_name,

  })
  console.log("connected to mysql successfully...");
  return connection;
  }catch(error){
    console.log(`error!:${error}`);
  }
}
export const connection=await connectDB();
