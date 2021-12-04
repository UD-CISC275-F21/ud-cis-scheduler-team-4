import { State, initialState } from "../components/MainPage";
import React from "react";


export const StateContext = React.createContext<State>(initialState);