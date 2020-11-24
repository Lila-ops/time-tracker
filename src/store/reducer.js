import * as actionTypes from './actions';

const initialState = {
    projects: [],
    time: []
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        //projects
        case actionTypes.FETCH_PROJECTS_SUCCESS:
            return {
                ...state,
                projects: action.projects
            };  
        case actionTypes.CREATE_PROJECT_SUCCESS:
            return {
                ...state,
                projects: state.projects.concat({id: action.id, name: action.project.name, desc: action.project.desc, time: action.project.time})
            };
        case actionTypes.EDIT_PROJECT_SUCCESS:
            let editedArray = [];
            state.projects.map(project => {
                if (project.id === action.project.id) {
                    project.name = action.project.name;
                    project.desc = action.project.desc;
                    editedArray = [...state.projects];
                }

                return editedArray;
            });
            return {
                ...state,
                projects: editedArray
            };  
        case actionTypes.DELETE_PROJECT_SUCCESS:
            const newProjectArray = state.projects.filter(item => item.id !== action.id);
            return {
                ...state,
                projects: newProjectArray
            };             
        
        case actionTypes.CREATE_PROJECT_START:
            return {
                ...state
            };  
        case actionTypes.CREATE_PROJECT_FAIL:
            return {
                ...state
            };     
        case actionTypes.EDIT_PROJECT_START:
            return {
                ...state
            };   
        case actionTypes.EDIT_PROJECT_FAIL:
            return {
                ...state
            };      
        case actionTypes.DELETE_PROJECT_START:
            return {
                ...state
            };   
        case actionTypes.DELETE_PROJECT_FAIL:
            return {
                ...state
            };  
        case actionTypes.FETCH_PROJECTS_START:
            return {
                ...state,
                loading: true,
                disabled: true
            };   
        case actionTypes.FETCH_PROJECTS_FAIL:
            return {
                ...state
            };  
        
        //Time
        case actionTypes.FETCH_TIME_SUCCESS:
            return {
                ...state,
                time: action.time
            }; 
        case actionTypes.FETCH_TIME_START:
            return {
                ...state
            };   
        case actionTypes.FETCH_TIME_FAIL:
            return {
                ...state
            };  
        
        case actionTypes.CREATE_TIME_SUCCESS:
            return {
                ...state,
                time: state.time.concat({id: action.id, time: action.time.time, projectId: action.time.projectId})
            };
        case actionTypes.CREATE_TIME_START:
            return {
                ...state
            };  
        case actionTypes.CREATE_TIME_FAIL:
            return {
                ...state
            };     
            
        case actionTypes.DELETE_TIME_SUCCESS:
            const newTimeArray = state.time.filter(item => item.id !== action.id);
            return {
                ...state,
                time: newTimeArray
            }; 
        case actionTypes.DELETE_TIME_START:
            return {
                ...state
            };   
        case actionTypes.DELETE_TIME_FAIL:
            return {
                ...state
            };
        default:
            return state;
    }    
}


export default reducer;