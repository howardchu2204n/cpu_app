import axios from 'axios';
import initialState from "../reducer/WorkflowDetailsInitial";

const init = (callback) => {
    return (dispatch) => {
        dispatch(initialState);
    };
}

// Action Types
export const WorkflowDetails_POST_DATA_REQUEST = 'WorkflowDetails_POST_DATA_REQUEST';
export const WorkflowDetails_POST_DATA_SUCCESS = 'WorkflowDetails_POST_DATA_SUCCESS';
export const WorkflowDetails_POST_DATA_FAILURE = 'WorkflowDetails_POST_DATA_FAILURE';

// Action Creator for POST request
const postData = (data, callback = (para) => { }) => {
    return (dispatch) => {
        dispatch({
            type: WorkflowDetails_POST_DATA_REQUEST,
            parameters: data
        });
        const req = axios.post('http://localhost:8000/get_workflow_details', data);
        function onSuccess(success) {
            dispatch({
                type: WorkflowDetails_POST_DATA_SUCCESS,
                payload: success.data, // response data from the API
                parameters: data
            });
            callback(success.data);
            return success;
        }
        function onError(error) {
            dispatch({
                type: WorkflowDetails_POST_DATA_FAILURE,
                payload: error.message, // error message
                parameters: data
            });
            callback(error.message);
            return error;
        }
        req.then(onSuccess, onError);
    };
};

// Action Creator for POST request
const changeData = (data) => {
    return (dispatch) => {
        dispatch({
            type: WorkflowDetails_POST_DATA_REQUEST,
            parameters: data
        });
        const req = axios.post('http://localhost:8000/update_workflow_details', data);
        function onSuccess(success) {
            dispatch({
                type: WorkflowDetails_POST_DATA_SUCCESS,
                payload: success.data, // response data from the API
                parameters: data
            });
            return success;
        }
        function onError(error) {
            dispatch({
                type: WorkflowDetails_POST_DATA_FAILURE,
                payload: error.message, // error message
                parameters: data
            });
            return error;
        }
        req.then(onSuccess, onError);
    };
};


const readyData = (data) => {
    return (dispatch) => {
        dispatch({
            type: WorkflowDetails_POST_DATA_REQUEST,
            parameters: data
        });
    };
};

export { postData, readyData, changeData, init };