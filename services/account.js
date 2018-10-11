const accountData = require("../persistence/accounts.json");
const transactionData = require("../persistence/transactions.json");
const notificationData = require("../persistence/notifications.json");
const generateUuid = require("./util/helper");
const transactionTypes = require("./constants/transactionTypes");
const fs = require("fs");

const getAccount = accountId => {
  const account = accountData.accounts.find(
    account => account.accountId === accountId
  );

  if (!account) {
    throw "Account doesn't exist";
  }
  return account;
};

const transferMoney = (senderAccountId, recipientAccountId, amount) => {
  const senderNewBalance = getBalance(senderAccountId) - amount;
  const recipientNewBalance = getBalance(recipientAccountId) + amount;

  const senderTransaction = {
    transactionId: generateUuid(),
    transactionType: transactionTypes.send,
    accountId: senderAccountId,
    balance: senderNewBalance,
    timestamp: Date.now()
  };

  const recipientTransaction = {
    transactionId: generateUuid(),
    transactionType: transactionTypes.receive,
    accountId: recipientAccountId,
    timestamp: Date.now()
  };

  recordTransaction(senderTransaction);
  recordTransaction(senderTransaction);
  createNotification(recipientTransaction);

  return senderTransaction;
};

recordTransaction = transaction => {
  try {
    transactionData.transactions.push(transaction);
    var newTransactionData = JSON.stringify(transactionData);
    fs.writeFile("./persistence/transactions.json", newTransactionData, err => {
      if (err) throw err;
      return;
    });
  } catch (e) {
    return;
  }
};

createNotification = notification => {
  try {
    notificationData.notifications.push(notification);
    var newNotificationData = JSON.stringify(notificationData);
    fs.writeFile(
      "./persistence/notifications.json",
      newNotificationData,
      err => {
        if (err) throw err;
        return;
      }
    );
  } catch (e) {
    return;
  }
};

module.exports = {
  getAccount,
  transferMoney
};
