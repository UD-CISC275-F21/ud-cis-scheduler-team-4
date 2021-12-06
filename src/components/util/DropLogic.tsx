import React from "react";
import { DropResult } from "react-beautiful-dnd";
import { Semester } from "../../interfaces/semester";
import { ConcentrationContainerType } from "../../interfaces/concentrationcontainer";
import { concentrationToConcentration } from "./DNDLogicV2/concentrationToConcentration";
import { semesterToConcentration } from "./DNDLogic/semesterToConcentration";
import { concentrationToSemester } from "./DNDLogic/concentrationToSemester";
import { PreReqChecker } from "./DNDLogic/prereqchecker";
import { RevPreReqChecker } from "./DNDLogic/revprereqchecker";
import { State } from "../MainPage";
import { SchedulerAction } from "../MainPage";
import { concentrationToSemesterV2 } from "./DNDLogicV2/concentrationToSemester";
import { ConcentrationContainerInfo } from "./howto/howtosteps/howtoconcentrationcontainer";
import { semesterToSemester } from "./DNDLogicV2/semesterToSemester";
import { DropLogicExecutor } from "./DNDLogicV2/DropLogicExecutor";

export const successPrint = (result: number): void => {
    console.log(result >= 1 ? "Success!" : "Failure");
};

export const onDragEndLogic = (
    result: DropResult,
    state: State,
    dispatch: React.Dispatch<SchedulerAction>,
    concentrationContainers: ConcentrationContainerType[],
    semesters: Semester[],
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
            console.log("Executing DropLogic if->if");
            const semesterNum1 = parseInt(sourceId.substring(sourceId.lastIndexOf("-") + 1), 10);
            DropLogicExecutor(state,dispatch,"semesterToSemester",semesterNum1-1,semesterNum1-1,result.source.index,result.destination.index);
        } else {
            // concentration --> concentration
            console.log("Executing DropLogic if->else");
            const concentrationNumber1 = concentrationContainers.findIndex((eachConcentrationContainer) => eachConcentrationContainer.name === destinationId);
            DropLogicExecutor(state, dispatch, "concentrationToConcentration", concentrationNumber1, concentrationNumber1, sourceIndex, dropIndex);
        }
    } else if (sourceIdSemester) {
        if (destIdSemester) {
            // semester --> different semester
            console.log("Executing DropLogic elseif1->if");
            const semester1Num = parseInt(sourceId.substring(sourceId.lastIndexOf("-") + 1), 10);
            const semester2Num = destIdSemester ? parseInt(destinationId.substring(destinationId.lastIndexOf("-") + 1), 10) : -1;
            const ind1 = semesters.findIndex(elem => elem.semesternum === semester1Num);
            const ind2 = semesters.findIndex(elem => elem.semesternum === semester2Num);
            DropLogicExecutor(state, dispatch, "semesterToSemester", ind1, ind2, result.source.index, result.destination.index);
        } else {
            console.log("Executing DropLogic elseif1->else");
            // semester --> concentration
        }
    } else if (destIdSemester) {
        // concentration --> semester
        console.log("Executing DropLogic elseif2");
        const semesterNum = parseInt(destinationId.substring(destinationId.lastIndexOf("-") + 1), 10);
        const concentrationContainerIndex = state.concentrationContainers.findIndex((eachContainer) => eachContainer.name === sourceId);
        const semesterCoursesIndex = state.semesterCourses.findIndex((eachSemester) => eachSemester.semesternum === semesterNum);
        DropLogicExecutor(state, dispatch, "concentrationToSemester", concentrationContainerIndex, semesterCoursesIndex, sourceIndex, dropIndex);
    } else {
        console.log("Executing DropLogic else");
        // concentration --> semester
        const concentrationNumberDest = concentrationContainers.findIndex((eachConcentrationContainer) => eachConcentrationContainer.name === destinationId);
        const concentrationNumberSource = concentrationContainers.findIndex((eachConcentrationContainer) => eachConcentrationContainer.name === sourceId);
        DropLogicExecutor(state, dispatch, "concentrationToConcentration", concentrationNumberSource, concentrationNumberDest, sourceIndex, dropIndex);
    }
    
};
