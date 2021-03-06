const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { unregisterPartial } = require("handlebars");

//connect to our UserModel
const User = mongoose.model("User");

//routes created need to match the naming of user folder under the views directory in order for express-handlebars to work properly
router.get("/", (req, res) => {
  res.render("user/addOrEdit", {
    viewTitle: "Insert User",
  });
});

router.post("/", (req, res) => {
  if (req.body._id == "") {
    insertRecord(req, res);
  } else {
    updateRecord(req, res);
  }
});

function insertRecord(req, res) {
  var user = new User();
  user.fullName = req.body.fullName;
  user.email = req.body.email;
  user.mobile = req.body.mobile;
  user.city = req.body.city;

  user.save((err, doc) => {
    if (!err) {
      res.redirect("user/list");
    } else {
      console.log("Error when inserting record", err);
    }
  });
}

function updateRecord(req, res) {
  User.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true },
    (err, doc) => {
      if (!err) {
        res.redirect("user/list");
      } else {
        console.log("Error during update", update);
      }
    }
  );
}

router.get("/list", (req, res) => {
  User.find((err, docs) => {
    if (!err) {
      res.render("user/list", {
        list: docs,
      });
    } else {
      console.log("Error in retrieval", err);
    }
  });
});

router.get("/:id", (req, res) => {
  User.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.render("user/addOrEdit", {
        viewTitle: "Update User",
        user: doc,
      });
      console.log(doc);
    }
  });
});

router.get("/delete/:id", (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.render("user/list");
    } else {
      console.log("Error in deleting user", err);
    }
  });
});

module.exports = router; 