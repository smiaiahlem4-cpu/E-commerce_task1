import passport from "passport";
import {Strategy} from "passport-local";
import { findUserById,findUserByEmail } from "../models/userModel.mjs";

export default passport.use(new Strategy(
  {usernameField:"email"},
  async(email,password,done)=>{
    try{
      const [findUser] = await findUserByEmail(email);
      if(!findUser ) return done(null,false,{ message: 'No user with that email' })
      if (password !== findUser.password) {
        return done(null, false, { message: 'Incorrect password' });
      }
      return done(null,findUser);
    }catch(err){
      return done(err,null);
    }
}));
passport.serializeUser((user,done)=>{
  console.log("inside serialize");
  done(null,user.idUser);
});
passport.deserializeUser(async(idUser,done)=>{
  console.log("inside deserialize");
  try{
    const [findUser] = await findUserById(idUser);
    done(null,findUser);
  }catch(err){
    done(err,null);
  }
})
