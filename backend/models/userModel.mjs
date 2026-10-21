import { connection } from "../db.mjs";


export async function AddUser(user){
  const query="Insert into `users` (username,email,password) values (?,?,?)";
  const [result] = await connection.execute(query,[user.username,user.email,user.password]);
  console.log(result);
}
export async function getAllUsers(){
  const query="select * from users";
  const [result]= await connection.execute(query);
  return result;
}

export async function findUserById(id){
  const query=`select * from users where idUser=${id}`;
  const [result]=await connection.execute(query);
  return result;
}
export async function findUserByEmail(email){
  const query=`select * from users where email="${email}"`;
  const [result]=await connection.execute(query);
  return result;
}
export async function UpdateUser(user,id){
  const query=`update users set email='${user.email}' , username='${user.username}' , password='${user.password}' where idUser=${id}`;
  const [result] = await connection.execute(query);
  console.log(result);
  return result;

}
export async function UpdateUserField(){

}

export async function deleteUser(id){
  const query =`delete from users where idUser=${id} `;
  const [result]=await connection.execute(query);
  return result
}
