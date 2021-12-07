import "bootswatch/dist/lux/bootstrap.min.css";
import { Col, Button } from "react-bootstrap";
import React, { useState } from "react";
import { Course as CourseType } from "../../interfaces/course";
import { EditCourse } from "../util/EditCourse";


export const EditCoursePanel = (props: {
    elem: CourseType;
    ind: number;
}): JSX.Element => {

    const [display, setDisplay] = useState<boolean>(false);

    return (
        <Col lg="1" xs>
            <Button
                onClick={() => {
                    setDisplay(true);
                }}
                variant="warning"
            />
            {
                display
                &&
                <EditCourse
                    course={props.elem}
                    display={display}
                    semesterNumber={props.ind}
                    setDisplay={setDisplay}
                />
            }
        </Col>
    );

};
