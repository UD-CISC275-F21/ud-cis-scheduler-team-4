import COURSES from "../json/courses.json";
import { Course as CourseType } from "../interfaces/course";
import React from "react";

export const SemesterCourseContext = React.createContext<CourseType[]>([]);
