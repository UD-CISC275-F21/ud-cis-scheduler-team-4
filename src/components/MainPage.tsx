import "bootswatch/dist/lux/bootstrap.min.css";
import { Container, Row, Col, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { WelcomeToast, PreReqSameSemesterToast } from "./util/Notifications";
import { SemesterTable } from "./semesters/SemesterTable";
import React, { useState, useEffect } from "react";
import { DropdownMenu } from "./util/DropdownMenu";
import { DisplayCourseList } from "./courses/DisplayCourseList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Concentration } from "../interfaces/concentration";
import CONCENTRATIONS from "../json/concentrations.json";
import { SemesterType } from "../interfaces/semester";
import { AddSemesterButton } from "./semesters/AddSemesterButton";
import { DeleteSemesterButton } from "./semesters/DeleteSemesterButton";
import { ConcentrationContainerType } from "../interfaces/concentrationcontainer";
import { onDragEndLogic } from "./util/DropLogic";
import { ExportPlan } from "./util/ExportPlan";
import { HowToDisplay } from "./util/howto/howtodisplay";
import { Footer } from "./util/Footer";

export const MainPage = (): JSX.Element => {
    const [concentration, setConcentration] = useState<Concentration>(CONCENTRATIONS[0] as Concentration);
    const [semesterCourses, setSemesterCourses] = useState<SemesterType[]>([]);
    const [display, setDisplay] = useState<boolean>(false);
    const [semesters, setSemesters] = useState<number>(1);
    const [concentrationContainers, setConcentrationContainers] = useState<ConcentrationContainerType[]>([]);
    const [toastDisplay, setToastDisplay] = useState<boolean>(false); // Will be implemented once basic drop logic is fully implemented
    const [toastMessage, setToastMessage] = useState<string>(""); // Will be implemented once basic drop logic is fully implemented
    const [deleteTriggered, setDeleteTriggered] = useState<number>(-1);

    useEffect(() => {
        setDisplay(true);
        setTimeout(() => {
            setDisplay(false);
        }, 5000);
    }, []);

    useEffect(() => {

        console.log("Deleting semester");
        if (deleteTriggered === 0) {
            console.log("Inside delete semester if");
            const theSemester: SemesterType | undefined = semesterCourses.length > 0 ? semesterCourses[0] : undefined;
            if (theSemester !== undefined) {
                // delete semester
                theSemester.courseSetter([]);
                setSemesterCourses(semesterCourses.slice(1).map(elem => {
                    const newObj = { ...elem };
                    newObj.semesternum = elem.semesternum - 1;
                    return newObj;
                }));
            }
            setDeleteTriggered(-1);
        }

    }, [semesters]);
    const displayToast = (msg: string) => {
        setToastDisplay(true);
        setToastMessage(msg);
        setTimeout(() => {
            setToastDisplay(false);
        }, 5000);
    };
    const onDragEnd = (result: DropResult) => {
        onDragEndLogic(result,
            concentrationContainers,
            setConcentrationContainers,
            semesterCourses,
            setSemesterCourses,
            displayToast,
        );
    };

    return (
        <DragDropContext
            onDragEnd={onDragEnd}
        >
            <Container>
                <br />
                <Row>
                    <Col>
                        <WelcomeToast display={display} />
                        <PreReqSameSemesterToast display={toastDisplay} errMsg={toastMessage} />
                    </Col>
                </Row>
                <Row>
                    <Navbar bg="light" data-testid="navbar" expand="lg" >
                        <Container>
                            <Navbar.Brand href="#home">UDCIS Course Scheduler</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <NavDropdown data-testid="navbardropdown" id="basic-navbar-nav" title="Useful Links" >
                                        <NavDropdown.Item data-testid="navdropdownitem1" href="https://udapps.nss.udel.edu/CoursesSearch/" >Course Search</NavDropdown.Item>
                                        <NavDropdown.Item data-testid="navdropdownitem2" href="https://www.cis.udel.edu/academics/undergraduate-programs/resources/courses/" >CISC Undergraduate Courses</NavDropdown.Item>
                                        <NavDropdown.Item data-testid="navdropdownitem3" href="https://webreg.nss.udel.edu/registration/schedule/" >Registration Add/Drop</NavDropdown.Item>
                                        <NavDropdown.Item data-testid="navdropdownitem4" href="https://ud-cis-teaching.github.io/student-guidance/" >UD CIS Student Guidance</NavDropdown.Item>
                                    </NavDropdown>
                                    <DropdownMenu
                                        semesterCourses={semesterCourses}
                                        setConcentration={setConcentration}
                                        setSemesterCourses={setSemesterCourses}
                                    />
                                    <AddSemesterButton semesters={semesters} setSemesters={setSemesters} />
                                    <DeleteSemesterButton
                                        semesters={semesters}
                                        setDelete={setDeleteTriggered}
                                        setSemesters={setSemesters}
                                    />
                                    <ExportPlan semesterCourses={semesterCourses} />
                                    <HowToDisplay />
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </Row>
                <Row>
                    <Col>
                        <br />
                        <DisplayCourseList
                            concentration={concentration}
                            setConcentrationContainers={setConcentrationContainers}
                        />
                    </Col>
                    <Col>
                        <br />
                        <br />
                        <br />
                        <br />
                        <SemesterTable
                            semesters={semesters}
                            semestersCourses={semesterCourses}
                            setSemesterCourses={setSemesterCourses}
                        />
                    </Col>
                </Row>
                <Row>
                    <Footer />
                </Row>
            </Container>
        </DragDropContext>
    );
};
