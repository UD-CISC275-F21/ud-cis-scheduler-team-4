import { Button } from "react-bootstrap";
import React from "react";
import { UseDispatchContext } from "../util/DispatchLogic/UseDispatchContext";
import { UseStateContext } from "../util/DispatchLogic/UseStateContext";

export const AddSemesterButton = (): JSX.Element => {
    const { state } = UseStateContext();
    const { dispatch } = UseDispatchContext();
    return(
        <Button
            data-testid="addsemesterbutton"
            onClick={() => {
                dispatch({type: "updateNumberOfSemesters", payload: { ...state }});
            }}
            variant="outline-primary"
        >
            Add Semester
        </Button>
    );
};