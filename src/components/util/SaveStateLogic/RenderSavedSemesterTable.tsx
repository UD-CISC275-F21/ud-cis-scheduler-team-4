import { SemesterTable } from "../../semesters/SemesterTable";
import { SemesterType } from "../../../interfaces/semester";
import { SaveState } from "../../../interfaces/savestate";
import { Concentration } from "../../../interfaces/concentration";
import React from "react";

export const SavedSemesterTable = (
    semesters: number | undefined,
    semesterCourses: SemesterType[] | undefined,
    setSemesterCourses: React.Dispatch<React.SetStateAction<SemesterType[]>>,
    concentration: Concentration
): JSX.Element => {

    console.log("RENDERING SAVED SEMESTER TABLE");
    if (semesters !== undefined && semesterCourses !== undefined) {
        return(

            <SemesterTable
                semesters={semesters}
                semestersCourses={semesterCourses}
                setSemesterCourses={setSemesterCourses}
                conc={concentration}
            />

        );
    } else {
        return(
            <>
            </>
        );
    }


};
