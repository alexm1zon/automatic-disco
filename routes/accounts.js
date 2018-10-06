var express = require("express");
var router = express.Router();
var accountData = require("../persistence/accounts.json");

router.get("/:accountId", function(req, res, next) {
  var accountId = req.params.accountId;

  if (!accountId) {
    return res.sendStatus(400);
  }

  var accountData = accountData.accounts[0].filter(account => {
    return account.accountId == accountId;
  });

  if (!accountData) {
    return res.sendStatus(404);
  }
  res.send(accountData);
});

router.get("/:accountId/balance", function(req, res, next) {
  var accountId = req.params.accountId;

  if (!accountId) {
    return res.sendStatus(400);
  }

  var accountData = accountData.accounts.filter(account => {
    return account.accountId == accountId;
  });

  res.send(accountData[0].balance);
});

module.exports = router;
