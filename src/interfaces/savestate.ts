import { ConcentrationContainerType } from "./concentrationcontainer";
import { SemesterType } from "./semester";

export interface SaveState {

    concentrationName: string
    numsemesters: number
    semesters: SemesterType[]
    concentrationCourses: ConcentrationContainerType[]

}