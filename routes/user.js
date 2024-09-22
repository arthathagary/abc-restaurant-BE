const express = require("express");
const { createUser, userLogin,getAllUsers,deleteUserById } = require("../controllers/User");
const router = express.Router();

router.route("/auth/register").post(createUser);
router.route("/auth/login").post(userLogin);
router.route("/users").get(getAllUsers);
router.route("/user/:id").delete(deleteUserById);



module.exports = router;
