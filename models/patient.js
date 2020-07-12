const mongoose = require("mongoose");
// Patient Schema
const patientSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      unique: true,
    },
    reports: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Report",
      },
    ],
  },
  {
    timeStamps: {},
  }
);
const Patient = mongoose.model("Patitent", patientSchema);
module.exports = Patient;
