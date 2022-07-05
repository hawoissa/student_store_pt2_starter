const Order = require("../models/order");
const express = require("express")
const security = require("../middleware/security")
const router = express.Router();

router.get("/", security.requireAuthenticatedUser, async (req, res, next) => {
   try {
      const { user } = res.locals;
      const orders = await Order.listOrdersForUser({ user });
      return res.status(200).json({ orders });
   } catch(error) {
      next(error);
   }
});

router.post("/", security.requireAuthenticatedUser, async (req, res, next) => {
   try {
      const { user } = res.locals;
      const newOrder = await Order.createOrder({ order: req.body, user });
      return res.status(201).json({ newOrder });
   } catch(error) {
      next(error);
   }
});

module.exports = router;