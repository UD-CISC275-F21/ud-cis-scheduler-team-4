import { Button } from "react-bootstrap";
import React from "react";
import { UseStateContext, UseDispatchContext } from "../MainPage";

export const AddSemesterButton = (): JSX.Element => {
    const { state } = UseStateContext();
    const { dispatch } = UseDispatchContext();
    return(
        <Button
            data-testid="addsemesterbutton"
            onClick={() => {
                dispatch({type: "updateNumberOfSemesters", payload: { ...state, semesters: state.semesters + 1}});
            }}
            variant="outline-primary"
        >
            Add Semester
        </Button>
    );
};