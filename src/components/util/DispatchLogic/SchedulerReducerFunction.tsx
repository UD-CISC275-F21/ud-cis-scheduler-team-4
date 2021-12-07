import produce from "immer";
import { Semester } from "../../../interfaces/semester";
import { ConcentrationContainerType } from "../../../interfaces/concentrationcontainer";
import { Course } from "../../../interfaces/course";
import { State } from "../../../interfaces/State";
import { SchedulerAction } from "../../../interfaces/SchedulerAction";


export const reducerFunction = (state: State, action: SchedulerAction ): State => {
    //console.log("state = ", state);
    switch (action.type) {
    case "checkState": {
        return produce(state, (draft) => {
            console.log("current state = ", state);
        });
    }
    case "concentrationToSemester": {
        return produce(state, (draft) => {
            // PreReqChecker here
            console.log("C-->StateContext state = ", state, " and payload = ", action.payload);
            const theConcentration: ConcentrationContainerType = draft.concentrationContainers[action.payload.sourceContainerIndex];
            const theSemester: Semester = draft.semesterCourses[action.payload.destContainerIndex];
            const theCourse = theConcentration.courses.splice(action.payload.sourceIndex,1)[0];
            theSemester.courses.splice(action.payload.destIndex,0,theCourse);
            draft.concentrationContainers[action.payload.sourceContainerIndex] = theConcentration;
            draft.semesterCourses[action.payload.destContainerIndex] = theSemester;
            draft.currentSaveData.semesters[action.payload.destContainerIndex].courses = theSemester.courses;
        });
    }
    case "semesterToConcentration": {
        return produce(state, (draft) => {
            console.log("S-->C state = ", state, " and payload = ", action.payload);
            const theConcentration: ConcentrationContainerType = draft.concentrationContainers[action.payload.destContainerIndex];
            const theSemester: Semester = draft.semesterCourses[action.payload.sourceContainerIndex];
            const theCourse: Course = theSemester.courses.splice(action.payload.sourceIndex, 1)[0];
            theConcentration.courses.splice(action.payload.destIndex, 0, theCourse);
            draft.concentrationContainers[draft.destContainerIndex].courses = theConcentration.courses;
            draft.semesterCourses[draft.sourceContainerIndex].courses = theSemester.courses;
            draft.currentSaveData.semesters[draft.sourceContainerIndex].courses = theSemester.courses;
        });
    }
    case "semesterToSemester": {
        return produce(state, (draft) => {
            console.log("S-->S state = ", state, " and payload = ", action.payload);
            const theSourceSemester: Semester = draft.currentSaveData.semesters[action.payload.sourceContainerIndex];
            const theDestSemester: Semester = draft.currentSaveData.semesters[action.payload.destContainerIndex];
            const theSplicedCourse: Course = theSourceSemester.courses.splice(action.payload.sourceIndex, 1)[0];
            theDestSemester.courses.splice(action.payload.destIndex, 0, theSplicedCourse);
            draft.semesterCourses[action.payload.sourceContainerIndex].courses = theSourceSemester.courses;
            draft.semesterCourses[action.payload.destContainerIndex].courses = theDestSemester.courses;
            draft.currentSaveData.semesters[action.payload.destContainerIndex].courses = theDestSemester.courses;
            draft.currentSaveData.semesters[action.payload.sourceContainerIndex].courses = theSourceSemester.courses;
        });
    }
    case "concentrationToConcentration": {
        return produce(state, (draft) => {
            console.log("C-->C state = ", state, " and payload = ", action.payload);
            const theSourceConcentration: ConcentrationContainerType = draft.concentrationContainers[action.payload.sourceContainerIndex];
            const theDestinationConcentration: ConcentrationContainerType = draft.concentrationContainers[action.payload.destContainerIndex];
            const theCourse = theSourceConcentration.courses.splice(action.payload.sourceIndex, 1)[0];
            theDestinationConcentration.courses.splice(action.payload.destIndex, 0, theCourse);
            draft.concentrationContainers[action.payload.sourceContainerIndex].courses = theSourceConcentration.courses;
            draft.concentrationContainers[action.payload.destContainerIndex].courses = theDestinationConcentration.courses;
        });
    }
    case "updateSaveData":{
        return produce(state, (draft) => {
            console.log("updating Save Data");
        });
    }
    case "updateNumberOfSemesters":{
        console.log("--- adding semester, state = ", state);
        return produce(state, (draft) => {
            draft.semesters = action.payload.semesters;
            draft.currentSaveData.numberOfSemesters = action.payload.semesters;
        });
    }
    case "updateConcentration":{
        //console.log("updating concentration with payload : ", action.payload);
        return produce(state, (draft) => {
            draft.concentration = action.payload.concentration;
            console.log("updateConcentrationPayload = ", action.payload);
        });
    }
    case "updateSemesterCourses":{
        return produce(state, (draft) => {
            //console.log("updating semesterCourses");
            draft.semesterCourses = action.payload.semesterCourses;
            draft.currentSaveData.semesters = action.payload.semesterCourses;
        });
    }
    case "updateConcentrationContainers": {
        //console.log("updating concentrationcontainers with payload ", action.payload);
        return produce(state, (draft) => {
            //console.log("payload = ", action.payload);
            draft.concentrationContainers = action.payload.concentrationContainers;
            return draft;
        });
    }
    case "updateCurrentSaveData":{
        return produce(
            state, (draft) => {
                draft.currentSaveData = action.payload.currentSaveData;
            });
    }
    case "setDisplay":{
        return produce(state, (draft) => {
            draft.display = action.payload.display;
        });
    }
    case "deleteSemester":{
        if ( state.semesters > 0) {
            const temporarySemesterCourse = action.payload.semesterCourses[action.payload.semesterCourses.length-1];
            if (temporarySemesterCourse.courses.length > 0) {
                // display error
                return produce(state, (draft) => {
                    draft.toastMessage = `Must remove classes from Semester ${draft.semesterCourses.length} before deleting`;
                    draft.toastDisplay = true;
                });
            } else {
                return produce(state, (draft) => {
                    draft.semesterCourses = draft.semesterCourses.slice(0, draft.semesterCourses.length-1);
                    draft.semesters -= 1;
                    draft.currentSaveData.numberOfSemesters = draft.semesterCourses.length-1;
                    draft.currentSaveData.semesters = draft.currentSaveData.semesters.slice(0,draft.currentSaveData.semesters.length-1);
                });
            }
        } else {
            console.log("indeleteelse");
            return { ...state };
        }
    }
    case "displayToast":{
        return produce(state, (draft) => {
            draft.toastMessage = action.payload.toastMessage;
            draft.toastDisplay = action.payload.toastDisplay;
        });
    }
    case "NoSavedConcentration": {
        return produce(state, (draft) => {
            const indexToUpdate = draft.saveData.findIndex((eachSaveData) => eachSaveData.concentration.name === draft.currentSaveData.concentration.name);
            draft.saveData[indexToUpdate] = draft.currentSaveData;
            draft.saveData = [...draft.saveData, {
                concentration: action.payload.concentration,
                numberOfSemesters: 1,
                semesters: [],
            }];
            draft.semesters = 1;
            draft.currentSaveData = draft.saveData[draft.saveData.length-1];
            draft.currentSaveData.numberOfSemesters = 1;
        });
    }
    case "SavedConcentration": {
        return produce(state, (draft) => {
            const indexWhereSaveDataIs = draft.saveData.findIndex((eachSaveData) => eachSaveData.concentration.name === action.payload.concentration.name);
            draft.currentSaveData = draft.saveData[indexWhereSaveDataIs];
            draft.semesters = draft.currentSaveData.numberOfSemesters;
            draft.semesterCourses = draft.currentSaveData.semesters;

        });
    }
    case "SetSemesterCourses": {
        return produce(state, (draft) => {
            draft.currentSaveData = {...draft.currentSaveData, semesters: action.payload.semesterCourses};
            draft.semesterCourses = action.payload.semesterCourses;
            draft.saveData[draft.saveData.findIndex((eachSaveData) => eachSaveData.concentration.name === draft.currentSaveData.concentration.name)].semesters = draft.semesterCourses;
        });
    }
    case "updateCourse": {

        return produce(state, (draft) => {
            console.log("in update course with msg = ", action.payload);
            const theSemester: Semester = draft.semesterCourses[action.payload.sourceContainerIndex];
            const newTextFields = action.payload.toastMessage.split("_"); // [desc, name, title]
            const theClass = { ...theSemester.courses[action.payload.sourceIndex], description: newTextFields[0], name: newTextFields[1], title: newTextFields[2]};
            draft.currentSaveData.semesters[action.payload.sourceContainerIndex].courses[action.payload.sourceIndex] = theClass;
            draft.semesterCourses[action.payload.sourceContainerIndex].courses[action.payload.sourceIndex] = theClass;
        });
    }
    default:{
        break;
    }
    }
    return {...state};
};