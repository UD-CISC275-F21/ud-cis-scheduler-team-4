import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/style.css";
import { Draggable } from "react-beautiful-dnd";
import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { CourseInfo } from "./CourseInfo";
import { AddCourse } from "./AddCourse";
import { UseStateContext } from "../util/DispatchLogic/UseStateContext";
import { removeCourse } from "../util/RemoveCourseLogic";
import { UseDispatchContext } from "../util/DispatchLogic/UseDispatchContext";



export const Course = (
    props:
    { 
        name: string; 
        description: string; 
        title: string;
        credits: number; 
        ind: number; 
    }): JSX.Element => {
    const { state } = UseStateContext();
    const { dispatch } = UseDispatchContext();
    const [courseInfoDisplay, setCourseInfoDisplay] = useState<boolean>(false);
    const [addCourseModalDisplay, setAddCourseModalDisplay] = useState<boolean>(false);
    const [addCourseButtonDisplay, setAddCourseButtonDisplay] = useState<boolean>(true);

    useEffect(() => {
        const splitName = props.name.split("-")[0];
        const result = !state.currentSaveData.semesters.map((eachSemester) => eachSemester.courses.map(eachCourse => eachCourse.name)).flat(2).includes(splitName);
        setAddCourseButtonDisplay(result);
    }, [state.currentSaveData.semesters]);

    return (
        <Draggable draggableId={props.name} index={props.ind} key={props.name}>
            {prov =>
                <ListGroup.Item data-testid="courseitem" ref={prov.innerRef} {...prov.draggableProps} {...prov.dragHandleProps}>
                    {props.name}
                    {addCourseButtonDisplay && 
                    <button 
                        className="add-course-button"
                        data-testid="addcoursebutton"
                        onClick={()=>{
                            setAddCourseModalDisplay(!addCourseModalDisplay);
                        }}
                        type="button"
                    >
                        <span>&#43;</span>
                    </button>}
                    {addCourseModalDisplay &&
                    <AddCourse
                        modalDisplay={addCourseModalDisplay}
                        setModalDisplay={setAddCourseModalDisplay}
                        courseName={props.name}
                        buttonDisplay={addCourseButtonDisplay}
                        setButtonDisplay={setAddCourseButtonDisplay}
                    />
                    }
                    {!addCourseButtonDisplay &&
                    <button
                        className="remove-course-button"
                        onClick={()=>{
                            const containerIndex = state.currentSaveData.semesters.findIndex((eachSemester) => eachSemester.courses.map((eachCourse) => eachCourse.name).flat(2).includes(props.name.split("-")[0]));
                            const courseIndex = state.currentSaveData.semesters[containerIndex].courses.findIndex((eachCourse) => eachCourse.name === props.name.split("-")[0]);
                            dispatch({type: "removeCourse", payload: { ...state, sourceContainerIndex: containerIndex, sourceIndex: courseIndex } });
                            setAddCourseButtonDisplay(!addCourseButtonDisplay);
                        }}
                    >
                        <img src={`${process.env.PUBLIC_URL}/minusimage.png`} id="remove-course-image"></img>
                    </button>
                    }
                    <button
                        data-testid="dotsButton"
                        className="course-button"
                        onClick={() => {
                            setCourseInfoDisplay(!courseInfoDisplay);
                        }}
                        type="button"
                    >
                        <svg className="bi bi-three-dots-vertical" fill="currentColor" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                        </svg>
                    </button>
                    {courseInfoDisplay &&
                    <CourseInfo
                        data-testid="course description"
                        credits={props.credits}
                        description={props.description}
                        display={courseInfoDisplay}
                        name={props.name}
                        setDisplay={setCourseInfoDisplay}
                    />
                    }
                </ListGroup.Item>
            }
        </Draggable>
    );
};
