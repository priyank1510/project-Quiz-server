import { findAssignmentsForCourse, createAssignment, deleteAssignment, updateAssignment } from "./dao.js";

export default function AssignmentRoutes(app) {
    app.post("/api/courses/:cid/assignments", async (req, res) => {
        const { cid } = req.params;
        const newAssignment = {
            ...req.body,
            course: cid
        };
        const assignment = await createAssignment(newAssignment);
        res.send(assignment);
    });

    app.get("/api/courses/:cid/assignments", async (req, res) => {
        const { cid } = req.params;
        const assignments = await findAssignmentsForCourse(cid);
        res.json(assignments);
    });

    app.delete("/api/assignments/:aid", async (req, res) => {
        const { aid } = req.params;
        await deleteAssignment(aid);
        res.sendStatus(200);
    });

    app.put("/api/assignments/:aid", async (req, res) => {
        const { aid } = req.params;
        await updateAssignment(aid, req.body);
        res.sendStatus(204);
    });
}