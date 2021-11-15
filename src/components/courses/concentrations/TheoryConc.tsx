import { Accordion } from "react-bootstrap";
import CONCENTRATIONS from "../../../json/concentrations.json";
import { CourseContainer } from "../CourseContainer";
import { ConcentrationContainerType } from "../../../interfaces/concentrationcontainer";
import React, { useState, useEffect } from "react";
import { Course as CourseType } from "../../../interfaces/course";

export const TheoryConc = (props: {
    StringsToCourses: (stringCourses: string[]) => CourseType[];
    setConcentrationContainers: React.Dispatch<React.SetStateAction<ConcentrationContainerType[]>>;
    }): JSX.Element => {
    const [coreCourses,
        setCoreCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[6].core));
    const [capstoneCourses,
        setCapstoneCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[6].capstone));
    const [generalCourses,
        setGeneralCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[6].conc.general));
    const [writingCourses,
        setWritingCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[6].writing));
    const [statCourses,
        setStatCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[6].conc.stats));
    const [labCourses,
        setLabCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[6].lab));
    const [discCourses,
        setDiscCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[6].conc.track));
    const [contCourses,
        setContCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[6].conc.cybersecurity));

    useEffect(() => {
        props.setConcentrationContainers(

            [
                {
                    courses: coreCourses,
                    name: "core",
                    setCourses: setCoreCourses,
                },
                {
                    courses: capstoneCourses,
                    name: "capstone",
                    setCourses: setCapstoneCourses,

                },
                {
                    courses: generalCourses,
                    name: "general",
                    setCourses: setGeneralCourses,
                },
                {
                    courses: writingCourses,
                    name: "writing",
                    setCourses: setWritingCourses,
                },
                {
                    courses: statCourses,
                    name: "stat",
                    setCourses: setStatCourses,
                },
                {
                    courses: labCourses,
                    name: "lab",
                    setCourses: setLabCourses,
                },
                {
                    courses: discCourses,
                    name: "discTrack",
                    setCourses: setDiscCourses,
                },
                {
                    courses: contCourses,
                    name: "contTrack",
                    setCourses: setContCourses,
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
};
