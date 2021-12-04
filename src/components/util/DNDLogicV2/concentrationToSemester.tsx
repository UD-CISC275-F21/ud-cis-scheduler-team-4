import { State } from "../../MainPage";
import { SchedulerAction } from "../../MainPage";
import React from "react";
import { Semester } from "../../../interfaces/semester";
import { ConcentrationContainerType } from "../../../interfaces/concentrationcontainer";
import { STATUS_CODES } from "http";

export const concentrationToSemesterV2 = (
    sourceIndex: number,
    droppingIndex: number,
    indexOfConcContainer: number,
    indexOfSemesterCourse: number,
    dispatch: React.Dispatch<SchedulerAction>,
    state: State
): void => {

    const ConcentrationContainer = state.concentrationContainers[indexOfConcContainer];
    const splicedCourse = ConcentrationContainer.courses[sourceIndex];
    dispatch({type: "updateConcentrationContainers", payload:
    { ...state,
        concentrationContainers: state.concentrationContainers
            .map((eachContainer, index) => {
                if (index === indexOfConcContainer) {
                    let tmpContainer = eachContainer;
                    tmpContainer = {...eachContainer, courses: eachContainer.courses
                        .filter((eachcourse, index) => {
                            if (index === sourceIndex) {
                                return false;
                            } else {
                                return true;
                            }
                        }
                        )};
                    return tmpContainer;
                } else {
                    return eachContainer;
                }
            })
        ,
        semesterCourses: state.semesterCourses
            .map((eachSemester, index) => {
                if (index === indexOfSemesterCourse) {
                    let tmpSemester = eachSemester;
                    tmpSemester = { ...tmpSemester,
                        courses: tmpSemester.courses
                            .map((eachCourse, index) => {
                                if (index === droppingIndex) {
                                    return splicedCourse;
                                } else {
                                    return eachCourse;
                                }
                            })
                    
                    };
                    return tmpSemester;
                } else {
                    return eachSemester;
                }
            })
    }});
};
