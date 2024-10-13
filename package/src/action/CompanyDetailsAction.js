import axios from 'axios';
import initialState from "../reducer/CompanyDetailsInitial";

const init = (callback) => {
    return (dispatch) => {
        dispatch(initialState);
    };
}

// Action Types
export const CompanyDetails_POST_DATA_REQUEST = 'CompanyDetails_POST_DATA_REQUEST';
export const CompanyDetails_POST_DATA_SUCCESS = 'CompanyDetails_POST_DATA_SUCCESS';
export const CompanyDetails_POST_DATA_FAILURE = 'CompanyDetails_POST_DATA_FAILURE';

// Action Creator for POST request
const postData = (data) => {
    return (dispatch) => {
        dispatch({
            type: CompanyDetails_POST_DATA_REQUEST,
            parameters: data
        });
        const req = axios.post('http://localhost:8000/get_company_details', data);
        function onSuccess(success) {
            dispatch({
                type: CompanyDetails_POST_DATA_SUCCESS,
                payload: success.data, // response data from the API
                parameters: data
            });
            return success;
        }
        function onError(error) {
            dispatch({
                type: CompanyDetails_POST_DATA_FAILURE,
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
            type: CompanyDetails_POST_DATA_REQUEST,
            parameters: data
        });
    };
};

export { postData, readyData, init };