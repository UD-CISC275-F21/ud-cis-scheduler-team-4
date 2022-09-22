import COURSES from "../../../json/courses.json";
import { Course } from "../../../interfaces/course";

export const StringsToCourses = (stringCourses: string[]): Course[] => {
    /** Takes a list of strings, and returns a list of courses by looking in courses.json for matching names.
     *  Will need to be optimized to not be O^n, since it currently just loops through the entire json.
     */
    const allCourses = COURSES as Course[];
    const courseList: Course[] = stringCourses.map(elem => [...allCourses.filter(i => i.name === elem)]).flat(2);
    return courseList;
};
