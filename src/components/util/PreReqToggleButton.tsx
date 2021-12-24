import { UseStateContext } from "./DispatchLogic/UseStateContext";
import { UseDispatchContext } from "./DispatchLogic/UseDispatchContext";
import { Button } from "react-bootstrap";
import { PreReqChecker } from "./DNDLogicV2/prereqchecker";
import React from "react";

export const PreReqToggleButton = (): JSX.Element => {
    const { state } = UseStateContext();
    const { dispatch } = UseDispatchContext();
    return(
        <Button size="sm" variant={state.preReqToggle ? "primary" : "outline-primary"} onClick={() => {
            if (state.preReqToggle === false) {
                // start removing all courses from semesters
                for (let i = 0; i < state.currentSaveData.semesters.length; i++) {
                    for (let j = state.currentSaveData.semesters[i].courses.length-1 ; j >= 0; j--) {
                        const preReqResult = PreReqChecker(state.currentSaveData.semesters, i, state.currentSaveData.semesters[i].courses[j], state, dispatch);
                        if (!preReqResult) {
                            console.log("theCourse = ", state.currentSaveData.semesters[i].courses[j]);
                            dispatch({type: "removeCourse", payload: { ...state, sourceContainerIndex: i, sourceIndex: j}});
                        }
                    }
                }
            }
            dispatch({type: "togglePreReq", payload: { ...state }});
        }}>
            Pre Req Toggle Button
        </Button>
    );
};