const express = require("express");
const {
  getAllAccounts,
  createAccount,
} = require("../controllers/account.controller");
const router = express.Router();

// Get all accounts
router.get("/:date/accounts", getAllAccounts);

// Create new account
router.post("/account-create", createAccount);

module.exports = router;
