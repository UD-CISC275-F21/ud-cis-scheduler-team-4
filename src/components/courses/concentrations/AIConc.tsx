import { Accordion } from "react-bootstrap";
import CONCENTRATIONS from "../../../json/concentrations.json";
import { CourseContainer } from "../CourseContainer";
import { ConcentrationContainerType } from "../../../interfaces/concentrationcontainer";
import React, { useState, useEffect, useReducer } from "react";
import { Course } from "../../../interfaces/course";
import { Concentration } from "../../../interfaces/concentration";
import { SavedProgress } from "../../../interfaces/savedprogress";
import { updateAICourses } from "./AIConcentration/AIConcentrationCoursesGenerator";
import { StringsToCourses } from "../DisplayCourseListHelperFunctions/StringsToCourses";
import { SaveDataContext } from "../../../context/SaveDataContext";
import produce from "immer";

export interface AIConcState{

    coreCourses: Course[],
    capstone1Courses: Course[],
    general1Courses: Course[],
    writingCourses: Course[],
    general2Courses: Course[],
    electiveCourses: Course[],
    capstone2Courses: Course[],
    labCourses: Course[],
    aiConcentrationContainer: ConcentrationContainerType[]
}
const initialState: AIConcState = {
    coreCourses: [],
    capstone1Courses: [],
    general1Courses: [],
    writingCourses: [],
    general2Courses: [],
    capstone2Courses: [],
    electiveCourses: [],
    labCourses: [],
    aiConcentrationContainer: [],
};

interface SchedulerAction {

    type: string,
    payload: AIConcState

}

const reducerFunction = (draft: AIConcState, action: SchedulerAction) => {
    switch(action.type){
    
    case "SetCourses":{
        draft.coreCourses = action.payload.coreCourses;
        draft.capstone1Courses = action.payload.capstone1Courses;
        draft.general1Courses = action.payload.general1Courses;
        draft.writingCourses = action.payload.writingCourses;
        draft.general2Courses = action.payload.general2Courses;
        draft.electiveCourses = action.payload.electiveCourses;
        draft.capstone2Courses = action.payload.capstone2Courses;
        draft.labCourses = action.payload.labCourses;
        break;
    }
    case "UpdateAIConcentrationContainer": {
        draft.aiConcentrationContainer = action.payload.aiConcentrationContainer;
        break;
    }
    case "InitializeAIConcentrationContainer":{

        draft.aiConcentrationContainer = [
            {
                courses: draft.coreCourses,
                name: "core",
                setCourses: (courses: Course[]) => {
                    draft.coreCourses = courses;
                }
            },
            {
                courses: draft.capstone1Courses,
                name: "capstone-1",
                setCourses: (courses: Course[]) => {
                    draft.capstone1Courses = courses;
                }
            },
            {
                courses: draft.general1Courses,
                name: "general-1",
                setCourses: (courses: Course[]) => {
                    draft.general1Courses = courses;
                }
            },
            {
                courses: draft.writingCourses,
                name: "writing",
                setCourses: (courses: Course[]) => {
                    draft.writingCourses = courses;
                }
            },
            {
                courses: draft.capstone2Courses,
                name: "capstone-2",
                setCourses: (courses: Course[]) => {
                    draft.capstone2Courses = courses;
                }
            },
            {
                courses: draft.general2Courses,
                name: "general-2",
                setCourses: (courses: Course[]) => {
                    draft.general2Courses = courses;
                }
            },
            {
                courses: draft.electiveCourses,
                name: "elective",
                setCourses: (courses: Course[]) => {
                    draft.electiveCourses = courses;
                }
            },
            {
                courses: draft.labCourses,
                name: "lab-1",
                setCourses: (courses: Course[]) => {
                    draft.labCourses = courses;
                }
            }
        ];
        break;

    }
    default:{
        break;
    }
    }
};


export const AIConc = (props: {
    StringsToCourses: (stringCourses: string[]) => Course[];
    setConcentrationContainers: (concentrationContainers: ConcentrationContainerType[]) => void;
    saveData: SavedProgress;
    }): JSX.Element => {
    const curriedReducerFunction = produce(reducerFunction);
    const [state, dispatch] = useReducer(curriedReducerFunction, initialState);
    const {
        coreCourses,
        capstone1Courses,
        general1Courses,
        writingCourses,
        general2Courses,
        electiveCourses,
        labCourses,
        capstone2Courses,
        aiConcentrationContainer,
    } = state;
    
    useEffect(() => {
        dispatch({type: "InitializeAIConcentrationContainer", payload: { ...state }});
        dispatch({type: "SetCourses", payload: {
            ...state,
            coreCourses: StringsToCourses(props.saveData.concentration.core),
            capstone1Courses: StringsToCourses(props.saveData.concentration.capstone),
            general1Courses: StringsToCourses(props.saveData.concentration.conc.general),
            writingCourses: StringsToCourses(props.saveData.concentration.writing),
            general2Courses: StringsToCourses(props.saveData.concentration.conc.systems),
            electiveCourses: StringsToCourses(props.saveData.concentration.conc.elective),
            capstone2Courses: StringsToCourses(props.saveData.concentration.conc.stats),
            labCourses: StringsToCourses(props.saveData.concentration.lab)
        }});
    }, []);

    useEffect(() => {
        props.setConcentrationContainers(aiConcentrationContainer);
    }, []);

    return (
        <div>
            <h2>Artificial Intelligence and Robotics</h2>
            <Accordion defaultActiveKey="8">

                <Accordion.Item eventKey="0">
                    <Accordion.Header>CISC Core and Concentration</Accordion.Header>
                    <Accordion.Body>
                        <CourseContainer courses={coreCourses} name="core" />
                        <CourseContainer courses={capstone1Courses} name="capstone-1" />
                        <CourseContainer courses={general1Courses} name="general-1" />
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                    <Accordion.Header>Two-Course Lab Sequence</Accordion.Header>
                    <Accordion.Body>
                        <CourseContainer courses={labCourses} name="lab-1" />
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                    <Accordion.Header>Writing Course</Accordion.Header>
                    <Accordion.Body>
                        <CourseContainer courses={writingCourses} name="writing" />
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="3">
                    <Accordion.Header>Statistics Course</Accordion.Header>
                    <Accordion.Body>
                        <CourseContainer courses={capstone2Courses} name="capstone-2" />
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="4">
                    <Accordion.Header>Systems Course</Accordion.Header>
                    <Accordion.Body>
                        <CourseContainer courses={general2Courses} name="general-2" />
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="5">
                    <Accordion.Header>Electives(Select Four)</Accordion.Header>
                    <Accordion.Body>
                        <CourseContainer courses={electiveCourses} name="elective" />
                    </Accordion.Body>
                </Accordion.Item>

            </Accordion>
        </div>
    );
};
