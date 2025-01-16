import bcrypt from 'bcrypt'
import { v2 as cloudinary } from "cloudinary";
import CompanyModel from '../models/CompanyModel.js';
import generateToken from '../utils/generateToken.js';
import JobModel from '../models/JobModel.js';


//Register a new Company
export const registerCompany = async (req, res) => {

    const { name, email, password } = req.body;

    const imageFile = req.file;

    if (!name || !email || !password || !imageFile) {
        return res.json({ success: false, message: "Missing Details" })
    }

    try {
        const companyExists = await CompanyModel.findOne({ email })

        if (companyExists) {
            return res.json({ success: false, message: "Company Already Exist" })
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

        res.json({
            success: true,
            company: {
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
export const loginCompany = async (req, res) => {
    const { email, password } = req.body;

    try {

        const company = await CompanyModel.findOne({ email });

        if (await bcrypt.compare(password, company.password)) {
            res.json({
                success: true,
                company: {
                    _id: company._id,
                    name: company.name,
                    email: company.email,
                    image: company.image
                },
                token: generateToken(company._id)
            })
        }
        else {
            res.json({ success: false, message: "invalid email or password" });
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//Get Company Data
export const getCompanyData = async (req, res) => {

    try {
        
        const company = req.company;
        res.json({success: true, company})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

//Post a new job
export const postNewJob = async (req, res) => {
    const {title, description, location, salary, level, category} = req.body;

    const companyId = req.company._id;

    //console.log(companyId,{title, description,location, salary});

    try {
        
        const newJob = new JobModel({
            title,
            description,
            location,
            salary,
            companyId,
            date: Date.now(),
            level,
            category,
        })

        await newJob.save();

        res.json({success: true, newJob})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
    
}

//Get Company Job Applicants
export const getCompanyJobApplicants = async (req, res) => {
   
    

}

//Get Company Posted Jobs
export const getCompanyPostedJobs = async (req, res) => {

    try {
        
        const companyId = req.company._id;

        const jobs = await JobModel.find({companyId});

        //ToDo Adding No. of aplicants info in data

        res.json({success:true, jobsData: jobs})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//Change Job Application Status
export const changeStatus = async (req, res) => {

}

//Change Job Visiblity
export const changeVisiblity = async (req, res) => {

    try {
        
        const {id} = req.body;

         // Validate input
    if (!id) {
        return res.status(400).json({ success: false, message: "Job ID is required." });
      }
  
      // Check authorization
      if (!req.company) {
        return res.status(401).json({ success: false, message: "Unauthorized access." });
      }

        const companyId = req.company._id;

        const job = await JobModel.findById(id);

        if (!job) {
            return res.status(404).json({ success: false, message: "Job not found." });
          }

        if (companyId.toString() === job.companyId.toString()) {
            job.visible = !job.visible;
        }

        await job.save();

        res.json({success:true, job})


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}