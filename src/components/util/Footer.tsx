import React from "react";
import { UseStateContext } from "../util/DispatchLogic/UseStateContext";
import { UseDispatchContext } from "../util/DispatchLogic/UseDispatchContext";
import { ProgressBar } from "react-bootstrap";
import { stat } from "fs";

export const Footer = (): JSX.Element => {

    const { state } = UseStateContext();

    const concentrationName = state.concentration.name;
    const concentrationClasses = concentrationName === "AI and Robotics" ? 31 : concentrationName === "Bioinformatics" ? 33 : concentrationName === "Cybersecurity" ? 35 : concentrationName === "Data Science" ? 35 : concentrationName === "High-Performance Computing" ? 40 : concentrationName === "Networks and Systems" ? 36 : 38;
    const percentage = Math.ceil(((state.currentSaveData.semesters.map((eachSemester) => eachSemester.courses).flat(2).length / concentrationClasses)*100));

    return(
        <div className="footer">
            <hr />
            <ProgressBar animated now={percentage} label={`${percentage}%`} striped variant="success" />
            <br />
            <p>
                Created by Kurt Hammen, Luke Halko, and Cameron Thacker. Made 2021. Check out
                {" "}
                <a href="https://github.com/UD-CISC275-F21/ud-cis-scheduler-team-4" rel="noopener noreferrer" target="_blank">our repository.</a>
            </p>
        </div>
    );
    
};

// github repository
// see what other people have
