import "bootstrap/dist/css/bootstrap.min.css";
import { ListGroup } from "react-bootstrap";
import { Course } from "./Course";
import { Droppable } from "react-beautiful-dnd";
import React from "react";
import { Course as CourseType } from "../../interfaces/course";

export const CourseContainer = (props: { courses: CourseType[]; name: string }): JSX.Element =>
    <Droppable droppableId={props.name}>
        {prov =>
            <ListGroup {...prov.droppableProps} ref={prov.innerRef}>
                {props.courses.map((elem: CourseType, index: number) =>
                    <Course
                        credits={elem.credits}
                        description={elem.description}
                        ind={index}
                        key={elem.name}
                        name={`${elem.name}${elem.title.length > 0 ? `-${elem.title}` : ""}`}
                        title={elem.title}
                    />,
                )}
                {prov.placeholder}
            </ListGroup>
        }
    </Droppable>;
