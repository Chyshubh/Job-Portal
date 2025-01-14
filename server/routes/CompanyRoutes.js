import express from 'express'
import { changeStatus, changeVisiblity, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postNewJob, registerCompany } from '../controllers/CompayControllers.js';
import upload from '../config/multer.js';
import { protectCompany } from '../middleware/Auth.js';




const router = express.Router();

//Register a Company
router.post('/register',upload.single('image'), registerCompany);

//Company Login
router.post('/login',loginCompany);

//get Company Data
router.post('/company',protectCompany, getCompanyData);

//Post a Job
router.post('/post-job',protectCompany, postNewJob);

//Get Applicants Data of Company
router.get('/applicants',protectCompany, getCompanyJobApplicants);

//Get Company job list
router.get('/list-jobs',protectCompany, getCompanyPostedJobs);

//Change application status
router.post('/change-status',protectCompany, changeStatus)

//Change application visiblity
router.post('/change-visiblity',protectCompany, changeVisiblity)

export default router;