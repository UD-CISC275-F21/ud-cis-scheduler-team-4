import COURSES from "../../../json/courses.json";
import { Course } from "../../../interfaces/course";

export const StringsToCourses = (stringCourses: string[]): Course[] => {
    /** Takes a list of strings, and returns a list of courses by looking in courses.json for matching names.
     *  Will need to be optimized to not be O^n, since it currently just loops through the entire json.
     */
    const allCourses = COURSES as Course[];
    const courseList: Course[] = stringCourses.map(elem => [...allCourses.filter(i => i.name === elem).map((eachCourse) => ({...eachCourse, fromIndex: 0, fromContainerIndex: 0}))]).flat(2);
    if (courseList.length != stringCourses.length) {
        // one or all of the courses were not registered in
        const names = courseList.map((eachCourse) => eachCourse.name);
        for(const eachName of stringCourses) {
            if (!names.includes(eachName)) {
                // found course not read in
                courseList.push({
                    name: eachName,
                    title: "Update Title",
                    description: "Not yet updated",
                    section: 10,
                    prereqs: [],
                    coreqs: [],
                    credits: 3,
                    lab: false,
                    fromIndex: 0,
                    fromContainerIndex: 0
                });
            }
        }
    }
    return courseList;
};
