import React, { Component, Fragment } from 'react';
import { Switch, Route } from "react-router-dom";
import { Container } from 'react-bootstrap';

import Navbar from '../../components/Navigation/Navbar/Navbar';
import Tracker from '../../containers/Tracker/Tracker';
import Reports from '../../containers/Reports/Reports';

class Layout extends Component {
    render() {
        return (
            <Fragment>
                <Navbar />
                <Container className="mt-5">
                    <Switch>
                        <Route exact path="/" component={Tracker} />
                        <Route path="/:id" component={Reports} />
                    </Switch>
                </Container>
            </Fragment>
        )
    }
}

export default Layout;