import { Modal, Dropdown } from "react-bootstrap";
import React from "react";

export const HowToNavigation = () =>

    <Modal.Body>
        How to navigate the help menu:
        <ul>
            <li>
                There is a dropdown menu that looks like this:
                <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic" variant="outline-success">
                        Help Menu
                    </Dropdown.Toggle>
                </Dropdown>
                This dropdown is used to access all of the help menu options
            </li>
        </ul>
    </Modal.Body>;
