import React from "react";
import { Accordion } from "react-bootstrap";
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
    const [labCourses,setLabCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[0].lab));

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
                },
                {
                    "name": "lab",
                    "courses": labCourses,
                    "setCourses": setLabCourses
                }

            ]

        );
    },[]);

    return<div>
        <h2>Artificial Intelligence and Robotics</h2>
        <Accordion defaultActiveKey="8">

            <Accordion.Item eventKey="0">
                <Accordion.Header>CISC Core and Concentration</Accordion.Header>
                <Accordion.Body>
                    <CourseContainer courses={coreCourses} name={"core"}  />
                    <CourseContainer courses={capstone1Courses} name={"capstone-1"} />
                    <CourseContainer courses={general1Courses} name={"general-1"} />
                </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
                <Accordion.Header>Two-Course Lab Sequence</Accordion.Header>
                <Accordion.Body>
                    <CourseContainer courses={labCourses} name={"lab-1"} />
                </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
                <Accordion.Header>Writing Course</Accordion.Header>
                <Accordion.Body>
                    <CourseContainer courses={writingCourses} name={"writing"} />
                </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="3">
                <Accordion.Header>Statistics Course</Accordion.Header>
                <Accordion.Body>
                    <CourseContainer courses={capstone2Courses} name={"capstone-2"} />
                </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="4">
                <Accordion.Header>Systems Course</Accordion.Header>
                <Accordion.Body>
                    <CourseContainer courses={general2Courses} name={"general-2"} />
                </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="5">
                <Accordion.Header>Electives(Select Four)</Accordion.Header>
                <Accordion.Body>
                    <CourseContainer courses={electiveCourses} name={"elective"} />
                </Accordion.Body>
            </Accordion.Item>

        </Accordion>
    </div>;
}

export function BioConc(props: {StringsToCourses: (stringCourses:string[]) => Course[], setConcentrationContainers: React.Dispatch<React.SetStateAction<ConcentrationContainerType[]>>}): JSX.Element{
    const [coreCourses, setCoreCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[1].core));
    const [capstoneCourses, setCapstoneCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[1].capstone));
    const [generalCourses,setGeneralCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[1].conc.general));
    const [writingCourses, setWritingCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[1].writing));
    const [statCourses, setStatCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[1].conc.stats));
    const [labCourses,setLabCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[1].lab));
    const [ochemCourses,setOchemCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[1].conc.ochem));
    const [electiveCourses,setElectiveCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[1].conc.elective));
    const [dataCourses,setDataCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[1].conc.data));
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
                },
                {
                    "name": "lab",
                    "courses": labCourses,
                    "setCourses": setLabCourses
                },
                {
                    "name": "electives",
                    "courses": electiveCourses,
                    "setCourses": setElectiveCourses
                },
                {
                    "name": "data science",
                    "courses": dataCourses,
                    "setCourses": setDataCourses
                },
                {
                    "name": "ochem",
                    "courses": ochemCourses,
                    "setCourses": setOchemCourses
                }

            ]

        );
    }, []);

    /*

        <Accordion defaultActiveKey="0">

            <Accordion.Item eventKey="0">

                <Accordion.Header>

                </Accordion.Header>

                <Accordion.Body>

                    

                </Accordion.Body>

            </Accordion.Item>

        </Accordion>


    */

    return(
        <div>
            <h2>Bioinformatics</h2>
            <Accordion defaultActiveKey="8">

                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        CISC Core and Concentration
                    </Accordion.Header>
                    <Accordion.Body>
                        <CourseContainer courses={coreCourses} name="core"/>
                        <CourseContainer courses={capstoneCourses} name="capstone"/>
                        <CourseContainer courses={generalCourses} name="general"/>
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                    <Accordion.Header>
                        Chem Sequence
                    </Accordion.Header>
                    <Accordion.Body>
                        <CourseContainer courses={labCourses} name={"lab-1"} />
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                    <Accordion.Header>
                        One Organic Chem Sequence
                    </Accordion.Header>
                    <Accordion.Body>
                        <CourseContainer courses={ochemCourses} name={"ochem-1"} />
                    </Accordion.Body>
                </Accordion.Item>


                <Accordion.Item eventKey="3">
                    <Accordion.Header>
                        Writing Course
                    </Accordion.Header>
                    <Accordion.Body>
                        <CourseContainer courses={writingCourses} name="writing"/>
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="4">
                    <Accordion.Header>
                        One Statistics Course
                    </Accordion.Header>
                    <Accordion.Body>
                        <CourseContainer courses={statCourses} name="stat"/>
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="5">

                    <Accordion.Header>
                        One Data Analysis Course
                    </Accordion.Header>

                    <Accordion.Body>

                        <CourseContainer courses={dataCourses} name="data"/> 

                    </Accordion.Body>

                </Accordion.Item>

                <Accordion.Item eventKey="6">

                    <Accordion.Header>
                        Two Electives
                    </Accordion.Header>

                    <Accordion.Body>

                        <CourseContainer courses={electiveCourses} name="electives"/>

                    </Accordion.Body>

                </Accordion.Item>

                

            </Accordion>

        </div>
    );
}

export function SecurityConc(props: {StringsToCourses: (stringCourses:string[]) => Course[], setConcentrationContainers: React.Dispatch<React.SetStateAction<ConcentrationContainerType[]>>}): JSX.Element{
    const [coreCourses, setCoreCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[2].core));
    const [capstoneCourses, setCapstoneCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[2].capstone));
    const [generalCourses,setGeneralCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[2].conc.general));
    const [writingCourses, setWritingCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[2].writing));
    const [statCourses, setStatCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[2].conc.stats));
    const [labCourses,setLabCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[2].lab));
    const [electiveCourses,setElectiveCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[2].conc.elective));
    const [secCourses,setSecCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[2].conc.cybersecurity));

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
                },
                {
                    "name": "lab",
                    "courses": labCourses,
                    "setCourses": setLabCourses
                },
                {
                    "name": "electives",
                    "courses": electiveCourses,
                    "setCourses": setElectiveCourses
                },
                {
                    "name": "cybersecurity",
                    "courses": secCourses,
                    "setCourses": setSecCourses
                }

            ]

        );
    }, []);
    
    return(
        <div>
            <h2>Cybersecurity</h2>
            <Accordion defaultActiveKey="8">

                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        CISC Core and Concentration
                    </Accordion.Header>
                    <Accordion.Body>
                        <CourseContainer courses={coreCourses} name="core"/>
                        <CourseContainer courses={capstoneCourses} name="capstone"/>
                        <CourseContainer courses={generalCourses} name="general"/>
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                    <Accordion.Header>
                        Two Lab Courses
                    </Accordion.Header>
                    <Accordion.Body>
                        <CourseContainer courses={labCourses} name={"lab-1"} />
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                    <Accordion.Header>
                        One Writing
                    </Accordion.Header>
                    <Accordion.Body>
                        <CourseContainer courses={writingCourses} name="writing"/>
                    </Accordion.Body>
                </Accordion.Item>


                <Accordion.Item eventKey="3">
                    <Accordion.Header>
                        Statistics Course
                    </Accordion.Header>
                    <Accordion.Body>
                        <CourseContainer courses={statCourses} name="stats"/>
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="4">
                    <Accordion.Header>
                        Two Advanced Requirements
                    </Accordion.Header>
                    <Accordion.Body>
                        <CourseContainer courses={secCourses} name="security"/>
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="5">

                    <Accordion.Header>
                        Two Electives
                    </Accordion.Header>

                    <Accordion.Body>

                        <CourseContainer courses={electiveCourses} name="electives"/>

                    </Accordion.Body>

                </Accordion.Item>



            </Accordion>


        </div>
    );
}

export function DataScienceConc(props: {StringsToCourses: (stringCourses:string[]) => Course[], setConcentrationContainers: React.Dispatch<React.SetStateAction<ConcentrationContainerType[]>>}): JSX.Element{
    const [coreCourses, setCoreCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[3].core));
    const [capstoneCourses, setCapstoneCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[3].capstone));
    const [generalCourses,setGeneralCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[3].conc.general));
    const [writingCourses, setWritingCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[3].writing));
    const [labCourses,setLabCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[3].lab));
    const [dataCourses,setDataCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[3].conc.data));
    const [mathCourses,setMathCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[3].conc.stats));
    const [electiveCourses,setElectiveCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[3].conc.elective));

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
                    "name": "lab",
                    "courses": labCourses,
                    "setCourses": setLabCourses
                },
                {
                    "name": "electives",
                    "courses": electiveCourses,
                    "setCourses": setElectiveCourses
                },
                {
                    "name": "data science",
                    "courses": dataCourses,
                    "setCourses": setDataCourses
                },
                {
                    "name": "math",
                    "courses": mathCourses,
                    "setCourses": setMathCourses
                }

            ]

        );
    }, []);
    
    return<div>
        <h2>Data Science</h2>
        <p>CISC Core and Concentration:</p>
        <CourseContainer courses={coreCourses} name="core"/>
        <CourseContainer courses={capstoneCourses} name="capstone"/>
        <CourseContainer courses={generalCourses} name="general"/>
        <p>Choose a Two-Course Lab Sequence:</p>
        <CourseContainer courses={labCourses} name={"lab-1"} />
        <p>Select One Writing Course:</p>
        <CourseContainer courses={writingCourses} name="writing"/>
        <p>Select One Advanced Data Science:</p>
        <CourseContainer courses={dataCourses} name="data science"/>
        <p>Select One Advanced Math:</p>
        <CourseContainer courses={mathCourses} name="math"/>
        <p>Select One of the Following:</p>
        <CourseContainer courses={electiveCourses} name="electives"/>
    </div>;
}

export function HPCConc(props: {StringsToCourses: (stringCourses:string[]) => Course[], setConcentrationContainers: React.Dispatch<React.SetStateAction<ConcentrationContainerType[]>>}): JSX.Element{
    const [coreCourses, setCoreCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[4].core));
    const [capstoneCourses, setCapstoneCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[4].capstone));
    const [generalCourses,setGeneralCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[4].conc.general));
    const [writingCourses, setWritingCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[4].writing));
    const [labCourses,setLabCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[4].lab));
    const [statCourses, setStatCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[4].conc.stats));
    const [electiveCourses,setElectiveCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[4].conc.elective));
    const [mathCourses,setMathCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[4].conc.data));
    const [dataCourses,setDataCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[4].conc.track));
    const [learningCourses,setLearningCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[4].conc.cybersecurity));
    const [dataTrackCourses,setDataTrackCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[4].conc.ochem));
    
    
    //Note: It'd be a real hassle to redesign the json to accomadate everything in here, so the HPC json is kind of
    //a mess.

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
                    "name": "lab",
                    "courses": labCourses,
                    "setCourses": setLabCourses
                },
                {
                    "name": "stats",
                    "courses": statCourses,
                    "setCourses": setStatCourses
                },
                {
                    "name": "elective",
                    "courses": electiveCourses,
                    "setCourses": setElectiveCourses
                },
                {
                    "name": "math",
                    "courses": mathCourses,
                    "setCourses": setMathCourses
                },
                {
                    "name": "data",
                    "courses": dataCourses,
                    "setCourses": setDataCourses
                },
                {
                    "name": "machine learning",
                    "courses": learningCourses,
                    "setCourses": setLearningCourses
                },
                {
                    "name": "data track",
                    "courses": dataTrackCourses,
                    "setCourses": setDataTrackCourses
                }

            ]

        );
    
    },[]);


    return<div>
        <h2>High-Performance Computing</h2>
        <p>CISC Core and Concentration:</p>
        <CourseContainer courses={coreCourses} name="core"/>
        <CourseContainer courses={capstoneCourses} name="capstone"/>
        <CourseContainer courses={generalCourses} name="general"/>
        <p>Choose a Two-Course Lab Sequence:</p>
        <CourseContainer courses={labCourses} name={"lab-1"} />
        <p>Select One Writing Course:</p>
        <CourseContainer courses={writingCourses} name="writing"/>
        <h5>Choose one of the follwing tracks:</h5>
        <h5>Applied Math Track</h5>
        <CourseContainer courses={electiveCourses} name="elecitve"/>
        <CourseContainer courses={mathCourses} name="elecitve"/>
        <CourseContainer courses={statCourses} name="MATH"/>
        <h5>Data Track</h5>
        <CourseContainer courses={dataCourses} name="data"/>
        <CourseContainer courses={dataTrackCourses} name="data"/>
        <p>Choose one Machine Learning Course:</p>
        <CourseContainer courses={learningCourses} name="data"/>
    </div>;
}

export function NetworksConc(props: {StringsToCourses: (stringCourses:string[]) => Course[], setConcentrationContainers: React.Dispatch<React.SetStateAction<ConcentrationContainerType[]>>}): JSX.Element{
    const [coreCourses, setCoreCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[5].core));
    const [capstoneCourses, setCapstoneCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[5].capstone));
    const [generalCourses,setGeneralCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[5].conc.general));
    const [writingCourses, setWritingCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[5].writing));
    const [statCourses, setStatCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[5].conc.stats));
    const [labCourses,setLabCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[5].lab));
    const [secCourses,setSecCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[5].conc.cybersecurity));
    const [systemsCourses,setSystemsCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[5].conc.systems));
    const [electiveCourses,setElectiveCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[5].conc.elective));

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
                },
                {
                    "name": "lab",
                    "courses": labCourses,
                    "setCourses": setLabCourses
                },
                {
                    "name": "security",
                    "courses": secCourses,
                    "setCourses": setSecCourses
                },
                {
                    "name": "systems",
                    "courses": systemsCourses,
                    "setCourses": setSystemsCourses
                },
                {
                    "name": "electives",
                    "courses": electiveCourses,
                    "setCourses": setElectiveCourses
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
            <p>Choose a Two-Course Lab Sequence:</p>
            <CourseContainer courses={labCourses} name={"lab-1"} />
            <p>Select One Writing Course:</p>
            <CourseContainer courses={writingCourses} name="writing"/>
            <p>Select One Statistics Course:</p>
            <CourseContainer courses={statCourses} name="stat"/>
            <p>Select One Security Requirement:</p>
            <CourseContainer courses={secCourses} name="stat"/>
            <p>Select Two Systems Requirements:</p>
            <CourseContainer courses={systemsCourses} name="stat"/>
            <p>Select Two of the Following:</p>
            <CourseContainer courses={electiveCourses} name="stat"/>
        </div>
    );
}

export function TheoryConc(props: {StringsToCourses: (stringCourses:string[]) => Course[], setConcentrationContainers: React.Dispatch<React.SetStateAction<ConcentrationContainerType[]>>}): JSX.Element{
    const [coreCourses, setCoreCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[6].core));
    const [capstoneCourses, setCapstoneCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[6].capstone));
    const [generalCourses,setGeneralCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[6].conc.general));
    const [writingCourses, setWritingCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[6].writing));
    const [statCourses, setStatCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[6].conc.stats));
    const [labCourses,setLabCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[6].lab));
    const [discCourses,setDiscCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[6].conc.track));
    const [contCourses,setContCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[6].conc.cybersecurity));

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
                },
                {
                    "name": "lab",
                    "courses": labCourses,
                    "setCourses": setLabCourses
                }
                ,
                {
                    "name": "discTrack",
                    "courses": discCourses,
                    "setCourses": setDiscCourses
                }
                ,
                {
                    "name": "contTrack",
                    "courses": contCourses,
                    "setCourses": setContCourses
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
            <p>Choose a Two-Course Lab Sequence:</p>
            <CourseContainer courses={labCourses} name={"lab-1"} />
            <p>Select One Writing Course:</p>
            <CourseContainer courses={writingCourses} name="writing"/>
            <p>Select One Statistics Course:</p>
            <CourseContainer courses={statCourses} name="stat"/>
            <h5>Select One of the Following Four-Course Tracks:</h5>
            <p>Discrete:</p>
            <CourseContainer courses={discCourses} name="stat"/>
            <p>Continuous:</p>
            <CourseContainer courses={contCourses} name="stat"/>

        </div>
    );
}
