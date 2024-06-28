const router = require("express").Router();

const userRouter = require("./users");
const clothingsRouter = require("./clothingitems");

router.use("/users", userRouter);
router.use("/items", clothingsRouter);

module.exports = router;