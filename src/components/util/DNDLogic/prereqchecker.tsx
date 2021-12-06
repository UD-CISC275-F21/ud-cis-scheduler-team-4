import { Course as CourseType } from "../../../interfaces/course";
import { Semester } from "../../../interfaces/semester";
import React from "react";
import { State } from "../../../interfaces/State";
import { SchedulerAction } from "../../../interfaces/SchedulerAction";

export const PreReqChecker = (
    semesters: Semester[],
    placingIndex: number,
    courseBeingPlaced: CourseType,
    state: State,
    dispatch: React.Dispatch<SchedulerAction>
): boolean => {
    const semesterCourses: string = semesters.slice(0, placingIndex)
        .map(elem => elem.courses.map(eachcourse => eachcourse.name))
        .flat(2)
        .join("");
    const coursePreReqs: string[] = courseBeingPlaced.prereqs;
    const StringBuffer: string[] = [];
    for (const eachPreReq of coursePreReqs) {
        const expr = new RegExp(eachPreReq);
        const result: boolean = expr.test(semesterCourses);
        if (!result) {
            StringBuffer.push(eachPreReq.includes("|") ? `${eachPreReq.split("|").join(" or ")}, and ` : `${eachPreReq}, and `);
        }
    }
    if (StringBuffer.length > 0) {
        StringBuffer[StringBuffer.length - 1] = StringBuffer[StringBuffer.length - 1].replace(", and", "");
        dispatch({type: "displayToast", payload: { ...state, toastMessage: `PreReq(s) required are : ${StringBuffer.join("\n")}`, toastDisplay: true}});
        return false;
    }
    return true;
};
