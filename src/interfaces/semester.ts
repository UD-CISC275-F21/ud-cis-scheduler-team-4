import { Course } from "./course";

export interface Semester{

    semesternum: number
    courses: Course[]
    courseSetter: (courses: Course[]) => void

}