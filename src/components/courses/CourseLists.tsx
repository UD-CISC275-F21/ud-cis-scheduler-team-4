import React from "react";
import CONCENTRATIONS from "../../json/concentrations.json";
import COURSES from "../../json/courses.json";
import { Course } from "../../interfaces/course";
import { CourseContainer } from "./CourseContainer";
import { Course as CourseType } from "../../interfaces/course";

export function DisplayCourseList({concentration}:{concentration:Concentration}): JSX.Element{

    function StringsToCourses(stringCourses: string[]): CourseType[]{
        let courses = [];
        const allCourses: CourseType[] = COURSES as CourseType[];
        for(let i = 0; i < stringCourses.length; i++){

            for(let i = 0; i < allCourses.length; i++){

                const theCourse = allCourses[i];

            }

        }
    }


export function AIConc(): JSX.Element{
    return <div>
        <h2>Artificial Intelligence and Robotics</h2>
        <CourseContainer courses={CONCENTRATIONS[0].core}/>
        <p>CISC Core and Concentration:</p>
        <p>College of Engineering Requirements:</p>
        <p>Choose One Lab Sequence:</p>
        <p>Select One Writing Course:</p>
        <p>Select One Statistics Course:</p>
        <p>Select One Systems Course:</p>
        <p>Select Four from the Following:</p>
    </div>;
}

export function BioConc(): JSX.Element{
    return <div>
        <h2>Bioinformatics</h2>
        <p>CISC Core and Concentration:</p>
        <p>College of Engineering Requirements:</p>
        <p>Choose One Chem Sequence:</p>
        <p>Choose One Organic Chem Sequence:</p>
        <p>Select One Writing Course:</p>
        <p>Select One Statistics Course:</p>
        <p>Select One Data Analysis Course:</p>
        <p>Select Two from the Following:</p>
    </div>;
}

export function SecurityConc(): JSX.Element{
    return <div>
        <h2>Cybersecurity</h2>
        <p>CISC Core and Concentration:</p>
        <p>College of Engineering Requirements:</p>
        <p>Choose One Lab Sequence:</p>
        <p>Select One Writing Course:</p>
        <p>Select One Statistics Course:</p>
        <p>Select Two Advanced Reqs:</p>
        <p>Select Two from the Following:</p>
    </div>;
}

export function DataScienceConc(): JSX.Element{
    return <div>
        <h2>Data Science</h2>
        <p>CISC Core and Concentration:</p>
        <p>College of Engineering Requirements:</p>
        <p>Choose One Lab Sequence:</p>
        <p>Select One Writing Course:</p>
        <p>Select One Advanced Data Science:</p>
        <p>Select One Advanced Math:</p>
        <p>Select One of the Following:</p>
    </div>;
}

export function HPCConc(): JSX.Element{
    return <div>
        <p>Come back and figure this one out later</p>
    </div>;
}

export function NetworksConc(): JSX.Element{
    return <div>
        <h2>Networks and Systems</h2>
        <p>CISC Core and Concentration:</p>
        <p>College of Engineering Requirements:</p>
        <p>Choose One Lab Sequence:</p>
        <p>Select One Writing Course:</p>
        <p>Select One Statistics Course:</p>
        <p>Select One Security Requirement:</p>
        <p>Select Two Systems Requirements:</p>
        <p>Select Two of the Following:</p>
    </div>;
}

export function TheoryConc(): JSX.Element{
    return <div>
        <h2>Theory</h2>
        <p>CISC Core and Concentration:</p>
        <p>College of Engineering Requirements:</p>
        <p>Choose One Lab Sequence:</p>
        <p>Select One Writing Course:</p>
        <p>Select One Statistics Course:</p>
        <p>Select One of the Following Tracks:</p>
        <p>Select Two of the Following:</p>
    </div>;
}