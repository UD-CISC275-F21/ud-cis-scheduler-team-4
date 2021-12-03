import SavedData from "../../../assets/data/SavedProgress";
import { SavedProgress } from "../../../interfaces/savedprogress";

export const UpdateSaveDataOnConcentrationChange = (progressToBeSaved: SavedProgress): void => {
    SavedData.savedata = [...SavedData.savedata, progressToBeSaved];
};