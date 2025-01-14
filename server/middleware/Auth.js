import jwt from 'jsonwebtoken';
import CompanyModel from "../models/CompanyModel.js";

export const protectCompany = async (req,res,next)=>{

    const token = req.headers.token;

    if (!token) {
        res.json({ success: false, message: "Not autorized to access the data" })
    }

    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.company = await CompanyModel.findById(decoded.id).select('-password')

        next();

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}