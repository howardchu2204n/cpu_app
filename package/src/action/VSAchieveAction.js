import axios from 'axios';

// Action Types
export const POST_DATA_REQUEST = 'POST_DATA_REQUEST';
export const POST_DATA_SUCCESS = 'POST_DATA_SUCCESS';
export const POST_DATA_FAILURE = 'POST_DATA_FAILURE';

// Action Creator for POST request
const postData = (data) => {
    return (dispatch) => {
        dispatch({
            type: POST_DATA_REQUEST,
            parameters: data
        });
        const req = axios.post('http://localhost:8000/get_vsachieve_list', data);
        function onSuccess(success) {
            dispatch({
                type: POST_DATA_SUCCESS,
                payload: success.data, // response data from the API
                parameters: data
            });
            return success;
        }
        function onError(error) {
            dispatch({
                type: POST_DATA_FAILURE,
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
            type: POST_DATA_REQUEST,
            parameters: data
        });
    };
};

export { postData, readyData };