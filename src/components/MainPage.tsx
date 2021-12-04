import "bootswatch/dist/lux/bootstrap.min.css";
import produce from "immer";
import { Container, Row, Col, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { WelcomeToast, PreReqSameSemesterToast } from "./util/Notifications";
import { SemesterTable } from "./semesters/SemesterTable";
import React, { useState, useEffect, useReducer, useContext } from "react";
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
import { CheckConcentrationInSaveData } from "./util/SaveDataFunctions/CheckConcentrationInSaveData";
import { SaveConcentrationToSaveData } from "./util/SaveDataFunctions/SaveConcentrationToSaveData";
import { UpdateSaveDataOnConcentrationChange } from "./util/SaveDataFunctions/UpdateSaveDataOnConcentrationChange";
import { UpdateSaveDataOnSemesterCoursesChange } from "./util/SaveDataFunctions/UpdateSaveDataOnSemesterCoursesChange";
import { UpdateSaveDataOnConcentrationContainerChange } from "./util/SaveDataFunctions/UpdateSaveDataOnConcentrationContainerChange";
import { UpdateMainPageStateWithSaveData } from "./util/SaveDataFunctions/UpdateMainPageStateWithSaveData";

export interface State{
    concentration: Concentration,
    semesterCourses: Semester[],
    display: boolean,
    semesters: number,
    concentrationContainers: ConcentrationContainerType[],
    toastDisplay: boolean,
    toastMessage: string,
    deleteTriggered: number,
    saveData: SavedProgress[],
    currentSaveData: SavedProgress
}


export const initialState: State = {
    concentration : CONCENTRATIONS[0],
    semesterCourses : [],
    display : false,
    semesters : 1,
    concentrationContainers: [],
    toastDisplay: false,
    toastMessage: "",
    deleteTriggered: -1,
    saveData: [{
        concentration: CONCENTRATIONS[0],
        numberOfSemesters: 1,
        semesters: [],
    } as SavedProgress],
    currentSaveData: {
        concentration: CONCENTRATIONS[0],
        numberOfSemesters: 1,
        semesters: [],
    } as SavedProgress,
};

export interface SchedulerAction {

    type: string,
    payload: State

}

export const reducerFunction = (state: State, action: SchedulerAction ): State => {
    switch (action.type) {
    case "updateSaveData":{
        return produce(state, (draft) => {
            draft.saveData = action.payload.saveData;
        });
    }
    case "updateNumberOfSemesters":{
        return produce(state, (draft) => {
            draft.semesters = action.payload.semesters;
        });
    }
    case "updateConcentration":{
        console.log("updating concentration with state : ", state);
        return produce(state, (draft) => {
            draft.concentration = action.payload.concentration;
        });
    }
    case "updateSemesterCourses":{
        return produce(state, (draft) => {
            draft.semesterCourses = action.payload.semesterCourses;
        });
    }
    case "updateConcentrationContainers": {
        console.log("updating concentrationcontainers with state ", state);
        return produce(state, (draft) => {
            console.log("payload = ", action.payload);
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
                });
            }
        } else {
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
        currentSaveData
    } = state;

    const dispatchValue = { dispatch };
    const stateValue = { state };

    const onDragEnd = (result: DropResult) => {
        onDragEndLogic(
            result,
            concentrationContainers,
            (newConcentrationContainers: ConcentrationContainerType[]) => dispatch({type: "updateConcentrationContainers", payload: { ...state, concentrationContainers: newConcentrationContainers}}),    
            semesterCourses,
            (semesters: Semester[]) => {
                dispatch({type: "updateSemesterCourses", payload: { ...state, semesterCourses: semesters}});
            },
            (msg: string) => {
                dispatch({ type: "displayToast", payload: { ...state, toastMessage: msg, toastDisplay: true}});
                setTimeout(() => {
                    dispatch({ type: "displayToast", payload: { ...state, toastMessage: "", toastDisplay: false}});
                }, 3000);
            },
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
                                <PreReqSameSemesterToast display={toastDisplay} errMsg={toastMessage} setToastDisplay={(displayBool: boolean) => {
                                    dispatch({type: "displayToast", payload: { ...state, toastDisplay: displayBool }});
                                }} />
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
                                            <AddSemesterButton semesters={semesters} setSemesters={(newNumberOfSemesters: number) => dispatch({type: "updateNumberOfSemesters", payload: { ...state, semesters: newNumberOfSemesters }})} />
                                            <DeleteSemesterButton
                                                setDelete={() => {
                                                    dispatch({type: "deleteSemester", payload: state});
                                                    dispatch({type: "deleteSemester", payload: state});
                                                }}
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
                                <DisplayCourseList/>
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
                                                        updateSemesterCourses={
                                                            (newSemester: Semester) => {
                                                                dispatch({type: "updateSemesterCourses", payload: { ...state, semesterCourses: [...semesterCourses, newSemester ]}});
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
