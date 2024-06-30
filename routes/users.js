const router = require("express").Router();
const { /*getUsers, getUser,*/getCurrentUser, updateCurrentUser} = require("../controllers/users")

//router.get('/', getUsers);
//router.get('/:userId', getUser);

router.get('/me', getCurrentUser);
router.patch("/me", updateCurrentUser);

module.exports = router;