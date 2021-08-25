import express from "express"
import LibraryCtrl from "./library.controller.js"

const router = express.Router()

router.route("/").get(LibraryCtrl.apiGetUsers)
router.route("/sing-up/").post(LibraryCtrl.apiPostSingUp)
router.route("/sing-in/").post(LibraryCtrl.apiPostSingIn)
router.route("/id/:id/book")
  .put(LibraryCtrl.apiUpdateBook)
  .delete(LibraryCtrl.apiDeleteBook)

export default router
