const mongoose = require("mongoose");



//100 async

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://naonkgw:Ricola123!.@cluster0.k7qbgvm.mongodb.net/appDataBase?retryWrites=true&w=majority"
    );
    console.log("Success: Connected to MongoDB");
  } catch (err) {
    console.log("Failure: Unconnected to MongoDB");
    throw new Error();
  }
};

module.exports = connectDB;
