const db = require("../db")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")

class Store {
   static async listProducts() {
      const results = db.query (
         `
         SELECT *     
         FROM products AS p
         ORDER BY p.id DESC
         `
      )     
      return results.rows;
   }
}

module.exports = Store;