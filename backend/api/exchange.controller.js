import ExchangeDAO from "../dao/exchangeDAO.js"

export default class ExchangeCtrl {

  static async apiGetTrades(req, res, next) {
    let userId = req.params.id

    const { tradeList } = await ExchangeDAO.getTrades(userId)

    res.json({ trades: tradeList })
  }

  static async apiPostTrade(req, res, next) {
    try {
      const fromId = req.params.id
      const toId = req.body.to
      const bookTitle = req.body["book-title"]

      const exchangeResp = await ExchangeDAO.trade(
        { fromId, toId, bookTitle }
      )

      if (!exchangeResp.error) {
        res.json({ status: "success" })
      } else {
        res.status(400).json({ body: "Failed te add trade" })
      }
    } catch (err) {
      console.log(`trade, ${err}`)
      res.status(500).json({ error: err })
    }
  }

  static async apiGetMatches(req, res, next) {
    let userId = req.params.id

    const { matchList } = await ExchangeDAO.getMatches(userId)

    const response = {
      matches: matchList,
    }

    res.json(response)
  }

}
