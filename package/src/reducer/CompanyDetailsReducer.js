import {
    CompanyDetails_POST_DATA_REQUEST,
    CompanyDetails_POST_DATA_SUCCESS,
    CompanyDetails_POST_DATA_FAILURE,
} from '../action/CompanyDetailsAction';
import initialState from "./CompanyDetailsInitial";

const addOld = (existingState, addingState) => {
    console.log("CompanyDetailsReducer addOld -> ");
    console.log(existingState);
    console.log(addingState);
    const newState = {
        ...existingState,
        ...addingState
    };
    console.log(newState);
    return newState;
};

const CompanyDetailsReducer = (state, action) => {
    if (state == null) {
        state = initialState;
    }
    console.log("CompanyDetailsReducer -> ");
    console.log(state);
    switch (action.type) {
        case CompanyDetails_POST_DATA_REQUEST:
            return addOld(state, {
                loading: true,
                error: null,
                parameters: action.parameters
            });
        case CompanyDetails_POST_DATA_SUCCESS:
            return addOld(state, {
                loading: false,
                data: action.payload,
                parameters: action.parameters
            });
        case CompanyDetails_POST_DATA_FAILURE:
            return addOld(state, {
                loading: false,
                error: action.payload,
                parameters: action.parameters
            });
        default:
            return state;
    }
};

export default CompanyDetailsReducer;