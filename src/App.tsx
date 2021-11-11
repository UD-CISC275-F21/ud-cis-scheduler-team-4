import React from "react";
import "bootswatch/dist/lux/bootstrap.min.css";
import { MainPage } from "./components/MainPage";
import "./App.css";

function App(): JSX.Element {
    return (
        <div className="App">
            <MainPage />
        </div>
    );
}

export default App;
