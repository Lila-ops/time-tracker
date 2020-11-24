import React, { Component, Fragment } from 'react';
import { Form, Col, Button, Table, thead, tbody, tr, th, td} from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import * as actions from '../../store/projects';

class Tracker extends Component {
    state = {
        goToDetails: false,
        editMode: false,
        project: {
            id: '',
            name: '',
            desc: ''
        },
    }

    componentDidMount() {
        this.props.onFetchProjects();
    }

    inputChangeHandler = (e) => {
        const { name, value } = e.target;

        const updatedForm = {
            ...this.state
        };

        const updatedFormElement = {
            ...updatedForm.project
        };

        
        updatedFormElement[name] = value;
        this.setState({project: updatedFormElement});
    }

    formHandler = (e) => {
        e.preventDefault();
        //Make a copy of the state and its children
        let updatedState = {
            ...this.state
        }
        
        let updateEditMode = {
            ...updatedState.editMode
        };
        
        let updateProject = {
            ...updatedState.project
        }

        if (!this.state.editMode) {
            this.props.onCreateData(updateProject);
        } else {
            this.props.onEditData(updateProject);
        }

        //Reset state and its children

        updateEditMode = false;

        updateProject = {
            id: '',
            name: '',
            desc: ''
        }

        this.setState({
            editMode: updateEditMode,
            project: updateProject
        })
    }

    onEditProjectHandler = (item) => {
        let updateEditMode = {
            ...this.state.editMode
        };

        let updateProject = {
            ...this.state.project
        }

        updateEditMode = true;
        updateProject = {
            id: item.id,
            name: item.name,
            desc: item.desc
        }

        this.setState({
            editMode: updateEditMode,
            project: updateProject
        });
    }

    render() {
        let stateProject = <tr><td></td><td style={{textAlign: 'center'}}>The table is empty</td><td></td></tr>;
            
        if (this.props.project.length > 0) {
            stateProject = this.props.project.map((item) => {
                return (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.desc}</td>
                            <td>
                                <Button variant="light" onClick={() => this.onEditProjectHandler(item)}>Edit</Button>{' '}
                                <Button variant="dark" className="ml-1" onClick={() => this.props.onDeleteProject(item.id)}>Delete</Button>
                                <Button variant="light" className="ml-2"><Link to={`/${item.id}`}>Go to</Link></Button>
                            </td>
                        </tr>
                    )
                }
            )
        }

        const btnName = this.state.editMode ? "Edit" : "Create";

        return (
            <Fragment>
                <Form onSubmit={this.formHandler}>
                    <Form.Row>
                        <Col>
                            <Form.Control 
                                placeholder="Project name" 
                                name="name" 
                                value={this.state.project.name} 
                                onChange={this.inputChangeHandler} />
                        </Col>
                        <Col>
                            <Form.Control 
                                placeholder="Description" 
                                name="desc"
                                value={this.state.project.desc} 
                                onChange={this.inputChangeHandler} />
                        </Col>
                        <Col>
                            <Button variant="primary" type="submit">{btnName}</Button>
                        </Col>
                    </Form.Row>
                </Form>
                <Table striped bordered hover className="mt-5">
                    <thead>
                        <tr>
                            <th>Project Name</th>
                            <th>Description</th>
                            <th>Delete/Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stateProject}
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

const mapDispatchToProps = dispatch => {
    return {
        onFetchProjects: () => dispatch(actions.fetchProjects()),
        onCreateData: (project) => dispatch(actions.addProject(project)),
        onEditData: (project) => dispatch(actions.editProject(project)),
        onDeleteProject: (id) => dispatch(actions.deleteProject(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tracker);