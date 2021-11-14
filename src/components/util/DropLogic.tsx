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
    dropInd: number,
    setConcContainers: React.Dispatch<React.SetStateAction<ConcentrationContainerType[]>>,
    semesterCourses: SemesterType[],
    droppingSemester: SemesterType,
    ) => {
        const theCourse: CourseType = concContainer.courses.splice(spliceInd, 1)[0];
        concContainer.setCourses([...concContainer.courses]); /*  Optional line - may be able to remove  */
        droppingSemester.courses.splice(dropInd, 0, theCourse);
        droppingSemester.courseSetter([...droppingSemester.courses]); /* Optional line - may be able to remove */
        return 1;
};

export const semesterToConcentration = (
    concContainers: ConcentrationContainerType[],
    concentrationInd: number,
    courseSpliceInd: number,
    setConcContainers: React.Dispatch<React.SetStateAction<ConcentrationContainerType[]>>,
    semesterCourses: SemesterType[],
    setSemesterCourses: React.Dispatch<React.SetStateAction<SemesterType[]>>,
    semesterNum: number,
    semesterInd: number,
    courseDropInd: number,
    ) => {
        console.log("doing semester to concentration");
        const theCourse: CourseType = semesterCourses[semesterInd].courses.splice(courseSpliceInd, 1)[0];
        semesterCourses[semesterInd].courses = [...semesterCourses[semesterInd].courses];/* may be able to delete this line*/
        semesterCourses[semesterInd].courseSetter([...semesterCourses[semesterInd].courses]);/* may be able to delete this line*/
        setSemesterCourses([...semesterCourses]);
        concContainers[concentrationInd].courses.splice(courseDropInd, 0, theCourse);
        concContainers[concentrationInd].courses = [...concContainers[concentrationInd].courses];/* may be able to delete this line */
        concContainers[concentrationInd].setCourses([...concContainers[concentrationInd].courses]);/* may be able to delete this line */
        setConcContainers([...concContainers]);
        return 1;

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
            concContainer.setCourses([...concContainer.courses]);/* may be able to delete this line */
            concContainers.splice(spliceInd, 0, concContainer);/* may not have to deal with splicing, and direct reference the index like above with the implementation of semester --> concentration */
            setConcContainers(concContainers);
        } else if (ind2 !== -1) { /* Case if we are dropping within the concentration containers, but different containers, such as core --> elective */
            const diffContainer = concContainers[ind2];
            const tmpConcContainerCourseDrag = concContainer.courses.splice(courseSpliceInd, 1)[0];
            concContainer.setCourses([...concContainer.courses]);// update courses we just spliced from
            diffContainer.courses.splice(dropInd, 0, tmpConcContainerCourseDrag);
            diffContainer.setCourses([...diffContainer.courses]);
        }
        return 1;
};

export const semesterToSemester = (
    result: DropResult,
    semester: SemesterType,
    semester2: SemesterType,
    spliceInd: number,
    dropInd: number,
    semesterCourses: SemesterType[],
    setSemesterCourses: React.Dispatch<React.SetStateAction<SemesterType[]>>,
    diffSemester: boolean,
    ) => {
        if (diffSemester) {
            const splicedCourse = semester.courses.splice(spliceInd, 1)[0];
            semester2.courses.splice(dropInd, 0, splicedCourse);
            semester.courseSetter([...semester.courses]);
            semester2.courseSetter([...semester2.courses]);
        } else {
            console.log("semester to semester");
            const splicedCourse = semester.courses.splice(spliceInd, 1)[0];
            semester.courses.splice(dropInd, 0, splicedCourse);
            semester.courseSetter([...semester.courses]);
        }
        return 1;
};

export const successPrint = (result: number): void => {
    console.log(result === 1 ? "Success!" : "Failure");
};

export const onDragEndLogic = (result: DropResult,
    concentrationContainers: ConcentrationContainerType[],
    setConcentrationContainers: React.Dispatch<React.SetStateAction<ConcentrationContainerType[]>>,
    semesterCourses: SemesterType[],
    setSemesterCourses: React.Dispatch<React.SetStateAction<SemesterType[]>>): void => {
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
            semesterToSemester(result, semesterCourses[ind1], semesterCourses[ind1], result.source.index, result.destination.index, semesterCourses, setSemesterCourses, false);
        } else {
            // concentration --> concentration
            const tmpContainer: ConcentrationContainerType[] = [...concentrationContainers];
            let ind1 = tmpContainer.findIndex(elem => elem.name === destinationId);
            ind1 = (sourceId === destinationId) ? concentrationToConcentration(result, concentrationContainers, concentrationContainers.splice(ind1, 1)[0], ind1, sourceIndex, dropIndex, setConcentrationContainers, false) :
            concentrationToConcentration(result, concentrationContainers, concentrationContainers.splice(ind1, 1)[0], ind1, sourceIndex, dropIndex, setConcentrationContainers, true);
            successPrint(ind1);
        }
    } else if (sourceIdSemester) { // semester --> concentration
       // dropId != destinationId
            const semesterNum = parseInt(sourceId.substring(sourceId.lastIndexOf("-") + 1), 10);
            const ind1 = semesterCourses.findIndex(elem => elem.semesternum === semesterNum);
            let ind2 = (destIdSemester) ? parseInt(destinationId.substring(destinationId.lastIndexOf("-") + 1), 10) : concentrationContainers.findIndex(elem => elem.name === destinationId);
            ind2 = (destIdSemester) ? semesterToSemester(result, semesterCourses[ind1], semesterCourses[ind2], sourceIndex, dropIndex, semesterCourses, setSemesterCourses, true) : semesterToConcentration(concentrationContainers, ind2, result.source.index, setConcentrationContainers, semesterCourses, setSemesterCourses, semesterNum, ind1, result.destination.index);
            successPrint(ind2);
    } else {
            // concentration --> semester
            const semesterNum = parseInt(destinationId.substring(destinationId.lastIndexOf("-") + 1), 10);
            const tmpContainer: ConcentrationContainerType[] = [...concentrationContainers];
            let ind1 = tmpContainer.findIndex(elem => elem.name === sourceId);
            const ind2 = semesterCourses.findIndex(elem => elem.semesternum === semesterNum);
            ind1 = (ind1 > -1) ? concentrationToSemester(result, concentrationContainers, concentrationContainers[ind1], result.source.index, result.destination.index, setConcentrationContainers, semesterCourses, semesterCourses[ind2]) : -1;
            successPrint(ind1);
    }
};
