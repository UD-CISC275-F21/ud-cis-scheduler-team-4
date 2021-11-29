import { Concentration } from "./concentration";
import { Course } from "./course";
import { Semester } from "./semester";

export interface SavedProgress {

    concentration: Concentration,
    numberOfSemesters: number
    semesters: Semester[]

}