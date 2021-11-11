import React from "react";
import "bootswatch/dist/lux/bootstrap.min.css";
import { MainPage } from "./components/MainPage";
import "./App.css";

export const App = (): JSX.Element =>
    (
    <div className="App">
        <MainPage />
    </div>
    );

export default App;
