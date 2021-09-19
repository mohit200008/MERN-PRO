var express = require('express')
var router = express.Router()
const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth");
const { getUserById,pushOrderInPurchaseList } = require("../controllers/user");


const {updateStock} = require('../controllers/product');
const {getOrderById, createOrder,getAllOrders,getOrderStatus,updateStatus} = require('../controllers/order')

router.param("userId" , getUserById);
router.param("orderId" , getOrderById);


router.post("/order/create/:userId" , isSignedIn,isAuthenticated, pushOrderInPurchaseList, updateStock,createOrder);

router.get("/order/all/:userId", isSignedIn, isAuthenticated, getAllOrders)

router.get("/order/status/:userId", isSignedIn,isAuthenticated,getOrderStatus)
router.put("/order/:orderId/status/:userId", isSignedIn,isAuthenticated, updateStatus)

module.exports = router;