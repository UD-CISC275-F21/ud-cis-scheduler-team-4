import { Accordion } from "react-bootstrap";
import CONCENTRATIONS from "../../../json/concentrations.json";
import { CourseContainer } from "../CourseContainer";
import { ConcentrationContainerType } from "../../../interfaces/concentrationcontainer";
import React, { useState, useEffect, useReducer } from "react";
import { Course } from "../../../interfaces/course";
import { SavedProgress } from "../../../interfaces/savedprogress";
import { StringsToCourses } from "../DisplayCourseListHelperFunctions/StringsToCourses";
import { UseDispatchContext, UseStateContext } from "../../MainPage";


export const AIConc = (): JSX.Element => {
    
    const { state } = UseStateContext();
    const { dispatch } = UseDispatchContext();

    useEffect(() => {
        dispatch({type: "updateConcentrationContainers", payload: {
            ...state,
            concentrationContainers:
            [ 
                {
                    name: "core",
                    courses: StringsToCourses(CONCENTRATIONS[0].core)
                },
                {
                    name: "capstone-1",
                    courses: StringsToCourses(CONCENTRATIONS[0].capstone)
                },
                {
                    name: "general-1",
                    courses: StringsToCourses(CONCENTRATIONS[0].conc.general)
                },
                {
                    name: "writing",
                    courses: StringsToCourses(CONCENTRATIONS[0].writing)
                },
                {
                    name: "capstone-2",
                    courses: StringsToCourses(CONCENTRATIONS[0].conc.stats)
                },
                {
                    name: "general-2",
                    courses: StringsToCourses(CONCENTRATIONS[0].conc.systems)
                },
                {
                    name: "elective",
                    courses: StringsToCourses(CONCENTRATIONS[0].conc.elective)
                },
                {
                    name: "lab-1",
                    courses: StringsToCourses(CONCENTRATIONS[0].lab)
                }
            ]
        }});
    },[]);

    useEffect(() => {
        if (state.concentrationContainers !== undefined) {
            const x = 10;
        }
    }, [state.concentrationContainers]);

    return (
        state.concentrationContainers.length !== 0 ?
            <div>
                <h2>Artificial Intelligence and Robotics</h2>
                <Accordion defaultActiveKey="8">

                    <Accordion.Item eventKey="0">
                        <Accordion.Header>CISC Core and Concentration</Accordion.Header>
                        <Accordion.Body>
                            <CourseContainer courses={state.concentrationContainers[0].courses} name="core" />
                            <CourseContainer courses={state.concentrationContainers[1].courses} name="capstone-1" />
                            <CourseContainer courses={state.concentrationContainers[2].courses} name="general-1" />
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Two-Course Lab Sequence</Accordion.Header>
                        <Accordion.Body>
                            <CourseContainer courses={state.concentrationContainers[7].courses} name="lab-1" />
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Writing Course</Accordion.Header>
                        <Accordion.Body>
                            <CourseContainer courses={state.concentrationContainers[3].courses} name="writing" />
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="3">
                        <Accordion.Header>Statistics Course</Accordion.Header>
                        <Accordion.Body>
                            <CourseContainer courses={state.concentrationContainers[4].courses} name="capstone-2" />
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="4">
                        <Accordion.Header>Systems Course</Accordion.Header>
                        <Accordion.Body>
                            <CourseContainer courses={state.concentrationContainers[5].courses} name="general-2" />
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="5">
                        <Accordion.Header>Electives(Select Four)</Accordion.Header>
                        <Accordion.Body>
                            <CourseContainer courses={state.concentrationContainers[6].courses} name="elective" />
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
