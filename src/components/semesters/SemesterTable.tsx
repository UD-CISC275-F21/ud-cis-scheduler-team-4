import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Course as CourseType } from "../../interfaces/course";
import { Semester } from "./Semester";
import { SemesterType } from "../../interfaces/semester";

/*

    @param - props - object that contains a key of id(number)
    @return JSX.Element

*/

export const SemesterTable = (props: { semesters: number, semestersCourses: SemesterType[], setSemesterCourses: React.Dispatch<React.SetStateAction<SemesterType[]>> }): JSX.Element => {

    return(
        <>
            {
                new Array(props.semesters).fill(0).map((elem, ind) =>
                    <Semester ind={ind} key={`semester-table-key-${ind}`} semesterCourses={props.semestersCourses} setSemesterCourses={props.setSemesterCourses} />
                )
            }
        </>
    );
};
