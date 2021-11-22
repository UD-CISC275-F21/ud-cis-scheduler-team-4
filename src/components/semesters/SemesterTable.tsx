import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Semester } from "./Semester";
import { SemesterType } from "../../interfaces/semester";
import { SaveState } from "../../interfaces/savestate";
import { Concentration } from "../../interfaces/concentration";

/*

    @param - props - object that contains a key of id(number)
    @return JSX.Element

*/

export const SemesterTable = (props: { semesters: number;
        semestersCourses: SemesterType[];
        setSemesterCourses: React.Dispatch<React.SetStateAction<SemesterType[]>>;
        getSavedProgress: (concName: string) => SaveState | undefined;
        conc: Concentration;
    }): JSX.Element => {
    
    useEffect(() => {
        // rendering semester table
        console.log("rendering semester table");
        return () => {
            props.setSemesterCourses([]);
        };
    },[]);
    return(
        <div>
            {
                new Array(props.semesters).fill(0)
                    .map((elem, ind) => <Semester ind={ind} getSavedProgress={props.getSavedProgress} currConcentration={props.conc} key={`semester-table-key-${ind}`} semesterCourses={props.semestersCourses} setSemesterCourses={props.setSemesterCourses} />)
            }
        </div>
    );
    
};
