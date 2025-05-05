import { axiosi } from "../../config/axios";
import axios from "axios";

export const createReview = async (review) => {
  try {
    const startTime = performance.now(); // start timer

    const modelRes = await axios.post(
      "https://review-classifier-api-production.up.railway.app/predict",
      {
        review_text: review.comment,
        overall: review.rating,
        helpful_ratio: 0.7,
      }
    );
    const endTime = performance.now(); // end timer
    const modelResponseTime = endTime - startTime; // in milliseconds
    const res = await axiosi.post("/reviews", {
      ...review,
      isFake:
        modelRes?.data?.status === "success" &&
        modelRes?.data?.prediction !== "GENUINE"
          ? true
          : false,
      modelResponseTime,
    });
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const fetchReviewsByProductId = async (id) => {
  try {
    const res = await axiosi.get(`/reviews/product/${id}`);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateReviewById = async (update) => {
  try {
    const res = await axiosi.patch(`/reviews/${update._id}`, update);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const deleteReviewById = async (id) => {
  try {
    const res = await axiosi.delete(`/reviews/${id}`);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
