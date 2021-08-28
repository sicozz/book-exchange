import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID
let exchanges

export default class ExchangeDAO {

  static async injectDB(conn) {
    if (exchanges) {
      return
    }

    try {
      exchanges = await conn.db(process.env.LIBRARY_NS).collection("exchanges")
    } catch (err) {
      console.error(
        `Unable to establish a collection handle in exchangeDAO: ${err}`
      )
    }
  }

  static async getTrades(userId) {
    let cursor
    try {
      cursor = await exchanges.find(
        { type: 'trade', to: userId },
        { type: 0, from: 0 }
      )
    } catch (err) {
      console.error(`Unable to find command, ${err}`)
      return { tradeList: [] }
    }

    try {
      const tradeList = await cursor.toArray()
      return { tradeList }
    } catch (err) {
      console.error(`Unable to convert cursor to array, ${err}`)
      return { tradeList: [] }
    }
  }

  static async trade({ fromId, toId, bookTitle }) {
    try {
      let resp
      const prevTrade = await exchanges.findOne({ from: toId, to: fromId })

      if (prevTrade) {
        const newMatch = {
          type: 'match',
          user0: fromId,
          user1: toId,
          book_title0: bookTitle,
          book_title1: prevTrade.book_title,
        }
        const deleteResp = await exchanges.deleteOne({ from: toId, to: fromId })
        resp = await this.postExchange(newMatch)
      } else {
        const newTrade = {
          type: 'trade',
          from: fromId,
          to: toId,
          book_title: bookTitle,
        }
        resp = await this.postExchange(newTrade)
      }
      return resp
    } catch (err) {
      return { error: err }
    }
  }

  static async getMatches(userId) {
    let cursor
    try {
      cursor = await exchanges.find(
        { type: 'match', $or: [{ user0: userId }, { user1: userId }] },
        { type: 0 }
      )
    } catch (err) {
      console.error(`Unable to find command, ${err}`)
      return { matchList: [] }
    }

    try {
      const matchList = await cursor.toArray()
      return { matchList }
    } catch (err) {
      console.error(`Unable to convert cursor to array, ${err}`)
      return { matchList: [] }
    }
  }

  /* Not endpoints */

  static async postExchange(newExchange) {
    try {
      return await exchanges.insertOne(newExchange)
    } catch (err) {
      console.log(`Unable to post exchange: ${err}`)
      return { error: err }
    }
  }

}
