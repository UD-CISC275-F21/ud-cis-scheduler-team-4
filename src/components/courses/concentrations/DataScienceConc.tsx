import { Accordion } from "react-bootstrap";
import CONCENTRATIONS from "../../../json/concentrations.json";
import { CourseContainer } from "../CourseContainer";
import { ConcentrationContainerType } from "../../../interfaces/concentrationcontainer";
import React, { useState, useEffect } from "react";
import { Course as Course } from "../../../interfaces/course";
import { UseStateContext } from "../../util/DispatchLogic/UseStateContext";
import { UseDispatchContext } from "../../util/DispatchLogic/UseDispatchContext";
import { StringsToCourses } from "../DisplayCourseListHelperFunctions/StringsToCourses";

export const DataScienceConc = (): JSX.Element => {
    
    const { state } = UseStateContext();
    const { dispatch } = UseDispatchContext();
    const index = state.saveData.findIndex((eachSaveData) => eachSaveData.concentration.name === "Data Science");

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
                    name: "electives",
                    courses: StringsToCourses(state.saveData[index].concentration.conc.elective)
                },
                {
                    name: "datascience",
                    courses: StringsToCourses(state.saveData[index].concentration.conc.data)
                },
                {
                    name: "math",
                    courses: StringsToCourses(state.saveData[index].concentration.conc.stats)
                }
            ]

        }});
        return() => {
            console.log("DATA SCIENCE UNMOUNTING");
            dispatch({type: "updateSaveDataScience", payload: { ...state }});
        };
    },[]);

    return (
        <div>
            <h2>Data Science</h2>

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
                        <CourseContainer courses={state.concentrationContainers[3].courses} name="lab-1" />
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                    <Accordion.Header>
                        One Writing
                    </Accordion.Header>
                    <Accordion.Body>
                        <CourseContainer courses={state.concentrationContainers[4].courses} name="writing" />
                    </Accordion.Body>
                </Accordion.Item>


                <Accordion.Item eventKey="3">
                    <Accordion.Header>
                        One Data Course
                    </Accordion.Header>
                    <Accordion.Body>
                        <CourseContainer courses={state.concentrationContainers[6].courses} name="datascience" />
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="4">
                    <Accordion.Header>
                        One Advanced Math
                    </Accordion.Header>
                    <Accordion.Body>
                        <CourseContainer courses={state.concentrationContainers[7].courses} name="math" />
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="5">

                    <Accordion.Header>
                        One Elective
                    </Accordion.Header>

                    <Accordion.Body>

                        <CourseContainer courses={state.concentrationContainers[5].courses} name="electives" />

                    </Accordion.Body>

                </Accordion.Item>



            </Accordion>


        </div>
    );
};
