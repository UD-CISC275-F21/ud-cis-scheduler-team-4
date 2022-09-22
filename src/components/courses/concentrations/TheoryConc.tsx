import { Accordion } from "react-bootstrap";
import { CourseContainer } from "../CourseContainer";
import React, { useEffect } from "react";
import { UseStateContext } from "../../util/DispatchLogic/UseStateContext";
import { UseDispatchContext } from "../../util/DispatchLogic/UseDispatchContext";
import { StringsToCourses } from "../DisplayCourseListHelperFunctions/StringsToCourses";

export const TheoryConc = (): JSX.Element => {
    const { state } = UseStateContext();
    const { dispatch } = UseDispatchContext();
    const index = state.saveData.findIndex((eachSaveData) => eachSaveData.concentration.name === "Theory of Computation");
    
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
                    name: "stat",
                    courses: StringsToCourses(state.saveData[index].concentration.conc.stats)
                },
                {
                    name: "lab-1",
                    courses: StringsToCourses(state.saveData[index].concentration.lab)
                },
                {
                    name: "discrete",
                    courses: StringsToCourses(state.saveData[index].concentration.conc.track)
                },
                {
                    name: "continuous",
                    courses: StringsToCourses(state.saveData[index].concentration.conc.cybersecurity)
                }

            ]

        }});
        return() => {
            dispatch({type: "saveTheory", payload: { ...state }});
        };

    },[]);

    return (
        <div>
            <h2>Theory</h2>

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
                        <CourseContainer courses={state.concentrationContainers[5].courses} name="lab-1" />
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
                        One Statistics Course
                    </Accordion.Header>
                    <Accordion.Body>
                        <CourseContainer courses={state.concentrationContainers[4].courses} name="stat" />
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
                                    <CourseContainer courses={state.concentrationContainers[6].courses} name="discrete" />
                                </Accordion.Body>

                            </Accordion.Item>

                            <Accordion.Item eventKey="6">

                                <Accordion.Header>
                                    Continuous
                                </Accordion.Header>
                                <Accordion.Body>
                                    <CourseContainer courses={state.concentrationContainers[7].courses} name="continuous" />
                                </Accordion.Body>

                            </Accordion.Item>

                        </Accordion>

                    </Accordion.Body>

                </Accordion.Item>


            </Accordion>

        </div>
    );
};
