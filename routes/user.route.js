const express=require("express")
const router=express.Router()


const userController=require("../controllers/user.controller")
const isAuth = require("../middlewares/isAuth")
router.post("/signup",userController.signup)
router.post("/login",userController.login)
router.get("/bankBalance",isAuth,userController.bankBalance)
router.post("/deposit",isAuth,userController.deposit)

module.exports=router
