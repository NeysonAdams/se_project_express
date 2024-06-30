const router = require("express").Router();
const { createUser, login } = require("../controllers/users")
const auth = require('../middlewares/auth');
const userRouter = require("./users");
const clothingsRouter = require("./clothingitems");
const {getItems} = require("../controllers/clothingitems")



router.post('/signin', login);
router.post('/signup', createUser);
router.get("/items", getItems);

router.use(auth);
router.use("/users", userRouter);
router.use("/items", clothingsRouter);



module.exports = router;