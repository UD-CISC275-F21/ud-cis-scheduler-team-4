import { State } from "../../../interfaces/State";
import React from "react";
import { StateContext } from "./StateContext";

export const UseStateContext = (): {state: State} => {
    const context = React.useContext(StateContext);
    if (context === undefined) {
        throw new Error("StateContext must have a value");
    }
    return context;
};