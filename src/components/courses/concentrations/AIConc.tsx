import { Accordion } from "react-bootstrap";
import { CourseContainer } from "../CourseContainer";
import React, { useEffect } from "react";
import { StringsToCourses } from "../DisplayCourseListHelperFunctions/StringsToCourses";
import { UseDispatchContext } from "../../util/DispatchLogic/UseDispatchContext";
import { UseStateContext } from "../../util/DispatchLogic/UseStateContext";


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
                    courses: StringsToCourses(state.saveData[0].concentration.core)
                },
                {
                    name: "capstone-1",
                    courses: StringsToCourses(state.saveData[0].concentration.capstone)
                },
                {
                    name: "general-1",
                    courses: StringsToCourses(state.saveData[0].concentration.conc.general)
                },
                {
                    name: "writing",
                    courses: StringsToCourses(state.saveData[0].concentration.writing)
                },
                {
                    name: "capstone-2",
                    courses: StringsToCourses(state.saveData[0].concentration.conc.stats)
                },
                {
                    name: "general-2",
                    courses: StringsToCourses(state.saveData[0].concentration.conc.systems)
                },
                {
                    name: "elective",
                    courses: StringsToCourses(state.saveData[0].concentration.conc.elective)
                },
                {
                    name: "lab-1",
                    courses: StringsToCourses(state.saveData[0].concentration.lab)
                }
            ]
        }});
        return() => {
            dispatch({type: "updateSaveDataAI", payload: { ...state, }});
        };
    },[]);

    return (
        <div>
            <h2>Artificial Intelligence and Robotics</h2>
            <Accordion defaultActiveKey="8">

                <Accordion.Item eventKey="0" data-testid="Core Accordion">
                    <Accordion.Header>CISC Core and Concentration</Accordion.Header>
                    <Accordion.Body>
                        <CourseContainer courses={state.concentrationContainers[0] !== undefined ? state.concentrationContainers[0].courses : []} name="core" />
                        <CourseContainer courses={state.concentrationContainers[1] !== undefined ? state.concentrationContainers[1].courses : []} name="capstone-1" />
                        <CourseContainer courses={state.concentrationContainers[2] !== undefined ? state.concentrationContainers[2].courses : []} name="general-1" />
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                    <Accordion.Header>Two-Course Lab Sequence</Accordion.Header>
                    <Accordion.Body>
                        <CourseContainer courses={state.concentrationContainers[7] !== undefined ? state.concentrationContainers[7].courses : []} name="lab-1" />
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                    <Accordion.Header>Writing Course</Accordion.Header>
                    <Accordion.Body>
                        <CourseContainer courses={state.concentrationContainers[3] !== undefined ? state.concentrationContainers[3].courses : []} name="writing" />
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="3">
                    <Accordion.Header>Statistics Course</Accordion.Header>
                    <Accordion.Body>
                        <CourseContainer courses={state.concentrationContainers[4] !== undefined ? state.concentrationContainers[4].courses : []} name="capstone-2" />
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="4">
                    <Accordion.Header>Systems Course</Accordion.Header>
                    <Accordion.Body>
                        <CourseContainer courses={state.concentrationContainers[5] !== undefined ? state.concentrationContainers[5].courses : []} name="general-2" />
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="5">
                    <Accordion.Header>Electives(Select Four)</Accordion.Header>
                    <Accordion.Body>
                        <CourseContainer courses={state.concentrationContainers[6] !== undefined ? state.concentrationContainers[6].courses : []} name="elective" />
                    </Accordion.Body>
                </Accordion.Item>

            </Accordion>
        </div>
    );
};
