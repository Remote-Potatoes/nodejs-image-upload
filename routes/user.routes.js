const isLoggedIn = require("../middleware/isLoggedIn");
const router = require("express").Router();
const upload = require("../middleware/cloudinary");
const User = require("../models/User.model");

router.get("/profile", isLoggedIn, (req, res) => {
  res.render("profile", { user: req.user });
});

router.post(
  "/profilePic",
  isLoggedIn,
  upload.single("profilePic"),
  (req, res) => {
    User.findByIdAndUpdate(
      req.user._id,
      { profilePic: req.file.path },
      { new: true }
    )
      .then((updatedUser) => {
        req.session.user = updatedUser;
        res.redirect("/user/profile");
      })
      .catch((err) => console.log(err));
  }
);

module.exports = router;
