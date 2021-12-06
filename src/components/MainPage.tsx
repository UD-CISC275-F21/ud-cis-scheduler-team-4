import "bootswatch/dist/lux/bootstrap.min.css";
import produce, { current } from "immer";
import { Container, Row, Col, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { WelcomeToast, PreReqSameSemesterToast } from "./util/Notifications";
import React, { useReducer } from "react";
import { DropdownMenu } from "./util/DropdownMenu";
import { DisplayCourseList } from "./courses/DisplayCourseList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Semester } from "../interfaces/semester";
import { Semester as SemesterComponent } from "./semesters/Semester";
import { AddSemesterButton } from "./semesters/AddSemesterButton";
import { DeleteSemesterButton } from "./semesters/DeleteSemesterButton";
import { ConcentrationContainerType } from "../interfaces/concentrationcontainer";
import { onDragEndLogic } from "./util/DropLogic";
import { ExportPlan } from "./util/ExportPlan";
import { HowToDisplay } from "./util/howto/howtodisplay";
import { Footer } from "./util/Footer";
import { Course } from "../interfaces/course";
import { State } from "../interfaces/State";
import { initialState } from "../assets/data/statedata/InitialState";
import { SchedulerAction } from "../interfaces/SchedulerAction";
import { mapCoursesToNames } from "./util/ConcentrationHelperFunctions/ConcentrationHelperFunctions";
import { Button } from "react-bootstrap";
import { reducerFunction } from "./util/DispatchLogic/SchedulerReducerFunction";
import { UseStateContext } from "./util/DispatchLogic/UseStateContext";
import { UseDispatchContext } from "./util/DispatchLogic/UseDispatchContext";
import { DispatchContext } from "./util/DispatchLogic/DispatchContext";
import { StateContext } from "./util/DispatchLogic/StateContext";

export const MainPage = (): JSX.Element => {
    const [state, dispatch] = useReducer(reducerFunction, initialState);
    const {
        concentration,
        semesterCourses,
        display,
        semesters,
        concentrationContainers,
        toastDisplay,
        toastMessage,
        saveData,
        currentSaveData,
        destIndex,
        destContainerIndex,
        sourceIndex,
        sourceContainerIndex
    } = state;

    const dispatchValue = { dispatch };
    const stateValue = { state };

    const onDragEnd = (result: DropResult) => {
        onDragEndLogic(
            result,
            state,
            dispatch,
            concentrationContainers,
            semesterCourses
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
                                            <DeleteSemesterButton />
                                            <ExportPlan semesterCourses={semesterCourses} />
                                            <HowToDisplay />
                                            <Button
                                                onClick={() => {
                                                    dispatch({type: "checkState", payload: {...state}});
                                                }
                                                }>Check state
                                            </Button>
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
                                    {
                                        state.currentSaveData.numberOfSemesters > 0 ?
                                            new Array(state.currentSaveData.numberOfSemesters).fill(0)
                                                .map((elem, ind) =>
                                                    <SemesterComponent
                                                        ind={ind}
                                                        key={`semester-table-key-${ind}`}
                                                        semesterCourse={state.currentSaveData.semesters[ind]}
                                                        updateSemesterCourses={
                                                            (newSemester: Semester) => {
                                                                dispatch({type: "updateSemesterCourses", payload: { ...state, semesterCourses: [...state.semesterCourses, newSemester ]}});
                                                            }
                                                        }
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
            </StateContext.Provider>
        </DispatchContext.Provider>
    );
};
