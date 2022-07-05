const Store = require("../models/store");
const router = express.Router();

router.get("/", async (req, res, next) => {
   try {
      const products = await Nutrition.listProducts();
      return res.status(200).json({ products });
   } catch(error) {
      next(error);
   }
});

module.exports = router;
