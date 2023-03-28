const express = require("express");
const {
  getAllParts,
  createPart,
  updatePart,
  deletePart,
  getPartDetails,
  createPartReview,
  getPartReviews,
  deleteReview,
  getAdminParts,
} = require("../controllers/partController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/parts").get(getAllParts);

router
  .route("/admin/parts")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminParts);

router
  .route("/admin/part/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createPart);

router
  .route("/admin/part/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updatePart)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deletePart);

router.route("/part/:id").get(getPartDetails);

router.route("/part/review").put(isAuthenticatedUser, createPartReview);

router
  .route("/part/reviews")
  .get(getPartReviews)
  .delete(isAuthenticatedUser, deleteReview);

module.exports = router;
