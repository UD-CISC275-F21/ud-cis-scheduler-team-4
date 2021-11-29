import { Semester } from "../../../interfaces/semester";

export const semesterToSemester = (
    semester: Semester,
    semester2: Semester,
    spliceInd: number,
    dropInd: number,
    diffSemester: boolean,
): number => {
    console.log("in semester ---> semester");
    if (diffSemester) {
        const splicedCourse = semester.courses.splice(spliceInd, 1)[0];
        semester2.courses.splice(dropInd, 0, splicedCourse);
        semester.courseSetter([...semester.courses]);
        semester2.courseSetter([...semester2.courses]);
    } else {
        const splicedCourse = semester.courses.splice(spliceInd, 1)[0];
        semester.courses.splice(dropInd, 0, splicedCourse);
        semester.courseSetter([...semester.courses]);
    }
    return 1;
};
