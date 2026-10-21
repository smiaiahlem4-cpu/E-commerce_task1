import {Router} from 'express';
import { getAllOrders } from '../models/orderModel.mjs';
const router=Router();

router.get("/api/orders/",async(req,res)=>{
  const result= await getAllOrders();
  if(result.length===0) return res.send("there is no orders yet ...");
   res.status(200).send(result);
});
router.post("/api/orders/",(req,res)=>{

});
// router.put("/api/orders/:id");
// router.patch("/api/orders/:id");
// router.delete("/api/orders/:id");

export default router;