import React from "react";
import { DropResult } from "react-beautiful-dnd";
import { Semester } from "../../interfaces/semester";
import { ConcentrationContainerType } from "../../interfaces/concentrationcontainer";
import { PreReqChecker } from "./DNDLogicV2/prereqchecker";
import { RevPreReqChecker } from "./DNDLogicV2/revprereqchecker";
import { State } from "../../interfaces/State";
import { SchedulerAction } from "../../interfaces/SchedulerAction";
import { DropLogicExecutor } from "./DNDLogicV2/DropLogicExecutor";

// TODO: Implement PreReq Checker

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
            const preReqCheckerResult = PreReqChecker(semesters, ind2, semesters[ind1].courses[sourceIndex], state, dispatch) && RevPreReqChecker(semesters, ind2, semesters[ind1].courses[sourceIndex], state, dispatch);
            if (preReqCheckerResult) {
                DropLogicExecutor(state, dispatch, "semesterToSemester", ind1, ind2, result.source.index, result.destination.index);
            }
        } else {
            console.log("Executing DropLogic elseif1->else");
            // semester --> concentration
            const semester1Num = parseInt(sourceId.substring(sourceId.lastIndexOf("-") + 1), 10);
            const ind1 = semesters.findIndex((eachSemester) => eachSemester.semesternum === semester1Num);
            const ind2 = concentrationContainers.findIndex((eachConcentrationContainer) => eachConcentrationContainer.name === destinationId);
            DropLogicExecutor(state, dispatch, "semesterToConcentration", ind1, ind2, sourceIndex, dropIndex);
        }
    } else if (destIdSemester) {
        // concentration --> semester
        console.log("Executing DropLogic elseif2");
        const semesterNum = parseInt(destinationId.substring(destinationId.lastIndexOf("-") + 1), 10);
        const concentrationContainerIndex = state.concentrationContainers.findIndex((eachContainer) => eachContainer.name === sourceId);
        const semesterCoursesIndex = state.semesterCourses.findIndex((eachSemester) => eachSemester.semesternum === semesterNum);
        const PreReqResult = PreReqChecker(semesters, semesterCoursesIndex, concentrationContainers[concentrationContainerIndex].courses[sourceIndex], state, dispatch);
        if (PreReqResult) {
            DropLogicExecutor(state, dispatch, "concentrationToSemester", concentrationContainerIndex, semesterCoursesIndex, sourceIndex, dropIndex);
        }
    } else {
        console.log("Executing DropLogic else");
        // concentration --> semester
        const concentrationNumberDest = concentrationContainers.findIndex((eachConcentrationContainer) => eachConcentrationContainer.name === destinationId);
        const concentrationNumberSource = concentrationContainers.findIndex((eachConcentrationContainer) => eachConcentrationContainer.name === sourceId);
        DropLogicExecutor(state, dispatch, "concentrationToConcentration", concentrationNumberSource, concentrationNumberDest, sourceIndex, dropIndex);
    }
    
};
