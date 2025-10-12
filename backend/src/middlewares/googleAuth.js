import mongoose from "mongoose" ;
import GUsers from "../models/googleUsers.js";
import { generateToken } from "../utils/token.js";
export const googleAuth = async(req,res,next) => {
   try {
    const {email, name , picture} = req.user._json ;
    console.log(email , name ,picture);

    if(!email || !name){
        return res.status(400).json({message : "Insufficient google data"})
    }

    const findUser = await GUsers.findOne({email});

    const user = findUser;

    if(!findUser){
        const newUser = new GUsers({
            email : email ,
            fullName : name,
            profilePicture : picture
        })
        await newUser.save() ;

        user = newUser;
    }

    // res.user = user ;

    // console.log(user)

    const token = generateToken(user.email);
    console.log(token);

    res.cookie("token",token,{
        httpOnly : true,
        secure : true,
        sameSite : "none"
    })

    // return res.status(200).json({message : "Google Auth successful" ,
    //     user : findUser ? findUser : newUser
    // })
    next();
   } catch (error) {
    console.log(error);
    next(error);
   }
}