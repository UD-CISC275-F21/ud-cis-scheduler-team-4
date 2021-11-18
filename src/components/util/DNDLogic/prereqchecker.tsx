import { Course as CourseType } from "../../../interfaces/course";
import { SemesterType } from "../../../interfaces/semester";

export const PreReqChecker = (semesters: SemesterType[], placingIndex: number, courseBeingPlaced: CourseType, setErrMsg: (msg: string) => void) => {

    const semesterCourses: string = semesters.slice(0, placingIndex).map(elem => elem.courses.map(eachcourse => eachcourse.name))
        .flat(2)
        .join("");
    const coursePreReqs: string[] = courseBeingPlaced.prereqs;
    const StringBuffer: string[] = [];
    console.log("semester courses = ", semesterCourses);
    for (const eachPreReq of coursePreReqs) {
        const expr = new RegExp(eachPreReq);
        const result: boolean = expr.test(semesterCourses);
        if (!result) {
            // found an error
            StringBuffer.push(`PreReq(s): ${eachPreReq.includes("|") ?
                `${eachPreReq.split("|").join(" or ")} are ` :
                `${eachPreReq} is `}  required`);
        }
    }
    if (StringBuffer.length > 0) {
        // errors found
        // set toast message here
        setErrMsg(StringBuffer.join("\n"));
        return false;
    }
    return true;

};


/*

["x|y", "z|w", "a|b"]

1) Make all the past semesters course titles into one giant string
2) cycle through each regex exp and try matching it to the string, if the exp does not match, that means that the prereq
is not present in the course list, and we append it to an "errors" array, which contains all of the errors
in our current course setup, and we also set a flag denoting if an error occured, if an error occured,
we do the step below
3) We then pass that string back into the error toast

*/
