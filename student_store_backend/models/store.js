const db = require("../db")

class Store {
   static async listProducts() {
      const results = await db.query (
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