import {
    POST_DATA_REQUEST,
    POST_DATA_SUCCESS,
    POST_DATA_FAILURE,
} from '../action/VSAchieveAction';

const defaultStartDate = (new Date()).getTime();
const defaultEndDate = (new Date()).getTime();

const initialState = {
    loading: false,
    data: null,
    error: null,
    parameters: {
        "company_id": '0',
        "interval_value": 20,
        "page_num": '0',
        "search_value_pair": [
            {
                "value_name": "start",
                "value": defaultStartDate
            },
            {
                "value_name": "end",
                "value": defaultEndDate
            },
            {
                "value_name": "agentName",
                "value": ''
            }
        ]
    }
};

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_DATA_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                parameters: action.parameters
            };
        case POST_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                parameters: action.parameters
            };
        case POST_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                parameters: action.parameters
            };
        default:
            return state;
    }
};

export default dataReducer;