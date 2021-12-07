import React, { useState } from "react";
import { ListGroup, Modal } from "react-bootstrap";
import { Semester } from "../../interfaces/semester";
import { UseDispatchContext } from "../util/DispatchLogic/UseDispatchContext";
import { UseStateContext } from "../util/DispatchLogic/UseStateContext";

export const AddCourse = (
    props: {
        modalDisplay:boolean;
        setModalDisplay:React.Dispatch<React.SetStateAction<boolean>>;
        courseName: string;
        buttonDisplay: boolean;
        setButtonDisplay: React.Dispatch<React.SetStateAction<boolean>>
    }
) => {
    
    const { state } = UseStateContext();
    const { dispatch } = UseDispatchContext();
    const numberOfSemesters = state.semesterCourses.length;
    const concentrationContainers = state.concentrationContainers;
    console.log(concentrationContainers);
    console.log("formattedCourseNamebefore = ", props.courseName);
    const formattedCourseName = props.courseName.split("-")[0];
    console.log("courseName = ", formattedCourseName);
    const containerIndex = concentrationContainers.findIndex((eachContainer) => eachContainer.courses.map((eachCourse) => eachCourse.name).includes(formattedCourseName));
    // container aka sourceContainerIndex
    let courseIndex = -1;
    if (containerIndex !== -1) {
        console.log("containerIndex = ", containerIndex);
        const theContainer = concentrationContainers[containerIndex];
        // so now that I have the container the course is in, I just get the index of the course within the container
        courseIndex = theContainer.courses.findIndex((eachCourse) => eachCourse.name === formattedCourseName);
        // source index
    }
    return (
        <Modal
            onHide={() => {
                props.setModalDisplay(false);
            }}
            show={props.modalDisplay}
        >
            <Modal.Header>
                Please Choose a Semester:
            </Modal.Header>
            <Modal.Body>
                <ListGroup>
                    {
                        new Array(numberOfSemesters).fill(0).map((eachelement,index) => 
                            <ListGroup.Item action
                                key={index}
                                onClick={()=>{
                                    if (courseIndex !== -1) {
                                        dispatch({type: "concentrationToSemester", payload: { ...state, sourceContainerIndex: containerIndex, sourceIndex: courseIndex, destContainerIndex: index, destIndex: 0 }});
                                        console.log(props.buttonDisplay);
                                        props.setButtonDisplay(!props.buttonDisplay); 
                                        console.log(props.buttonDisplay);
                                    }
                                }}
                            >
                                {`Semester ${index+1}`}
                            </ListGroup.Item>
                        )
                    }
                </ListGroup>
            </Modal.Body>
        </Modal>
    );
};