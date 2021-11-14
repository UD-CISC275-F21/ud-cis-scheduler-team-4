import "bootswatch/dist/lux/bootstrap.min.css";
import { Container, Row, Col, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { WelcomeToast } from "./util/Notifications";
import { SemesterTable } from "./semesters/SemesterTable";
import React, { useState, useEffect } from "react";
import {DropdownMenu} from "./util/DropdownMenu";
import { DisplayCourseList } from "./courses/DisplayCourseList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Concentration } from "../interfaces/concentration";
import CONCENTRATIONS from "../json/concentrations.json";
import { SemesterType } from "../interfaces/semester";
import { AddSemesterButton } from "./semesters/AddSemesterButton";
import { ConcentrationContainerType } from "../interfaces/concentrationcontainer";
import { onDragEndLogic } from "./util/DropLogic";
import { PreReqSameSemesterToast } from "./util/Notifications";
import { ExportPlan } from "./util/ExportPlan";

export const MainPage = (): JSX.Element => {
    const [concentration, setConcentration] = useState<Concentration>(CONCENTRATIONS[0] as Concentration);
    const [semesterCourses, setSemesterCourses] = useState<SemesterType[]>([]);
    const [display, setDisplay] = useState<boolean>(false);
    const [semesters, setSemesters] = useState<number>(1);
    const [concentrationContainers, setConcentrationContainers] = useState<ConcentrationContainerType[]>([]); // is initialized to the first concentration container, contains all of the parts of the concentration, outlined in the comment below
    const [toastDisplay, setToastDisplay] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string>("");


    useEffect(() => {
        setDisplay(true);
        setTimeout(() => {
            setDisplay(false);
        },5000);
    },[]);

    const displayToast = (msg: string) => {
        setToastDisplay(true);
        setToastMessage(msg);
        setTimeout(() => {
            setToastDisplay(false);
        },5000); 
    };

    const onDragEnd = (result: DropResult) => {
        onDragEndLogic(result,concentrationContainers,setConcentrationContainers,semesterCourses,setSemesterCourses,displayToast);
    };

    return (
        <>
            <DragDropContext
                onDragEnd={onDragEnd}
            >
                <Container>
                    <br />
                    <Row>
                        <Col>
                            {<WelcomeToast display={display}/>}
                            {<PreReqSameSemesterToast errMsg={toastMessage} display={toastDisplay} />}
                        </Col>
                    </Row>
                    <Row>
                        <Navbar bg="light" expand="lg" data-testid="navbar">
                            <Container>
                                <Navbar.Brand href="#home">UDCIS Course Scheduler</Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="me-auto">
                                        <NavDropdown title="Useful Links" id="basic-navbar-nav" data-testid="navbardropdown">
                                            <NavDropdown.Item href="https://udapps.nss.udel.edu/CoursesSearch/" data-testid="navdropdownitem1">Course Search</NavDropdown.Item>
                                            <NavDropdown.Item href="https://www.cis.udel.edu/academics/undergraduate-programs/resources/courses/" data-testid="navdropdownitem2">CISC Undergraduate Courses</NavDropdown.Item>
                                            <NavDropdown.Item href="https://webreg.nss.udel.edu/registration/schedule/" data-testid="navdropdownitem3">Registration Add/Drop</NavDropdown.Item>
                                            <NavDropdown.Item href="https://ud-cis-teaching.github.io/student-guidance/" data-testid="navdropdownitem4">UD CIS Student Guidance</NavDropdown.Item>
                                        </NavDropdown>
                                        <DropdownMenu setConcentration={setConcentration} semesterCourses={semesterCourses} setSemesterCourses={setSemesterCourses}></DropdownMenu>
                                        <AddSemesterButton setSemesters={setSemesters} semesters={semesters} />
                                        <ExportPlan semesterCourses={semesterCourses}></ExportPlan>
                                    </Nav>
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>
                    </Row>
                    <Row>
                        <Col>
                            <br/>
                            <DisplayCourseList concentration={concentration} setConcentrationContainers={setConcentrationContainers} ></DisplayCourseList>
                        </Col>
                        <Col>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <SemesterTable semesters={semesters} semestersCourses={semesterCourses} setSemesterCourses={setSemesterCourses}/>
                        </Col>
                    </Row>
                </Container>
            </DragDropContext>
        </>
    );
};
