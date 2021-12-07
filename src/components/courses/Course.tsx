import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/style.css";
import { Draggable } from "react-beautiful-dnd";
import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";
import { CourseInfo } from "./CourseInfo";
import { AddCourse } from "./AddCourse";
import { Semester } from "../../interfaces/semester";


export const Course = (
    props:
    { 
        name: string; 
        description: string; 
        title: string;
        credits: number; 
        ind: number; 
        semesterCourses: Semester[]; 
        setSemesterCourses: React.Dispatch<React.SetStateAction<Semester[]>>
    }): JSX.Element => {
    const [courseInfoDisplay, setCourseInfoDisplay] = useState<boolean>(false);
    const [addCourseDisplay, setAddCourseDisplay] = useState<boolean>(false);
    return (
        <Draggable draggableId={props.name} index={props.ind} key={props.name}>
            {prov =>
                <ListGroup.Item data-testid="courseitem" ref={prov.innerRef} {...prov.draggableProps} {...prov.dragHandleProps}>
                    {props.name}
                    <button 
                        className="add-course-button"
                        onClick={()=>{
                            setAddCourseDisplay(!addCourseDisplay);
                        }}
                        type="button"
                    >
                        <span>&#43;</span>
                    </button>
                    {addCourseDisplay &&
                    <AddCourse
                        display={addCourseDisplay}
                        setDisplay={setAddCourseDisplay}
                        ind={props.ind}
                        semesterCourses={props.semesterCourses}
                        setSemesterCourses={props.setSemesterCourses}
                    ></AddCourse>
                    }
                    <button
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
