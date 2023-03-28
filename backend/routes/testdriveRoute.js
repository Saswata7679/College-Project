const express = require("express");

const {
  createTestdrive,
  getAdminTestdrive,
  deleteTestdrive
} = require("../controllers/testdriveController");


const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();


router
  .route("/test/new")
  .post(createTestdrive);

router
  .route("/admin/testdrive")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminTestdrive);



  router
  .route("/admin/testdrive/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"),deleteTestdrive)
  module.exports = router;
