import { SavedProgress } from "../../../interfaces/savedprogress";
import { Semester } from "../../../interfaces/semester";
import { Concentration } from "../../../interfaces/concentration";

export const UpdateMainPageStateWithSaveData = (
    saveData: SavedProgress,
    setSemesters: (newNumberOfSemesters: number) => void,
    setSemesterCourses: (newSemesterCourses: Semester[]) => void,
): void => {
    setSemesters(saveData.numberOfSemesters);
    setSemesterCourses(saveData.semesters);
};