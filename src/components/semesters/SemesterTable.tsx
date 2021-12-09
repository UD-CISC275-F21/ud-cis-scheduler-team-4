import React from "react";
import { Semester as SemesterComponent } from "./Semester";
import { Semester } from "../../interfaces/semester";
import { UseDispatchContext } from "../util/DispatchLogic/UseDispatchContext";
import { UseStateContext } from "../util/DispatchLogic/UseStateContext";

/*

    @param - props - object that contains a key of id(number)
    @return JSX.Element

*/

export const SemesterTable = (): JSX.Element => {
        
    const { state } = UseStateContext();
    const { dispatch } = UseDispatchContext();
    console.log("IN SEMESTER TABLE --- state = ", state);
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
                                    (newSemester: Semester) => {
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
