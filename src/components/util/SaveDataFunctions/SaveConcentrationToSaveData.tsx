import { Concentration } from "../../../interfaces/concentration";
import { SavedProgress } from "../../../interfaces/savedprogress";


export const SaveConcentrationToSaveData = (saveData: SavedProgress[], setSaveData: (theSaveData: SavedProgress[]) => void, theConcentration: Concentration): void => {
    setSaveData([...saveData, {
        concentration: theConcentration,
        numberOfSemesters: 1,
        semesters: []
    }]);
};