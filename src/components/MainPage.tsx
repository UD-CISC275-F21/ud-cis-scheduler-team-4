import "bootswatch/dist/lux/bootstrap.min.css";
import produce from "immer";
import { Container, Row, Col, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { WelcomeToast, PreReqSameSemesterToast } from "./util/Notifications";
import { SemesterTable } from "./semesters/SemesterTable";
import React, { useState, useEffect, useReducer, ReducerWithoutAction } from "react";
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


const initialState: State = {
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

interface SchedulerAction {

    type: string,
    payload: State

}

const reducerFunction = (state: State, action: SchedulerAction ) => {
    switch (action.type) {
    case "updateSaveData":{
        return produce(state, (draft) => {
            draft.saveData = action.payload.saveData;
        });
    }
    case "updateCurrentSaveData":{
        return produce(
            state, (draft) => {
                draft.currentSaveData = action.payload.currentSaveData
            });
    }
    case "setDisplay":{
        return produce(state, (draft) => {
            draft.display = action.payload.display;
        });
    }
    case "deleteSemester":{
        if ( state.semesters > 0) {
            const temporarySemesterCourse = action.payload.semeterCourses[action.payload.semesterCourses.length-1];
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
            return {...state,
            };
        }
    }
    case "displayToast":{
        return {
            ...state,
            toastMessage: action.payload.toastMessage,
            toastDisplay: action.payload.toastDisplay,
        };
    }
    default:{
        break;
    }
    }
    return {...state};
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

    useEffect(() => {
        dispatch({type: "setDisplay", payload: {...state, display: true}});
        setTimeout(() => {
            dispatch({type: "setDisplay", payload: {...state, display: false}});
        }, 5000);
    }, []);

    const displayToast = (msg: string) => {
        dispatch({type: "displayToast", payload: { ...state, toastDisplay: true, toastMessage: msg}});
        setTimeout(() => {
            dispatch({type: "displayToast", payload: { ...state, toastDisplay: false}});
        }, 5000);
    };

    useEffect(() => {
        console.log("-updating semesters = ", semesters);
        dispatch({type: "updateCurrentSaveData", payload: { ...state, currentSaveData: {
            ...currentSaveData,
            numberOfSemesters: semesters
        }}});
    },[semesters]);

    useEffect(() => {
        dispatch({type: "updateSaveData", payload: { ...state, saveData:
            {...saveData}
        }});
    }, [saveData]);

    useEffect(() => {
        console.log("-updating currentSaveData --", currentSaveData);
        dispatch({type: "updateCurrentSaveData", payload: {...state, currentSaveData: {
            ...currentSaveData
        }}});
    },[currentSaveData]);

    useEffect(() => {
        console.log("switching to : ", concentration.name, " from ", currentSaveData.concentration.name);
        const result = CheckConcentrationInSaveData(concentration,saveData);
        //console.log("result = ", result, " and currentSaveData = ", currentSaveData);
        if (result === -1) {
            // concentration was not able to be located
            const indexToUpdate = UpdateSaveDataOnConcentrationChange(currentSaveData.concentration.name, saveData);
            const tmpData = [...saveData];
            tmpData[indexToUpdate] = {...currentSaveData};
            tmpData.push({
                concentration: concentration,
                numberOfSemesters: 1,
                semesters: [tmpData[indexToUpdate].semesters[0]],
            });
            tmpData[tmpData.length-1].semesters[0].courseSetter([]);
            tmpData[tmpData.length-1].semesters[0].courses = [];
            setSaveData([...tmpData]);
            setSemesters(1);
            setCurrentSaveData(() => ({...tmpData[tmpData.length-1]}));
        } else {
            //console.log("Loading saved data...");
            setCurrentSaveData({...saveData[result]});
            setSemesters(currentSaveData.numberOfSemesters);
            UpdateMainPageStateWithSaveData(
                currentSaveData,
                (newNumberOfSemesters: number) => setSemesters(newNumberOfSemesters),
                (newSemesterCourses: Semester[]) => setSemesterCourses(newSemesterCourses),
            );
            //console.log("New current save data = ", currentSaveData);
        }
    }, [concentration]);

    const updateSemesterCourses = (newSemester: Semester) => {

        const tmpSemesterCourses = semesterCourses.map(e => ({...e}));
        tmpSemesterCourses.push(newSemester);
        setSemesterCourses(tmpSemesterCourses);

    };
 
    useEffect(() => {
        console.log("Semester courses updated", semesterCourses);
        if (semesterCourses.length >= 0) {
            //console.log("setting semesterCourses from ", semesterCourses);
            setCurrentSaveData({...currentSaveData, semesters: [...semesterCourses]});
            setSemesterCourses((fmrSemesters) => semesterCourses);
            UpdateSaveDataOnSemesterCoursesChange(concentration.name, semesterCourses, (newSaveData: SavedProgress[]) => setSaveData(newSaveData), saveData);
            //console.log("after setting semesterCourses, currentSaveData = ", currentSaveData, " and semesterCourses = ", semesterCourses);
        }
    }, [semesterCourses]);

    const onDragEnd = (result: DropResult) => {
        onDragEndLogic(result,
            concentrationContainers,
            (newConcentrationContainers: ConcentrationContainerType[]) => setConcentrationContainers([...newConcentrationContainers]),    
            semesterCourses,
            (semesters: Semester[]) => {
                setSemesterCourses([...semesters]);
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
                                        setConcentration={(theConcentration: Concentration) => setConcentration(theConcentration)}
                                    />
                                    <AddSemesterButton semesters={semesters} setSemesters={(newNumberOfSemesters: number) => setSemesters(newNumberOfSemesters)} />
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
                        <DisplayCourseList
                            concentration={concentration}
                            setConcentrationContainers={(concentrationContainers: ConcentrationContainerType[]) => setConcentrationContainers([...concentrationContainers])}
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
                                                updateSemesterCourses={
                                                    (newSemester: Semester) => {
                                                        console.log("updating semester with -- ", newSemester);
                                                        updateSemesterCourses(newSemester);
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
    );
};
