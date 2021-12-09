import React from "react";
import { SchedulerAction } from "../../../interfaces/SchedulerAction";

export const DispatchContext = React.createContext<{dispatch: React.Dispatch<SchedulerAction>} | undefined>(undefined);