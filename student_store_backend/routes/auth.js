const express = require("express")
const User = require("../models/user")
const Order = require("../models/store");
const security = require("../middleware/security")
const { createUserToken } = require("../utils/tokens")
const router = express.Router()

router.post("/login", async (req, res, next) => {
  try {
    const user = await User.login(req.body)
    const token = createUserToken(user);
    return res.status(200).json({ user, token })
  } catch (err) {
    next(err)
  }
})

router.post("/register", async (req, res, next) => {
  try {
    const user = await User.register({ ...req.body, isAdmin: false })
    const token = createUserToken(user);
    return res.status(201).json({ user, token })
  } catch (err) {
    next(err)
  }
})

router.get("/me", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
     const { email } = res.locals.user;
     const user = await User.fetchUserByEmail(email);
     const orders = Order.listOrdersForUser({ user });
     const publicUser = await User.makePublicUser(user);
     return res.status(200).json({ user: publicUser, orders });
  } catch (error) {
     next(error);
  }
})

module.exports = router
