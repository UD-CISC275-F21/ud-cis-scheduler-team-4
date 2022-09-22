import { State } from "../../../interfaces/State";
import { SchedulerAction } from "../../../interfaces/SchedulerAction";
import React from "react";

export const DropLogicExecutor = (
    state: State,
    dispatch: React.Dispatch<SchedulerAction>,
    dispatchType: string,
    sourceContainerIndex: number,
    destinationContainerIndex: number,
    sourceIndex: number,
    droppingIndex: number,
): void => {
    dispatch({type: dispatchType, payload: {
        ...state,
        sourceIndex: sourceIndex,
        sourceContainerIndex: sourceContainerIndex,
        destIndex: droppingIndex,
        destContainerIndex: destinationContainerIndex
    }});
};
