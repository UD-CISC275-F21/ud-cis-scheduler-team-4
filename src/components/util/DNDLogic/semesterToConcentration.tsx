import React from "react";
import { Semester } from "../../../interfaces/semester";
import { ConcentrationContainerType } from "../../../interfaces/concentrationcontainer";
import { Course as CourseType } from "../../../interfaces/course";

export const semesterToConcentration = (
    concContainers: ConcentrationContainerType[],
    concentrationInd: number,
    courseSpliceInd: number,
    setConcContainers: React.Dispatch<React.SetStateAction<ConcentrationContainerType[]>>,
    semesterCourses: Semester[],
    setSemesterCourses: React.Dispatch<React.SetStateAction<Semester[]>>,
    semesterInd: number,
    courseDropInd: number,
): number => {
    console.log("in semester ---> concentration");
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
