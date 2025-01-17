import express from 'express'
import { applyForJob, getUserData, getUserJobApplication, updateUserResume } from '../controllers/UserControllers.js';
import upload from '../config/multer.js';
import { requireAuth } from "@clerk/clerk-sdk-node";


const router = express.Router();

//get user data 
router.get('/user',requireAuth(), getUserData)

//Apply for a job
router.post('/apply', applyForJob)

//Get applied jobs data
router.get('/applications',getUserJobApplication);

//Update user profile (resume)
router.post('/update-resume',upload.single('resume'),updateUserResume)

export default router;