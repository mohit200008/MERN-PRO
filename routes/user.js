const express = require('express')
const router = express.Router()

const { getUserById, getUser, updateUser, userPurchaseList } = require("../controllers/user")
const { isSignedIn, isAuthenticated } = require("../controllers/auth")

router.param("UserId", getUserById)


router.get("/user/:UserId",isSignedIn,isAuthenticated, getUser)

// router.get("/users", getAllUsers)
router.put("/user/:UserId", isSignedIn, isAuthenticated, updateUser)
router.get("/orders/user/:userId", isSignedIn, isAuthenticated, userPurchaseList);

module.exports = router