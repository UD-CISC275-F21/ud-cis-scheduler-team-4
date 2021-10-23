import { Course as CourseType } from "../interfaces/course";
import React from "react";

export const SemesterCourseContext = React.createContext<CourseType[]>([]);

// maybe make semester course context, be an object with a key for each semester? and it constantly updates for each semester, such as starting out it is

/*

{

    "semester-table-1": CourseType[],
    "semester-table-2": CourseType[],

}

*/
