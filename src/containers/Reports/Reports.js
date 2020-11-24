import React, { 
    Component, 
    Fragment 
} from 'react';
import { connect } from 'react-redux';
import { 
    ListGroup, 
    Form, 
    Col, 
    Button, 
    Container,
    Table, 
    thead, 
    tbody, 
    tr, 
    th, 
    td
} from 'react-bootstrap';

import * as actions from '../../store/time';

class Report extends Component {
    state = {
        time: '',
        projectId: '',
        timeItems: [],
        inc: true
    }

    componentDidMount() {
        this.loadData();
    };

    resetAddedTime() {
        this.setState({ time: ''});
    };

    loadData() {
        const id = this.props.match.params.id;
        this.props.onFetchTime();
        this.setState({projectId: id});
    };

    inputChangeHandler = (e) => {
        const { name, value } = e.target;
        const updatedForm = {
            ...this.state
        };

        updatedForm[name] = value;
        this.setState({ time: updatedForm[name]});
    };

    formHandler = (e) => {
        e.preventDefault();
        
        const timeItem = {
            time: this.state.time,
            projectId: this.state.projectId
        }

        this.props.onCreateData(timeItem);
        this.resetAddedTime();
    };

    onDeleteTime = (id) => {
        this.props.onDeleteProject(id);
    };
    
    render() {
        let timeTable = <tr><td style={{textAlign: 'center'}}>The table is empty</td><td></td></tr>;
        const time = this.props.time.filter(item => item.projectId === this.state.projectId);

        let project = {};
        this.props.project.map((item) => {
            if (item.id === this.state.projectId) {
                return project = {...item};
            }
            return project;
        });

        let totalHours = 0;
        if (time.length > 0) {
               timeTable = time.map((item) => {
                    if (this.state.inc) {
                        totalHours += parseInt(item.time);
                    } else {
                        totalHours -= parseInt(item.time);
                    }
  
                   return (
                        <tr key={item.id}>
                            <td>{item.time}</td>
                            <td>
                                <Button variant="dark" className="ml-1" onClick={() => this.onDeleteTime(item.id)}>Delete</Button>
                            </td>
                        </tr>
                    )});
                }
        return (
            <Fragment>
                <ListGroup>
                    <ListGroup.Item>Name: {project.name}</ListGroup.Item>
                    <ListGroup.Item>Description: {project.desc}</ListGroup.Item>
                    <ListGroup.Item>Total hours: {totalHours}</ListGroup.Item>
                </ListGroup>
                <Container className="mt-5">
                    <Form onSubmit={this.formHandler}>
                        <Form.Row>
                            <Col>
                                <Form.Control 
                                    placeholder="Project time" 
                                    name="time" 
                                    value={this.state.time} 
                                    onChange={this.inputChangeHandler} />
                            </Col>
                            <Col>
                                <Button variant="primary" type="submit" >Add</Button>
                            </Col>
                        </Form.Row>
                    </Form>
                </Container>
                
                <Table striped bordered hover className="mt-5">
                    <thead>
                        <tr>
                            <th>Time</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {timeTable}
                    </tbody>
                </Table>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        time: state.time,
        project: state.projects
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchTime: (id) => dispatch(actions.fetchTime(id)),
        onCreateData: (addedTime) => dispatch(actions.addTime(addedTime)),
        onDeleteProject: (id) => dispatch(actions.deleteTime(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Report);