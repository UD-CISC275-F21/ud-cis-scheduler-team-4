import React from "react";
import { State } from "../../../interfaces/State";

export const StateContext = React.createContext<{state: State} | undefined>(undefined);