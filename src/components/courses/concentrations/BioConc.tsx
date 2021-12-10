import { Accordion } from "react-bootstrap";
import { CourseContainer } from "../CourseContainer";
import React, { useEffect } from "react";
import { UseDispatchContext } from "../../util/DispatchLogic/UseDispatchContext";
import { UseStateContext } from "../../util/DispatchLogic/UseStateContext";
import { StringsToCourses } from "../DisplayCourseListHelperFunctions/StringsToCourses";

export const BioConc = (): JSX.Element => {

    const { state } = UseStateContext();
    const { dispatch } = UseDispatchContext();
    const index = state.saveData.findIndex((eachSaveData) => eachSaveData.concentration.name === "Bioinformatics");

    useEffect(() => {
        dispatch({type: "updateConcentrationContainers", payload: {
            ...state,
            concentrationContainers:
            [
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
                    name: "data",
                    courses: StringsToCourses(state.saveData[index].concentration.conc.data)
                },
                {
                    name: "ochem-1",
                    courses: StringsToCourses(state.saveData[index].concentration.conc.ochem)
                }
            ]
        }});
        return() => {
            console.log("BIO CONC UNMOUNTING");
            dispatch({type: "updateSaveDataBio", payload: { ...state }});
        };
    },[]);

    return (
        state.concentrationContainers.length >= 9 ?
            <div>
                <h2 data-testid="bio-header">Bioinformatics</h2>
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
                            Chem Sequence
                        </Accordion.Header>
                        <Accordion.Body>
                            <CourseContainer courses={state.concentrationContainers[5].courses} name="lab-1" />
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="2">
                        <Accordion.Header>
                            One Organic Chem Sequence
                        </Accordion.Header>
                        <Accordion.Body>
                            <CourseContainer courses={state.concentrationContainers[8].courses} name="ochem-1" />
                        </Accordion.Body>
                    </Accordion.Item>


                    <Accordion.Item eventKey="3">
                        <Accordion.Header>
                            Writing Course
                        </Accordion.Header>
                        <Accordion.Body>
                            <CourseContainer courses={state.concentrationContainers[3].courses} name="writing" />
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="4">
                        <Accordion.Header>
                            One Statistics Course
                        </Accordion.Header>
                        <Accordion.Body>
                            <CourseContainer courses={state.concentrationContainers[4].courses} name="stat" />
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="5">

                        <Accordion.Header>
                            One Data Analysis Course
                        </Accordion.Header>

                        <Accordion.Body>

                            <CourseContainer courses={state.concentrationContainers[7].courses} name="data" />

                        </Accordion.Body>

                    </Accordion.Item>

                    <Accordion.Item eventKey="6">

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
            <div>
                Concentration Unavailable
            </div>
        
    );
};
