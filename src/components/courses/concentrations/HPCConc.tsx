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
    const index = state.saveData.findIndex((eachSaveData) => eachSaveData.concentration.name === "High-Performance Computing");
    
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
                    courses: StringsToCourses(state.saveData[index].concentration.conc.stats)
                },
                {
                    name: "elective",
                    courses: StringsToCourses(state.saveData[index].concentration.conc.elective)
                },
                {
                    name: "math",
                    courses: StringsToCourses(state.saveData[index].concentration.conc.data)
                },
                {
                    name: "dataCourses",
                    courses: StringsToCourses(state.saveData[index].concentration.conc.ochem)
                },
                {
                    name: "machineLearningCourses",
                    courses: StringsToCourses(state.saveData[index].concentration.conc.cybersecurity)
                },
                {
                    name: "dataTrack",
                    courses: StringsToCourses(state.saveData[index].concentration.conc.ochem)
                }

            ]

        }});
        return() => {
            dispatch({type: "saveHPC", payload: { ...state, sourceContainerIndex: index }});
        };
    },[]);

    return (
        state.concentrationContainers.length >= 10 ?
            <div>
                <h2>High-Performance Computing</h2>

                <Accordion defaultActiveKey="8">

                    <Accordion.Item eventKey="0">
                        <Accordion.Header>
                            CISC Core and Concentration
                        </Accordion.Header>
                        <Accordion.Body>
                            <CourseContainer courses={state.concentrationContainers[0].courses} name="core" />
                            <CourseContainer courses={state.concentrationContainers[1].courses} name="capstone" />
                            <CourseContainer courses={state.concentrationContainers[2].courses} name="general" />
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="1">
                        <Accordion.Header>
                            Two Lab Courses
                        </Accordion.Header>
                        <Accordion.Body>
                            <CourseContainer courses={state.concentrationContainers[4].courses} name="lab-1" />
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="2">
                        <Accordion.Header>
                            One Writing
                        </Accordion.Header>
                        <Accordion.Body>
                            <CourseContainer courses={state.concentrationContainers[3].courses} name="writing" />
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

                                        <CourseContainer courses={state.concentrationContainers[6].courses} name="elective" />
                                        <CourseContainer courses={state.concentrationContainers[7].courses} name="math" />
                                        <CourseContainer courses={state.concentrationContainers[5].courses} name="stat" />

                                    </Accordion.Body>

                                </Accordion.Item>
                                <Accordion.Item eventKey="5">

                                    <Accordion.Header>
                                        Data Track
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <CourseContainer courses={state.concentrationContainers[8].courses} name="dataCourses" />
                                        <CourseContainer courses={state.concentrationContainers[10].courses} name="dataTrack" />
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
                            <CourseContainer courses={state.concentrationContainers[9].courses} name="machineLearningCourses" />
                        </Accordion.Body>

                    </Accordion.Item>

                </Accordion>
            </div>
            :
            <div>
                Concentration Unavailable
            </div>
    );
};
