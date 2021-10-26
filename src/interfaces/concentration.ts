import { Course as CourseType } from "../interfaces/course";

export interface Concentration{
    name:string,
    core:CourseType[],
    capstone:CourseType[],
    lab:CourseType[][],
    writing: CourseType[],
    conc:{
        general:CourseType[],
        stats:CourseType[],
        systems:CourseType[],
        elective:CourseType[],
        ochem:CourseType[],
        data:CourseType[],
        cybersecurity:CourseType[],
        track:CourseType[]
    }
}