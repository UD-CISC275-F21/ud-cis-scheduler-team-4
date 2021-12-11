import CONCENTRATIONS from "../../../json/concentrations.json";
import { SavedProgress } from "../../../interfaces/savedprogress";
import { State } from "../../../interfaces/State";

export const initialState: State = {
    concentration : CONCENTRATIONS[0],
    display : false,
    concentrationContainers: [],
    toastDisplay: false,
    toastMessage: "",
    saveData: [{
        concentration: CONCENTRATIONS[0],
        semesters: [],
    } as SavedProgress],
    currentSaveData: {
        concentration: CONCENTRATIONS[0],
        semesters: [{semesterNum: 1, courses: []}],
    } as SavedProgress,
    sourceIndex: 0,
    sourceContainerIndex: 0,
    destIndex: 0,
    destContainerIndex: 0,
    preReqToggle: true,
    loadedInCourses: [[]]
};