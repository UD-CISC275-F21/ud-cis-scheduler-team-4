import { Accordion } from "react-bootstrap";
import { CourseContainer } from "../CourseContainer";
import React, { useEffect } from "react";
import { Course as Course } from "../../../interfaces/course";
import { UseDispatchContext } from "../../MainPage";
import { UseStateContext } from "../../MainPage";
import { StringsToCourses } from "../DisplayCourseListHelperFunctions/StringsToCourses";

export const BioConc = (): JSX.Element => {

    const { state } = UseStateContext();
    const { dispatch } = UseDispatchContext();

    useEffect(() => {
        console.log("in BioConc useEffect");
        dispatch({type: "updateConcentrationContainers", payload: {
            ...state,
            concentrationContainers:
            [
                {
                    name: "core",
                    courses: StringsToCourses(state.saveData[1].concentration.core)
                },
                {
                    name: "capstone",
                    courses: StringsToCourses(state.saveData[1].concentration.capstone)
                },
                {
                    name: "general",
                    courses: StringsToCourses(state.saveData[1].concentration.conc.general)
                },
                {
                    name: "writing",
                    courses: StringsToCourses(state.saveData[1].concentration.writing)
                },
                {
                    name: "stat",
                    courses: StringsToCourses(state.saveData[1].concentration.conc.stats)
                },
                {
                    name: "lab-1",
                    courses: StringsToCourses(state.saveData[1].concentration.lab)
                },
                {
                    name: "electives",
                    courses: StringsToCourses(state.saveData[1].concentration.conc.elective)
                },
                {
                    name: "data",
                    courses: StringsToCourses(state.saveData[1].concentration.conc.data)
                },
                {
                    name: "ochem-1",
                    courses: StringsToCourses(state.saveData[1].concentration.conc.ochem)
                }
            ]
        }});
    },[]);

    useEffect(() => {
        console.log("state = ", state.concentrationContainers);
    }, [state.concentrationContainers]);
    console.log(state.concentrationContainers);
    return (
        state.concentrationContainers.length >= 9 ?
            <div>
                <h2>Bioinformatics</h2>
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
