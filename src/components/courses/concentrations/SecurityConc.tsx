import { Accordion } from "react-bootstrap";
import CONCENTRATIONS from "../../../json/concentrations.json";
import { CourseContainer } from "../CourseContainer";
import { ConcentrationContainerType } from "../../../interfaces/concentrationcontainer";
import React, { useState, useEffect } from "react";
import { Course as Course } from "../../../interfaces/course";
import { StringsToCourses } from "../DisplayCourseListHelperFunctions/StringsToCourses";
import { UseStateContext } from "../../util/DispatchLogic/UseStateContext";
import { UseDispatchContext } from "../../util/DispatchLogic/UseDispatchContext";

export const SecurityConc = (): JSX.Element => {
    
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
                    name: "stat",
                    courses: StringsToCourses(state.saveData[index].concentration.conc.stats)
                },
                {
                    name: "lab-1",
                    courses: StringsToCourses(state.saveData[index].concentration.lab)
                },
                {
                    name: "electives",
                    courses: StringsToCourses(state.saveData[index].concentration.conc.elective)
                },
                {
                    name: "security",
                    courses: StringsToCourses(state.saveData[index].concentration.conc.cybersecurity)
                }
            ]

        }});
        return() => {
            dispatch({type: "updateSaveSecurity", payload: { ...state, sourceContainerIndex: index }});
        };

    },[]);

    return (
        state.concentrationContainers.length >= 8 ?
            <div>
                <h2>Cybersecurity</h2>
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
                            Statistics Course
                        </Accordion.Header>
                        <Accordion.Body>
                            <CourseContainer courses={state.concentrationContainers[4].courses} name="stat" />
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="4">
                        <Accordion.Header>
                            Two Advanced Requirements
                        </Accordion.Header>
                        <Accordion.Body>
                            <CourseContainer courses={state.concentrationContainers[7].courses} name="security" />
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="5">

                        <Accordion.Header>
                            Two Electives
                        </Accordion.Header>

                        <Accordion.Body>

                            <CourseContainer courses={state.concentrationContainers[6].courses} name="electives" />

                        </Accordion.Body>

                    </Accordion.Item>



                </Accordion>
            </div>
            :
            <div>Concentration Unavailable</div>
    );
};
