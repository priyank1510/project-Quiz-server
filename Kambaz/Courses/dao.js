
import model from "./model.js";

export function findAllCourses() {
    
    return model.find();
}



export function createCourse(course) {
    delete course._id;
    return model.create(course);
}


export function deleteCourse(courseId) {
    return model.deleteOne({ _id: courseId });
}



export function updateCourse(courseId, courseUpdates) {
    return model.updateOne({ _id: courseId }, { $set: courseUpdates });
}



export function createModule(module) {
    const newModule = { ...module, _id: Date.now().toString() };
    Database.modules = [...Database.modules, newModule];
    return newModule;
}
