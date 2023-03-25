const express = require("express")
const router = express.Router()
const authController = require("../controllers/auth")
const homeController = require("../controllers/home")
const postsController = require("../controllers/posts")
const upload = require("../middleware/multer")
const profileController = require('../controllers/profile')
const { ensureAuth, ensureGuest } = require("../middleware/auth")

//main Routes
router.get("/", homeController.getIndex)
router.get("/profile", ensureAuth, postsController.getProfile)
router.get("/feed", ensureAuth, postsController.getFeed)
router.get("/login", authController.getLogin)
router.post("/login", authController.postLogin)
router.get("/logout", authController.logout)
router.get("/signup", authController.getSignup)
router.post("/signup", authController.postSignup)
//profile routes
router.post('/addPfp', upload.single("file"), profileController.uploadPic)
//profile of another user
router.get('/profile/:id', profileController.getFriendProfile)
//link for chat
router.get('/chat/:id', profileController.getChat)

module.exports = router