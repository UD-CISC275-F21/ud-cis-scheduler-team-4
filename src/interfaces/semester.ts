import { Course } from "./course";
import React from "react";

export interface SemesterType{

    semesternum: number
    courses: Course[]
    courseSetter: (courses: Course[]) => void

}