import React from "react";
import CONCENTRATIONS from "../../json/concentrations.json";
import { Course } from "../../interfaces/course";
import { CourseContainer } from "./CourseContainer";
import { ConcentrationContainerType } from "../../interfaces/concentrationcontainer";
import { useState, useEffect } from "react";
import { Course as CourseType } from "../../interfaces/course";
import { SavedSemesterType } from "../../interfaces/savedsemester";


export function AIConc(props: {StringsToCourses: (stringCourses:string[]) => Course[], setConcentrationContainers: React.Dispatch<React.SetStateAction<ConcentrationContainerType[]>>, savedSemesters: SavedSemesterType[] } ): JSX.Element{
    
    const [coreCourses, setCoreCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[0].core));
    const [capstone1Courses,setCapstone1Courses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[0].capstone));
    const [general1Courses,setGeneral1Courses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[0].conc.general));
    const [writingCourses,setWritingCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[0].writing));
    const [capstone2Courses,setCapstone2Courses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[0].conc.stats));
    const [general2Courses,setGeneral2Courses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[0].conc.systems));
    const [electiveCourses,setElectiveCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[0].conc.elective));

    useEffect(() => {

        if(props.savedSemesters.some(e => e.concentrationNumber === 0)){
            // specific for AIConc
            const savedSemester = props.savedSemesters.find(e => e.concentrationNumber === 0);
            if(savedSemester !== undefined){
                props.setConcentrationContainers(savedSemester.concContainers);
                const savedSemesterCoreCourses = savedSemester.concContainers.find(e => e.name === "core");
                if(savedSemesterCoreCourses !== undefined){
                    setCoreCourses([...savedSemesterCoreCourses.courses]);
                }
                const savedSemesterCapstoneCourses = savedSemester.concContainers.find(e => e.name === "capstone-1");
                if(savedSemesterCapstoneCourses !== undefined){
                    setCoreCourses([...savedSemesterCapstoneCourses.courses]);
                }
                const savedSemesterGeneralCourses = savedSemester.concContainers.find(e => e.name === "general-1");
                if(savedSemesterGeneralCourses !== undefined){
                    setCoreCourses([...savedSemesterGeneralCourses.courses]);
                }
                const savedSemesterWritingCourses = savedSemester.concContainers.find(e => e.name === "writing");
                if(savedSemesterWritingCourses !== undefined){
                    setCoreCourses([...savedSemesterWritingCourses.courses]);
                }
                const savedSemesterCapstone2Courses = savedSemester.concContainers.find(e => e.name === "capstone-2");
                if(savedSemesterCapstone2Courses !== undefined){
                    setCoreCourses([...savedSemesterCapstone2Courses.courses]);
                }
                const savedSemesterGeneral2Courses = savedSemester.concContainers.find(e => e.name === "general-2");
                if(savedSemesterGeneral2Courses !== undefined){
                    setCoreCourses([...savedSemesterGeneral2Courses.courses]);
                }
                const savedSemesterElectiveCourses = savedSemester.concContainers.find(e => e.name === "elective");
                if(savedSemesterElectiveCourses !== undefined){
                    setCoreCourses([...savedSemesterElectiveCourses.courses]);
                }

            }
        } else{

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
        }
    },[]);

    return<div>
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
    </div>;
}

export function BioConc(props: {StringsToCourses: (stringCourses:string[]) => Course[], setConcentrationContainers: React.Dispatch<React.SetStateAction<ConcentrationContainerType[]>>}): JSX.Element{
    const [coreCourses, setCoreCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[1].core));
    const [capstoneCourses, setCapstoneCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[1].capstone));
    const [generalCourses,setGeneralCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[1].conc.general));
    const [writingCourses, setWritingCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[1].writing));
    const [statCourses, setStatCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[1].conc.stats));
    
    useEffect(() => {
        props.setConcentrationContainers(

            [   
                {
                    "name": "core",
                    "courses": coreCourses,
                    "setCourses": setCoreCourses
                },
                {
                    "name": "capstone",
                    "courses": capstoneCourses,
                    "setCourses": setCapstoneCourses

                },
                {
                    "name": "general",
                    "courses": generalCourses,
                    "setCourses": setGeneralCourses
                },
                {
                    "name": "writing",
                    "courses": writingCourses,
                    "setCourses": setWritingCourses
                },
                {
                    "name": "stat",
                    "courses": statCourses,
                    "setCourses": setStatCourses
                }

            ]

        );
    }, []);

    return(
        <div>
            <h2>Bioinformatics</h2>
            <p>CISC Core and Concentration:</p>
            <CourseContainer courses={coreCourses} name="core"/>
            <CourseContainer courses={capstoneCourses} name="capstone"/>
            <CourseContainer courses={generalCourses} name="general"/>
            <p>Choose One Chem Sequence:</p>
            <p>Choose One Organic Chem Sequence:</p>
            <p>Select One Writing Course:</p>
            <CourseContainer courses={writingCourses} name="writing"/>
            <p>Select One Statistics Course:</p>
            <CourseContainer courses={statCourses} name="stat"/>
            <p>Select One Data Analysis Course:</p>
            <p>Select Two from the Following:</p>
        </div>
    );
}

export function SecurityConc(props: {StringsToCourses: (stringCourses:string[]) => Course[], setConcentrationContainers: React.Dispatch<React.SetStateAction<ConcentrationContainerType[]>>}): JSX.Element{
    const [coreCourses, setCoreCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[2].core));
    const [capstoneCourses, setCapstoneCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[2].capstone));
    const [generalCourses,setGeneralCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[2].conc.general));
    const [writingCourses, setWritingCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[2].writing));
    const [statCourses, setStatCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[2].conc.stats));
   
    useEffect(() => {
        props.setConcentrationContainers(

            [   
                {
                    "name": "core",
                    "courses": coreCourses,
                    "setCourses": setCoreCourses
                },
                {
                    "name": "capstone",
                    "courses": capstoneCourses,
                    "setCourses": setCapstoneCourses

                },
                {
                    "name": "general",
                    "courses": generalCourses,
                    "setCourses": setGeneralCourses
                },
                {
                    "name": "writing",
                    "courses": writingCourses,
                    "setCourses": setWritingCourses
                },
                {
                    "name": "stat",
                    "courses": statCourses,
                    "setCourses": setStatCourses
                }

            ]

        );
    }, []);
    
    return(
        <div>
            <h2>Cybersecurity</h2>
            <p>CISC Core and Concentration:</p>
            <CourseContainer courses={coreCourses} name="core"/>
            <CourseContainer courses={capstoneCourses} name="capstone"/>
            <CourseContainer courses={generalCourses} name="general"/>
            <p>Choose One Lab Sequence:</p>
            <p>Select One Writing Course:</p>
            <CourseContainer courses={writingCourses} name="writing"/>
            <p>Select One Statistics Course:</p>
            <CourseContainer courses={statCourses} name="stats"/>
            <p>Select Two Advanced Reqs:</p>
            <p>Select Two from the Following:</p>
        </div>
    );
}

export function DataScienceConc(props: {StringsToCourses: (stringCourses:string[]) => Course[], setConcentrationContainers: React.Dispatch<React.SetStateAction<ConcentrationContainerType[]>>}): JSX.Element{
    const [coreCourses, setCoreCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[3].core));
    const [capstoneCourses, setCapstoneCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[3].capstone));
    const [generalCourses,setGeneralCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[3].conc.general));
    const [writingCourses, setWritingCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[3].writing));
    
    useEffect(() => {
        props.setConcentrationContainers(

            [   
                {
                    "name": "core",
                    "courses": coreCourses,
                    "setCourses": setCoreCourses
                },
                {
                    "name": "capstone",
                    "courses": capstoneCourses,
                    "setCourses": setCapstoneCourses

                },
                {
                    "name": "general",
                    "courses": generalCourses,
                    "setCourses": setGeneralCourses
                },
                {
                    "name": "writing",
                    "courses": writingCourses,
                    "setCourses": setWritingCourses
                },

            ]

        );
    }, []);
    
    return<div>
        <h2>Data Science</h2>
        <p>CISC Core and Concentration:</p>
        <CourseContainer courses={coreCourses} name="core"/>
        <CourseContainer courses={capstoneCourses} name="capstone"/>
        <CourseContainer courses={generalCourses} name="general"/>
        <p>Choose One Lab Sequence:</p>
        <p>Select One Writing Course:</p>
        <CourseContainer courses={writingCourses} name="writing"/>
        <p>Select One Advanced Data Science:</p>
        <p>Select One Advanced Math:</p>
        <p>Select One of the Following:</p>
    </div>;
}

export function HPCConc(props: {StringsToCourses: (stringCourses:string[]) => Course[], setConcentrationContainers: React.Dispatch<React.SetStateAction<ConcentrationContainerType[]>>}): JSX.Element{
    const [writingCourses, setWritingCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[2].writing));
    
    useEffect(() => {

        props.setConcentrationContainers(

            [

                {

                    "name": "writing",
                    "courses": writingCourses,
                    "setCourses": setWritingCourses

                }

            ]

        );
    
    },[]);


    return<div>
        <p>Come back and figure this one out later</p>
        <CourseContainer courses={writingCourses} name="writing"/>
    </div>;
}

export function NetworksConc(props: {StringsToCourses: (stringCourses:string[]) => Course[], setConcentrationContainers: React.Dispatch<React.SetStateAction<ConcentrationContainerType[]>>}): JSX.Element{
    const [coreCourses, setCoreCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[5].core));
    const [capstoneCourses, setCapstoneCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[5].capstone));
    const [generalCourses,setGeneralCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[5].conc.general));
    const [writingCourses, setWritingCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[5].writing));
    const [statCourses, setStatCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[5].conc.stats));

    useEffect(() => {
        props.setConcentrationContainers(

            [   
                {
                    "name": "core",
                    "courses": coreCourses,
                    "setCourses": setCoreCourses
                },
                {
                    "name": "capstone",
                    "courses": capstoneCourses,
                    "setCourses": setCapstoneCourses

                },
                {
                    "name": "general",
                    "courses": generalCourses,
                    "setCourses": setGeneralCourses
                },
                {
                    "name": "writing",
                    "courses": writingCourses,
                    "setCourses": setWritingCourses
                },
                {
                    "name": "stat",
                    "courses": statCourses,
                    "setCourses": setStatCourses
                }

            ]

        );
    }, []);
    
    
    return(
        <div>
            <h2>Networks and Systems</h2>
            <p>CISC Core and Concentration:</p>
            <CourseContainer courses={coreCourses} name="core"/>
            <CourseContainer courses={capstoneCourses} name="capstone"/>
            <CourseContainer courses={generalCourses} name="general"/>
            <p>Choose One Lab Sequence:</p>
            <p>Select One Writing Course:</p>
            <CourseContainer courses={writingCourses} name="writing"/>
            <p>Select One Statistics Course:</p>
            <CourseContainer courses={statCourses} name="stat"/>
            <p>Select One Security Requirement:</p>
            <p>Select Two Systems Requirements:</p>
            <p>Select Two of the Following:</p>
        </div>
    );
}

export function TheoryConc(props: {StringsToCourses: (stringCourses:string[]) => Course[], setConcentrationContainers: React.Dispatch<React.SetStateAction<ConcentrationContainerType[]>>}): JSX.Element{
    const [coreCourses, setCoreCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[6].core));
    const [capstoneCourses, setCapstoneCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[6].capstone));
    const [generalCourses,setGeneralCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[6].conc.general));
    const [writingCourses, setWritingCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[6].writing));
    const [statCourses, setStatCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[6].conc.stats));

    useEffect(() => {
        props.setConcentrationContainers(

            [   
                {
                    "name": "core",
                    "courses": coreCourses,
                    "setCourses": setCoreCourses
                },
                {
                    "name": "capstone",
                    "courses": capstoneCourses,
                    "setCourses": setCapstoneCourses

                },
                {
                    "name": "general",
                    "courses": generalCourses,
                    "setCourses": setGeneralCourses
                },
                {
                    "name": "writing",
                    "courses": writingCourses,
                    "setCourses": setWritingCourses
                },
                {
                    "name": "stat",
                    "courses": statCourses,
                    "setCourses": setStatCourses
                }

            ]

        );
    }, []);
    
    return(
        <div>
            <h2>Theory</h2>
            <p>CISC Core and Concentration:</p>
            <CourseContainer courses={coreCourses} name="core"/>
            <CourseContainer courses={capstoneCourses} name="capstone"/>
            <CourseContainer courses={generalCourses} name="general"/>
            <p>Choose One Lab Sequence:</p>
            <p>Select One Writing Course:</p>
            <CourseContainer courses={writingCourses} name="writing"/>
            <p>Select One Statistics Course:</p>
            <CourseContainer courses={statCourses} name="stat"/>
            <p>Select One of the Following Tracks:</p>
            <p>Select Two of the Following:</p>
        </div>
    );
}
