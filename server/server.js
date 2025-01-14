import './config/instrument.js'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import * as Sentry from "@sentry/node"
import { clerkWebhooks } from './controllers/WebHook.js'
import CompanyRoutes from './routes/CompanyRoutes.js'
import JobRoutes from './routes/JobRoutes.js'
import connectCloudinary from './config/cloudinary.js'

// Initialize Express
const app = express();

//onnect to database
await connectDB();
await connectCloudinary();

//middlewares
app.use(cors());
app.use(express.json());

//Routes
app.get('/', (req,res)=> res.send("API Working"))
app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
  });
app.post('/webhooks',clerkWebhooks);
app.use('/api/company',CompanyRoutes);
app.use('/api/jobs',JobRoutes)

//Port
const PORT = process.env.PORT ||1000;

Sentry.setupExpressErrorHandler(app);

app.listen(PORT,()=>{
    console.log(`Server is running on port: ${PORT}`);
    
})