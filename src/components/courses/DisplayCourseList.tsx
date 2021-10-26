import React from "react";
import { Concentration } from "../../interfaces/concentration";
import { AIConc, BioConc, SecurityConc, DataScienceConc, HPCConc, NetworksConc, TheoryConc } from "./CourseLists";
import CONCENTRATIONS from "../../json/concentrations.json";
import COURSES from "../../json/courses.json";
import { Course as CourseType } from "../../interfaces/course";

export function DisplayCourseList({concentration}:{concentration:Concentration}): JSX.Element{

    function StringsToCourses(stringCourses: string[]): CourseType[]{
        let courses = [];
        for courseName in stringCourses{
            
        }
        return courses
    }

    if (concentration==CONCENTRATIONS[0]){
        return <AIConc></AIConc>;
    } else if (concentration==CONCENTRATIONS[1]){
        return <BioConc></BioConc>;
    } else if (concentration==CONCENTRATIONS[2]){
        return <SecurityConc></SecurityConc>;
    } else if (concentration==CONCENTRATIONS[3]){
        return <DataScienceConc></DataScienceConc>;
    } else if (concentration==CONCENTRATIONS[4]){
        return <HPCConc></HPCConc>;
    } else if (concentration==CONCENTRATIONS[5]){
        return <NetworksConc></NetworksConc>;
    } else if (concentration==CONCENTRATIONS[6]){
        return <TheoryConc></TheoryConc>;
    } else {
        return <div></div>;
    }
}