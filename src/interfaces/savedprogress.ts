import { Concentration } from "./concentration";
import { Semester } from "./semester";

export interface SavedProgress {

    concentration: Concentration,
    numberOfSemesters: number
    semesters: Semester[]

}