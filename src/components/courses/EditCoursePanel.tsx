import "bootswatch/dist/lux/bootstrap.min.css";
import { Col } from "react-bootstrap";
import React, { useState } from "react";
import { Course as CourseType } from "../../interfaces/course";
import { Semester } from "../../interfaces/semester";
import { EditCourse } from "../util/EditCourse";


export const EditCoursePanel = (props: {
    semesterCourses: Semester[];
    setSemesterCourses: React.Dispatch<React.SetStateAction<Semester[]>>;
    elem: CourseType;
    ind: number;
}): JSX.Element => {

    const [display, setDisplay] = useState<boolean>(false);

    return (
        <Col lg="1" xs>
            <button
                className="edit-course-button"
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
                    semesterCourses={props.semesterCourses}
                    semesterNumber={props.ind}
                    setDisplay={setDisplay}
                    setSemesterCourses={props.setSemesterCourses}
                />
            }
        </Col>
    );

};
