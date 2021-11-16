import React from "react";
import { Modal } from "react-bootstrap";
export const CourseInfo = (
    props:
    {display:boolean;
    setDisplay:React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element => {
    props.setDisplay(!props.display);
    return (
        <Modal onHide={() => props.setDisplay} show={props.display}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Course Description
                </Modal.Title>
            </Modal.Header>
        </Modal>

    );
};