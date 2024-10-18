
import {
    WorkflowDetails_POST_DATA_REQUEST,
    WorkflowDetails_POST_DATA_SUCCESS,
    WorkflowDetails_POST_DATA_FAILURE,
} from '../action/WorkflowDetailsAction';
import initialState from "./WorkflowDetailsInitial";

const addOld = (existingState, addingState) => {
    console.log("WorkflowDetailsReducer addOld -> ");
    console.log(existingState);
    console.log(addingState);
    const newState = {
        ...existingState,
        ...addingState
    };
    console.log(newState);
    return newState;
};

const WorkflowDetailsReducer = (state, action) => {
    if (state == null) {
        state = initialState;
    }
    console.log("WorkflowDetailsReducer -> ");
    console.log(state);
    switch (action.type) {
        case WorkflowDetails_POST_DATA_REQUEST:
            return addOld(state, {
                loading: true,
                error: null,
                parameters: action.parameters
            });
        case WorkflowDetails_POST_DATA_SUCCESS:
            return addOld(state, {
                loading: false,
                data: action.payload,
                parameters: action.parameters
            });
        case WorkflowDetails_POST_DATA_FAILURE:
            return addOld(state, {
                loading: false,
                error: action.payload,
                parameters: action.parameters
            });
        default:
            return state;
    }
};

export default WorkflowDetailsReducer;