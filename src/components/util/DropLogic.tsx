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
    if (sourceId === destinationId) {
        // check if both are semester table, if not then conc container
        if (sourceIdSemester) {
            // semestertable --> semestertable
            const semesterNum1 = parseInt(sourceId.substring(sourceId.lastIndexOf("-") + 1), 10);
            const ind1 = state.semesterCourses.findIndex(elem => elem.semesternum === semesterNum1);
            semesterToSemester(
                state.semesterCourses[ind1],
                state.semesterCourses[ind1],
                result.source.index,
                result.destination.index,
                false,
                state);
        } else {
            // concentration --> concentration
            const tmpContainer: ConcentrationContainerType[] = [...state.concentrationContainers];
            let ind1 = tmpContainer.findIndex(elem => elem.name === destinationId);
            ind1 = sourceId === destinationId ?
                concentrationToConcentration(result,
                    state.concentrationContainers,
                    state.concentrationContainers.splice(ind1, 1)[0],
                    ind1, sourceIndex, dropIndex, dispatch, false, state) :
                concentrationToConcentration(result,
                    state.concentrationContainers,
                    state.concentrationContainers.splice(ind1, 1)[0],
                    ind1, sourceIndex, dropIndex, dispatch, true, state);
            successPrint(ind1);
        }
    } else if (sourceIdSemester) {
        // semester --> concentration
        const semesterNum = parseInt(sourceId.substring(sourceId.lastIndexOf("-") + 1), 10);
        const semester2Num = destIdSemester ? parseInt(destinationId.substring(destinationId.lastIndexOf("-") + 1), 10) : -1;
        const ind1 = state.semesterCourses.findIndex(elem => elem.semesternum === semesterNum);
        let ind2 = destIdSemester ?
            state.semesterCourses.findIndex(elem =>
                elem.semesternum === semester2Num)
            :
            state.concentrationContainers.findIndex(elem =>
                elem.name === destinationId);
        const preReqResult = destIdSemester ?
            PreReqChecker(
                state.semesterCourses,
                semester2Num - 1,
                state.semesterCourses[ind1].courses[sourceIndex],
                dispatch,
            ) && RevPreReqChecker(
                state.semesterCourses,
                semester2Num - 1,
                state.semesterCourses[ind1].courses[sourceIndex],
                dispatch,
            )
            :
            true;
        console.log("prereqResult = ",preReqResult);
        if ((destIdSemester || sourceIdSemester) && !preReqResult) {
            return;
        }
        ind2 = destIdSemester ?
            semesterToSemester(
                state.semesterCourses[ind1],
                state.semesterCourses[ind2],
                sourceIndex, dropIndex, true) :
            semesterToConcentration(
                state.concentrationContainers,
                ind2,
                result.source.index,
                dispatch,
                state.semesterCourses, dispatch, ind1, result.destination.index);
        successPrint(ind2);
    } else {
        // concentration --> semester
        //console.log("destination = ", destinationId, " and semesterCourses = ", semesterCourses);
        const semesterNum = parseInt(destinationId.substring(destinationId.lastIndexOf("-") + 1), 10);
        const tmpContainer: ConcentrationContainerType[] = [...state.concentrationContainers];
        let ind1 = tmpContainer.findIndex(elem => elem.name === sourceId);
        const ind2 = state.semesterCourses.findIndex(elem => elem.semesternum === semesterNum);
        if (PreReqChecker(
            state.semesterCourses,
            semesterNum - 1,
            state.concentrationContainers[ind1].courses[result.source.index],
            dispatch)) {
            ind1 = ind1 > -1 ?
                concentrationToSemester(
                    state.concentrationContainers[ind1],
                    result.source.index,
                    result.destination.index,
                    state.semesterCourses[ind2],
                    dispatch,
                ) : -1;
        }
        successPrint(ind1 > -1 ? 1 : 0);
    }
};
