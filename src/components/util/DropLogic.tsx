import React from "react";
import { DropResult } from "react-beautiful-dnd";
import { SemesterType } from "../../interfaces/semester";
import { ConcentrationContainerType } from "../../interfaces/concentrationcontainer";
import { Course as CourseType } from "../../interfaces/course";

export const concentrationToSemester = (
    concContainers: ConcentrationContainerType[],
    concContainer: ConcentrationContainerType,
    spliceInd: number,
    setConcContainers: React.Dispatch<React.SetStateAction<ConcentrationContainerType[]>>,
    semesterCourses: SemesterType[],
    setSemesterCourses: React.Dispatch<React.SetStateAction<SemesterType[]>>,
    ) => {

        const tmpConcentrationCourses = concContainer.courses;
        return -1;

};

export const onDragEndLogic = (result: DropResult,
    concentrationContainers: ConcentrationContainerType[],
    setConcentrationContainers: React.Dispatch<React.SetStateAction<ConcentrationContainerType[]>>,
    semesterCourses: SemesterType[],
    setSemesterCourses: React.Dispatch<React.SetStateAction<SemesterType[]>>,
    displayToast: (msg: string) => void): void => {
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
   if (sourceId === destinationId) {
        // check if both are semester table, if not then conc container
        
    } else {
       // dropId != destinationId
        if (sourceIdSemester) { // semester --> concentration
        } else {
            // concentration --> semester
            const tmpContainer: ConcentrationContainerType[] = [...concentrationContainers];
            const ind1 = tmpContainer.findIndex(elem => elem.name === sourceId);
            ind1 !== -1 ? concentrationToSemester(concentrationContainers, concentrationContainers[ind1], result.source.index, setConcentrationContainers, semesterCourses, setSemesterCourses) : -1;
        }
   }



};
