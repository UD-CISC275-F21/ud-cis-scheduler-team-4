import "bootswatch/dist/lux/bootstrap.min.css";
import { Col, Button } from "react-bootstrap";
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
                    semesterCourses={props.semesterCourses}
                    semesterNumber={props.ind}
                    setDisplay={setDisplay}
                    setSemesterCourses={props.setSemesterCourses}
                />
            }
        </Col>
    );

};
