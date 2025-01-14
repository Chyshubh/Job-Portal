import JobApplicationModel from "../models/JobApplicationModel";
import JobModel from "../models/JobModel";
import UserModel from "../models/UserModel";

//Get user data
export const getUserData = async (req, res) => {
    
    const userId = req.auth.userId;

    try {
        
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.json({ success: false, message: "User not found." });
        }

        res.json({success:true,user})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

//Apply for a Job
export const applyForJob = async (req,res) => {
    
    const {jobId} = req.body;

    const userId = req.auth.userId;

    try {
        
        const isAlreadyApplied = await JobApplication.find({jobId,userId});

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

        res.json({success:true, message: "Applied Successfully"})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//Get user applied applications
export const getUserJobApplication = async (req,res) => {
    
}

//update user profile (resume)
export const updateUserResume = async (req,res) => {
    
}