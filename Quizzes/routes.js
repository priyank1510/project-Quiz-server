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
    const quizzes = await dao.findAllQuizzes(courseId);
    res.json(quizzes);
  };

  const findQuizById = async (req, res) => {
    const { courseId, quizId } = req.params;
    const quiz = await dao.findQuizById(courseId, quizId);
    // console.log(quiz);
    res.json(quiz);
  };

  const updateQuiz = async (req, res) => {
    const { courseId, quizId } = req.params;
    try {
      // Remove _id from the update data to prevent MongoDB errors
      const updateData = { ...req.body };
      delete updateData._id;
      
      console.log("Updating quiz:", { courseId, quizId, updateData });
      
      const status = await dao.updateQuiz(courseId, quizId, updateData);
      res.json(status);
    } catch (error) {
      console.error("Error updating quiz:", error);
      res.status(500).json({ message: "Error updating quiz", error: error.message });
    }
  };

  const deleteQuiz = async (req, res) => {
    const { courseId, quizId } = req.params;
    const status = await dao.deleteQuiz(courseId, quizId);
    res.send(status);
  };

  const findQuizzesByPartialName = async (req, res) => {
    const { courseId, partialName } = req.params;
    const quizzes = await dao.findQuizzesByPartialName(courseId, partialName);
    res.json(quizzes);
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
