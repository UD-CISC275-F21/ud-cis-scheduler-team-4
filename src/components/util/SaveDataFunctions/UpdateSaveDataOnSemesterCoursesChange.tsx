import { SavedProgress } from "../../../interfaces/savedprogress";
import { Semester } from "../../../interfaces/semester";

export const UpdateSaveDataOnSemesterCoursesChange = (
    concentrationName: string,
    semesterCourses: Semester[],
    setSaveData: (newSaveData: SavedProgress[]) => void,
    saveData: SavedProgress[],
): void => {
    const indexToUpdate = saveData.findIndex((eachSaveData) => eachSaveData.concentration.name === concentrationName);
    const tmpSaveData = [...saveData];
    tmpSaveData[indexToUpdate].semesters = semesterCourses;
    setSaveData(tmpSaveData);
};