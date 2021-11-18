import { Course as CourseType } from "../../../interfaces/course";
import { SemesterType } from "../../../interfaces/semester";

export const PreReqChecker = (semesters: SemesterType[],
    placingIndex: number,
    courseBeingPlaced: CourseType,
    setErrMsg: (msg: string) => void,
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
        setErrMsg(`PreReq(s) required are : ${StringBuffer.join("\n")}`);
        return false;
    }
    return true;
};
