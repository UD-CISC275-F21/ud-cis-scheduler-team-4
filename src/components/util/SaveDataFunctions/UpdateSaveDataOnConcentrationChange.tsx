import { SavedProgress } from "../../../interfaces/savedprogress";

export const UpdateSaveDataOnConcentrationChange = (
    concentrationName: string,
    saveData: SavedProgress[],
): number => {
    const indexToUpdate = saveData.findIndex((eachSaveData) => eachSaveData.concentration.name === concentrationName);
    return indexToUpdate;
};