import JobApplicationModel from "../models/JobApplicationModel.js";
import JobModel from "../models/JobModel.js";
import UserModel from "../models/UserModel.js";
import { v2 as cloudinary } from "cloudinary";


//Get user data
export const getUserData = async (req, res) => {

    const userId = req.auth.userId;
    console.log("Auth object in request:", req.auth);


    try {

        const user = await UserModel.findById(userId);

        if (!user) {
            return res.json({ success: false, message: "User not found." });
        }

        res.json({ success: true, user })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

//Apply for a Job
export const applyForJob = async (req, res) => {

    const { jobId } = req.body;

    const userId = req.auth.userId;

    try {

        const isAlreadyApplied = await JobApplication.find({ jobId, userId });

        if (isAlreadyApplied.length > 0) {
            return res.json({ success: false, message: "Already Applied" });
        }

        const jobData = await JobModel.findById(JobId);

        if (!jobData) {
            return res.json({ success: false, message: "Job Not Found" });
        }

        await JobApplicationModel.create({
            companyId: jobData.companyId,
            userId,
            jobId,
            date: Date.now()
        })

        res.json({ success: true, message: "Applied Successfully" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//Get user applied applications
export const getUserJobApplication = async (req, res) => {

    try {

        const userId = req.auth.userId;

        const application = await JobApplicationModel.find({ userId })
            .populate('companyId', 'name eamil image')
            .populate('jobId', 'title description location category level salary')
            .exec()

        if (!application) {
            return res.json({ success: false, message: "No Job Applications Found" });
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//update user profile (resume)
export const updateUserResume = async (req, res) => {

    try {
        
        const userId = req.auth.userId;

        const resumeFile = req.file;

        const userData = await UserModel.findById(userId);

        if (resumeFile) {
            const resumeUpload = await cloudinary.uploader.upload(resumeFile.path);
            userData.resume = resumeUpload.secure_url
        }

        await userData.save()

        return res.json({success:true, message:"Resume Updated Successfully"})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}