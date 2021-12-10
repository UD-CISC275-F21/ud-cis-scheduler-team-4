import { UseStateContext } from "./DispatchLogic/UseStateContext";
import { UseDispatchContext } from "./DispatchLogic/UseDispatchContext";
import { Button } from "react-bootstrap";
import React from "react";

export const PreReqToggleButton = (): JSX.Element => {
    const { state } = UseStateContext();
    const { dispatch } = UseDispatchContext();
    return(
        <Button size="sm" variant={state.preReqToggle ? "primary" : "outline-primary"} onClick={() => {
            dispatch({type: "togglePreReq", payload: { ...state }});
        }}>
            Pre Req Toggle Button
        </Button>
    );
};