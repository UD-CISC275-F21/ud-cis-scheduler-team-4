import { Concentration } from "./concentration";
import { Semester } from "./semester";
import { ConcentrationContainerType } from "./concentrationcontainer";
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
    preReqToggle: boolean
}