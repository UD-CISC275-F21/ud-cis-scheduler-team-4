import { SchedulerAction } from "../../../interfaces/SchedulerAction";
import { DispatchContext } from "./DispatchContext";
import React from "react";

export const UseDispatchContext = (): {dispatch: React.Dispatch<SchedulerAction>} => {
    const context = React.useContext(DispatchContext);
    if (context === undefined) {
        throw new Error("DispatchContext must have a value");
    }
    return context;
};