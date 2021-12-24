import { Button } from "react-bootstrap";
import React from "react";
import { UseDispatchContext } from "../util/DispatchLogic/UseDispatchContext";
import { UseStateContext } from "../util/DispatchLogic/UseStateContext";


export const ClearAllSemesterButton = (): JSX.Element => {

    const { state } = UseStateContext();
    const { dispatch } = UseDispatchContext();

    return (

        <Button
            variant="outline-danger"
            size="sm"
            onClick={() => {
                const theSemesters = state.currentSaveData.semesters;
                for(let i = 0; i < theSemesters.length; i++) {
                    const theSemester = theSemesters[i];
                    for(let j = 0; j < theSemester.courses.length; j++) {
                        dispatch({type: "removeCourse", payload: { ...state, sourceContainerIndex: i, sourceIndex: 0 }});
                    }
                }
                dispatch({type: "clearAllSemesters", payload: { ...state }});
            }}
        >
            Clear All Semesters
        </Button>

    );

};