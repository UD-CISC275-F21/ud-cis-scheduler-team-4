import "bootswatch/dist/lux/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { SemesterType } from "../../../interfaces/semester";

export const DeleteOneSemester = (
    deleteTriggered: number,
    semester: SemesterType | undefined,
    semesters: number,
    semesterCourses: SemesterType[],
    setSemesterCourses: React.Dispatch<React.SetStateAction<SemesterType[]>>,
    setSemesters: React.Dispatch<React.SetStateAction<number>>,
    displayToast: (msg: string) => void,
    setDeleteTriggered: React.Dispatch<React.SetStateAction<number>>,
): void => {

    if (deleteTriggered === 0) {
        const theSemester: SemesterType | undefined = semesterCourses.length > 0 ? semesterCourses[semesters - 1] : undefined;
        if (theSemester !== undefined && theSemester.courses.length === 0) {
            theSemester.courseSetter([]);
            setSemesterCourses([...semesterCourses.slice(0, semesters - 1)]);
            setSemesters(semesters - 1);
        } else {
            console.log("displaying err");
            displayToast(`Move all courses from Semester ${semesters} back into course list on the left`);
        }
        setDeleteTriggered(-1);
    }

};
