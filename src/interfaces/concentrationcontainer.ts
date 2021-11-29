import { Course } from "./course";
import React from "react";


export interface ConcentrationContainerType{

    name: string
    courses: Course[]
    setCourses: (courses: Course[]) => void
    
}