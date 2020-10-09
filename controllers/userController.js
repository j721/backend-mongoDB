const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { unregisterPartial } = require("handlebars");
//import from UserModel
const User = mongoose.model("User");

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

router.get("/list", (res, res) => {
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
