const router = require("express").Router();
const controller = require("./controller");

router.get("/v1/index", controller.getIndex);
router.post("/v1/index", controller.postIndex);
router.get("/v1/cookie", controller.cookie);
router.post("/v1/cookie/login", controller.login);
router.post("/v1/cookie/modify", controller.modify);
router.post("/v1/cookie/withdrawl", controller.withdrawl);

module.exports = router;