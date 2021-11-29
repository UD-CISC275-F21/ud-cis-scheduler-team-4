import { ConcentrationContainerType } from "../../../interfaces/concentrationcontainer";
import { SavedProgress } from "../../../interfaces/savedprogress";
import { Concentration } from "../../../interfaces/concentration";
import { Semester } from "../../../interfaces/semester";


export const UpdateSemester = (saveProgress: SavedProgress, semesterCourses: Semester[]) => {

    let semester: Semester[] = saveProgress.semesters;
    semester = semesterCourses;
    saveProgress.semesters = semester;
    return saveProgress;

};
