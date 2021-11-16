import { Modal, Image } from "react-bootstrap";
import React from "react";

export const SemesterTableInfo = (): JSX.Element =>

    <Modal.Body>
        <Image fluid src={`${process.env.PUBLIC_URL}/howtoimgs/semesterguide.gif`} />
        <ul>
            <li>
                Each semester comprises of: The Semester it is,
                meaning 1st semester 2nd etc., the red button, and the credits display.
                The semester can be toggled on and off to display the courses within it.
            </li>
            <li>
                <ul>
                    <li>Red button</li>
                    <ul>
                        <li>
                            The red button works as, if you press it and there are courses
                            in your semester, it deletes all the courses within the semester.
                        </li>
                    </ul>
                    <li>
                        Course buttons
                        <ul>
                            When courses are moved into a semester,
                            two buttons appear, one that is red, and one that is yellow.
                            The red button is to delete that single
                            course from the semester, and the yellow button is to edit the name of
                            that course.
                        </ul>
                    </li>
                </ul>
            </li>
        </ul>
    </Modal.Body>;
