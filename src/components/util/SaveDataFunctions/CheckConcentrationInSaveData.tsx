import { Concentration } from "../../../interfaces/concentration";
import { SavedProgress } from "../../../interfaces/savedprogress";

/*

    @args
    concentration: Concentration we are searching for
    saveData: the current array of save data we have
    @returns
    Returns the index of where the saveData pertaining to that concentration is located, -1 if not present

*/

export const CheckConcentrationInSaveData = (concentration: Concentration, saveData: SavedProgress[]): number => {
    return saveData.findIndex((eachSaveData) => eachSaveData.concentration.name === concentration.name);
};