const express = require("express");
const router = express.Router();
const accountData = require("../persistence/accounts.json");
const accountService = require("../services/account");

router.get("/:accountId", function(req, res, next) {
  const accountId = req.params.accountId;

  if (!accountId) {
    return res.sendStatus(400);
  }

  const accountData = accountData.accounts[0].filter(account => {
    return account.accountId == accountId;
  });

  if (!accountData) {
    return res.sendStatus(404);
  }
  res.send(accountData);
});

router.get("/:accountId/balance", function(req, res, next) {
  const accountId = req.params.accountId;

  if (!accountId) {
    return res.sendStatus(400);
  }

  const account = accountService.getAccount(accountId);

  const balance = {
    accountId,
    balance: account.balance
  };

  res.send(balance);
});

router.post("/:accountId/transfer", function(req, res, next) {
  const accountId = req.params.accountId;

  if (!req.body) {
    return res.sendStatus(400);
  }

  const { recipientAccountId, amount } = req.body;

  if (!accountId || !recipientAccountId || !amount) {
    return res.sendStatus(400);
  }

  const transfer = accountService.transferMoney(
    accountId,
    recipientAccountId,
    amount
  );

  const result = {
    success: "SUCCESS",
    details: transfer
  };

  res.send(result);
});

module.exports = router;
