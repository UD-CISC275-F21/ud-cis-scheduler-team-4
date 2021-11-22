import { ConcentrationContainerType } from "../../../interfaces/concentrationcontainer";
import { SemesterType } from "../../../interfaces/semester";
import { SaveState } from "../../../interfaces/savestate";

export const SavingState = (
    concentrationContainers: ConcentrationContainerType[],
    semesters: SemesterType[],
    concentrationName: string,
    numsemesters: number,
): void => {
    console.log("SAVINGSTATE : NAME : ", concentrationName);
    const newState: SaveState = { concentrationName: concentrationName, concentrationCourses: concentrationContainers, semesters: semesters, numsemesters: numsemesters};
    localStorage.setItem(concentrationName, JSON.stringify(newState));
};
