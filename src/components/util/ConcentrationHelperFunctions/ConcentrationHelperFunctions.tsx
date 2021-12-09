import { Concentration } from "../../../interfaces/concentration";
import { ConcentrationContainerType } from "../../../interfaces/concentrationcontainer";
import { Course } from "../../../interfaces/course";

export const mapCoursesToNames = (courses: Course[]): string[] => {
    const mappedCourses = courses.map((eachCourse) => eachCourse.name);
    console.log("mapped to = ", mappedCourses);
    return mappedCourses;
};

export const updateConcentration = (concentration: Concentration, theConcentrationContainer: ConcentrationContainerType): Concentration => {

    const theName = theConcentrationContainer.name.split("-")[0];
    switch (theName) {
    case "general":{
        concentration.conc.general = mapCoursesToNames(theConcentrationContainer.courses);
        break;
    }
    case "core":{
        concentration.core = mapCoursesToNames(theConcentrationContainer.courses);
        break;
    }
    case "capstone":{
        concentration.capstone = mapCoursesToNames(theConcentrationContainer.courses);
        break;
    }
    case "lab":{
        concentration.lab = mapCoursesToNames(theConcentrationContainer.courses);
        break;
    }
    case "writing":{
        concentration.writing = mapCoursesToNames(theConcentrationContainer.courses);
        break;
    }
    case "stats":{
        concentration.conc.stats = mapCoursesToNames(theConcentrationContainer.courses);
        break;
    }
    case "systems":{
        concentration.conc.systems = mapCoursesToNames(theConcentrationContainer.courses);
        break;
    }
    case "elective":{
        concentration.conc.elective = mapCoursesToNames(theConcentrationContainer.courses);
        break;
    }
    case "ochem":{
        concentration.conc.ochem = mapCoursesToNames(theConcentrationContainer.courses);
        break;
    }
    case "data":{
        concentration.conc.data = mapCoursesToNames(theConcentrationContainer.courses);
        break;
    }
    case "cybersecurity":{
        concentration.conc.cybersecurity = mapCoursesToNames(theConcentrationContainer.courses);
        break;
    }
    case "track":{
        concentration.conc.track = mapCoursesToNames(theConcentrationContainer.courses);
        break;
    }
    default:{
        break;
    }

    }
    console.log("returning ", concentration);
    return concentration;
};
