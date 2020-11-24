import * as actionTypes from './actions';
import axios from '../axios-projects';

// Add projects
export const addProjectStart = () => {
    return {
        type: actionTypes.CREATE_PROJECT_START
    };
};

export const addProjectFail = (error) => {
    return {
        type: actionTypes.CREATE_PROJECT_FAIL,
        error: error
    };
};

export const addProjectSuccess = (id, project) => {
    return {
        type: actionTypes.CREATE_PROJECT_SUCCESS,
        id: id,
        project: project
    };
};

export const addProject = (project) => {
    return dispatch => {
        dispatch(addProjectStart());
        axios.post( '/projects.json', project )
        .then( res => {
            dispatch(addProjectSuccess(res.data.name, project));
        } )
        .catch( error => {
            dispatch(addProjectFail(error));
        } );
    }
};

//Edit project
export const editProjectStart = () => {
    return {
        type: actionTypes.EDIT_PROJECT_START
    };
};

export const editProjectFail = (error) => {
    return {
        type: actionTypes.EDIT_PROJECT_FAIL,
        error: error
    };
};

export const editProjectSuccess = (id, project) => {
    return {
        type: actionTypes.EDIT_PROJECT_SUCCESS,
        id: id,
        project: project
    };
};

export const editProject = (project) => {
    return dispatch => {
        dispatch(editProjectStart());
        axios.put(`/projects/${project.id}.json`, project)
        .then( res => {
            dispatch(editProjectSuccess(res.data.name, project));
        } )
        .catch( error => {
            dispatch(editProjectFail(error));
        } );
    }
};

//Delete project
export const deleteProjectStart = () => {
    return {
        type: actionTypes.DELETE_PROJECT_START
    };
};

export const deleteProjectFail = (error) => {
    return {
        type: actionTypes.DELETE_PROJECT_FAIL,
        error: error
    };
};

export const deleteProjectSuccess = (id) => {
    return {
        type: actionTypes.DELETE_PROJECT_SUCCESS,
        id: id
    };
};
//testiraj
export const deleteProject = (id) => {
    return dispatch => {
        axios.delete(`/projects/${id}.json`)
        .then((res) => {
            dispatch(deleteProjectSuccess(id))
        })
        .catch(err => {
            dispatch(deleteProjectFail(err))
        });
    };
};

// Fetch projects
export const fetchProjectsSuccess = (projects) => {
    return {
        type: actionTypes.FETCH_PROJECTS_SUCCESS,
        projects: projects
    }
}

export const fetchProjectsFail = (error) => {
    return {
        type: actionTypes.FETCH_PROJECTS_FAIL,
        error: error
    }
}

export const fetchProjectsStart = () => {
    return {
        type: actionTypes.FETCH_PROJECTS_START
    }
}

export const fetchProjects = () => {
    return dispatch => {
        axios.get('/projects.json')
        .then(res => {
            const fetchedProjects = [];
            for (let key in res.data) {
                fetchedProjects.push({
                    ...res.data[key],
                    id: key
                });
            }
            dispatch(fetchProjectsSuccess(fetchedProjects))
        })
        .catch(err => {
            dispatch(fetchProjectsFail(err))
        });
    };
};