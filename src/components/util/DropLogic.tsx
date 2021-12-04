import React from "react";
import { DropResult } from "react-beautiful-dnd";
import { Semester } from "../../interfaces/semester";
import { ConcentrationContainerType } from "../../interfaces/concentrationcontainer";
import { semesterToSemester } from "./DNDLogic/semesterToSemester";
import { semesterToConcentration } from "./DNDLogic/semesterToConcentration";
import { concentrationToConcentration } from "./DNDLogic/concentrationToConcentration";
import { concentrationToSemester } from "./DNDLogic/concentrationToSemester";
import { PreReqChecker } from "./DNDLogic/prereqchecker";
import { RevPreReqChecker } from "./DNDLogic/revprereqchecker";
import { State } from "../MainPage";
import { SchedulerAction } from "../MainPage";
import { concentrationToSemesterV2 } from "./DNDLogicV2/concentrationToSemester";
import { ConcentrationContainerInfo } from "./howto/howtosteps/howtoconcentrationcontainer";

export const successPrint = (result: number): void => {
    console.log(result >= 1 ? "Success!" : "Failure");
};

export const onDragEndLogic = (
    result: DropResult,
    state: State,
    dispatch: React.Dispatch<SchedulerAction>,
): void => {
    if (!result.destination) {
        return;
    }
    //console.log("IN DROPLOGIC, semesterCourses = ", semesterCourses);
    /*
    If where you are dropping TO is a semester
    */
    const sourceId = result.source.droppableId;
    const destinationId = result.destination.droppableId;
    const sourceIdSemester = sourceId.includes("semester-table");
    const destIdSemester = destinationId.includes("semester-table");
    const sourceIndex = result.source.index;
    const dropIndex = result.destination.index;
    if(sourceId === destinationId) {

        if (sourceIdSemester) {
            // semester --> same semesters
        } else {
            // concentration --> concentration
        }

    } else if (sourceIdSemester) {
        if (destIdSemester) {
            // semester --> different semester
        } else {
            // semester --> concentration
        }
    } else {
        // concentration --> semester
        const semesterNum = parseInt(destinationId.substring(destinationId.lastIndexOf("-") + 1), 10);
        // idOfSemester
        const concentrationContainerInd = state.concentrationContainers.findIndex((eachContainer) => eachContainer.name === sourceId);
        // found container
        const semesterCoursesIndex = state.semesterCourses.findIndex((eachSemester) => eachSemester.semesternum === semesterNum);
        concentrationToSemesterV2(result.source.index, result.destination.index, concentrationContainerInd, semesterCoursesIndex, dispatch, state);
    }
    
};
