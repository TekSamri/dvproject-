const mongoose = require("mongoose");

//Creating Entrant information model

const Schema = mongoose.Schema;
const EntrantSchema = new Schema(
  {
    firstName: {
      type: "String",
      required: [true, "First Name is required"],
    },
    lastName: {
      type: "String",
      required: [true, "Last Name is required"],
    },
    middleName: {
      type: "String",
      required: [true, "Middle Name is required"],
    },
    birthYear: {
      type: "String",
      required: [true, "Year of birth is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("EntrantInfo", EntrantSchema);

// module.exports = EntrantInfo;
