const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accountSchema = new Schema(
  {
    customername: {
      type: String,
    },
    itemAmount: {
      type: Number,
      require: true,
    },
    itemPrice: {
      type: Number,
      require: true,
    },
    totalPrice: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
