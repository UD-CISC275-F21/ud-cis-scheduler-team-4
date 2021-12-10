import { UseStateContext } from "./DispatchLogic/UseStateContext";
import { UseDispatchContext } from "./DispatchLogic/UseDispatchContext";
import { Button } from "react-bootstrap";
import React from "react";

export const PreReqToggleButton = (): JSX.Element => {
    const { state } = UseStateContext();
    const { dispatch } = UseDispatchContext();
    return(
        <Button variant={state.preReqToggle ? "success" : "warning"}>
            Pre Req Toggle Button
        </Button>
    );
};