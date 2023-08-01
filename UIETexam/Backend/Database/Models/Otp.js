const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({

  entityId: {
    type: String,
    required: ["true", "ID is required"],
  },

  otp: {
    type: String,
    required: ["true", "Otp is required"],
  },
   CreatedAt:Date,
  expiresAt: Date,
});

const otpModel = mongoose.model("Otp", otpSchema);

module.exports = {
  otpModel,
};