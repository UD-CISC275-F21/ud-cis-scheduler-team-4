import { Button } from "react-bootstrap";
import React from "react";
import { UseDispatchContext } from "../util/DispatchLogic/UseDispatchContext";
import { UseStateContext } from "../util/DispatchLogic/UseStateContext";

export const DeleteSemesterButton = (): JSX.Element => {
    const { dispatch } = UseDispatchContext();
    const { state } = UseStateContext();
    return(
        <Button
            data-testid="deletesemesterbutton"
            onClick={() => {
                dispatch({type: "deleteSemester", payload: { ...state }});
            }}
            variant="outline-danger"
        >
            Delete Semester
        </Button>
    );
};

