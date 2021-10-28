import React from "react";
import { Concentration } from "../../interfaces/concentration";
import { AIConc, BioConc, SecurityConc, DataScienceConc, HPCConc, NetworksConc, TheoryConc } from "./CourseLists";
import CONCENTRATIONS from "../../json/concentrations.json";
import COURSES from "../../json/courses.json";
import { Course as CourseType } from "../../interfaces/course";

export function DisplayCourseList({concentration}:{concentration:Concentration}): JSX.Element{

    function StringsToCourses(stringCourses: string[]): CourseType[]{
        /**Takes a list of strings, and returns a list of courses by looking in courses.json for matching names. 
         * Will need to be optimized to not be O^n, since it currently just loops through the entire json.
         */
        console.log("Entered conversion function");
        console.log(`String courses = ${stringCourses}`);



        const courses: CourseType[] = [];
        const allCourses = COURSES as CourseType[];

        const tmparr: CourseType[] = stringCourses.map(e => [...allCourses.filter(i => i.name == e)]).flat(2);

        console.log(tmparr);

        return tmparr;
        
    }

    if (concentration==CONCENTRATIONS[0]){
        return <AIConc StringsToCourses={StringsToCourses}></AIConc>;
    } else if (concentration==CONCENTRATIONS[1]){
        return <BioConc StringsToCourses={StringsToCourses}></BioConc>;
    } else if (concentration==CONCENTRATIONS[2]){
        return <SecurityConc StringsToCourses={StringsToCourses}></SecurityConc>;
    } else if (concentration==CONCENTRATIONS[3]){
        return <DataScienceConc StringsToCourses={StringsToCourses}></DataScienceConc>;
    } else if (concentration==CONCENTRATIONS[4]){
        return <HPCConc StringsToCourses={StringsToCourses}></HPCConc>;
    } else if (concentration==CONCENTRATIONS[5]){
        return <NetworksConc StringsToCourses={StringsToCourses}></NetworksConc>;
    } else if (concentration==CONCENTRATIONS[6]){
        return <TheoryConc StringsToCourses={StringsToCourses}></TheoryConc>;
    } else {
        return <div></div>;
    }
}