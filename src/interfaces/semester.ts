import { Course } from "./course";

export interface SemesterType{

    semesternum: number
    courses: Course[]
    courseSetter: (courses: Course[]) => void

}