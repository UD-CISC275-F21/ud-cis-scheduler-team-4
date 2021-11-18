import { Course as CourseType } from "../../../interfaces/course";
import { SemesterType } from "../../../interfaces/semester";

export const PreReqChecker = (semesters: SemesterType[],
    placingIndex: number,
    courseBeingPlaced: CourseType,
    setErrMsg: (msg: string) => void,
) => {
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
            StringBuffer.push(eachPreReq.includes("|") ? eachPreReq.split("|").join(" or ") : `${eachPreReq}, `);
        }
    }
    if (StringBuffer.length > 0) {
        setErrMsg(`PreReq(s) required are : ${StringBuffer.join("\n")}`);
        return false;
    }
    return true;
};
