import axios from "axios";

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
  UPDATE_PART_REQUEST,
  UPDATE_PART_SUCCESS,
  UPDATE_PART_FAIL,
  DELETE_PART_REQUEST,
  DELETE_PART_SUCCESS,
  DELETE_PART_FAIL,
  PART_DETAILS_REQUEST,
  PART_DETAILS_FAIL,
  PART_DETAILS_SUCCESS,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  CLEAR_ERRORS,
} from "../constants/partConstants";

// Get All Parts
export const getPart =
  (keyword = "", currentPage = 1, price = [0, 25000], category, ratings = 0) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PART_REQUEST });

      let link = `/api/v1/parts?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

      if (category) {
        link = `/api/v1/parts?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
      }

      const { data } = await axios.get(link);

      dispatch({
        type: ALL_PART_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PART_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Get All Parts For Admin
export const getAdminPart = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PART_REQUEST });

    const { data } = await axios.get("/api/v1/admin/parts");

    dispatch({
      type: ADMIN_PART_SUCCESS,
      payload: data.parts,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PART_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create Part
export const createPart = (partData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PART_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v1/admin/part/new`,
      partData,
      config
    );

    dispatch({
      type: NEW_PART_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PART_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Parts
export const updatePart = (id, partData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PART_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/admin/part/${id}`,
      partData,
      config
    );

    dispatch({
      type: UPDATE_PART_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PART_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Part
export const deletePart = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PART_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/part/${id}`);

    dispatch({
      type: DELETE_PART_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PART_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Parts Details
export const getPartDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PART_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/part/${id}`);

    dispatch({
      type: PART_DETAILS_SUCCESS,
      payload: data.part,
    });
  } catch (error) {
    dispatch({
      type: PART_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// NEW REVIEW
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(`/api/v1/part/review`, reviewData, config);

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Reviews of a Part
export const getAllReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_REVIEW_REQUEST });

    const { data } = await axios.get(`/api/v1/part/reviews?id=${id}`);

    dispatch({
      type: ALL_REVIEW_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: ALL_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Reviews of a part
export const deleteReviews = (reviewId, partId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    const { data } = await axios.delete(
      `/api/v1/part/reviews?id=${reviewId}&partId=${partId}`
    );

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
