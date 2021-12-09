import { SavedProgress } from "../../../interfaces/savedprogress";
import { Semester } from "../../../interfaces/semester";


export const UpdateSemester = (saveProgress: SavedProgress, semesterCourses: Semester[]): SavedProgress => {

    //console.log("IN UPDATE SEMESTER");
    let semester: Semester[] = saveProgress.semesters;
    semester = semesterCourses;
    saveProgress.semesters = semester;
    return saveProgress;

};
