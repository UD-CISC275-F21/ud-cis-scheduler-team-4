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

export const reducerFunction = (state: State, action: SchedulerAction ): State => {
    //console.log("state = ", state);
    switch (action.type) {
    case "checkState": {
        return produce(state, (draft) => {

            console.log("current state = ", state);

        });
    }
    case "concentrationToSemester": {
        return produce(state, (draft) => {
            // PreReqChecker here
            console.log("C-->StateContext state = ", state, " and payload = ", action.payload);
            const theConcentration: ConcentrationContainerType = draft.concentrationContainers[action.payload.sourceContainerIndex];
            const theSemester: Semester = draft.semesterCourses[action.payload.destContainerIndex];
            const theCourse = theConcentration.courses.splice(action.payload.sourceIndex,1)[0];
            theSemester.courses.splice(action.payload.destIndex,0,theCourse);
            draft.concentrationContainers[action.payload.sourceContainerIndex] = theConcentration;
            draft.semesterCourses[action.payload.destContainerIndex] = theSemester;
            draft.currentSaveData.semesters[action.payload.destContainerIndex].courses = theSemester.courses;
            const theName = theConcentration.name.split("-")[0];
            const index = draft.saveData.findIndex((eachSaveData) => eachSaveData.concentration.name === draft.currentSaveData.concentration.name);
            if (index !== -1) {
                switch (theName) {
                case "general":{ draft.currentSaveData.concentration.conc.general = mapCoursesToNames(theConcentration.courses); break; }
                case "core":{ draft.currentSaveData.concentration.core = mapCoursesToNames(theConcentration.courses); break; }
                case "capstone":{ draft.currentSaveData.concentration.capstone = mapCoursesToNames(theConcentration.courses); break; }
                case "lab":{ draft.currentSaveData.concentration.lab = mapCoursesToNames(theConcentration.courses); break; }
                case "writing":{ draft.currentSaveData.concentration.writing = mapCoursesToNames(theConcentration.courses); break; }
                case "stats":{ draft.currentSaveData.concentration.conc.stats = mapCoursesToNames(theConcentration.courses); break; }
                case "systems":{ draft.currentSaveData.concentration.conc.systems = mapCoursesToNames(theConcentration.courses); break; }
                case "elective":{ draft.currentSaveData.concentration.conc.elective = mapCoursesToNames(theConcentration.courses); break; }
                case "ochem":{ draft.currentSaveData.concentration.conc.ochem = mapCoursesToNames(theConcentration.courses); break; }
                case "data":{ draft.currentSaveData.concentration.conc.data = mapCoursesToNames(theConcentration.courses); break; }
                case "cybersecurity":{ draft.currentSaveData.concentration.conc.cybersecurity = mapCoursesToNames(theConcentration.courses); break; }
                case "track":{ draft.currentSaveData.concentration.conc.track = mapCoursesToNames(theConcentration.courses); break; }
                default:{ break; }
                }
                draft.concentration = draft.currentSaveData.concentration;
            }
        });
    }
    case "semesterToConcentration": {
        return produce(state, (draft) => {
            console.log("S-->C state = ", state, " and payload = ", action.payload);
            const theConcentration: ConcentrationContainerType = draft.concentrationContainers[action.payload.destContainerIndex];
            const theSemester: Semester = draft.semesterCourses[action.payload.sourceContainerIndex];
            const theCourse: Course = theSemester.courses.splice(action.payload.sourceIndex, 1)[0];
            theConcentration.courses.splice(action.payload.destIndex, 0, theCourse);
            draft.concentrationContainers[draft.destContainerIndex].courses = theConcentration.courses;
            draft.semesterCourses[draft.sourceContainerIndex].courses = theSemester.courses;
            draft.currentSaveData.semesters[draft.sourceContainerIndex].courses = theSemester.courses;
            const theName = theConcentration.name.split("-")[0];
            const index = draft.saveData.findIndex((eachSaveData) => eachSaveData.concentration.name === draft.currentSaveData.concentration.name);
            if (index !== -1) {
                switch (theName) {
                case "general":{ draft.currentSaveData.concentration.conc.general = mapCoursesToNames(theConcentration.courses); break; }
                case "core":{ draft.currentSaveData.concentration.core = mapCoursesToNames(theConcentration.courses); break; }
                case "capstone":{ draft.currentSaveData.concentration.capstone = mapCoursesToNames(theConcentration.courses); break; }
                case "lab":{ draft.currentSaveData.concentration.lab = mapCoursesToNames(theConcentration.courses); break; }
                case "writing":{ draft.currentSaveData.concentration.writing = mapCoursesToNames(theConcentration.courses); break; }
                case "stats":{ draft.currentSaveData.concentration.conc.stats = mapCoursesToNames(theConcentration.courses); break; }
                case "systems":{ draft.currentSaveData.concentration.conc.systems = mapCoursesToNames(theConcentration.courses); break; }
                case "elective":{ draft.currentSaveData.concentration.conc.elective = mapCoursesToNames(theConcentration.courses); break; }
                case "ochem":{ draft.currentSaveData.concentration.conc.ochem = mapCoursesToNames(theConcentration.courses); break; }
                case "data":{ draft.currentSaveData.concentration.conc.data = mapCoursesToNames(theConcentration.courses); break; }
                case "cybersecurity":{ draft.currentSaveData.concentration.conc.cybersecurity = mapCoursesToNames(theConcentration.courses); break; }
                case "track":{ draft.currentSaveData.concentration.conc.track = mapCoursesToNames(theConcentration.courses); break; }
                default:{ break; }
                }
                draft.concentration = draft.currentSaveData.concentration;
            }
        });
    }
    case "semesterToSemester": {
        return produce(state, (draft) => {
            console.log("S-->S state = ", state, " and payload = ", action.payload);
            const theSourceSemester: Semester = draft.currentSaveData.semesters[action.payload.sourceContainerIndex];
            const theDestSemester: Semester = draft.currentSaveData.semesters[action.payload.destContainerIndex];
            const theSplicedCourse: Course = theSourceSemester.courses.splice(action.payload.sourceIndex, 1)[0];
            theDestSemester.courses.splice(action.payload.destIndex, 0, theSplicedCourse);
            draft.semesterCourses[action.payload.sourceContainerIndex].courses = theSourceSemester.courses;
            draft.semesterCourses[action.payload.destContainerIndex].courses = theDestSemester.courses;
            draft.currentSaveData.semesters[action.payload.destContainerIndex].courses = theDestSemester.courses;
            draft.currentSaveData.semesters[action.payload.sourceContainerIndex].courses = theSourceSemester.courses;
        });
    }
    case "concentrationToConcentration": {
        return produce(state, (draft) => {
            console.log("C-->C state = ", state, " and payload = ", action.payload);
            const theSourceConcentration: ConcentrationContainerType = draft.concentrationContainers[action.payload.sourceContainerIndex];
            const theDestinationConcentration: ConcentrationContainerType = draft.concentrationContainers[action.payload.destContainerIndex];
            const theCourse = theSourceConcentration.courses.splice(action.payload.sourceIndex, 1)[0];
            theDestinationConcentration.courses.splice(action.payload.destIndex, 0, theCourse);
            draft.concentrationContainers[action.payload.sourceContainerIndex].courses = theSourceConcentration.courses;
            draft.concentrationContainers[action.payload.destContainerIndex].courses = theDestinationConcentration.courses;
            const theName = theSourceConcentration.name.split("-")[0];
            const index = draft.saveData.findIndex((eachSaveData) => eachSaveData.concentration.name === draft.currentSaveData.concentration.name);
            const concentrationCourses = theSourceConcentration.courses;
            if (index !== -1) {
                switch (theName) {
                case "general":{ draft.currentSaveData.concentration.conc.general = mapCoursesToNames(concentrationCourses); break; }
                case "core":{ draft.currentSaveData.concentration.core = mapCoursesToNames(concentrationCourses); break; }
                case "capstone":{ draft.currentSaveData.concentration.capstone = mapCoursesToNames(concentrationCourses); break; }
                case "lab":{ draft.currentSaveData.concentration.lab = mapCoursesToNames(concentrationCourses); break; }
                case "writing":{ draft.currentSaveData.concentration.writing = mapCoursesToNames(concentrationCourses); break; }
                case "stats":{ draft.currentSaveData.concentration.conc.stats = mapCoursesToNames(concentrationCourses); break; }
                case "systems":{ draft.currentSaveData.concentration.conc.systems = mapCoursesToNames(concentrationCourses); break; }
                case "elective":{ draft.currentSaveData.concentration.conc.elective = mapCoursesToNames(concentrationCourses); break; }
                case "ochem":{ draft.currentSaveData.concentration.conc.ochem = mapCoursesToNames(concentrationCourses); break; }
                case "data":{ draft.currentSaveData.concentration.conc.data = mapCoursesToNames(concentrationCourses); break; }
                case "cybersecurity":{ draft.currentSaveData.concentration.conc.cybersecurity = mapCoursesToNames(concentrationCourses); break; }
                case "track":{ draft.currentSaveData.concentration.conc.track = mapCoursesToNames(concentrationCourses); break; }
                default:{ break; }
                }
                draft.concentration = draft.currentSaveData.concentration;
            }
            const concentration2Courses = theDestinationConcentration.courses;
            const theName2 = theDestinationConcentration.name.split("-")[0];
            if (index !== -1) {
                switch (theName2) {
                case "general":{ draft.currentSaveData.concentration.conc.general = mapCoursesToNames(concentration2Courses); break; }
                case "core":{ draft.currentSaveData.concentration.core = mapCoursesToNames(concentration2Courses); break; }
                case "capstone":{ draft.currentSaveData.concentration.capstone = mapCoursesToNames(concentration2Courses); break; }
                case "lab":{ draft.currentSaveData.concentration.lab = mapCoursesToNames(concentration2Courses); break; }
                case "writing":{ draft.currentSaveData.concentration.writing = mapCoursesToNames(concentration2Courses); break; }
                case "stats":{ draft.currentSaveData.concentration.conc.stats = mapCoursesToNames(concentration2Courses); break; }
                case "systems":{ draft.currentSaveData.concentration.conc.systems = mapCoursesToNames(concentration2Courses); break; }
                case "elective":{ draft.currentSaveData.concentration.conc.elective = mapCoursesToNames(concentration2Courses); break; }
                case "ochem":{ draft.currentSaveData.concentration.conc.ochem = mapCoursesToNames(concentration2Courses); break; }
                case "data":{ draft.currentSaveData.concentration.conc.data = mapCoursesToNames(concentration2Courses); break; }
                case "cybersecurity":{ draft.currentSaveData.concentration.conc.cybersecurity = mapCoursesToNames(concentration2Courses); break; }
                case "track":{ draft.currentSaveData.concentration.conc.track = mapCoursesToNames(concentration2Courses); break; }
                default:{ break; }
                }
                draft.concentration = draft.currentSaveData.concentration;
            }
        });
    }
    case "updateSaveData":{
        return produce(state, (draft) => {
            draft.saveData = action.payload.saveData;
        });
    }
    case "updateNumberOfSemesters":{
        console.log("--- adding semester, state = ", state);
        return produce(state, (draft) => {
            draft.semesters = action.payload.semesters;
            draft.currentSaveData.numberOfSemesters = action.payload.semesters;
        });
    }
    case "updateConcentration":{
        //console.log("updating concentration with payload : ", action.payload);
        return produce(state, (draft) => {
            if (!draft.saveData.find((eachSaveData) => eachSaveData.concentration.name === action.payload.concentration.name)) {
                console.log("inserting newSaveData");
                const currSaveIndex = draft.saveData.findIndex((eachSaveData) => eachSaveData.concentration.name === draft.currentSaveData.concentration.name);
                if (currSaveIndex !== -1) {
                    draft.saveData[currSaveIndex] = draft.currentSaveData;
                }
                draft.saveData.splice(draft.saveData.length, 0, { concentration: action.payload.concentration, numberOfSemesters: 1, semesters: []});
                draft.semesters = 1;
                if (draft.currentSaveData.semesters.length > 0) {
                    draft.semesterCourses = [{...draft.currentSaveData.semesters[0], courses: []}];
                }
                draft.currentSaveData = draft.saveData[draft.saveData.length-1];
                draft.currentSaveData.semesters = draft.semesterCourses;
            } else {
                console.log("Found save data");
                const result = draft.saveData.findIndex((eachSaveData) => eachSaveData.concentration.name === action.payload.concentration.name);
                if (result !== -1) {
                    console.log("currstate and result = ", state, " ", result);
                    draft.currentSaveData = draft.saveData[result];
                    draft.semesters = draft.saveData[result].numberOfSemesters;
                    draft.semesterCourses = draft.saveData[result].semesters;
                    console.log("foundsavedata = ", action.payload);
                }
            }
            draft.concentration = action.payload.concentration;
        });
    }
    case "updateSemesterCourses":{
        return produce(state, (draft) => {
            console.log("updating semesterCourses");
            draft.semesterCourses = action.payload.semesterCourses;
            draft.currentSaveData.semesters = action.payload.semesterCourses;
        });
    }
    case "updateConcentrationContainers": {
        console.log("updating concentrationcontainers with payload ", action.payload);
        return produce(state, (draft) => {
            //console.log("payload = ", action.payload);
            draft.concentrationContainers = action.payload.concentrationContainers;
            return draft;
        });
    }
    case "updateCurrentSaveData":{
        return produce(
            state, (draft) => {
                draft.currentSaveData = action.payload.currentSaveData;
            });
    }
    case "setDisplay":{
        return produce(state, (draft) => {
            draft.display = action.payload.display;
        });
    }
    case "deleteSemester":{
        if ( state.semesters > 0) {
            const temporarySemesterCourse = action.payload.semesterCourses[action.payload.semesterCourses.length-1];
            if (temporarySemesterCourse.courses.length > 0) {
                // display error
                return produce(state, (draft) => {
                    draft.toastMessage = `Must remove classes from Semester ${draft.semesterCourses.length} before deleting`;
                    draft.toastDisplay = true;
                });
            } else {
                return produce(state, (draft) => {
                    draft.semesterCourses = draft.semesterCourses.slice(0, draft.semesterCourses.length-1);
                    draft.semesters -= 1;
                    draft.currentSaveData.numberOfSemesters = draft.semesterCourses.length-1;
                    draft.currentSaveData.semesters = draft.currentSaveData.semesters.slice(0,draft.currentSaveData.semesters.length-1);
                });
            }
        } else {
            console.log("indeleteelse");
            return { ...state };
        }
    }
    case "displayToast":{
        return produce(state, (draft) => {
            draft.toastMessage = action.payload.toastMessage;
            draft.toastDisplay = action.payload.toastDisplay;
        });
    }
    case "NoSavedConcentration": {
        return produce(state, (draft) => {
            const indexToUpdate = draft.saveData.findIndex((eachSaveData) => eachSaveData.concentration.name === draft.currentSaveData.concentration.name);
            draft.saveData[indexToUpdate] = draft.currentSaveData;
            draft.saveData = [...draft.saveData, {
                concentration: action.payload.concentration,
                numberOfSemesters: 1,
                semesters: [],
            }];
            draft.semesters = 1;
            draft.currentSaveData = draft.saveData[draft.saveData.length-1];
            draft.currentSaveData.numberOfSemesters = 1;
        });
    }
    case "SavedConcentration": {
        return produce(state, (draft) => {
            const indexWhereSaveDataIs = draft.saveData.findIndex((eachSaveData) => eachSaveData.concentration.name === action.payload.concentration.name);
            draft.currentSaveData = draft.saveData[indexWhereSaveDataIs];
            draft.semesters = draft.currentSaveData.numberOfSemesters;
            draft.semesterCourses = draft.currentSaveData.semesters;

        });
    }
    case "SetSemesterCourses": {
        return produce(state, (draft) => {
            draft.currentSaveData = {...draft.currentSaveData, semesters: action.payload.semesterCourses};
            draft.semesterCourses = action.payload.semesterCourses;
            draft.saveData[draft.saveData.findIndex((eachSaveData) => eachSaveData.concentration.name === draft.currentSaveData.concentration.name)].semesters = draft.semesterCourses;
        });
    }
    case "updateCourse": {

        return produce(state, (draft) => {
            console.log("in update course with msg = ", action.payload);
            const theSemester: Semester = draft.semesterCourses[action.payload.sourceContainerIndex];
            const newTextFields = action.payload.toastMessage.split("_"); // [desc, name, title]
            const theClass = { ...theSemester.courses[action.payload.sourceIndex], description: newTextFields[0], name: newTextFields[1], title: newTextFields[2]};
            draft.currentSaveData.semesters[action.payload.sourceContainerIndex].courses[action.payload.sourceIndex] = theClass;
            draft.semesterCourses[action.payload.sourceContainerIndex].courses[action.payload.sourceIndex] = theClass;
        });
        break;
    }
    default:{
        break;
    }
    }
    return {...state};
};

export const DispatchContext = React.createContext<{dispatch: React.Dispatch<SchedulerAction>} | undefined>(undefined);
export const StateContext = React.createContext<{state: State} | undefined>(undefined);

export const UseDispatchContext = (): {dispatch: React.Dispatch<SchedulerAction>} => {
    const context = React.useContext(DispatchContext);
    if (context === undefined) {
        throw new Error("DispatchContext must have a value");
    }
    return context;
};

export const UseStateContext = (): {state: State} => {
    const context = React.useContext(StateContext);
    if (context === undefined) {
        throw new Error("StateContext must have a value");
    }
    return context;
};

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
