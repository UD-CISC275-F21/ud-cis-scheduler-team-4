import React from "react";
import { ListGroup, Modal } from "react-bootstrap";
import { Semester } from "../../interfaces/semester";

export const AddCourse = (
    props: {
        display:boolean;
        setDisplay:React.Dispatch<React.SetStateAction<boolean>>;
        ind: number;
        semesterCourses: Semester[];
        setSemesterCourses: React.Dispatch<React.SetStateAction<Semester[]>>;
    }
) => {
    const numberOfSemesters = 4; // debug purposes
    return (
        <Modal
            onHide={() => {
                props.setDisplay(false);
            }}
            show={props.display}
        >
            <Modal.Header>
                Please Choose a Semester:
            </Modal.Header>
            <Modal.Body>
                <ListGroup>
                    {
                        new Array(numberOfSemesters).fill(0).map((eachelement,index) => 
                            <ListGroup.Item action key={index}>
                                {`Semester ${index+1}`}
                            </ListGroup.Item>
                        )
                    }
                </ListGroup>
            </Modal.Body>
        </Modal>
    );
};