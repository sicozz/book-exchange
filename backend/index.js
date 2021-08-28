import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import LibraryDAO from "./dao/libraryDAO.js"
import ExchangeDAO from "./dao/exchangeDAO.js"
dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000

MongoClient.connect(
  process.env.LIBRARY_DB_URI,
  {
    poolSize: 50,
    wtimeout: 2500,
    useNewUrlParser: true
  }
)
  .catch(err => {
    console.error(err.stack)
    process.exit(1)
  })
  .then(async client => {
    await LibraryDAO.injectDB(client)
    await ExchangeDAO.injectDB(client)
    app.listen(port, () => {
      console.log(`listening on port ${port}`)
    })
  })
