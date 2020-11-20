import React from 'react';
import { Spinner } from 'react-bootstrap';

const spinner = (props) => (
    <div className="h-100 d-flex align-items-center justify-content-center">
        {/* Loading... */}
        <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
        </Spinner>
    </div>
);

export default spinner;