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
import { Semester } from "../interfaces/semester";
import { Semester as SemesterComponent } from "./semesters/Semester";
import { AddSemesterButton } from "./semesters/AddSemesterButton";
import { DeleteSemesterButton } from "./semesters/DeleteSemesterButton";
import { ConcentrationContainerType } from "../interfaces/concentrationcontainer";
import { onDragEndLogic } from "./util/DropLogic";
import { ExportPlan } from "./util/ExportPlan";
import { HowToDisplay } from "./util/howto/howtodisplay";
import { Footer } from "./util/Footer";
import SavedData from "../assets/data/SavedProgress";
import { SavedProgress } from "../interfaces/savedprogress";
import { UpdateConcentration } from "./courses/DisplayCourseListHelperFunctions/UpdateConcentration";
import { UpdateSemester } from "./semesters/SemesterHelperFunctions/UpdateSemesters";
import { Course } from "../interfaces/course";
import { UpdateSemester as DNDUpdateSemester } from "./util/DNDLogic/UpdateSemester";

export const MainPage = (): JSX.Element => {
    const [concentration, setConcentration] = useState<Concentration>(CONCENTRATIONS[0] as Concentration);
    const [semesterCourses, setSemesterCourses] = useState<Semester[]>([]);
    const [display, setDisplay] = useState<boolean>(false);
    const [semesters, setSemesters] = useState<number>(1);
    const [concentrationContainers, setConcentrationContainers] = useState<ConcentrationContainerType[]>([]);
    const [toastDisplay, setToastDisplay] = useState<boolean>(false); // Will be implemented once basic drop logic is fully implemented
    const [toastMessage, setToastMessage] = useState<string>(""); // Will be implemented once basic drop logic is fully implemented
    const [deleteTriggered, setDeleteTriggered] = useState<number>(-1);
    const [saveData, setSaveData] = useState<SavedProgress[]>([{
        concentration: concentration,
        numberOfSemesters: semesters,
        semesters: semesterCourses
    } as SavedProgress]);
    const [currentSaveData, setCurrentSaveData] = useState<SavedProgress>(saveData[0]);

    useEffect(() => {
        setDisplay(true);
        setTimeout(() => {
            setDisplay(false);
        }, 1);
    }, []);

    const displayToast = (msg: string) => {
        setToastDisplay(true);
        setToastMessage(msg);
        setTimeout(() => {
            setToastDisplay(false);
        }, 5000);
    };

    useEffect(() => {
        console.log("triggering delete with deleteTriggered ", deleteTriggered);
        if (deleteTriggered === 0) {
            const theSemester: Semester | undefined = semesterCourses.length > 0 ? semesterCourses[semesters - 1] : undefined;
            if (theSemester !== undefined && theSemester.courses.length === 0) {
                semesterCourses[semesterCourses.length-1].courses = [];
                setSemesterCourses([...semesterCourses.slice(0, semesters - 1)]);
                setCurrentSaveData({...currentSaveData, numberOfSemesters: semesters-1});
                setSemesters((fmrSemesters) => fmrSemesters - 1);
            } else {
                console.log("displaying err");
                displayToast(`Move all courses from Semester ${semesters} back into course list on the left`);
            }
            setDeleteTriggered(-1);
        }
    }, [deleteTriggered]);

    useEffect(() => {
        setCurrentSaveData({...currentSaveData, numberOfSemesters: semesters});
    },[semesters]);

    useEffect(() => {
        console.log("switching to : ", concentration.name, " from ", currentSaveData.concentration.name);
    }, [concentration]);
 
    useEffect(() => {
        console.log("Semester courses updated", semesterCourses);
        if (semesterCourses.length > 0) {
            console.log("setting semesterCourses");
            setCurrentSaveData({...currentSaveData, semesters: [...semesterCourses]});
            setSemesterCourses((fmrSemesters) => semesterCourses);
        }
    }, [semesterCourses]);

    const onDragEnd = (result: DropResult) => {
        onDragEndLogic(result,
            concentrationContainers,
            setConcentrationContainers,
            semesterCourses,
            (semesters: Semester[]) => {
                setSemesterCourses(semesters);
            },
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
                        <PreReqSameSemesterToast display={toastDisplay} errMsg={toastMessage} setToastDisplay={setToastDisplay} />
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
                                        setDelete={setDeleteTriggered}
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
                            setConcentrationContainers={(concentrationContainers: ConcentrationContainerType[]) => setConcentrationContainers(concentrationContainers)}
                            saveData={saveData}
                        />
                    </Col>
                    <Col>
                        <br />
                        <br />
                        <br />
                        <br />
                        <div>
                            {
                                currentSaveData.numberOfSemesters > 0 ?
                                    new Array(currentSaveData.numberOfSemesters).fill(0)
                                        .map((elem, ind) =>
                                            <SemesterComponent
                                                ind={ind}
                                                key={`semester-table-key-${ind}`}
                                                semesterCourse={currentSaveData.semesters[ind]}
                                                setSemesterCourses={(newSemester: Semester) => setSemesterCourses((fmrSemesters) => [...fmrSemesters, newSemester])}
                                            />
                                        )
                                    :
                                    <div>
                                    No semesters available
                                    </div>
                            }
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Footer />
                </Row>
            </Container>
        </DragDropContext>
    );
};