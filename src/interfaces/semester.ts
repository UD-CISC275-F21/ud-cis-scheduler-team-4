import { Course } from "./course";

export interface Semester{

    semesterNum: number
    courses: Course[]
    courseSetter: (courses: Course[]) => void

}