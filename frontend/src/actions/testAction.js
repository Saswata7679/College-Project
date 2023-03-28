import axios from "axios";
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

// NEW TEST
export const newTest = (testData) => async (dispatch) => {
    try {
      dispatch({ type: NEW_TEST_REQUEST });
  
      const config = {
        headers: { "Content-Type": "application/json" },
      };
  
      const { data } = await axios.post(`/api/v1/test/new`, testData, config);
      
      dispatch({
        type: NEW_TEST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NEW_TEST_FAIL,
        payload: error.response.data.message,
      });
    }
  };


  // Get All TEST REQUESTS of a Product
export const getAllTests = (id) => async (dispatch) => {
    try {
      dispatch({ type: ALL_TEST_REQUEST });
  
      const { data } = await axios.get(`/api/v1/admin/testdrive`);
      console.log(data)
      dispatch({
        type: ALL_TEST_SUCCESS,
        payload: data.testdrive,
      });
    } catch (error) {
      dispatch({
        type: ALL_TEST_FAIL,
        payload: error.response.data.message,
      });
    }
  };


  // Delete Review of a Product
export const deleteTests = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_TEST_REQUEST });
  
      const { data } = await axios.delete(
        `/api/v1//admin/testdrive/${id}`
      );
  
      dispatch({
        type: DELETE_TEST_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: DELETE_TEST_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Clearing Errors
  export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };