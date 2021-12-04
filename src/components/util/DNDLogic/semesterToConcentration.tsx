import React from "react";
import { Semester } from "../../../interfaces/semester";
import { ConcentrationContainerType } from "../../../interfaces/concentrationcontainer";
import { Course as CourseType } from "../../../interfaces/course";
import { UpdateSemester } from "./UpdateSemester";

export const semesterToConcentration = (
    concContainers: ConcentrationContainerType[],
    concentrationInd: number,
    courseSpliceInd: number,
    setConcContainers: (newConcentrationContainers: ConcentrationContainerType[]) => void,
    semesterCourses: Semester[],
    DNDUpdateSemester: (semesters: Semester[]) => void,
    semesterInd: number,
    courseDropInd: number,
): number => {
    console.log("in semester ---> concentration");
    const theCourse: CourseType = semesterCourses[semesterInd].courses.splice(courseSpliceInd, 1)[0];
    semesterCourses[semesterInd].courses = [...semesterCourses[semesterInd].courses];/* may be able to delete this line*/
    semesterCourses[semesterInd].courseSetter([...semesterCourses[semesterInd].courses]);/* may be able to delete this line*/
    UpdateSemester(semesterCourses[semesterInd], semesterCourses, DNDUpdateSemester);
    concContainers[concentrationInd].courses.splice(courseDropInd, 0, theCourse);
    concContainers[concentrationInd].courses = [...concContainers[concentrationInd].courses];/* may be able to delete this line */
    // DEBUG concContainers[concentrationInd].setCourses([...concContainers[concentrationInd].courses]);/* may be able to delete this line */
    setConcContainers([...concContainers]);
    return 1;
};
