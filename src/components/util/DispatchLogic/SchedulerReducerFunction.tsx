import produce from "immer";
import { Semester } from "../../../interfaces/semester";
import { ConcentrationContainerType } from "../../../interfaces/concentrationcontainer";
import { Course } from "../../../interfaces/course";
import { State } from "../../../interfaces/State";
import { SchedulerAction } from "../../../interfaces/SchedulerAction";
import { CoursesToStrings } from "../../courses/DisplayCourseListHelperFunctions/CoursesToStrings";

export const reducerFunction = (state: State, action: SchedulerAction ): State => {
    //console.log("state = ", state);
    switch (action.type) {
    case "checkState": {
        return produce(state, (draft) => {
            console.log("current state = ", state);
            console.log("draft = ", draft);
        });
    }
    case "concentrationToSemester": {
        return produce(state, (draft) => {
            // PreReqChecker here
            //console.log("C-->StateContext state = ", state, " and payload = ", action.payload);
            const theConcentration: ConcentrationContainerType = draft.concentrationContainers[action.payload.sourceContainerIndex];
            const theSemester: Semester = draft.currentSaveData.semesters[action.payload.destContainerIndex];
            const theCourse = theConcentration.courses.splice(action.payload.sourceIndex,1)[0];
            theSemester.courses.splice(action.payload.destIndex,0,theCourse);
            draft.concentrationContainers[action.payload.sourceContainerIndex] = theConcentration;
            //draft.semesterCourses[action.payload.destContainerIndex] = theSemester;
            draft.currentSaveData.semesters[action.payload.destContainerIndex].courses = theSemester.courses;
        });
    }
    case "semesterToConcentration": {
        return produce(state, (draft) => {
            //console.log("S-->C state = ", state, " and payload = ", action.payload);
            const theConcentration: ConcentrationContainerType = draft.concentrationContainers[action.payload.destContainerIndex];
            const theSemester: Semester = draft.currentSaveData.semesters[action.payload.sourceContainerIndex];
            const theCourse: Course = theSemester.courses.splice(action.payload.sourceIndex, 1)[0];
            theConcentration.courses.splice(action.payload.destIndex, 0, theCourse);
            draft.concentrationContainers[draft.destContainerIndex].courses = theConcentration.courses;
            draft.currentSaveData.semesters[action.payload.sourceContainerIndex].courses = theSemester.courses;
            draft.currentSaveData.semesters[action.payload.sourceContainerIndex].courses = theSemester.courses;
        });
    }
    case "semesterToSemester": {
        return produce(state, (draft) => {
            //console.log("S-->S state = ", state, " and payload = ", action.payload);
            const theSourceSemester: Semester = draft.currentSaveData.semesters[action.payload.sourceContainerIndex];
            const theDestSemester: Semester = draft.currentSaveData.semesters[action.payload.destContainerIndex];
            const theSplicedCourse: Course = theSourceSemester.courses.splice(action.payload.sourceIndex, 1)[0];
            theDestSemester.courses.splice(action.payload.destIndex, 0, theSplicedCourse);
            draft.currentSaveData.semesters[action.payload.sourceContainerIndex].courses = theSourceSemester.courses;
            draft.currentSaveData.semesters[action.payload.destContainerIndex].courses = theDestSemester.courses;
            draft.currentSaveData.semesters[action.payload.destContainerIndex].courses = theDestSemester.courses;
            draft.currentSaveData.semesters[action.payload.sourceContainerIndex].courses = theSourceSemester.courses;
        });
    }
    case "concentrationToConcentration": {
        return produce(state, (draft) => {
            //console.log("C-->C state = ", state, " and payload = ", action.payload);
            const theSourceConcentration: ConcentrationContainerType = draft.concentrationContainers[action.payload.sourceContainerIndex];
            const theDestinationConcentration: ConcentrationContainerType = draft.concentrationContainers[action.payload.destContainerIndex];
            const theCourse = theSourceConcentration.courses.splice(action.payload.sourceIndex, 1)[0];
            theDestinationConcentration.courses.splice(action.payload.destIndex, 0, theCourse);
            draft.concentrationContainers[action.payload.sourceContainerIndex].courses = theSourceConcentration.courses;
            draft.concentrationContainers[action.payload.destContainerIndex].courses = theDestinationConcentration.courses;
        });
    }
    case "updateSaveDataBio":{
        return produce(state, (draft) => {
            //console.log("updating Save Data");
            // set saveData index to be sourceContainerIndex
            const tmpSaveData = draft.saveData[draft.saveData.findIndex((eachSaveData) => eachSaveData.concentration.name === action.payload.concentration.name)];
            tmpSaveData.concentration.core = CoursesToStrings(state.concentrationContainers[0].courses);
            tmpSaveData.concentration.capstone = CoursesToStrings(state.concentrationContainers[1].courses);
            tmpSaveData.concentration.conc.general = CoursesToStrings(state.concentrationContainers[2].courses);
            tmpSaveData.concentration.lab = CoursesToStrings(state.concentrationContainers[5].courses);
            tmpSaveData.concentration.conc.ochem = CoursesToStrings(state.concentrationContainers[8].courses);
            tmpSaveData.concentration.writing = CoursesToStrings(state.concentrationContainers[3].courses);
            tmpSaveData.concentration.conc.stats = CoursesToStrings(state.concentrationContainers[4].courses);
            tmpSaveData.concentration.conc.data = CoursesToStrings(state.concentrationContainers[7].courses);
            tmpSaveData.concentration.conc.elective = CoursesToStrings(state.concentrationContainers[6].courses);
        });
    }
    case "updateSaveDataAI":{
        return produce(state, (draft) => {
            //console.log("updating Save Data");
            // set saveData index to be sourceContainerIndex
            const tmpSaveData = draft.saveData[0];
            tmpSaveData.concentration.core = CoursesToStrings(state.concentrationContainers[0].courses);
            tmpSaveData.concentration.capstone = [...CoursesToStrings(state.concentrationContainers[1].courses), ...CoursesToStrings(state.concentrationContainers[4].courses)];
            tmpSaveData.concentration.conc.general = [...CoursesToStrings(state.concentrationContainers[2].courses), ...CoursesToStrings(state.concentrationContainers[5].courses)];
            tmpSaveData.concentration.lab = CoursesToStrings(state.concentrationContainers[7].courses);
            tmpSaveData.concentration.writing = CoursesToStrings(state.concentrationContainers[3].courses);
            tmpSaveData.concentration.conc.elective = CoursesToStrings(state.concentrationContainers[6].courses);
        });
    }
    case "saveHPC": {
        return produce(state, (draft) => {

            //console.log("Updating HPC Concentration");
            const tmpSaveData = draft.saveData[draft.saveData.findIndex((eachSaveData) => eachSaveData.concentration.name === action.payload.concentration.name)];// found saveData
            tmpSaveData.concentration.core = CoursesToStrings(state.concentrationContainers[0].courses);
            tmpSaveData.concentration.capstone = CoursesToStrings(state.concentrationContainers[1].courses);
            tmpSaveData.concentration.conc.general = CoursesToStrings(state.concentrationContainers[2].courses);
            tmpSaveData.concentration.writing = CoursesToStrings(state.concentrationContainers[3].courses);
            tmpSaveData.concentration.lab = CoursesToStrings(state.concentrationContainers[4].courses);
            tmpSaveData.concentration.conc.stats = CoursesToStrings(state.concentrationContainers[5].courses);
            tmpSaveData.concentration.conc.elective = CoursesToStrings(state.concentrationContainers[6].courses);
            tmpSaveData.concentration.conc.data = CoursesToStrings(state.concentrationContainers[7].courses);
            tmpSaveData.concentration.conc.ochem = [...CoursesToStrings(state.concentrationContainers[8].courses), ...CoursesToStrings(state.concentrationContainers[10].courses)];
            tmpSaveData.concentration.conc.cybersecurity = CoursesToStrings(state.concentrationContainers[9].courses);
        });
    }
    case "updateSaveDataScience": {

        return produce(state, (draft) => {

            const tmpSaveData = draft.saveData[draft.saveData.findIndex((eachSaveData) => eachSaveData.concentration.name === action.payload.concentration.name)];// found saveData
            tmpSaveData.concentration.core = CoursesToStrings(state.concentrationContainers[0].courses);
            tmpSaveData.concentration.capstone = CoursesToStrings(state.concentrationContainers[1].courses);
            tmpSaveData.concentration.conc.general = CoursesToStrings(state.concentrationContainers[2].courses);
            tmpSaveData.concentration.writing = CoursesToStrings(state.concentrationContainers[3].courses);
            tmpSaveData.concentration.lab = CoursesToStrings(state.concentrationContainers[4].courses);
            tmpSaveData.concentration.conc.elective = CoursesToStrings(state.concentrationContainers[5].courses);
            tmpSaveData.concentration.conc.data = CoursesToStrings(state.concentrationContainers[6].courses);
            tmpSaveData.concentration.conc.stats = CoursesToStrings(state.concentrationContainers[7].courses);
        });

    }
    case "saveNetworks": {

        return produce(state, (draft) => {

            const tmpSaveData = draft.saveData[draft.saveData.findIndex((eachSaveData) => eachSaveData.concentration.name === action.payload.concentration.name)];// found saveData
            tmpSaveData.concentration.core = CoursesToStrings(state.concentrationContainers[0].courses);
            tmpSaveData.concentration.capstone = CoursesToStrings(state.concentrationContainers[1].courses);
            tmpSaveData.concentration.conc.general = CoursesToStrings(state.concentrationContainers[2].courses);
            tmpSaveData.concentration.writing = CoursesToStrings(state.concentrationContainers[3].courses);
            tmpSaveData.concentration.conc.stats = CoursesToStrings(state.concentrationContainers[4].courses);
            tmpSaveData.concentration.lab = CoursesToStrings(state.concentrationContainers[5].courses);
            tmpSaveData.concentration.conc.cybersecurity = CoursesToStrings(state.concentrationContainers[6].courses);
            tmpSaveData.concentration.conc.systems = CoursesToStrings(state.concentrationContainers[7].courses);
            tmpSaveData.concentration.conc.elective = CoursesToStrings(state.concentrationContainers[8].courses);
        
        });
    }
    case "updateSaveSecurity": {

        return produce(state, (draft) => {
            const tmpSaveData = draft.saveData[draft.saveData.findIndex((eachSaveData) => eachSaveData.concentration.name === action.payload.concentration.name)];// found saveData
            tmpSaveData.concentration.core = CoursesToStrings(state.concentrationContainers[0].courses);
            tmpSaveData.concentration.capstone = CoursesToStrings(state.concentrationContainers[1].courses);
            tmpSaveData.concentration.conc.general = CoursesToStrings(state.concentrationContainers[2].courses);
            tmpSaveData.concentration.writing = CoursesToStrings(state.concentrationContainers[3].courses);
            tmpSaveData.concentration.conc.stats = CoursesToStrings(state.concentrationContainers[4].courses);
            tmpSaveData.concentration.lab = CoursesToStrings(state.concentrationContainers[5].courses);
            tmpSaveData.concentration.conc.elective = CoursesToStrings(state.concentrationContainers[6].courses);
            tmpSaveData.concentration.conc.cybersecurity = CoursesToStrings(state.concentrationContainers[7].courses);
        });
    }
    case "saveTheory": {

        return produce(state, (draft) => {
            const tmpSaveData = draft.saveData[draft.saveData.findIndex((eachSaveData) => eachSaveData.concentration.name === action.payload.concentration.name)];// found saveData
            //console.log("SAVEDATA = ", tmpSaveData);
            tmpSaveData.concentration.core = CoursesToStrings(state.concentrationContainers[0].courses);
            tmpSaveData.concentration.capstone = CoursesToStrings(state.concentrationContainers[1].courses);
            tmpSaveData.concentration.conc.general = CoursesToStrings(state.concentrationContainers[2].courses);
            tmpSaveData.concentration.writing = CoursesToStrings(state.concentrationContainers[3].courses);
            tmpSaveData.concentration.conc.stats = CoursesToStrings(state.concentrationContainers[4].courses);
            tmpSaveData.concentration.lab = CoursesToStrings(state.concentrationContainers[5].courses);
            tmpSaveData.concentration.conc.track = CoursesToStrings(state.concentrationContainers[6].courses);
            tmpSaveData.concentration.conc.cybersecurity = CoursesToStrings(state.concentrationContainers[7].courses);
        });

    }
    case "updateNumberOfSemesters":{
        //console.log("--- adding semester, state = ", state);
        return produce(state, (draft) => {
            draft.currentSaveData.semesters = [...draft.currentSaveData.semesters, { semesterNum: action.payload.currentSaveData.semesters.length+1, courses: []}];
        });
    }
    case "updateConcentration":{
        //console.log("updating concentration with payload : ", action.payload);
        return produce(state, (draft) => {
            draft.concentration = action.payload.concentration; 
            // update checklist --- concentrationContainers, semesterCourses, concentration
            const saveDataIndex = draft.saveData.findIndex((eachSaveData) => eachSaveData.concentration.name === state.currentSaveData.concentration.name);
            // found where we store previous currentSaveData, so then we can update it
            draft.saveData[saveDataIndex] = state.currentSaveData;
            const newSaveDataIndex = draft.saveData.findIndex((eachSaveData) => eachSaveData.concentration.name === action.payload.concentration.name);
            if (newSaveDataIndex === -1) {
                // saveData is not present, create new one and append onto end
                const tmpSaveData = [...draft.saveData];
                tmpSaveData.push({ concentration: action.payload.concentration, numberOfSemesters: 1, semesters: [{semesterNum: 1, courses: []}]});
                draft.saveData = tmpSaveData;
                draft.currentSaveData = draft.saveData[draft.saveData.length-1];
            } else {
                //console.log("found save data");
                draft.currentSaveData = draft.saveData[newSaveDataIndex];
            }
            // updated saveData and currentSaveData -- cannot update concentrationContainers because that has not been rendered yet <-- if its been saved before, upload it, if not, just leave it
            // update semesterCourses <-- check

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
        //console.log("semesterCourses = ", state.semesterCourses, " and number of semesters = ", state.currentSaveData.numberOfSemesters);
        if ( state.currentSaveData.semesters.length > 0) {
            const temporarySemesterCourse = action.payload.currentSaveData.semesters[action.payload.currentSaveData.semesters.length-1];
            if (temporarySemesterCourse.courses.length > 0) {
                //console.log("indelete if -> if");
                // display error
                return produce(state, (draft) => {
                    draft.toastMessage = `Must remove classes from Semester ${draft.currentSaveData.semesters.length} before deleting`;
                    draft.toastDisplay = true;
                });
            } else if(action.payload.currentSaveData.semesters.length === 1) {
                //console.log("indelete if -> else if");
                return produce(state, (draft) => {
                    draft.toastMessage = "Must have atleast 1 semester present";
                    draft.toastDisplay = true;
                });
            } else {
                return produce(state, (draft) => {
                    //console.log("indelete if -> else");
                    draft.currentSaveData.semesters = draft.currentSaveData.semesters.slice(0,draft.currentSaveData.semesters.length-1);
                });
            }
        } else {
            //console.log("indeleteelse");
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
            //draft.currentSaveData.semesters = draft.currentSaveData.semesters;

        });
    }
    case "SetSemesterCourses": {
        return produce(state, (draft) => {
            draft.currentSaveData = {...draft.currentSaveData, semesters: action.payload.currentSaveData.semesters};
            draft.currentSaveData.semesters = action.payload.currentSaveData.semesters;
            draft.saveData[draft.saveData.findIndex((eachSaveData) => eachSaveData.concentration.name === draft.currentSaveData.concentration.name)].semesters = draft.currentSaveData.semesters;
        });
    }
    case "updateCourse": {

        return produce(state, (draft) => {
            //console.log("in update course with msg = ", action.payload);
            const theSemester: Semester = draft.currentSaveData.semesters[action.payload.sourceContainerIndex];
            const newTextFields = action.payload.toastMessage.split("_"); // [desc, name, title]
            const theClass = { ...theSemester.courses[action.payload.sourceIndex], description: newTextFields[0], name: newTextFields[1], title: newTextFields[2]};
            draft.currentSaveData.semesters[action.payload.sourceContainerIndex].courses[action.payload.sourceIndex] = theClass;
            draft.currentSaveData.semesters[action.payload.sourceContainerIndex].courses[action.payload.sourceIndex] = theClass;
        });
    }

    default:{
        break;
    }
    }
    return {...state};
};