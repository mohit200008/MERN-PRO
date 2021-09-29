var express = require('express')
var router = express.Router()
const { check, validationResult } = require('express-validator');
var { signout, signup,signin, isSignedIn } = require('../controllers/auth')

router.post("/signup",[
    check("name", "Name should be atleast 3 characters ").isLength({ min:3}),
    check("email", "Email is required ").isEmail(),
    check("password", "Password should be atleast 3 characters").isLength({ min:3}),
],signup);

router.post("/signin",[
    check("email", "Email is required ").isEmail(),
    check("password", "Password is required").isLength({ min:3}),
],signin);


router.get("/signout", signout);


module.exports = router;