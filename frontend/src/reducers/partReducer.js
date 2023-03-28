import {
    ALL_PART_FAIL,
    ALL_PART_REQUEST,
    ALL_PART_SUCCESS,
    ADMIN_PART_REQUEST,
    ADMIN_PART_SUCCESS,
    ADMIN_PART_FAIL,
    NEW_PART_REQUEST,
    NEW_PART_SUCCESS,
    NEW_PART_FAIL,
    NEW_PART_RESET,
    UPDATE_PART_REQUEST,
    UPDATE_PART_SUCCESS,
    UPDATE_PART_FAIL,
    UPDATE_PART_RESET,
    DELETE_PART_REQUEST,
    DELETE_PART_SUCCESS,
    DELETE_PART_FAIL,
    DELETE_PART_RESET,
    PART_DETAILS_REQUEST,
    PART_DETAILS_FAIL,
    PART_DETAILS_SUCCESS,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    NEW_REVIEW_RESET,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    ALL_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    DELETE_REVIEW_RESET,
    CLEAR_ERRORS,
  } from "../constants/partConstants";
  
  export const partsReducer = (state = { parts: [] }, action) => {
    switch (action.type) {
      case ALL_PART_REQUEST:
      case ADMIN_PART_REQUEST:
        return {
          loading: true,
          parts: [],
        };
      case ALL_PART_SUCCESS:
        return {
          loading: false,
          parts: action.payload.parts,
          partsCount: action.payload.partsCount,
          resultPerPage: action.payload.resultPerPage,
          filteredPartsCount: action.payload.filteredPartsCount,
        };
  
      case ADMIN_PART_SUCCESS:
        return {
          loading: false,
          parts: action.payload,
        };
      case ALL_PART_FAIL:
      case ADMIN_PART_FAIL:
        return {
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
  
  export const newPartReducer = (state = { part: {} }, action) => {
    switch (action.type) {
      case NEW_PART_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case NEW_PART_SUCCESS:
        return {
          loading: false,
          success: action.payload.success,
          part: action.payload.part,
        };
      case NEW_PART_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case NEW_PART_RESET:
        return {
          ...state,
          success: false,
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
  
  export const partReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_PART_REQUEST:
      case UPDATE_PART_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case DELETE_PART_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
  
      case UPDATE_PART_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
        };
      case DELETE_PART_FAIL:
      case UPDATE_PART_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case DELETE_PART_RESET:
        return {
          ...state,
          isDeleted: false,
        };
      case UPDATE_PART_RESET:
        return {
          ...state,
          isUpdated: false,
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
  
  export const partDetailsReducer = (state = { part: {} }, action) => {
    switch (action.type) {
      case PART_DETAILS_REQUEST:
        return {
          loading: true,
          ...state,
        };
      case PART_DETAILS_SUCCESS:
        return {
          loading: false,
          part: action.payload,
        };
      case PART_DETAILS_FAIL:
        return {
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
  
  export const newPartReviewReducer = (state = {}, action) => {
    switch (action.type) {
      case NEW_REVIEW_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case NEW_REVIEW_SUCCESS:
        return {
          loading: false,
          success: action.payload,
        };
      case NEW_REVIEW_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case NEW_REVIEW_RESET:
        return {
          ...state,
          success: false,
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
  
  export const partReviewsReducer = (state = { reviews: [] }, action) => {
    switch (action.type) {
      case ALL_REVIEW_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case ALL_REVIEW_SUCCESS:
        return {
          loading: false,
          reviews: action.payload,
        };
      case ALL_REVIEW_FAIL:
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
  
  export const reviewPartReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_REVIEW_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case DELETE_REVIEW_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
      case DELETE_REVIEW_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case DELETE_REVIEW_RESET:
        return {
          ...state,
          isDeleted: false,
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
  