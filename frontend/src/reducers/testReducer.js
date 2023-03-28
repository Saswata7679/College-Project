
import{
     NEW_TEST_REQUEST,
     NEW_TEST_SUCCESS, 
     NEW_TEST_FAIL,
     ALL_TEST_REQUEST ,
     ALL_TEST_SUCCESS ,
     ALL_TEST_FAIL,
     DELETE_TEST_REQUEST,
     DELETE_TEST_SUCCESS,
     DELETE_TEST_FAIL,
    CLEAR_ERRORS
} from "../constants/testConstants"

export const newTestReducer = (state = {}, action) => {
    switch (action.type) {
      case NEW_TEST_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case NEW_TEST_SUCCESS:
        return {
          loading: false,
          success: action.payload,
        };
      case NEW_TEST_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  
  export const productTestsReducer = (state = { tests: [] }, action) => {
    switch (action.type) {
      case ALL_TEST_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case ALL_TEST_SUCCESS:
        return {
          loading: false,
          tests: action.payload,
        };
      case ALL_TEST_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  
  export const testReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_TEST_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case DELETE_TEST_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
      case DELETE_TEST_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  