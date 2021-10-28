import React from "react";
import CONCENTRATIONS from "../../json/concentrations.json";
import { Course } from "../../interfaces/course";
import { CourseContainer } from "./CourseContainer";
import { ConcentrationContainerType } from "../../interfaces/concentrationcontainer";
import { useState, useEffect } from "react";
import { Course as CourseType } from "../../interfaces/course";


export function AIConc(props: {StringsToCourses: (stringCourses:string[]) => Course[], setConcentrationContainers: React.Dispatch<React.SetStateAction<ConcentrationContainerType[]>>} ): JSX.Element{
    
    const [coreCourses, setCoreCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[0].core));
    const [capstone1Courses,setCapstone1Courses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[0].capstone));
    const [general1Courses,setGeneral1Courses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[0].conc.general));
    const [writingCourses,setWritingCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[0].writing));
    const [capstone2Courses,setCapstone2Courses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[0].conc.stats));
    const [general2Courses,setGeneral2Courses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[0].conc.systems));
    const [electiveCourses,setElectiveCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[0].conc.elective));

    useEffect(() => {
        props.setConcentrationContainers(

            [   
                {
                    "name": "core",
                    "courses": coreCourses,
                    "setCourses": setCoreCourses
                },
                {
                    "name": "capstone-1",
                    "courses": capstone1Courses,
                    "setCourses": setCapstone1Courses

                },
                {
                    "name": "general-1",
                    "courses": general1Courses,
                    "setCourses": setGeneral1Courses
                },
                {
                    "name": "writing",
                    "courses": writingCourses,
                    "setCourses": setWritingCourses
                },
                {
                    "name": "capstone-2",
                    "courses": capstone2Courses,
                    "setCourses": setCapstone2Courses
                },
                {
                    "name": "general-2",
                    "courses": general2Courses,
                    "setCourses": setGeneral2Courses
                },
                {
                    "name": "elective",
                    "courses": electiveCourses,
                    "setCourses": setElectiveCourses
                }

            ]

        );
    },[]);

    return(<div>
        <h2>Artificial Intelligence and Robotics</h2>
        <p>CISC Core and Concentration:</p>
        <CourseContainer courses={coreCourses} name={"core"}  />
        <CourseContainer courses={capstone1Courses} name={"capstone-1"} />
        <CourseContainer courses={general1Courses} name={"general-1"} />
        <p>Choose One Lab Sequence: (Needs fixing)</p>
        
        <p>Select One Writing Course:</p>
        <CourseContainer courses={writingCourses} name={"writing"} />
        <p>Select One Statistics Course:</p>
        <CourseContainer courses={capstone2Courses} name={"capstone-2"} />
        <p>Select One Systems Course:</p>
        <CourseContainer courses={general2Courses} name={"general-2"} />
        <p>Select Four from the Following:</p>
        <CourseContainer courses={electiveCourses} name={"elective"} />
    </div>);
}

export function BioConc({StringsToCourses}:
    {StringsToCourses: (stringCourses:string[])=>Course[]}): JSX.Element{
    return <div>

    </div>;
}

export function SecurityConc({StringsToCourses}:
    {StringsToCourses: (stringCourses:string[])=>Course[]}): JSX.Element{
    return <div>

    </div>;
}

export function DataScienceConc({StringsToCourses}:
    {StringsToCourses: (stringCourses:string[])=>Course[]}): JSX.Element{
    return <div>

    </div>;
}

export function HPCConc({StringsToCourses}:
    {StringsToCourses: (stringCourses:string[])=>Course[]}): JSX.Element{
    return <div>

    </div>;
}

export function NetworksConc({StringsToCourses}:
    {StringsToCourses: (stringCourses:string[])=>Course[]}): JSX.Element{
    return <div>

    </div>;
}

export function TheoryConc({StringsToCourses}:
    {StringsToCourses: (stringCourses:string[])=>Course[]}): JSX.Element{
    return <div>

    </div>;
}
