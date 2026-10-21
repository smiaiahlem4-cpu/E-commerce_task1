import { connection } from "../db.mjs";

export async function AddProduct(product){
  const query="INSERT INTO products (name, price, quantity, image, description) VALUES (?, ?, ?, ?, ?)";
  const [result] = await connection.execute(query,[product.name,product.price,product.quantity,product.image,product.description]);
  console.log(result);
  return result;
}

export async function getAllProducts(){
  const query='Select * from products';
  const [result] = await connection.execute(query);
  return result;
}
export async function findProductById(id) {
  const query=`select * from products where idProduct=${id}`;
  const [result]= await connection.execute(query);
  return result;
}

export async function findProductByName(search) {
  const query=`select * from products where name like '%${search}%'`;
  const [result]= await connection.execute(query);
  return result;
}

export async function UpdateProduct(product,id){  
  const query =`update products set name="${product.name}" ,price=${product.price} ,quantity=${product.quantity} ,image="${product.image}" , description="${product.description}" where idProduct=${id}`;  
  const result = await connection.execute(query);
  return result;
}

export async function UpdateProductField(){
  
}

export async function deleteProduct(id){
  const query = `delete from products where idProduct=${id}`;
  const result = await connection.execute(query);
  return result;
}