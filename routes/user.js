const router = require("express").Router();
const userControllers = require("../controllers/user");

router.post("/user", userControllers.login);

router.get("/user", userControllers.getUser);

router.put("/user", userControllers.updateUser);

router.post("/user-create", userControllers.createUser);

module.exports = router;
