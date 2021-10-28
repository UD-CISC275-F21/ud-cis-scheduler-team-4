import { Course as CourseType } from "./course";
import React from "react";


export interface ConcentrationContainerType{

    name: string
    courses: CourseType[]
    setCourses: React.Dispatch<React.SetStateAction<CourseType[]>>
    
}