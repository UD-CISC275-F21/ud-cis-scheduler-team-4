import "bootswatch/dist/lux/bootstrap.min.css";
import { Col } from "react-bootstrap";
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
            <button
                className="edit-course-button"
                data-testid="editcoursebutton"
                onClick={() => {
                    setDisplay(true);
                }}
            >
                <img src={`${process.env.PUBLIC_URL}/editbutton.png`} id="edit-img" />
            </button>
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
