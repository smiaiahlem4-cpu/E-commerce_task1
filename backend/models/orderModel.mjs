import {connection} from "../db.mjs";

export async function getAllOrders(){
  const query = "select * from orders";
  const [result] = await connection.execute(query);
  return result;
}