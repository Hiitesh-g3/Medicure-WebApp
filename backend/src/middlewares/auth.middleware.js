import GUsers from "../models/googleUsers.js";
import Users from "../models/mongoUsers.js";
import jwt from "jsonwebtoken";


async function protectRoute(req,res,next){
    try {
        const token = req.cookies.token;

        if(!token){
            return res.status(401).json({message: "Unauthorized access"});
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        if(!decode){
            return res.status(401).json({message: "Unauthorized access"});
        }

        const userM = await Users.findOne({email : decode.email}).select("-password");

        const userG = await GUsers.findOne({email : decode.email}).select("-password");
        if(!userG && !userM){
            return res.status(404).json({message: "User not found"});
        }

        const user = userM?userM:userG;

        console.log(user);

        req.user = user;
        req.userType = userM?"User":"GUser"

        next();
    } catch (error) {
        console.error("Error in protectRoute middleware:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }
}

export default protectRoute;