import {request, Router} from 'express';
import {body, checkSchema, matchedData, validationResult} from 'express-validator';
import {AddUser, deleteUser, findUserById, getAllUsers, UpdateUser} from '../models/userModel.mjs';
import {CreateUserValidation} from '../utils/ValidationSchemas.mjs';
const router = Router();

const VerifyIdUserExistence= async (req,res,next)=>{
  const {
    params:{id}
  }=req;
  const parsedId=parseInt(id);
  if(isNaN(parsedId)) return res.status(400).send('Bad request!');
  try{
    const user=await findUserById(parsedId);
    if(user.length===0) return res.status(404).send("user not found");
    req.user=user;
    next();
  }catch(err){
    return res.status(500).send({error:"Internal server error"});
  }
}

router.get("/api/users",async (req,res)=>{
  try{
    const result =await getAllUsers();
    if(result.length===0) return res.send('there is no user yet..');
    return res.status(200).send(result);
  }catch(err){
    return res.status(500).send({error:"Internal server error"});
  }
});
//

router.get("/api/users/:id",VerifyIdUserExistence,async (req,res)=>{
  const {
    user:[userr]
  }=req;
  res.status(200).send(userr);
});
//

router.post("/api/users",checkSchema(CreateUserValidation),async (req,res)=>{
  const {
    body:{email}
  }=req;
  const result = validationResult(req);
  if(!result.isEmpty()) return res.status(400).send({"error": result.array()});
  if(!email.includes('@')) return res.status(400).send({"error":'email must contain @ '});
  const data = matchedData(req);
  console.log(data);
  try{
    const queryRes = await AddUser(data);
    res.status(201).send(`inserted successfully`);
  }catch(err){
    return res.status(500).send({error:"Internal server error"});
  }
});

router.put("/api/users/:id",VerifyIdUserExistence,checkSchema(CreateUserValidation),async (req,res)=>{
  const {
    params:{id},
    body:{email}
  }=req;
  const result = validationResult(req);
  if(!result.isEmpty()) return res.status(400).send({"error": result.array()});
  if(!email.includes('@')) return res.status(400).send({"error":'email must contain @ '});
  const data = matchedData(req);
  try{
    const queryRes = await UpdateUser(data,id);
    res.status(200).send(`user with id :${id} is updated successfully`);
  }catch(err){
    return res.status(500).send({error:"Internal server error"});
  }
});
router.patch("/api/users/:id",(req,res)=>{

});
//
router.delete("/api/users/:id",VerifyIdUserExistence,async (req,res)=>{
  const {
    params:{id}
  }=req;
  try{
    const {affectedRows}=await deleteUser(id);
    if(affectedRows!=0) return res.status(200).send(`user with idUser:${id} deleted successffuly`);
    return res.status(500).send('user not found to delete');
  }catch(err){
    return res.status(500).send({error:"Internal server error"});
  }
});

export default router;