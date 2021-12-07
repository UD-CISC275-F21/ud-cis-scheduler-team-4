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
                {props.courses.map((eachcourse: CourseType, index: number) =>
                    <Course
                        credits={eachcourse.credits}
                        description={eachcourse.description}
                        ind={index}
                        key={eachcourse.name}
                        name={`${eachcourse.name}${eachcourse.title.length > 0 ? `-${eachcourse.title}` : ""}`}
                        title={eachcourse.title}
                    />,
                )}
                {prov.placeholder}
            </ListGroup>
        }
    </Droppable>;
