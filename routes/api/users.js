const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  updateUser,
  deleteUser,
  getUser,
} = require("../../controllers/usersController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .get(verifyRoles(ROLES_LIST.Admin), getAllUsers)
  .put(verifyRoles(ROLES_LIST.Admin), updateUser)
  .delete(verifyRoles(ROLES_LIST.Admin), deleteUser);

router.route("/:id").get(verifyRoles(ROLES_LIST.Admin), getUser);

module.exports = router;
