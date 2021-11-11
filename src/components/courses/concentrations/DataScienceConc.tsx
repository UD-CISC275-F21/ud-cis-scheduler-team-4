import { Accordion } from "react-bootstrap";
import CONCENTRATIONS from "../../../json/concentrations.json";
import { CourseContainer } from "../CourseContainer";
import { ConcentrationContainerType } from "../../../interfaces/concentrationcontainer";
import React, { useState, useEffect } from "react";
import { Course as CourseType } from "../../../interfaces/course";


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
                    One Data Course
                </Accordion.Header>
                <Accordion.Body>
                    <CourseContainer courses={dataCourses} name="data science"/>
                </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="4">
                <Accordion.Header>
                    One Advanced Math
                </Accordion.Header>
                <Accordion.Body>
                    <CourseContainer courses={mathCourses} name="math"/>
                </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="5">

                <Accordion.Header>
                    One Elective
                </Accordion.Header>

                <Accordion.Body>

                    <CourseContainer courses={electiveCourses} name="electives"/>

                </Accordion.Body>

            </Accordion.Item>



        </Accordion>


    </div>;
}