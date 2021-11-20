import React, { useEffect } from "react";
import "bootswatch/dist/lux/bootstrap.min.css";
import { MainPage } from "./components/MainPage";
import "./App.css";

export const App = (): JSX.Element => {
    useEffect(() => {
        document.title = "UDCIS Course Scheduling Tool";
    }, []);
    return (
        <div className="App">
            <MainPage />
        </div>
    );
};
export default App;
