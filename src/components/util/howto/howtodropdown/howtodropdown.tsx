import { Dropdown } from "react-bootstrap";
import React from "react";

export const HowToDropDown = ({ setDisplay }: { setDisplay: React.Dispatch<React.SetStateAction<number>> }) =>
    <Dropdown>
        <Dropdown.Toggle id="dropdown-basic" variant="success">
            Help Menu
        </Dropdown.Toggle>
        <Dropdown.Menu>
            <Dropdown.Item
                onClick={() => {
                    setDisplay(1);
                }}
            >
                Application Layout
            </Dropdown.Item>
            <Dropdown.Item
                onClick={() => {
                    setDisplay(2);
                }}
            >
                Navbar
            </Dropdown.Item>
            <Dropdown.Item
                onClick={() => {
                    setDisplay(3);
                }}
            >
                Concentration Table
            </Dropdown.Item>
            <Dropdown.Item
                onClick={() => {
                    setDisplay(4);
                }}
            >
                Semester Table
            </Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>;
