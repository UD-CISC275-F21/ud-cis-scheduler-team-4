import COURSES from "../json/courses.json";
import { Course } from "../interfaces/course";
import React from "react";

export const CourseContext = React.createContext<Course[]>(COURSES as Course[]);
