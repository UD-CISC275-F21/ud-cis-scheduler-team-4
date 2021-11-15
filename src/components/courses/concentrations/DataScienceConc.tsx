import { Accordion } from "react-bootstrap";
import CONCENTRATIONS from "../../../json/concentrations.json";
import { CourseContainer } from "../CourseContainer";
import { ConcentrationContainerType } from "../../../interfaces/concentrationcontainer";
import React, { useState, useEffect } from "react";
import { Course as CourseType } from "../../../interfaces/course";


export const DataScienceConc = (props: {
    StringsToCourses: (stringCourses: string[]) => CourseType[];
    setConcentrationContainers: React.Dispatch<React.SetStateAction<ConcentrationContainerType[]>>;
    }): JSX.Element => {
    const [coreCourses,
        setCoreCourses] = useState<CourseType[]>(props.StringsToCourses(
            CONCENTRATIONS[3].core));
    const [capstoneCourses,
        setCapstoneCourses] = useState<CourseType[]>(props.StringsToCourses(
            CONCENTRATIONS[3].capstone));
    const [generalCourses,
        setGeneralCourses] = useState<CourseType[]>(props.StringsToCourses(
            CONCENTRATIONS[3].conc.general));
    const [writingCourses,
        setWritingCourses] = useState<CourseType[]>(props.StringsToCourses(
            CONCENTRATIONS[3].writing));
    const [labCourses,
        setLabCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[3].lab));
    const [dataCourses,
        setDataCourses] = useState<CourseType[]>(props.StringsToCourses(
            CONCENTRATIONS[3].conc.data));
    const [mathCourses,
        setMathCourses] = useState<CourseType[]>(props.StringsToCourses(
            CONCENTRATIONS[3].conc.stats));
    const [electiveCourses,
        setElectiveCourses] = useState<CourseType[]>(props.StringsToCourses(
            CONCENTRATIONS[3].conc.elective));

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
                    courses: labCourses,
                    name: "lab",
                    setCourses: setLabCourses,
                },
                {
                    courses: electiveCourses,
                    name: "electives",
                    setCourses: setElectiveCourses,
                },
                {
                    courses: dataCourses,
                    name: "data science",
                    setCourses: setDataCourses,
                },
                {
                    courses: mathCourses,
                    name: "math",
                    setCourses: setMathCourses,
                },

            ],

        );
    }, []);
    return (
        <div>
            <h2>Data Science</h2>

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
                        One Data Course
                    </Accordion.Header>
                    <Accordion.Body>
                        <CourseContainer courses={dataCourses} name="datascience" />
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="4">
                    <Accordion.Header>
                        One Advanced Math
                    </Accordion.Header>
                    <Accordion.Body>
                        <CourseContainer courses={mathCourses} name="math" />
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="5">

                    <Accordion.Header>
                        One Elective
                    </Accordion.Header>

                    <Accordion.Body>

                        <CourseContainer courses={electiveCourses} name="electives" />

                    </Accordion.Body>

                </Accordion.Item>



            </Accordion>


        </div>
    );
};
