import { SemesterType } from "./semester";
import { ConcentrationContainerType } from "./concentrationcontainer";

export interface SavedSemesterType{

    concentrationNumber: number
    semesterCourses: SemesterType[],
    concContainers: ConcentrationContainerType[]
    numSemesters: number

}