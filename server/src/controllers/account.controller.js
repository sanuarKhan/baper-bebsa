const moment = require("moment");
const Account = require("../models/account.model");

// Get all accounts
const getAllAccounts = async (req, res) => {
  // const date = req.params.date;
  const startDay = new Date(req.params.date);
  const endDay = new Date(req.params.date);
  startDay.setHours(0, 0, 0, 0);
  endDay.setHours(23, 59, 59, 999);
  try {
    const accounts = await Account.find({
      createdAt: {
        $gte: startDay,
        $lte: endDay,
      },
    }).sort("-createdAt");
    res.json(accounts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new account
const createAccount = async (req, res) => {
  const { customername, itemAmount, itemPrice } = req.body;
  const account = new Account({
    customername,
    itemAmount,
    itemPrice,
    totalPrice: itemAmount * itemPrice,
  });

  try {
    const newAccount = await account.save();
    res.status(201).json(newAccount);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAllAccounts,
  createAccount,
};
