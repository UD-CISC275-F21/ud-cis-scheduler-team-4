import React from "react";
import { ListGroup, Modal } from "react-bootstrap";
import { Semester } from "../../interfaces/semester";

export const AddCourse = (
    props: {
        display:boolean;
        setDisplay:React.Dispatch<React.SetStateAction<boolean>>;
        semesterCourses: Semester[];
        setSemesterCourses: React.Dispatch<React.SetStateAction<Semester[]>>;
        courseName: string;
    }
) => {
    let numberOfSemesters;
    for(let i=0; i<props.semesterCourses.length; i++){
        numberOfSemesters = props.semesterCourses[i].semesterNum;
    }

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
                            <ListGroup.Item action
                                key={index}
                                onClick={()=>{
                                    const tmpSemester = props.semesterCourses[index+1];
                                    
                                }}
                            >
                                {`Semester ${index+1}`}
                            </ListGroup.Item>
                        )
                    }
                </ListGroup>
            </Modal.Body>
        </Modal>
    );
};