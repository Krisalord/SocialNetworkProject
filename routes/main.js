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
router.get("/feed", ensureAuth, postsController.getFeed)
router.get("/login", authController.getLogin)
router.post("/login", authController.postLogin)
router.get("/logout", authController.logout)
router.get("/signup", authController.getSignup)
router.post("/signup", authController.postSignup)
//profile routes
router.get("/profile", ensureAuth, profileController.getProfile)
router.post('/addPfp', upload.single("file"), profileController.uploadPic)
//profile of another user
router.get('/profile/:id', profileController.getFriendProfile)
<<<<<<< HEAD
//search routes
router.get('/search', profileController.getSearch)
router.get('/search/execute', profileController.executeSearch)
//add friend
router.post('/addfriend/:id', profileController.addFriend)
=======

>>>>>>> 52a90eefe00608993dd98a38e41a105093b6b0d2
module.exports = router