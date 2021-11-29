import { Accordion } from "react-bootstrap";
import CONCENTRATIONS from "../../../json/concentrations.json";
import { CourseContainer } from "../CourseContainer";
import { ConcentrationContainerType } from "../../../interfaces/concentrationcontainer";
import React, { useState, useEffect } from "react";
import { Course as Course } from "../../../interfaces/course";

export const HPCConc = (props: {
    StringsToCourses: (stringCourses: string[]) => Course[];
    setConcentrationContainers: React.Dispatch<React.SetStateAction<ConcentrationContainerType[]>>;
    }): JSX.Element => {
    const [coreCourses,
        setCoreCourses] = useState<Course[]>(props.StringsToCourses(CONCENTRATIONS[4].core));
    const [capstoneCourses,
        setCapstoneCourses] = useState<Course[]>(props.StringsToCourses(CONCENTRATIONS[4].capstone));
    const [generalCourses,
        setGeneralCourses] = useState<Course[]>(props.StringsToCourses(CONCENTRATIONS[4].conc.general));
    const [writingCourses,
        setWritingCourses] = useState<Course[]>(props.StringsToCourses(CONCENTRATIONS[4].writing));
    const [labCourses,
        setLabCourses] = useState<Course[]>(props.StringsToCourses(CONCENTRATIONS[4].lab));
    const [statCourses,
        setStatCourses] = useState<Course[]>(props.StringsToCourses(CONCENTRATIONS[4].conc.stats));
    const [electiveCourses,
        setElectiveCourses] = useState<Course[]>(props.StringsToCourses(CONCENTRATIONS[4].conc.elective));
    const [mathCourses,
        setMathCourses] = useState<Course[]>(props.StringsToCourses(CONCENTRATIONS[4].conc.data));
    const [dataCourses,
        setDataCourses] = useState<Course[]>(props.StringsToCourses(CONCENTRATIONS[4].conc.track));
    const [learningCourses,
        setLearningCourses] = useState<Course[]>(props.StringsToCourses(CONCENTRATIONS[4].conc.cybersecurity));
    const [dataTrackCourses,
        setDataTrackCourses] = useState<Course[]>(props.StringsToCourses(CONCENTRATIONS[4].conc.ochem));
    useEffect(() => {
        props.setConcentrationContainers(
            [
                {
                    courses: coreCourses,
                    name: "core",
                    setCourses: (courses: Course[]) => {
                        setCoreCourses(courses);
                    },
                },
                {
                    courses: capstoneCourses,
                    name: "capstone",
                    setCourses: (courses: Course[]) => {
                        setCapstoneCourses(courses);
                    },

                },
                {
                    courses: generalCourses,
                    name: "general",
                    setCourses: (courses: Course[]) => {
                        setGeneralCourses(courses);
                    },
                },
                {
                    courses: writingCourses,
                    name: "writing",
                    setCourses: (courses: Course[]) => {
                        setWritingCourses(courses);
                    },

                },
                {
                    courses: labCourses,
                    name: "lab-1",
                    setCourses: (courses: Course[]) => {
                        setLabCourses(courses);
                    },
                },
                {
                    courses: statCourses,
                    name: "stat",
                    setCourses: (courses: Course[]) => {
                        setStatCourses(courses);
                    },
                },
                {
                    courses: electiveCourses,
                    name: "elective",
                    setCourses: (courses: Course[]) => {
                        setElectiveCourses(courses);
                    },
                },
                {
                    courses: mathCourses,
                    name: "math",
                    setCourses: (courses: Course[]) => {
                        setMathCourses(courses);
                    },
                },
                {
                    courses: dataCourses,
                    name: "dataCourses",
                    setCourses: (courses: Course[]) => {
                        setDataCourses(courses);
                    },
                },
                { courses: learningCourses, name: "machineLearningCourses", setCourses: (courses: Course[]) => setLearningCourses(courses) },
                { courses: dataTrackCourses, name: "dataTrack", setCourses: (courses: Course[]) => setDataTrackCourses(courses) },
            ],
        );
    }, []);

    return (
        <div>
            <h2>High-Performance Computing</h2>

            <Accordion defaultActiveKey="8">

                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        CISC Core and Concentration
                    </Accordion.Header>
                    <Accordion.Body>
                        <CourseContainer courses={coreCourses} name="core" />
                        <CourseContainer courses={capstoneCourses} name="capstone" />
                        <CourseContainer courses={generalCourses} name="general" />
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                    <Accordion.Header>
                        Two Lab Courses
                    </Accordion.Header>
                    <Accordion.Body>
                        <CourseContainer courses={labCourses} name="lab-1" />
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                    <Accordion.Header>
                        One Writing
                    </Accordion.Header>
                    <Accordion.Body>
                        <CourseContainer courses={writingCourses} name="writing" />
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

                                    <CourseContainer courses={electiveCourses} name="elective" />
                                    <CourseContainer courses={mathCourses} name="math" />
                                    <CourseContainer courses={statCourses} name="stat" />

                                </Accordion.Body>

                            </Accordion.Item>
                            <Accordion.Item eventKey="5">

                                <Accordion.Header>
                                    Data Track
                                </Accordion.Header>
                                <Accordion.Body>
                                    <CourseContainer courses={dataCourses} name="dataCourses" />
                                    <CourseContainer courses={dataTrackCourses} name="dataTrack" />
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
                        <CourseContainer courses={learningCourses} name="machineLearningCourses" />
                    </Accordion.Body>

                </Accordion.Item>

            </Accordion>
        </div>
    );
};
