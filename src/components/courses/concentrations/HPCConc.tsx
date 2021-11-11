import { Accordion } from "react-bootstrap";
import CONCENTRATIONS from "../../../json/concentrations.json";
import { CourseContainer } from "../CourseContainer";
import { ConcentrationContainerType } from "../../../interfaces/concentrationcontainer";
import React, { useState, useEffect } from "react";
import { Course as CourseType } from "../../../interfaces/course";

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
                    Choose one of the tracks
                </Accordion.Header>
                <Accordion.Body>

                    <Accordion>

                        <Accordion.Item eventKey="4">

                            <Accordion.Header>
                                Applied Math
                            </Accordion.Header>
                            <Accordion.Body>

                                <CourseContainer courses={electiveCourses} name="elecitve"/>
                                <CourseContainer courses={mathCourses} name="elecitve"/>
                                <CourseContainer courses={statCourses} name="MATH"/>

                            </Accordion.Body>

                        </Accordion.Item>
                        <Accordion.Item eventKey="5">

                            <Accordion.Header>
                                Data Track
                            </Accordion.Header>
                            <Accordion.Body>
                                <CourseContainer courses={dataCourses} name="data"/>
                                <CourseContainer courses={dataTrackCourses} name="data"/>
                            </Accordion.Body>

                        </Accordion.Item>

                    </Accordion>

                </Accordion.Body>

            </Accordion.Item>

            <Accordion.Item eventKey="6">

                <Accordion.Header>
                    One Machine Learning
                </Accordion.Header>
                <Accordion.Body>
                    <CourseContainer courses={learningCourses} name="data"/>
                </Accordion.Body>

            </Accordion.Item>



        </Accordion>
    </div>;
}