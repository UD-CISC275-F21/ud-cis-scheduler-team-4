import React from "react";
import { Concentration } from "../../interfaces/concentration";
import { AIConc, BioConc, SecurityConc, DataScienceConc, HPCConc, NetworksConc, TheoryConc } from "./CourseLists";
import CONCENTRATIONS from "../../json/concentrations.json";
import COURSES from "../../json/courses.json";
import { Course as CourseType } from "../../interfaces/course";
import { ConcentrationContainerType } from "../../interfaces/concentrationcontainer";

export function DisplayCourseList(props: {concentration: Concentration, setConcentrationContainers: React.Dispatch<React.SetStateAction<ConcentrationContainerType[]>> }): JSX.Element{

    function StringsToCourses(stringCourses: string[]): CourseType[]{
        /**Takes a list of strings, and returns a list of courses by looking in courses.json for matching names. 
         * Will need to be optimized to not be O^n, since it currently just loops through the entire json.
         */

        const allCourses = COURSES as CourseType[];

        const tmparr: CourseType[] = stringCourses.map(e => [...allCourses.filter(i => i.name == e)]).flat(2);

        return tmparr;

    }

    if (props.concentration==CONCENTRATIONS[0]){
        return <AIConc StringsToCourses={StringsToCourses} setConcentrationContainers={props.setConcentrationContainers}></AIConc>;
    } else if (props.concentration==CONCENTRATIONS[1]){
        return <BioConc StringsToCourses={StringsToCourses}></BioConc>;
    } else if (props.concentration==CONCENTRATIONS[2]){
        return <SecurityConc StringsToCourses={StringsToCourses}></SecurityConc>;
    } else if (props.concentration==CONCENTRATIONS[3]){
        return <DataScienceConc StringsToCourses={StringsToCourses}></DataScienceConc>;
    } else if (props.concentration==CONCENTRATIONS[4]){
        return <HPCConc StringsToCourses={StringsToCourses}></HPCConc>;
    } else if (props.concentration==CONCENTRATIONS[5]){
        return <NetworksConc StringsToCourses={StringsToCourses}></NetworksConc>;
    } else if (props.concentration==CONCENTRATIONS[6]){
        return <TheoryConc StringsToCourses={StringsToCourses}></TheoryConc>;
    } else {
        return <div></div>;
    }
}