import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/style.css";
import { Draggable } from "react-beautiful-dnd";
import React, { useState } from "react";
import { ListGroup, Button } from "react-bootstrap";
import { CourseInfo } from "./CourseInfo";


export const Course = (props: { name: string; description: string; title: string; credits: number; ind: number }): JSX.Element => {
    const [display, setDisplay] = useState<boolean>(false);
    return (
        <Draggable draggableId={props.name} index={props.ind} key={props.name}>
            {prov =>
                <ListGroup.Item ref={prov.innerRef} {...prov.draggableProps} {...prov.dragHandleProps}>
                    {props.name}
                    <button className="course-button" onClick={() => {
                        setDisplay(!display);
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                        </svg>
                    </button>
                    {display && <CourseInfo display={display} setDisplay={setDisplay} name={props.name}
                        title={props.title} description={props.description} credits={props.credits}></CourseInfo>}
                </ListGroup.Item>
            }
        </Draggable>
    );
};
    
