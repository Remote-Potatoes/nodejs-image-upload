const isLoggedIn = require("../middleware/isLoggedIn");
const router = require("express").Router();

router.get("/profile", isLoggedIn, (req, res) => {
  res.render("profile", { user: req.user });
});

module.exports = router;
