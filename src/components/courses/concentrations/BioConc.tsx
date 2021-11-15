import { Accordion } from "react-bootstrap";
import CONCENTRATIONS from "../../../json/concentrations.json";
import { CourseContainer } from "../CourseContainer";
import { ConcentrationContainerType } from "../../../interfaces/concentrationcontainer";
import React, { useState, useEffect } from "react";
import { Course as CourseType } from "../../../interfaces/course";

export const BioConc = (props: { StringsToCourses: (
        stringCourses: string[]) => CourseType[];
        setConcentrationContainers: React.Dispatch<React.SetStateAction<ConcentrationContainerType[]>>;
    }): JSX.Element => {
    const [coreCourses,
        setCoreCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[1].core));
    const [capstoneCourses,
        setCapstoneCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[1].capstone));
    const [generalCourses,
        setGeneralCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[1].conc.general));
    const [writingCourses,
        setWritingCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[1].writing));
    const [statCourses,
        setStatCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[1].conc.stats));
    const [labCourses,
        setLabCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[1].lab));
    const [ochemCourses,
        setOchemCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[1].conc.ochem));
    const [electiveCourses,
        setElectiveCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[1].conc.elective));
    const [dataCourses,
        setDataCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[1].conc.data));
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
                    courses: ochemCourses,
                    name: "ochem",
                    setCourses: setOchemCourses,
                },

            ],

        );
    }, []);

    return (
        <div>
            <h2>Bioinformatics</h2>
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
                        Chem Sequence
                    </Accordion.Header>
                    <Accordion.Body>
                        <CourseContainer courses={labCourses} name="lab-1" />
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                    <Accordion.Header>
                        One Organic Chem Sequence
                    </Accordion.Header>
                    <Accordion.Body>
                        <CourseContainer courses={ochemCourses} name="ochem-1" />
                    </Accordion.Body>
                </Accordion.Item>


                <Accordion.Item eventKey="3">
                    <Accordion.Header>
                        Writing Course
                    </Accordion.Header>
                    <Accordion.Body>
                        <CourseContainer courses={writingCourses} name="writing" />
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="4">
                    <Accordion.Header>
                        One Statistics Course
                    </Accordion.Header>
                    <Accordion.Body>
                        <CourseContainer courses={statCourses} name="stat" />
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="5">

                    <Accordion.Header>
                        One Data Analysis Course
                    </Accordion.Header>

                    <Accordion.Body>

                        <CourseContainer courses={dataCourses} name="data" />

                    </Accordion.Body>

                </Accordion.Item>

                <Accordion.Item eventKey="6">

                    <Accordion.Header>
                        Two Electives
                    </Accordion.Header>

                    <Accordion.Body>

                        <CourseContainer courses={electiveCourses} name="electives" />

                    </Accordion.Body>

                </Accordion.Item>

            </Accordion>

        </div>
    );
};
