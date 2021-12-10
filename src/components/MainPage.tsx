import "bootswatch/dist/lux/bootstrap.min.css";
import { Container, Row, Col, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { WelcomeToast, PreReqSameSemesterToast } from "./util/Notifications";
import React, { useReducer } from "react";
import { DropdownMenu } from "./util/DropdownMenu";
import { DisplayCourseList } from "./courses/DisplayCourseList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { AddSemesterButton } from "./semesters/AddSemesterButton";
import { DeleteSemesterButton } from "./semesters/DeleteSemesterButton";
import { onDragEndLogic } from "./util/DropLogic";
import { ExportPlan } from "./util/ExportPlan";
import { HowToDisplay } from "./util/howto/howtodisplay";
import { Footer } from "./util/Footer";
import { initialState } from "../assets/data/statedata/InitialState";
import { reducerFunction } from "./util/DispatchLogic/SchedulerReducerFunction";
import { DispatchContext } from "./util/DispatchLogic/DispatchContext";
import { StateContext } from "./util/DispatchLogic/StateContext";
import { SemesterTable } from "./semesters/SemesterTable";
import { ClearAllSemesterButton } from "./semesters/ClearAllSemesterButton";

export const MainPage = (): JSX.Element => {
    const [state, dispatch] = useReducer(reducerFunction, initialState);
    const {
        concentration,
        display,
        concentrationContainers,
        toastDisplay,
        toastMessage,
    } = state;

    const dispatchValue = { dispatch };
    const stateValue = { state };

    const onDragEnd = (result: DropResult) => {
        onDragEndLogic(
            result,
            state,
            dispatch,
            concentrationContainers,
            state.currentSaveData.semesters
        );
    };

    return (
        <DispatchContext.Provider value={dispatchValue}>
            <StateContext.Provider value={stateValue}>
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
                                            <DropdownMenu/>
                                            <AddSemesterButton/>
                                            <DeleteSemesterButton/>
                                            <ClearAllSemesterButton/>
                                            <ExportPlan/>
                                            <HowToDisplay/>
                                            <button onClick={() => {
                                                dispatch({type: "displayState", payload: {...state}});
                                            }}>
                                                Check state
                                            </button>
                                        </Nav>
                                    </Navbar.Collapse>
                                </Container>
                            </Navbar>
                        </Row>
                        <Row>
                            <Col>
                                <br />
                                <DisplayCourseList concentration={concentration}/>
                            </Col>
                            <Col>
                                <br />
                                <br />
                                <br />
                                <br />
                                <div>
                                    <SemesterTable />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Footer />
                        </Row>
                    </Container>
                </DragDropContext>
            </StateContext.Provider>
        </DispatchContext.Provider>
    );
};
