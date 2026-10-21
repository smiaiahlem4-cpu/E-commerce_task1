import {Router} from "express";
import { connection } from "../db.mjs"
import { AddProduct, findProductById, getAllProducts ,deleteProduct, UpdateProduct, findProductByName } from "../models/productModel.mjs";

import {body,checkSchema, matchedData, validationResult} from 'express-validator';
import {createProductValidation} from '../utils/ValidationSchemas.mjs';

const router = Router();
const VerifyIdProductExistence= async (req,res,next)=>{
  const {
    params:{id}
  }=req;
  const parsedId=parseInt(id);
  if(isNaN(parsedId)) return res.status(400).send('Bad request!');
  try{
    const product=await findProductById(parsedId);
    if(product.length===0) return res.status(404).send("product not found");
    req.product=product;
    next();
  }catch(err){
    return res.status(500).send({error:"Internal server error"});
  }
}

const VerifyProductExistance= async (req,res,next)=>{
  const{
    params:{name}
  }=req;
  try{
    const searchedProd = await findProductByName(name);
    req.searchedProd=searchedProd;
    if(searchedProd.length===0) return res.status(404).send("product not found");
    next();
  }catch(err){
    return res.status(500).send({error:"Internal server error"});
  }
}

router.get("/api/products",async (req,res)=>{
  try{
    const result = await getAllProducts();
    if (result.length===0) return res.send("there is no products yet...");
    return res.status(200).send(result);
  }catch(error){
    return res.status(500).send({error:"Internal server error"});
  }
  
});


router.get("/api/products/:id",VerifyIdProductExistence,async (req,res)=>{
  const {
    product:[prod]
  }=req;
  res.status(200).send(prod) ;
})

router.get("/api/products/search/:name",VerifyProductExistance,async (req,res)=>{
  const{
    searchedProd:result
  }=req;
  res.status(200).send(result);
})

router.post("/api/products",checkSchema(createProductValidation),async (req,res)=>{
  const {
    body: {price,quantity}
  }=req;
  if(isNaN(price)) return res.status(400).send("price must be a number");
  if(!Number.isInteger(quantity)) return res.status(400).send("qunatity must be an integer");
  const result = validationResult(req);
  if(!result.isEmpty()) return res.status(400).send({error:result.array()});
  const data= matchedData(req);
  try{
    await AddProduct(data);
    return res.status(201).send("Product inserted successfully.");
  }catch(err){
    return res.status(500).send({error:"Internal server error"});
  }
  
});
router.put("/api/products/:id",VerifyIdProductExistence,checkSchema(createProductValidation),async (req,res)=>{
  const {
    params:{id},
    body: {price,quantity}
  }=req;
  const parsedId=parseInt(id);
  if(isNaN(price) && price!=undefined) return res.status(400).send("price must be a number");
  if(!Number.isInteger(Number(quantity))&& quantity!=undefined) return res.status(400).send("quantity must be an integer");
  const result = validationResult(req);
  if(!result.isEmpty()) return res.status(400).send({error:result.array()});
  const data = matchedData(req);
  for(const field in data){
    if(data[field]===undefined){
      data[field]=null;
    }
  }
  try{
    const resultreq=await UpdateProduct(data,parsedId);
    res.status(200).send(`product is updated successfully`);
  }catch(err){
    return res.status(500).send({error:"Internal server error"});
  }
  
});


router.patch("/api/products/:id",VerifyIdProductExistence,checkSchema(createProductValidation),async (req,res)=>{
  const result= validationResult(req);
  const data = matchedData(req);


});

router.delete("/api/products/:id",VerifyIdProductExistence,async (req,res)=>{
  const {
    params: {id}
  }=req;
  try{
    const {affectedRows} = await deleteProduct(id);
    if(affectedRows!=0) return res.status(200).send(`Product with id:${id} deleted successffuly`);
    return res.status(404).send("Product not found to delete");
  }catch(err){
    return res.status(500).send({error:"Internal server error"});
  }
  
});
export default router;