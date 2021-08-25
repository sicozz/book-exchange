import LibraryDAO from "../dao/libraryDAO.js"

export default class LibraryCtrl {
  static async apiGetUsers(req, res, next) {
    let usersPerPage = req.query.usersPerPage ? parseInt(req.query.usersPerPage, 10) : 20
    let page = req.query.page ? parseInt(req.query.page, 10) : 0

    let filters = {}
    if (req.query["book-title"]) {
      filters.bookTitle = req.query["book-title"]
    } else if (req.query.author) {
      filters.author = req.query.author
    } else if (req.query["user-name"]) {
      filters.userName = req.query["user-name"]
    }

    const { usersList, totalNumUsers } =
      await LibraryDAO.getUsers({
        filters,
        page,
        usersPerPage,
      })

    let response = {
      users: usersList,
      page: page,
      filters: filters,
      entries_per_page: usersPerPage,
      total_results: totalNumUsers,
    }

    res.json(response)
  }

  static async apiPostSingUp(req, res, next) {
    try {
      const userName = req.body.user_name
      const number = req.body.number
      const passwd = req.body.password
      const books = req.body.books || []

      let userResponse =
        await LibraryDAO.addUser(userName, passwd, number, books)

      if (!userResponse.error) {
        res.json(userResponse)
      } else {
        res.status(400).json({ body: "Sing up failed" })
      }
    } catch (err) {
      console.log(`user, ${err}`)
      res.status(500).json({ error: err })
    }
  }

  static async apiPostSingIn(req, res, next) {
    try {
      const userName = req.body["user-name"]
      const passwd = req.body.password

      let userResponse =
        await LibraryDAO.passwdConfirmation(userName, passwd)

      if (!userResponse.error) {
        res.json(userResponse)
      } else {
        res.status(401).json({ body: "Wrong password or user-name" })
      }
    } catch (err) {
      console.log(`sing in, ${err}`)
      res.status(500).json({ error: err })
    }
  }

  static async apiUpdateBook(req, res, next) {
    try {
      const userId = req.params.id || {}
      const title = req.body.title
      const author = req.body.author
      const year = req.body.year
      const image = req.body.image
      const book = { title, author, year, image }

      const usersResponse = await LibraryDAO.addBook(
        userId,
        book
      )

      var { error } = usersResponse
      if (error) {
        res.status(400).json({ error })
      }

      if (usersResponse.modifiedCount === 0) {
        throw new Error(
          "Unable to update user"
        )
      }

      res.json({ status: "success" })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

  static async apiDeleteBook(req, res, next) {
    try {
      const userId = req.params.id || {}
      const bookTitle = req.body["book-title"]

      const usersResponse = await LibraryDAO.deleteBook(userId, bookTitle)

      var { error } = usersResponse
      if (error) {
        res.status(400).json({ error })
      }

      if (usersResponse.modifiedCount === 0) {
        throw new Error(
          "Unable to update user"
        )
      }

      res.json({ status: "success" })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }
}
