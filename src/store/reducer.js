import * as actionTypes from './actions';

const initialState = {
    projects: [],
    loading: false
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        //projects
        case actionTypes.FETCH_PROJECTS_SUCCESS:
            return {
                ...state,
                projects: action.projects,
                loading: false
            };  
        case actionTypes.CREATE_PROJECT_SUCCESS:
            console.log('[CREATE_PROJECT_SUCCESS]', action);
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
            const newArray = state.projects.filter(item => item.id !== action.id);
            return {
                ...state,
                projects: newArray
            };             
        
        case actionTypes.CREATE_PROJECT_START:
            return {
                ...state,
                loading: true
            };  
        case actionTypes.CREATE_PROJECT_FAIL:
            return {
                ...state,
                loading: false
            };     
        case actionTypes.EDIT_PROJECT_START:
            return {
                ...state,
                loading: true
            };   
        case actionTypes.EDIT_PROJECT_FAIL:
            return {
                ...state,
                loading: false
            };      
        case actionTypes.DELETE_PROJECT_START:
            return {
                ...state,
                loading: true
            };   
        case actionTypes.DELETE_PROJECT_FAIL:
            return {
                ...state,
                loading: false
            };  
        case actionTypes.FETCH_PROJECTS_START:
            return {
                ...state,
                loading: true
            };   
        case actionTypes.FETCH_PROJECTS_FAIL:
            return {
                ...state,
                loading: false
            };  
        
        //Time
        default:
            return state;
    }    
}


export default reducer;