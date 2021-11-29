import COURSES from "../../../json/courses.json";
import { Course as CourseType } from "../../../interfaces/course";

export const StringsToCourses = (stringCourses: string[]): CourseType[] => {
    /** Takes a list of strings, and returns a list of courses by looking in courses.json for matching names.
     *  Will need to be optimized to not be O^n, since it currently just loops through the entire json.
     */
    const allCourses = COURSES as CourseType[];
    const courseList: CourseType[] = stringCourses.map(elem => [...allCourses.filter(i => i.name === elem)]).flat(2);
    return courseList;
};
