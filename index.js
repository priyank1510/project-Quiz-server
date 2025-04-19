import "dotenv/config";
import express from 'express';
import session from "express-session";
import Hello from './Hello.js';
import Lab5 from './Lab5/index.js';
import WorkingWithObjects from './Lab5/WorkingWithObjects.js';
import WorkingWithArrays from './Lab5/WorkingWithArrays.js';
import cors from "cors";
import UserRoutes from './Kambaz/Users/routes.js';
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModuleRoutes from "./Kambaz/Modules/routes.js";
import AssignmentRoutes from "./Kambaz/Courses/Assignments/routes.js";
import EnrolmentRoutes from "./Kambaz/Enrollments/routes.js";
import QuizRoutes from "./Quizzes/routes.js";
import mongoose from "mongoose";
import AttemptRoutes from "./Attempt/routes.js";

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/Kambaz"
mongoose.connect(CONNECTION_STRING);

const app = express();
app.use(
    cors({
        credentials: true,
        origin: function(origin, callback) {
            // Allow requests with or without trailing slash
            const allowedOrigins = [
                process.env.NETLIFY_URL || "http://localhost:3000",
                "https://project-quiz15.netlify.app",
                "https://project-quiz15.netlify.app/"
            ];
            
            // Check if the origin is in our allowed list (with or without trailing slash)
            const isAllowed = allowedOrigins.some(allowed => {
                // Remove trailing slash from both for comparison
                const normalizedOrigin = origin ? origin.replace(/\/$/, '') : '';
                const normalizedAllowed = allowed.replace(/\/$/, '');
                return normalizedOrigin === normalizedAllowed;
            });
            
            if (isAllowed || !origin) {
                callback(null, true);
            } else {
                console.log(`Rejected CORS request from origin: ${origin}`);
                callback(new Error('Not allowed by CORS'));
            }
        }
    })
);

const sessionOptions = {
    secret: process.env.SESSION_SECRET || "Kambaz",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
};

if (process.env.NODE_ENV === "production") {
    sessionOptions.proxy = true;
    sessionOptions.cookie.domain = process.env.NODE_SERVER_DOMAIN;
}

app.use(session(sessionOptions));
app.use(express.json());

Lab5(app);
Hello(app);
WorkingWithObjects(app);
WorkingWithArrays(app);

UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
EnrolmentRoutes(app);
QuizRoutes(app);
AttemptRoutes(app);


app.listen(process.env.PORT || 4000)
