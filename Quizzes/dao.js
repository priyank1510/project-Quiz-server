import model from "./model.js";
import mongoose from "mongoose";

export const createQuiz = (quiz) => model.create(quiz);

export const findAllQuizzes = (courseId) => model.find({ courseId: courseId });

export const findQuizById = (courseId, quizId) => {
  try {
    // Check if quizId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(quizId)) {
      console.error(`Invalid quizId format: ${quizId}`);
      return null;
    }
    return model.findOne({ courseId: courseId, _id: quizId });
  } catch (error) {
    console.error(`Error finding quiz by ID: ${error.message}`);
    return null;
  }
};

export const updateQuiz = (courseId, quizId, quiz) => {
  try {
    // Check if quizId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(quizId)) {
      console.error(`Invalid quizId format: ${quizId}`);
      return { acknowledged: false, modifiedCount: 0 };
    }
    return model.updateOne({ courseId: courseId, _id: quizId }, quiz);
  } catch (error) {
    console.error(`Error updating quiz: ${error.message}`);
    return { acknowledged: false, modifiedCount: 0 };
  }
};

export const deleteQuiz = (courseId, quizId) => {
  try {
    // Check if quizId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(quizId)) {
      console.error(`Invalid quizId format: ${quizId}`);
      return { acknowledged: false, deletedCount: 0 };
    }
    return model.deleteOne({ courseId, _id: quizId });
  } catch (error) {
    console.error(`Error deleting quiz: ${error.message}`);
    return { acknowledged: false, deletedCount: 0 };
  }
};

export const findQuestionById = (id) => {
  return model.findOne({ 'questions.id': id });
};

export const findQuizzesByPartialName = (courseId, partialName) => {
  const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive
  return model.find({
    courseId,
    $or: [{ title: { $regex: regex } }],
  });
};
