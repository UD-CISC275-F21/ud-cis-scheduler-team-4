import { Concentration } from "./concentration";
import { Semester } from "./semester";

export interface SavedProgress {

    concentration: Concentration,
    semesters: Semester[]

}