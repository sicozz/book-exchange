import express from "express"
import LibraryCtrl from "./library.controller.js"
import ExchangeCtrl from "./exchange.controller.js"

const router = express.Router()

router.route("/").get(LibraryCtrl.apiGetUsers)
router.route("/get-user-name/id/:id").get(LibraryCtrl.apiGetUserName)
router.route("/sing-up/").post(LibraryCtrl.apiPostSingUp)
router.route("/sing-in/").post(LibraryCtrl.apiPostSingIn)
router.route("/id/:id/book")
  .put(LibraryCtrl.apiUpdateBook)
  .delete(LibraryCtrl.apiDeleteBook)

router.route("/exchange/id/:id/trade")
  .get(ExchangeCtrl.apiGetTrades)
  .post(ExchangeCtrl.apiPostTrade)
router.route("/exchange/id/:id/match").get(ExchangeCtrl.apiGetMatches)

export default router
