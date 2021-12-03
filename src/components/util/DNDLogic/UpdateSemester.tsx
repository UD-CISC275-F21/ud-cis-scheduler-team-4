import { Semester } from "../../../interfaces/semester";


export const UpdateSemester = (
    newSemester: Semester,
    semesters: Semester[],
    setSemesters: (semesters: Semester[]) => void
): void => {
    console.log("in update semester");
    setSemesters(semesters.map((eachSemester) => {
        const spreadSemester: Semester = {...eachSemester};
        if (spreadSemester.semesternum === newSemester.semesternum) {
            spreadSemester.courses = newSemester.courses;
        }
        return spreadSemester;
    }));

};