import "bootswatch/dist/lux/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import { WelcomeToast, PreReqSameSemesterToast } from "./util/Notifications";
import React, { useReducer, useEffect } from "react";
import { DisplayCourseList } from "./courses/DisplayCourseList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { onDragEndLogic } from "./util/DropLogic";
import { Footer } from "./util/Footer";
import { initialState } from "../assets/data/statedata/InitialState";
import { reducerFunction } from "./util/DispatchLogic/SchedulerReducerFunction";
import { DispatchContext } from "./util/DispatchLogic/DispatchContext";
import { StateContext } from "./util/DispatchLogic/StateContext";
import { SemesterTable } from "./semesters/SemesterTable";
import { CourseSchedulerNavbar } from "./util/Navbar/CourseSchedulerNavbar";

export const MainPage = (): JSX.Element => {
    const [state, dispatch] = useReducer(reducerFunction, initialState);
    const {
        concentration,
        display,
        concentrationContainers,
        toastDisplay,
        toastMessage,
    } = state;

    useEffect(() => {
        setTimeout(() => {
            dispatch({type: "setDisplay", payload: { ...state, display: false } });
        }, 1000);
        dispatch({type: "setDisplay", payload: { ...state, display: true } });
    },[]);

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
                            <CourseSchedulerNavbar />
                            <button onClick={() => {
                                dispatch({type: "displayState", payload: { ...state }});
                            }}>
                                Display State
                            </button>
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
