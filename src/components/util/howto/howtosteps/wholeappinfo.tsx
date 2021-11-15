import { Modal, Image } from "react-bootstrap";
import React from "react";

export const WholeAppInfo = () =>

    <Modal.Body>
        <Image fluid src={`${process.env.PUBLIC_URL}/howtoimgs/wholeapp.PNG`} />
        <ul>
            <li>
                The <b style={{ color: "red" }}>red box</b> is the navbar, which contains links to useful resources (such as course registration/lookup and also undergrad information about concentrations/courses)
            </li>
            <li>
                The <b style={{ color: "green" }}>green box</b> is where the concentration requirements are stored, the name of the concentration above. In this example, the name is <b>Artificial Intelligence and Robotics</b>, to access the individual courses of each concentration requirement category, click on the category and a dropdown list of courses you can drag into the blue box appear.
            </li>
            <li>
                The <b style={{ color: "blue" }}>blue box</b> is where your semester courses will be. To enter courses into your semester, simply drag them from the concentration requirements(that is the <b style={{ color: "green" }}>green box</b>) into the semester box (that is the <b style={{ color: "blue" }}>blue box</b>)
            </li>
        </ul>
    </Modal.Body>;
