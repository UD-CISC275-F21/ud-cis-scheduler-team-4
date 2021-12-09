import { SavedProgress } from "../../../interfaces/savedprogress";
import { Semester } from "../../../interfaces/semester";

export const UpdateMainPageStateWithSaveData = (
    saveData: SavedProgress,
    setSemesters: (newNumberOfSemesters: number) => void,
    setSemesterCourses: (newSemesterCourses: Semester[]) => void,
): void => {
    setSemesters(saveData.numberOfSemesters);
    setSemesterCourses(saveData.semesters);
};