import "bootstrap/dist/css/bootstrap.min.css";
import { Draggable } from "react-beautiful-dnd";
import React, { MouseEventHandler } from "react";
import { ListGroup, OverlayTrigger, Popover, Image, Button } from "react-bootstrap";

export const Course = (props: { name: string, ind: number, deleteFunc: (arg:string) => void }): JSX.Element =>
    <>
        <Draggable draggableId={props.name} index={props.ind} key={props.name}>
            {(prov) => (
                <>
                    <ListGroup.Item ref={prov.innerRef} {...prov.draggableProps} {...prov.dragHandleProps}>
                        <Button style={{ height: "10px", width: "10px" }} variant="danger" onClick={(e) => {
                            props.deleteFunc(props.name);
                        }}>
                        </Button>{`${props.name}`}
                    </ListGroup.Item>
                </>
            )}
        </Draggable>
    </>;