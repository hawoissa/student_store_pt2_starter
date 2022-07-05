const db = require("../db")

class Order {

   static async listOrdersForUser({ user }) {
      const results = await db.query (
         `
         SELECT id AS "orderId", 
               customer_id AS "customerId",
               quantity, 
               name,
               price
         FROM orders AS o
            JOIN order_details AS od ON od.order_id = o.id
            JOIN products AS p ON od.product_id = p.id
         WHERE customer_id = (
            SELECT id
            FROM users
            WHERE email = $1
         )
         `
      , [user.email]); 
      return results.rows;
   }   

   static async createOrder({ order, user }) {
      const result = await db.query(`
      INSERT INTO orders (
         customer_id
      ) VALUES (
         SELECT id 
         FROM users AS u 
         WHERE u.email = $1
      ) RETURNING id
      `, [user.email]); 
      const orderId = result.rows[0]; 

      order.forEach(product => {
         const results = db.query(`
         INSERT INTO order_details (
            order_id, product_id, quantity
         ) VALUES (       
            $1, $2, $3
         ) RETURNING id
         `, [orderId, product.id, product.quantity]); 
      });  
   }

}

module.exports = Order;
