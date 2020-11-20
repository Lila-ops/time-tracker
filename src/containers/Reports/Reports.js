import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
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

class Report extends Component {
    state = {
        loadedProject: {},
        listAddedTimes: [],
        totalAddedHours: 0,   
        addedTime: {
            id: '',
            time: ''
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        const loadedProjectId = this.props.match.params.id;
        const data = this.props.project.filter(item => item.id === loadedProjectId);

        const item = {
            name: data[0].name,
            desc: data[0].desc,
            time: data[0].time
        }

        this.setState({loadedProject: item});
    }

    resetAddedTime() {
        const time = {
            id: '',
            time: ''
        }

        this.setState({ addedTime: time});
    }

    inputChangeHandler = (e) => {
        const { name, value } = e.target;

        const updatedForm = {
            ...this.state
        };

        const updatedFormElement = {
            ...updatedForm.addedTime
        };

        updatedFormElement[name] = value;

        const time = {
            id: '',
            time: updatedFormElement[name]
        }

        this.setState({ addedTime: time});
    }

    formHandler = (e) => {
        e.preventDefault();
        
        const addedTime = {
            id: uuidv4(),
            time: this.state.addedTime.time
        }

        const listAddedTimes = this.state.listAddedTimes.concat(addedTime);
        const totalAddedHours = parseInt(this.state.totalAddedHours) + parseInt(addedTime.time);

        this.setState({
            totalAddedHours: totalAddedHours,
            listAddedTimes: listAddedTimes
        });

        this.resetAddedTime();
    }

    onDeleteTime = (timeEl) => {
        const removeTime = this.state.listAddedTimes.filter(item => item.id !== timeEl.id);
        const totalAddedHours = parseInt(this.state.totalAddedHours) - parseInt(timeEl.time);

        this.setState({
            totalAddedHours: totalAddedHours,
            listAddedTimes: removeTime
        });
    }

    render() {
        let timeTable = <tr><td style={{textAlign: 'center'}}>The table is empty</td><td></td></tr>;
        if (this.state.listAddedTimes.length > 0) {
            timeTable = this.state.listAddedTimes.map((item) => (
                <tr key={item.id}>
                    <td>{item.time}</td>
                    <td>
                        <Button variant="dark" className="ml-1" onClick={() => this.onDeleteTime(item)}>Delete</Button>
                    </td>
                </tr>
            ));
        }
        return (
            <Fragment>
                <ListGroup>
                    <ListGroup.Item>Name: {this.state.loadedProject.name}</ListGroup.Item>
                    <ListGroup.Item>Description: {this.state.loadedProject.desc}</ListGroup.Item>
                    <ListGroup.Item>Total added hours: {this.state.totalAddedHours}</ListGroup.Item>
                </ListGroup>
                <Container className="mt-5">
                    <Form onSubmit={this.formHandler}>
                        <Form.Row>
                            <Col>
                                <Form.Control 
                                    placeholder="Project time" 
                                    name="time" 
                                    value={this.state.addedTime.time} 
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
        project: state.projects
    };
}

export default connect(mapStateToProps)(Report);