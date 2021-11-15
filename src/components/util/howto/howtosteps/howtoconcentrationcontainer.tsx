import { Modal, Image } from "react-bootstrap";
import React from "react";

export const ConcentrationContainerInfo = () =>

    <Modal.Body>
        <Image fluid src={`${process.env.PUBLIC_URL}/howtoimgs/concentrationguide.gif`} />
        <ul>
            <li>
                Each concentration requirement is able to be clicked on to then expand
                and reveal a lot of courses you can select from that fit into the requirement for the concentration.
            </li>
            <li>
                These courses can then be dragged and dropped into the semester to plan out your semesters!
            </li>
        </ul>
    </Modal.Body>;
