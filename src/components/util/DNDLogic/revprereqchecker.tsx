import { Course as CourseType } from "../../../interfaces/course";
import { SchedulerAction } from "../../../interfaces/SchedulerAction";
import { Semester } from "../../../interfaces/semester";
import React from "react";
import { State } from "../../../interfaces/State";

export const RevPreReqChecker = (
    semesters: Semester[],
    placingIndex: number,
    courseBeingPlaced: CourseType,
    state: State,
    dispatch: React.Dispatch<SchedulerAction>
): boolean => {

    const ErrorBuffer: string[] = [];
    for (const eachCourse of semesters[placingIndex].courses) {
        for (const eachPreReq of eachCourse.prereqs) {
            const expr = new RegExp(eachPreReq);
            const result = expr.test(courseBeingPlaced.name);
            if (result) {
                ErrorBuffer.push(
                    `${eachPreReq.includes("|") ? `For ${eachCourse.name} : ${eachPreReq.split("|").join(" or ")}, and ` : `${eachPreReq}, and `}`
                );
            }
        }
    }

    if (ErrorBuffer.length > 0) {
        dispatch({type: "displayToast", payload: { ...state, toastMessage: `PreReq(s) required are : ${ErrorBuffer.join("\n")}`, toastDisplay: true}});
        return false;
    }

    return true;


};
