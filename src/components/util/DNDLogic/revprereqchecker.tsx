import { Course as CourseType } from "../../../interfaces/course";
import { Semester } from "../../../interfaces/semester";

export const RevPreReqChecker = (
    semesters: Semester[],
    placingIndex: number,
    courseBeingPlaced: CourseType,
    setErrMsg: (msg: string) => void,
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
        setErrMsg(`PreReq(s) required are : ${ErrorBuffer.join("\n")}`);
        return false;
    }

    return true;


};
