import { Accordion } from "react-bootstrap";
import CONCENTRATIONS from "../../../json/concentrations.json";
import { CourseContainer } from "../CourseContainer";
import { ConcentrationContainerType } from "../../../interfaces/concentrationcontainer";
import React, { useState, useEffect } from "react";
import { Course as Course } from "../../../interfaces/course";

export const TheoryConc = (props: {
    StringsToCourses: (stringCourses: string[]) => Course[];
    setConcentrationContainers: (concentrationContainers: ConcentrationContainerType[]) => void;
    }): void => {
    /*
    const [coreCourses,
        setCoreCourses] = useState<Course[]>(props.StringsToCourses(CONCENTRATIONS[6].core));
    const [capstoneCourses,
        setCapstoneCourses] = useState<Course[]>(props.StringsToCourses(CONCENTRATIONS[6].capstone));
    const [generalCourses,
        setGeneralCourses] = useState<Course[]>(props.StringsToCourses(CONCENTRATIONS[6].conc.general));
    const [writingCourses,
        setWritingCourses] = useState<Course[]>(props.StringsToCourses(CONCENTRATIONS[6].writing));
    const [statCourses,
        setStatCourses] = useState<Course[]>(props.StringsToCourses(CONCENTRATIONS[6].conc.stats));
    const [labCourses,
        setLabCourses] = useState<Course[]>(props.StringsToCourses(CONCENTRATIONS[6].lab));
    const [discCourses,
        setDiscCourses] = useState<Course[]>(props.StringsToCourses(CONCENTRATIONS[6].conc.track));
    const [contCourses,
        setContCourses] = useState<Course[]>(props.StringsToCourses(CONCENTRATIONS[6].conc.cybersecurity));

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
                    courses: statCourses,
                    name: "stat",
                    setCourses: (courses: Course[]) => {
                        setStatCourses(courses);
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
                    courses: discCourses,
                    name: "discrete",
                    setCourses: (courses: Course[]) => {
                        setDiscCourses(courses);
                    },
                },
                {
                    courses: contCourses,
                    name: "continuous",
                    setCourses: (courses: Course[]) => {
                        setContCourses(courses);
                    },
                },
            ],
        );
    }, []);
    return (
        <div>
            <h2>Theory</h2>

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
                        One Statistics Course
                    </Accordion.Header>
                    <Accordion.Body>
                        <CourseContainer courses={statCourses} name="stat" />
                    </Accordion.Body>
                </Accordion.Item>


                <Accordion.Item eventKey="4">

                    <Accordion.Header>
                        Select One of the Four-Course Tracks
                    </Accordion.Header>
                    <Accordion.Body>

                        <Accordion>

                            <Accordion.Item eventKey="5">

                                <Accordion.Header>
                                    Discrete
                                </Accordion.Header>
                                <Accordion.Body>
                                    <CourseContainer courses={discCourses} name="discrete" />
                                </Accordion.Body>

                            </Accordion.Item>

                            <Accordion.Item eventKey="6">

                                <Accordion.Header>
                                    Continuous
                                </Accordion.Header>
                                <Accordion.Body>
                                    <CourseContainer courses={contCourses} name="continuous" />
                                </Accordion.Body>

                            </Accordion.Item>

                        </Accordion>

                    </Accordion.Body>

                </Accordion.Item>


            </Accordion>

        </div>
    );
    */
};
