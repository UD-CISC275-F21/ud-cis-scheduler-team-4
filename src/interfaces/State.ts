import { Concentration } from "./concentration";
import { ConcentrationContainerType } from "./concentrationcontainer";
import { Course } from "./course";
import { SavedProgress } from "./savedprogress";

export interface State{
    concentration: Concentration,
    display: boolean,
    concentrationContainers: ConcentrationContainerType[],
    toastDisplay: boolean,
    toastMessage: string,
    saveData: SavedProgress[],
    currentSaveData: SavedProgress,
    sourceIndex: number,
    sourceContainerIndex: number,
    destIndex: number,
    destContainerIndex: number,
    preReqToggle: boolean,
    loadedInCourses: string[][],
    newCourse: Course
}