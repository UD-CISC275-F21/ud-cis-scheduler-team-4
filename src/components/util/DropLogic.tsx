import React from "react";
import { DropResult } from "react-beautiful-dnd";
import { SemesterType } from "../../interfaces/semester";
import { ConcentrationContainerType } from "../../interfaces/concentrationcontainer";
import { semesterToSemester } from "./DNDLogic/semesterToSemester";
import { semesterToConcentration } from "./DNDLogic/semesterToConcentration";
import { concentrationToConcentration } from "./DNDLogic/concentrationToConcentration";
import { concentrationToSemester } from "./DNDLogic/concentrationToSemester";
import { PreReqChecker } from "./DNDLogic/prereqchecker";

export const successPrint = (result: number): void => {
    console.log(result >= 1 ? "Success!" : "Failure");
};

export const onDragEndLogic = (result: DropResult,
    concentrationContainers: ConcentrationContainerType[],
    setConcentrationContainers: React.Dispatch<React.SetStateAction<ConcentrationContainerType[]>>,
    semesterCourses: SemesterType[],
    setSemesterCourses: React.Dispatch<React.SetStateAction<SemesterType[]>>,
    setErrMsg: (msg: string) => void,
): void => {
    if (!result.destination) {
        return;
    }
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
            const ind1 = semesterCourses.findIndex(elem => elem.semesternum === semesterNum1);
            semesterToSemester(
                semesterCourses[ind1],
                semesterCourses[ind1],
                result.source.index,
                result.destination.index,
                false);
        } else {
            // concentration --> concentration
            const tmpContainer: ConcentrationContainerType[] = [...concentrationContainers];
            let ind1 = tmpContainer.findIndex(elem => elem.name === destinationId);
            ind1 = sourceId === destinationId ?
                concentrationToConcentration(result,
                    concentrationContainers,
                    concentrationContainers.splice(ind1, 1)[0],
                    ind1, sourceIndex, dropIndex, setConcentrationContainers, false) :
                concentrationToConcentration(result,
                    concentrationContainers,
                    concentrationContainers.splice(ind1, 1)[0],
                    ind1, sourceIndex, dropIndex, setConcentrationContainers, true);
            successPrint(ind1);
        }
    } else if (sourceIdSemester) { // semester --> concentration
    // dropId != destinationId
        const semesterNum = parseInt(sourceId.substring(sourceId.lastIndexOf("-") + 1), 10);
        const ind1 = semesterCourses.findIndex(elem => elem.semesternum === semesterNum);
        let ind2 = destIdSemester ?
            semesterCourses.findIndex(elem =>
                elem.semesternum === parseInt(destinationId.substring(destinationId.lastIndexOf("-") + 1), 10))
            :
            concentrationContainers.findIndex(elem =>
                elem.name === destinationId);
        ind2 = destIdSemester ?
            semesterToSemester(
                semesterCourses[ind1],
                semesterCourses[ind2],
                sourceIndex, dropIndex, true) :
            semesterToConcentration(concentrationContainers,
                ind2,
                result.source.index,
                setConcentrationContainers,
                semesterCourses, setSemesterCourses, ind1, result.destination.index);
        successPrint(ind2);
    } else {
        // place prereq checker here
        // concentration --> semester
        const semesterNum = parseInt(destinationId.substring(destinationId.lastIndexOf("-") + 1), 10);
        const tmpContainer: ConcentrationContainerType[] = [...concentrationContainers];
        //console.log(Object.values(tmpContainer), "sourceId =", sourceId);
        let ind1 = tmpContainer.findIndex(elem => elem.name === sourceId);
        const ind2 = semesterCourses.findIndex(elem => elem.semesternum === semesterNum);
        if (PreReqChecker(
            semesterCourses,
            semesterNum - 1,
            concentrationContainers[ind1].courses[result.source.index],
            setErrMsg)) {
            ind1 = ind1 > -1 ?
                concentrationToSemester(
                    concentrationContainers[ind1],
                    result.source.index,
                    result.destination.index,
                    semesterCourses[ind2],
                ) : -1;
            //console.log(Object.values(semesterCourses));
        }
        successPrint(ind1 > -1 ? 1 : 0);
    }
};
