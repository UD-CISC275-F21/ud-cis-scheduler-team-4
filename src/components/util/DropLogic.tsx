import React from "react";
import { DropResult } from "react-beautiful-dnd";
import { SemesterType } from "../../interfaces/semester";
import { ConcentrationContainerType } from "../../interfaces/concentrationcontainer";
import { Course as CourseType } from "../../interfaces/course";

export const concentrationToSemester = (
    result: DropResult,
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

export const semesterToConcentration = (
    result: DropResult,
    concContainers: ConcentrationContainerType[],
    concContainer: ConcentrationContainerType,
    spliceInd: number,
    setConcContainers: React.Dispatch<React.SetStateAction<ConcentrationContainerType[]>>,
    semesterCourses: SemesterType[],
    setSemesterCourses: React.Dispatch<React.SetStateAction<SemesterType[]>>,
    semesterNum: number,
    semester: SemesterType,
    ) => {
        console.log("doing semester to concentration");

};

export const concentrationToConcentration = (
    result: DropResult,
    concContainers: ConcentrationContainerType[],
    concContainer: ConcentrationContainerType,
    spliceInd: number,
    courseSpliceInd: number,
    dropInd: number,
    setConcContainers: React.Dispatch<React.SetStateAction<ConcentrationContainerType[]>>,
    isDifferent: boolean,
    ) => {
        const ind2 = (isDifferent) ? concContainers.findIndex(elem => elem.name === result.destination?.droppableId) : -1;
        if (ind2 === -1) { /* Case if we are dropping within the same _exact_ container such as core --> core */
            const tmpConcContainerCourse = concContainer.courses.splice(courseSpliceInd, 1)[0];
            concContainer.courses.splice(dropInd, 0, tmpConcContainerCourse);
            concContainer.setCourses([...concContainer.courses]);
            concContainers.splice(spliceInd, 0, concContainer);
            setConcContainers(concContainers);
        } else if (ind2 !== -1) { /* Case if we are dropping within the concentration containers, but different containers, such as core --> elective */
            const diffContainer = concContainers.splice(ind2, 1)[0];
            const tmpConcContainerCourseDrag = concContainer.courses.splice(courseSpliceInd, 1)[0];
            concContainer.setCourses([...concContainer.courses]); // update courses we just spliced from
            diffContainer.courses.splice(dropInd, 0, tmpConcContainerCourseDrag);
            diffContainer.setCourses([...diffContainer.courses]);
        }
        return 1;
};

export const semesterToSemester = (
    result: DropResult,
    concContainers: ConcentrationContainerType[],
    concContainer: ConcentrationContainerType,
    spliceInd: number,
    setConcContainers: React.Dispatch<React.SetStateAction<ConcentrationContainerType[]>>,
    semesterCourses: SemesterType[],
    setSemesterCourses: React.Dispatch<React.SetStateAction<SemesterType[]>>,
    ) => {
        console.log("semester to semester");
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
   const sourceIndex = result.source.index;
   const dropIndex = result.destination.index;
   if (sourceId === destinationId) {
        // check if both are semester table, if not then conc container
        if(sourceIdSemester){
            // semestertable --> semestertable
        } else{
            // concentration --> concentration
            const tmpContainer: ConcentrationContainerType[] = [...concentrationContainers];
            let ind1 = tmpContainer.findIndex(elem => elem.name === destinationId);
            ind1 = (sourceId === destinationId) ? concentrationToConcentration(result, concentrationContainers, concentrationContainers.splice(ind1, 1)[0], ind1, sourceIndex, dropIndex, setConcentrationContainers, false) :
            concentrationToConcentration(result, concentrationContainers, concentrationContainers.splice(ind1,1)[0], ind1, sourceIndex, dropIndex, setConcentrationContainers, true);
        }
    } else {
       // dropId != destinationId
        if (sourceIdSemester) { // semester --> concentration
            const semesterNum = parseInt(sourceId.substring(sourceId.lastIndexOf("-")));
            const ind1 = semesterCourses.findIndex(elem => elem.semesternum === semesterNum);
            const ind2 = concentrationContainers.findIndex(elem => elem.name === destinationId);
            semesterToConcentration(result, concentrationContainers, concentrationContainers.splice(ind2,1)[0], ind2, setConcentrationContainers, semesterCourses, setSemesterCourses, semesterNum, semesterCourses.splice(ind1,1)[0]);
        } else {
            // concentration --> semester
            const tmpContainer: ConcentrationContainerType[] = [...concentrationContainers];
            let ind1 = tmpContainer.findIndex(elem => elem.name === sourceId);
            ind1 = (ind1 !== -1) ? concentrationToSemester(result, concentrationContainers, concentrationContainers[ind1], result.source.index, setConcentrationContainers, semesterCourses, setSemesterCourses) : -1;
        }
    }



};
