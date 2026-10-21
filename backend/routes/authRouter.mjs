import Router from 'express';
import { findUserByEmail } from '../models/userModel.mjs';
import passport from '../strategies/localStrategy.mjs';
const router=Router();
router.get("/api/auth/status",(req,res)=>{
  req.sessionStore.get(req.sessionID,(err,session)=>{
    console.log(req.sessionID)
  })
  return res.status(200).send(req.session.user);
});
router.post(
  "/api/auth/login",
  passport.authenticate('local'),
  async (req,res)=>{
  const {
    body:{email,password}
  } = req;
  
  return res.status(200).send("authorized");
});


export default router;