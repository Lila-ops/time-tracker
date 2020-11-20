import React from 'react';
import { Button } from 'react-bootstrap';

const button = (props) => { 
    return(
    <Button disabled={props.disabled} onClick={props.clicked}>{props.children}</Button>
);}

export default button;