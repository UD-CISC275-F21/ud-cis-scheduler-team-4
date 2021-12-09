import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/style.css";
import { Draggable } from "react-beautiful-dnd";
import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";
import { CourseInfo } from "./CourseInfo";


export const Course = (props: { name: string; description: string; title: string; credits: number; ind: number }): JSX.Element => {
    const [display, setDisplay] = useState<boolean>(false);
    return (
        <Draggable draggableId={props.name} index={props.ind} key={props.name}>
            {prov =>
                <ListGroup.Item data-testid="courseitem" ref={prov.innerRef} {...prov.draggableProps} {...prov.dragHandleProps}>
                    {props.name}
                    <button
                        data-testid="dotsButton"
                        className="course-button"
                        onClick={() => {
                            setDisplay(!display);
                        }}
                        type="button"
                    >
                        <svg className="bi bi-three-dots-vertical" fill="currentColor" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                        </svg>
                    </button>
                    {display &&
                    <CourseInfo
                        data-testid="course description"
                        credits={props.credits}
                        description={props.description}
                        display={display}
                        name={props.name}
                        setDisplay={setDisplay}
                    />
                    }
                </ListGroup.Item>
            }
        </Draggable>
    );
};
