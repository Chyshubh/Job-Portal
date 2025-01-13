import express from 'express'
import { changeStatus, changeVisiblity, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postNewJob, registerCompany } from '../controllers/CompayControllers';

const router = express.Router();

//Register a Company
router.post('/register',registerCompany);

//Company Login
router.post('/login',loginCompany);

//get Company Data
router.post('/company',getCompanyData);

//Post a Job
router.post('/post-job',postNewJob);

//Get Applicants Data of Company
router.post('/applicants',getCompanyJobApplicants);

//Get Company job list
router.post('/list-jobs',getCompanyPostedJobs);

//Change application status
router.post('/change-status', changeStatus)

//Change application visiblity
router.post('/change-visiblity', changeVisiblity)

export default router;