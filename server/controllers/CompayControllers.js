import bcrypt from 'bcrypt'
import { v2 as cloudinary } from "cloudinary";
import CompanyModel from '../models/CompanyModel.js';
import generateToken from '../utils/generateToken.js';


//Register a new Company
export const registerCompany =  async (req, res) => {
    
    const { name, email, password } = req.body;

    const imageFile = req.file;
    
    if (!name || !email || !password || !imageFile) {
        return res.json({success:false, message: "Missing Details"})
    }

    try {
        const companyExists = await CompanyModel.findOne({email})

        if (companyExists) {
            return res.json({success:false, message: "Company Already Exist"}) 
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const imageUpload = await cloudinary.uploader.upload(imageFile.path);

        const company = await CompanyModel.create({
            name,
            email,
            password: hashPassword,
            image: imageUpload.secure_url
        })

        res.json({success:true,
            company:{
                _id: company._id,
                name: company.name,
                email: company.email,
                image: company.image
            },
            token: generateToken(company._id)
        })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//Company Login
export const loginCompany =  async (req, res) => {
    
}

//Get Company Data
export const getCompanyData =  async (req, res) => {
    
}

//Post a new job
export const postNewJob=  async (req, res) => {
    
}

//Get Company Job Applicants
export const getCompanyJobApplicants =  async (req, res) => {
    
}

//Get Company Posted Jobs
export const getCompanyPostedJobs =  async (req, res) => {
    
}

//Change Job Application Status
export const changeStatus =  async (req, res) => {
    
}

//Change Job Visiblity
export const changeVisiblity =  async (req, res) => {
    
}