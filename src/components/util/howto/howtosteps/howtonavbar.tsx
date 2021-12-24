import { Modal, Image, Accordion } from "react-bootstrap";
import React from "react";

export const NavBarInfo = (): JSX.Element =>

    <Modal.Body>
        <Image fluid src={`${process.env.PUBLIC_URL}/howtoimgs/navbarguide.gif`} />
        <ul>
            <li>
                This navbar contains a plethora of options for each student.
                <ul>
                    <Accordion flush>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>
                                Categories
                            </Accordion.Header>
                            <Accordion.Body>
                                <Accordion flush>
                                    <Accordion.Item eventKey="2">
                                        <Accordion.Header>Useful Links</Accordion.Header>
                                        <Accordion.Body>
                                            The <em>Useful links</em> menu contains links such as course search,
                                            list of undergrad courses, and registration add/drop,
                                            as well as the link to uds computer science student guidance department
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="3">
                                        <Accordion.Header>
                                            Concentrations
                                        </Accordion.Header>
                                        <Accordion.Body>
                                                The <em>Concentrations</em> menu contains
                                                all the different CISC concentrations
                                                you can select from,
                                                and adjusts the courses you can choose from accordingly
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="4">
                                        <Accordion.Header>
                                            Add Semester
                                        </Accordion.Header>
                                        <Accordion.Body>
                                                The button works as when it is clicked,
                                                another semester appears beneath the current one
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="5">
                                        <Accordion.Header>
                                            Export CSV
                                        </Accordion.Header>
                                        <Accordion.Body>
                                                The export csv button works as when it is clicked,
                                                a CSV file containing all the semester information
                                                is saved onto your computer.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </ul>
            </li>
        </ul>
    </Modal.Body>;
