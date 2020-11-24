import * as actionTypes from './actions';
import axios from '../axios-projects';

// Fetch time
export const fetchTimeSuccess = (time) => {
    return {
        type: actionTypes.FETCH_TIME_SUCCESS,
        time: time
    }
}

export const fetchTimeFail = (error) => {
    return {
        type: actionTypes.FETCH_TIME_FAIL,
        error: error
    }
}

export const fetchTimeStart = () => {
    return {
        type: actionTypes.FETCH_TIME_START
    }
}

export const fetchTime = () => {
    return dispatch => {
        axios.get('/time.json')
        .then(res => {
            const fetchedTime = [];
            for (let key in res.data) {
                fetchedTime.push({
                    ...res.data[key],
                    id: key
                });
            }
            dispatch(fetchTimeSuccess(fetchedTime))
        })
        .catch(err => {
            dispatch(fetchTimeFail(err))
        });
    };
};

// Add Time
export const addTimeStart = () => {
    return {
        type: actionTypes.CREATE_TIME_START
    };
};

export const addTimeFail = (error) => {
    return {
        type: actionTypes.CREATE_TIME_FAIL,
        error: error
    };
};

export const addTimeSuccess = (id, time) => {
    return {
        type: actionTypes.CREATE_TIME_SUCCESS,
        id: id,
        time: time
    };
};

export const addTime = (time) => {
    return dispatch => {
        dispatch(addTimeStart());
        axios.post( '/time.json', time )
        .then( res => {
            dispatch(addTimeSuccess(res.data.name, time));
        } )
        .catch( error => {
            dispatch(addTimeFail(error));
        } );
    }
};

// Delete Time
export const deleteTimeStart = () => {
    return {
        type: actionTypes.DELETE_TIME_START
    };
};

export const deleteTimeFail = (error) => {
    return {
        type: actionTypes.DELETE_TIME_FAIL,
        error: error
    };
};

export const deleteTimeSuccess = (id) => {
    return {
        type: actionTypes.DELETE_TIME_SUCCESS,
        id: id
    };
};
//testiraj
export const deleteTime = (id) => {
    return dispatch => {
        axios.delete(`/time/${id}.json`)
        .then((res) => {
            dispatch(deleteTimeSuccess(id))
        })
        .catch(err => {
            dispatch(deleteTimeFail(err))
        });
    };
};