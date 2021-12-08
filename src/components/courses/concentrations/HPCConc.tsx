import { Accordion } from "react-bootstrap";
import CONCENTRATIONS from "../../../json/concentrations.json";
import { CourseContainer } from "../CourseContainer";
import { ConcentrationContainerType } from "../../../interfaces/concentrationcontainer";
import React, { useState, useEffect } from "react";
import { Course as Course } from "../../../interfaces/course";
import { UseStateContext } from "../../util/DispatchLogic/UseStateContext";
import { UseDispatchContext } from "../../util/DispatchLogic/UseDispatchContext";
import { StringsToCourses } from "../DisplayCourseListHelperFunctions/StringsToCourses";

export const HPCConc = (): JSX.Element => {
    const { state } = UseStateContext();
    const { dispatch } = UseDispatchContext();
    const index = state.saveData.findIndex((eachSaveData) => eachSaveData.concentration.name === "Cybersecurity");
    
    useEffect(() => {

        dispatch({type: "updateConcentrationContainers", payload: {

            ...state,
            concentrationContainers: [

                {
                    name: "core",
                    courses: StringsToCourses(state.saveData[index].concentration.core)
                },
                {
                    name: "capstone",
                    courses: StringsToCourses(state.saveData[index].concentration.capstone)
                },
                {
                    name: "general",
                    courses: StringsToCourses(state.saveData[index].concentration.conc.general)
                },
                {
                    name: "writing",
                    courses: StringsToCourses(state.saveData[index].concentration.writing)
                },
                {
                    name: "lab-1",
                    courses: StringsToCourses(state.saveData[index].concentration.lab)
                },
                {
                    name: "stat",
                }

            ]

        }})

    })

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
    */
};
