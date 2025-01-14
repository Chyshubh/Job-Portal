import JobModel from "../models/JobModel.js"

// get all jobs 
export const getJobs = async (req,res) => {
    try {
        
        const jobs = await JobModel.find({visible:true})
        .populate({path:'companyId', select:"-password"})

        res.json({success:true, jobs})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// get a single jobs  by Id
export const getJobById = async (req,res) => {
    
}