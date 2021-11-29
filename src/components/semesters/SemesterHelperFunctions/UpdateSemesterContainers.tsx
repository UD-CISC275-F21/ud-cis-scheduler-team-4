import { Course } from "../../../interfaces/course";
import { Semester } from "../../../interfaces/semester";


export const updateSemesterContainer = (semester: Semester[], index: number, courses: Course[]): Semester[] => {
    console.log("IN -- UPDATE -- SEMESTER -- CONTAINER, SEMESTER = ", semester, " INDEX = ", index, " COURSES = ", courses);
    semester[index].courses = courses;
    return semester;
};