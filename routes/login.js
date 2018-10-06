var express = require("express");
var router = express.Router();
var usersData = require("../persistence/accounts.json");

router.post("/", (req, res, next) => {
  if (!req.body || !req.body.userName || !req.body.password) {
    return res.sendStatus(400);
  }

  const user = usersData["users"].find(
    user =>
      (req.body.userName == user.userName) &
      (req.body.password == user.password)
  );

  if (user) {
    res.send(user.accountId);
    return res.sendStatus(200);
  } else {
    return res.sendStatus(401);
  }
});

module.exports = router;
