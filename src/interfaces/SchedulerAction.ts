import { State } from "./State";

export interface SchedulerAction {

    type: string,
    payload: State

}