import express from 'express'
import { getJobById, getJobs } from '../controllers/JobController.js';

const router = express.Router();

//Route to get all jobs data
router.get('/', getJobs);


//Route to geta single job by ID
router.get('/:id', getJobById);

export default router;