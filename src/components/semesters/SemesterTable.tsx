import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Semester as SemesterComponent } from "./Semester";
import { Semester as SemesterType } from "../../interfaces/semester";
import { SavedProgress } from "../../interfaces/savedprogress";
import { Concentration } from "../../interfaces/concentration";
import { UseDispatchContext, UseStateContext } from "../MainPage";

/*

    @param - props - object that contains a key of id(number)
    @return JSX.Element

*/

export const SemesterTable = (): JSX.Element => {
        
    const { state } = UseStateContext();
    const { dispatch } = UseDispatchContext();
    return(
        <>
            {
                state.currentSaveData.numberOfSemesters > 0 ?
                    new Array(state.currentSaveData.numberOfSemesters).fill(0)
                        .map((elem, ind) =>
                            <SemesterComponent
                                ind={ind}
                                key={`semester-table-key-${ind}`}
                                semesterCourse={state.currentSaveData.semesters[ind]}
                                updateSemesterCourses={
                                    (newSemester: SemesterType) => {
                                        dispatch({type: "updateSemesterCourses", payload: { ...state, semesterCourses: [...state.semesterCourses, newSemester ]}});
                                    }
                                }
                            />
                        )
                    :
                    <div>
                No semesters available
                    </div>
            }
        </>
    );
};
