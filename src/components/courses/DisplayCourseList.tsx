import React from "react";
import { Concentration } from "../../interfaces/concentration";
import { AIConc, BioConc, SecurityConc, DataScienceConc, HPCConc, NetworksConc, TheoryConc } from "./CourseLists";
import CONCENTRATIONS from "../../json/concentrations.json";
import COURSES from "../../json/courses.json";
import { Course as CourseType } from "../../interfaces/course";
import { ConcentrationContainerType } from "../../interfaces/concentrationcontainer";
import { SavedSemesterType } from "../../interfaces/savedsemester";
import { concentrationNumberLookup } from "../MainPage";

export function DisplayCourseList(props: {concentration: Concentration, setConcentrationContainers: React.Dispatch<React.SetStateAction<ConcentrationContainerType[]>>, savedSemesters: SavedSemesterType[] }): JSX.Element{

    function StringsToCourses(stringCourses: string[]): CourseType[]{
        /**Takes a list of strings, and returns a list of courses by looking in courses.json for matching names. 
         * Will need to be optimized to not be O^n, since it currently just loops through the entire json.
         */

        const allCourses = COURSES as CourseType[];

        const tmparr: CourseType[] = stringCourses.map(e => [...allCourses.filter(i => i.name == e)]).flat(2);

        return tmparr;

    }

    // TODO: pass saved semester in as prop into individual displays, maybe do a ternary string testing if the concentration is already saved?

    if (props.concentration==CONCENTRATIONS[0]){
        return <AIConc StringsToCourses={StringsToCourses} setConcentrationContainers={props.setConcentrationContainers} savedSemesters={props.savedSemesters}></AIConc>;
    } else if (props.concentration==CONCENTRATIONS[1]){
        return <BioConc StringsToCourses={StringsToCourses} setConcentrationContainers={props.setConcentrationContainers}></BioConc>;
    } else if (props.concentration==CONCENTRATIONS[2]){
        return <SecurityConc StringsToCourses={StringsToCourses} setConcentrationContainers={props.setConcentrationContainers} ></SecurityConc>;
    } else if (props.concentration==CONCENTRATIONS[3]){
        return <DataScienceConc StringsToCourses={StringsToCourses} setConcentrationContainers={props.setConcentrationContainers}></DataScienceConc>;
    } else if (props.concentration==CONCENTRATIONS[4]){
        return <HPCConc StringsToCourses={StringsToCourses} setConcentrationContainers={props.setConcentrationContainers}></HPCConc>;
    } else if (props.concentration==CONCENTRATIONS[5]){
        return <NetworksConc StringsToCourses={StringsToCourses} setConcentrationContainers={props.setConcentrationContainers}></NetworksConc>;
    } else if (props.concentration==CONCENTRATIONS[6]){
        return <TheoryConc StringsToCourses={StringsToCourses} setConcentrationContainers={props.setConcentrationContainers}></TheoryConc>;
    } else {
        return <div></div>;
    }
}