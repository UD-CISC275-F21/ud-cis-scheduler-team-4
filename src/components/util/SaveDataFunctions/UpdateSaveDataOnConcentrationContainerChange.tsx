import { ConcentrationContainerType } from "../../../interfaces/concentrationcontainer";
import { SavedProgress } from "../../../interfaces/savedprogress";


export const UpdateSaveDataOnConcentrationContainerChange = (
    concentrationName: string,
    saveData: SavedProgress[],
    setSaveData: (newSaveData: SavedProgress[]) => void,
    concentrationContainers: ConcentrationContainerType[]
): void => {

    const newSaveData = [...saveData];
    const index = saveData.findIndex((eachSaveData) => eachSaveData.concentration.name === concentrationName);
    const saveDataUpdating = newSaveData[index];
    const tmpSaveDataConcentration = saveDataUpdating.concentration;
    const concentrationKeys = Object.keys(tmpSaveDataConcentration.conc).concat(Object.keys(tmpSaveDataConcentration));
    for (const eachConcentrationContainer of concentrationContainers) {
        const eachConcentrationContainerName = eachConcentrationContainer.name;
        if (concentrationKeys.includes(eachConcentrationContainerName)) {
            // found right concentrationContainer
            const theCourses = eachConcentrationContainer.courses.map((eachCourse) => eachCourse.name);
            const theKey = concentrationKeys.find((eachKey) => eachKey.includes(eachConcentrationContainerName));
            switch (theKey) {
            case "core":
                tmpSaveDataConcentration.core = theCourses;
                break;
            case "capstone":
                tmpSaveDataConcentration.capstone = theCourses;
                break;
            case "lab":
                tmpSaveDataConcentration.lab = theCourses;
                break;
            case "writing":
                tmpSaveDataConcentration.writing = theCourses;
                break;
            case "general":
                tmpSaveDataConcentration.conc.general = theCourses;
                break;
            case "stats":
                tmpSaveDataConcentration.conc.stats = theCourses;
                break;
            case "systems":
                tmpSaveDataConcentration.conc.systems = theCourses;
                break;
            case "elective":
                tmpSaveDataConcentration.conc.systems = theCourses;
                break;
            case "ochem":
                tmpSaveDataConcentration.conc.ochem = theCourses;
                break;
            case "data":
                tmpSaveDataConcentration.conc.data = theCourses;
                break;
            case "cybersecurity":
                tmpSaveDataConcentration.conc.cybersecurity = theCourses;
                break;
            case "track":
                tmpSaveDataConcentration.conc.track = theCourses;
                break;
            default:
                break;
            }
        }
    }
    // updating all 
    setSaveData(newSaveData);
};
