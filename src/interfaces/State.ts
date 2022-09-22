import { Concentration } from "./concentration";
import { Semester } from "./semester";
import { ConcentrationContainerType } from "./concentrationcontainer";
import { SavedProgress } from "./savedprogress";

export interface State{
    concentration: Concentration,
    semesterCourses: Semester[],
    display: boolean,
    semesters: number,
    concentrationContainers: ConcentrationContainerType[],
    toastDisplay: boolean,
    toastMessage: string,
    deleteTriggered: number,
    saveData: SavedProgress[],
    currentSaveData: SavedProgress,
    sourceIndex: number,
    sourceContainerIndex: number,
    destIndex: number,
    destContainerIndex: number
}