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
        const courses = [];
        const allCourses = COURSES as CourseType[];
        for (const courseName in stringCourses){
            for (let i=0; i<allCourses.length; i++){
                const course = allCourses[i];
                if (courseName === course.name){
                    courses.push(course);
                }
            }
        }
        return courses;
    }

    if (concentration==CONCENTRATIONS[0]){
        return <AIConc StringsToCourses={StringsToCourses}></AIConc>;
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