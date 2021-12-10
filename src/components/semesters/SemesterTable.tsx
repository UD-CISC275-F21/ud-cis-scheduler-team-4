import React from "react";
import { Semester as SemesterComponent } from "./Semester";
import { UseStateContext } from "../util/DispatchLogic/UseStateContext";

/*

    @param - props - object that contains a key of id(number)
    @return JSX.Element

*/

<<<<<<< HEAD
export const SemesterTable = (props: { semesters: number;
        semestersCourses: SemesterType[];
        setSemesterCourses: React.Dispatch<React.SetStateAction<SemesterType[]>>;
    }): JSX.Element =>
    <div>
        {
            new Array(props.semesters).fill(0)
                .map((elem, ind) => <Semester ind={ind} key={`semester-table-key-${ind}`} semesterCourses={props.semestersCourses} setSemesterCourses={props.setSemesterCourses} />)
        }
    </div>;
=======
export const SemesterTable = (): JSX.Element => {
        
    const { state } = UseStateContext();
    //console.log("IN SEMESTER TABLE --- state = ", state);
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
>>>>>>> main
