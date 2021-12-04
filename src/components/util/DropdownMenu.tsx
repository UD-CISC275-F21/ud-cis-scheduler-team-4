import { NavDropdown } from "react-bootstrap";
import { Concentration } from "../../interfaces/concentration";
import { Semester } from "../../interfaces/semester";
import CONCENTRATIONS from "../../json/concentrations.json";
import React from "react";
import { DispatchContext } from "../MainPage";
import { UseDispatchContext } from "../MainPage";
import { UseStateContext } from "../MainPage";

export const DropdownMenu = (): JSX.Element => {

    const { dispatch } = UseDispatchContext();
    const { state } = UseStateContext();

    const clickFunc = (concentrationNumber: number) => {
        dispatch({type: "updateConcentration", payload: { ...state, concentration: CONCENTRATIONS[concentrationNumber]}});
    };

    return (
        <div>
            <NavDropdown id="basic-navbar-nav" title="Concentrations" >

                <NavDropdown.Item
                    as="button"
                    onClick={() => {
                        clickFunc(0);
                    }}
                >AI and Robotics
                </NavDropdown.Item>


                <NavDropdown.Item
                    as="button"
                    onClick={() => {
                        clickFunc(1);
                    }}
                >
                    Bioinformatics
                </NavDropdown.Item>


                <NavDropdown.Item
                    as="button"
                    onClick={() => {
                        clickFunc(2);
                    }}
                >
                    Cybersecurity
                </NavDropdown.Item>


                <NavDropdown.Item
                    as="button"
                    onClick={() => {
                        clickFunc(3);
                    }}
                >
                    Data Science
                </NavDropdown.Item>


                <NavDropdown.Item
                    as="button"
                    onClick={() => {
                        clickFunc(4);
                    }}
                >
                    High-Performance Computing
                </NavDropdown.Item>


                <NavDropdown.Item
                    as="button"
                    onClick={() => {
                        clickFunc(5);
                    }}
                >
                    Networks and Systems
                </NavDropdown.Item>


                <NavDropdown.Item
                    as="button"
                    onClick={() => {
                        clickFunc(6);
                    }}
                >
                    Theory
                </NavDropdown.Item>

            </NavDropdown>
        </div>
    );
};
