import { State } from "../../MainPage";
import { SchedulerAction } from "../../MainPage";
import React from "react";

export const concentrationToConcentration = (

    state: State,
    dispatch: React.Dispatch<SchedulerAction>,
    sourceContainerIndex: number,
    destinationContainerIndex: number,
    sourceIndex: number,
    dropIndex: number,

): void => {
    dispatch({type: "concentrationToConcentration", payload: {
        ...state,
        sourceContainerIndex: sourceContainerIndex,
        destContainerIndex: destinationContainerIndex,
        destIndex: dropIndex,
        sourceIndex: sourceIndex
    }});
};