import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID
let users

export default class RestaurantsDAO {
  static async injectDB(conn) {
    if (users) {
      return
    }

    try {
      users = await conn.db(process.env.LIBRARY_NS).collection("users")
    } catch (err) {
      console.error(
        `Unable to establish a collection handle in libraryDAO: ${err}`
      )
    }
  }


  static async getUsers({
    filters = null,
    page = 0,
    usersPerPage = 20
  } = {}) {
    let query

    if (filters) {
      if ("author" in filters) {
        query = { "books.author": filters["author"] }
      } else if ("bookTitle" in filters) {
        query = { "books.title": filters["bookTitle"] }
      } else if ("userName" in filters) {
        query = { user_name: filters["userName"] }
      }

    }

    let cursor
    try {
      cursor = await users.find(query)
    } catch (err) {
      console.error(`Unable to find command, ${err}`)
      return { usersList: [], totalNumUsers: 0 }
    }

    const displayCursor = cursor.limit(usersPerPage)
      .skip(usersPerPage * page)
    try {
      const usersList = await displayCursor.toArray()
      const totalNumUsers = await users.countDocuments(query)
      return { usersList, totalNumUsers }
    } catch (err) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${err}`
      )
      return { usersList: [], totalNumUsers: 0 }
    }
  }

  static async addUser(userName, passwd, number, books = []) {
    try {
      const newUser = {
        user_name: userName,
        password: passwd,
        number,
        books
      }
      return await users.insertOne(newUser)
    } catch (err) {
      console.log(`Unable to post user: ${err}`)
      return { error: err }
    }
  }

  static async passwdConfirmation(userName, passwd) {
    try {
      const user = await users.findOne(
        { user_name: userName },
        { _id: 1, user_name: 1, password: 1 }
      )

      if (user.password == passwd) {
        return {
          _id: user._id,
        }
      } else {
        return { error: "Passwd check failed" }
      }
    } catch (err) {
      return { error: "Passwd check failed" }
    }
  }

  static async addBook(userId, book) {
    try {
      const updateResponse = await users.updateOne(
        { _id: ObjectId(userId) },
        { $push: { books: book } }
      )
      return await updateResponse
    } catch (err) {
      console.error(`Unable to add book: ${err}`)
      return { error: err }
    }
  }

  static async deleteBook(userId, bookTitle) {
    try {
      const updateResponse = await users.updateOne(
        { _id: ObjectId(userId) },
        { $pull: { books: { title: bookTitle } } }
      )
      return await updateResponse
    } catch (err) {
      console.error(`Unable to delete book: ${err}`)
      return { error: err }
    }
  }
}
