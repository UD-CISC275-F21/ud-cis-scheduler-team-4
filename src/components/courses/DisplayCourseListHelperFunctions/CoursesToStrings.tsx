import { Course } from "../../../interfaces/course";

export const CoursesToStrings = (courses: Course[]): string[] => {
    /** Takes a list of courses, and returns a list of strings by mapping each course to it's name
     */
    return courses.map((eachCourse) => eachCourse.name);
};