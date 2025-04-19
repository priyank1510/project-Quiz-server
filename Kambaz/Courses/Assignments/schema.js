import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        _id: String,
        title: String,
        description: String,
        available_from_date: String,
        available_until_date: String,
        due_date: String,
        display_grade: String,
        Assignmentgroup: String,
        submissiontype: String,
        entry: String,
        points: String,     
        course: String,
    },
    { collection: "assignments" }
);

export default schema;