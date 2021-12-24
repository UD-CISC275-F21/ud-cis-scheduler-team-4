import { Course } from "../../interfaces/course";
import Courses from "../../json/courses.json";

const theCourses = Courses as Course[];
const CourseNames = theCourses.map((eachCourse) => eachCourse.name);
export default CourseNames;