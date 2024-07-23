const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT || 3977;

async function connectToDatabase() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/`
    );
    app.listen(PORT, () => {
      console.log("#######################");
      console.log("####### API REST ######");
      console.log("#######################");
      console.log(
        `http://${process.env.IP_SERVER}:${PORT}/api/${process.env.API_VERSION}/`
      );
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

connectToDatabase();
