import { ConcentrationContainerType } from "../../../interfaces/concentrationcontainer";
import { SavedProgress } from "../../../interfaces/savedprogress";
import { Concentration } from "../../../interfaces/concentration";

export const UpdateConcentration = (saveProgress: SavedProgress, ConcentrationContainers: ConcentrationContainerType[]): SavedProgress => {

    const newConcentration: Concentration = saveProgress.concentration;
    const concentrationKeys: string[] = Object.keys(newConcentration);
    const concParamKeys: string[] = Object.keys(newConcentration.conc);
    for ( const eachContainer of ConcentrationContainers ) {
        const name = eachContainer.name;
        const courseNames = eachContainer.courses.map((eachCourse) => eachCourse.name);
        if ( concentrationKeys.includes(name)) {
            // conc
            const theKey = concentrationKeys.find((eachkey) => eachkey === name);
            switch (theKey) {

            case "core": {
                newConcentration.core = courseNames;
                break;
            }
            case "capstone": {
                newConcentration.capstone = courseNames;
                break;
            }
            case "lab": {
                newConcentration.lab = courseNames;
                break;
            }
            case "writing": {
                newConcentration.writing = courseNames;
                break;
            }
            default:
                break;
                

            }
        } else if (concParamKeys.includes(name)) {
            // cybersecurity
            const theKey = concParamKeys.find((eachkey) => eachkey === name);
            switch (theKey) {

            case "general":{
                newConcentration.conc.general = courseNames;
                break;
            }
            case "stats":{
                newConcentration.conc.stats = courseNames;
                break;
            }
            case "systems":{
                newConcentration.conc.systems = courseNames;
                break;
            }
            case "elective":{
                newConcentration.conc.elective = courseNames;
                break;
            }
            case "ochem":{
                newConcentration.conc.ochem = courseNames;
                break;
            }
            case "data":{
                newConcentration.conc.data = courseNames;
                break;
            }
            case "cybersecurity":{
                newConcentration.conc.cybersecurity = courseNames;
                break;
            }
            case "track":{
                newConcentration.conc.track = courseNames;
                break;
            }
            default:
                break;

            }

        }
    }
    saveProgress.concentration = newConcentration;
    return saveProgress;

};
