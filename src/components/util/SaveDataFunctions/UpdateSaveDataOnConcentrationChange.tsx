import { Concentration } from "../../../interfaces/concentration";
import { SavedProgress } from "../../../interfaces/savedprogress";

export const UpdateSaveDataOnConcentrationChange = (
    concentrationName: string,
    saveData: SavedProgress[],
    dataToSave: SavedProgress,
    updateSaveData: (newSaveData: SavedProgress[]) => void,
): void => {
    const indexToUpdate = saveData.findIndex((eachSaveData) => eachSaveData.concentration.name === concentrationName);
    console.log("indexToUpdate = ", indexToUpdate, " and datatosave = ", dataToSave);
    const tmpSaveData = [...saveData];
    tmpSaveData[indexToUpdate] = {...dataToSave};
    console.log("tmpSaveData = ", tmpSaveData);
    updateSaveData(tmpSaveData);
};