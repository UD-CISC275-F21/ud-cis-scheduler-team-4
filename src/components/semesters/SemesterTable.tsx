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
    console.log("IN SEMESTER TABLE --- state = ", state);
    return(
        <>
            {
                state.currentSaveData.semesters !== undefined ?
                    state.currentSaveData.semesters
                        .map((eachSemester, ind) =>
                            <SemesterComponent
                                ind={ind}
                                key={`semester-table-key-${ind}`}
                                semesterCourse={eachSemester}
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
