import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Semester } from "./Semester";
import { SemesterType } from "../../interfaces/semester";
import { Accordion } from "react-bootstrap";

/*

    @param - props - object that contains a key of id(number)
    @return JSX.Element

*/

export const SemesterTable = (props: { semesters: number, semestersCourses: SemesterType[], setSemesterCourses: React.Dispatch<React.SetStateAction<SemesterType[]>> }): JSX.Element => {

    return(
        <>
            {
                new Array(props.semesters).fill(0).map((elem, ind) =>
                    <Accordion key={`accordion ${ind}`} defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>{`Semester ${ind+1}`}</Accordion.Header>
                            <Accordion.Body>
                                <Semester ind={ind} key={`semester-table-key-${ind}`} semesterCourses={props.semestersCourses} setSemesterCourses={props.setSemesterCourses} />
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                )
            }
        </>
    );
};
