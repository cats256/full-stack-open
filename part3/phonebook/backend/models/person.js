const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

console.log("connecting to", url);

mongoose
  .connect(url)

  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  number: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      validator: function (number) {
        if (
          number.charAt(2) === "-" &&
          /^\d+$/.test(number.substring(0, 2)) &&
          /^\d+$/.test(number.substring(3))
        ) {
          return true;
        } else if (
          number.charAt(3) === "-" &&
          /^\d+$/.test(number.substring(0, 3)) &&
          /^\d+$/.test(number.substring(4))
        ) {
          return true;
        }
        return false;
      },
      message: "malformatted number",
    },
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
