import * as dao from "./dao.js";

export default function QuizRoutes(app) {
  const createQuiz = async (req, res) => {
    const { courseId } = req.params;
    try {
      // Ensure the quiz object has the courseId
      const quizData = {
        ...req.body,
        courseId: courseId
      };
      
      console.log("Creating quiz with data:", JSON.stringify(quizData, null, 2));
      
      const quiz = await dao.createQuiz(quizData);
      res.json(quiz);
    } catch (error) {
      console.error("Error creating quiz:", error);
      res.status(500).json({ message: "Error creating quiz", error: error.message });
    }
  };

  const findAllQuizzes = async (req, res) => {
    const { courseId } = req.params;
    try {
      const quizzes = await dao.findAllQuizzes(courseId);
      res.json(quizzes);
    } catch (error) {
      console.error("Error finding all quizzes:", error);
      res.status(500).json({ message: "Error finding quizzes", error: error.message });
    }
  };

  const findQuizById = async (req, res) => {
    const { courseId, quizId } = req.params;
    try {
      const quiz = await dao.findQuizById(courseId, quizId);
      if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
      }
      res.json(quiz);
    } catch (error) {
      console.error("Error finding quiz by ID:", error);
      res.status(500).json({ message: "Error finding quiz", error: error.message });
    }
  };

  const updateQuiz = async (req, res) => {
    const { courseId, quizId } = req.params;
    try {
      // Remove _id from the update data to prevent MongoDB errors
      const updateData = { ...req.body };
      delete updateData._id;
      
      console.log("Updating quiz:", { courseId, quizId, updateData });
      
      const status = await dao.updateQuiz(courseId, quizId, updateData);
      
      if (!status.acknowledged) {
        return res.status(400).json({ message: "Failed to update quiz" });
      }
      
      if (status.modifiedCount === 0) {
        return res.status(404).json({ message: "Quiz not found or no changes made" });
      }
      
      res.json(status);
    } catch (error) {
      console.error("Error updating quiz:", error);
      res.status(500).json({ message: "Error updating quiz", error: error.message });
    }
  };

  const deleteQuiz = async (req, res) => {
    const { courseId, quizId } = req.params;
    try {
      const status = await dao.deleteQuiz(courseId, quizId);
      
      if (!status.acknowledged) {
        return res.status(400).json({ message: "Failed to delete quiz" });
      }
      
      if (status.deletedCount === 0) {
        return res.status(404).json({ message: "Quiz not found" });
      }
      
      res.send(status);
    } catch (error) {
      console.error("Error deleting quiz:", error);
      res.status(500).json({ message: "Error deleting quiz", error: error.message });
    }
  };

  const findQuizzesByPartialName = async (req, res) => {
    const { courseId, partialName } = req.params;
    try {
      const quizzes = await dao.findQuizzesByPartialName(courseId, partialName);
      res.json(quizzes);
    } catch (error) {
      console.error("Error finding quizzes by partial name:", error);
      res.status(500).json({ message: "Error finding quizzes", error: error.message });
    }
  };

  const findQuestionById = async (req, res) => {
    const { id } = req.params; 
    try {
      const question = await dao.findQuestionById(id);
      if (!question) {
        return res.status(404).json({ message: 'Question not found' });
      }
      res.json(question);
    } catch (error) {
      console.error("Error finding question by ID:", error);
      res.status(500).json({ message: error.message });
    }
  };

  app.post("/api/quizzes/:courseId", createQuiz);
  app.get("/api/quizzes/:courseId", findAllQuizzes);
  app.get("/api/quizzes/:courseId/:quizId", findQuizById);
  app.put("/api/quizzes/:courseId/:quizId", updateQuiz);
  app.delete("/api/quizzes/:courseId/:quizId", deleteQuiz);
  app.get(
    "/api/quizzes/:courseId/search/:partialName",
    findQuizzesByPartialName
  );
 app.get("/api/questions/:id", findQuestionById);
}
