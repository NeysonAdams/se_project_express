const router = require("express").Router();
const {getCurrentUser, updateCurrentUser} = require("../controllers/users")
const { validateCreateUser, validateId } = require('../middlewares/validation');


router.get('/me', validateId, getCurrentUser);
router.patch("/me", validateCreateUser, updateCurrentUser);

module.exports = router;