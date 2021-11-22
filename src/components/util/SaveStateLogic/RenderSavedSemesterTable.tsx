import { SemesterTable } from "../../semesters/SemesterTable";
import { SemesterType } from "../../../interfaces/semester";
import { SaveState } from "../../../interfaces/savestate";
import { Concentration } from "../../../interfaces/concentration";
import React from "react";

export const SavedSemesterTable = (
    semesters: number,
    semesterCourses: SemesterType[],
    setSemesterCourses: React.Dispatch<React.SetStateAction<SemesterType[]>>,
    getSavedProgress: (concName: string) => SaveState,
    concentration: Concentration
): JSX.Element => {

    return(

        <SemesterTable
            semesters={semesters}
            semestersCourses={semesterCourses}
            setSemesterCourses={setSemesterCourses}
            getSavedProgress={getSavedProgress}
            conc={concentration}
        />

    );


};
