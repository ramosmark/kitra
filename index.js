const express = require("express");
//
const { sequelize } = require("./lib/db");

const app = express();
const port = 3000;

app.use(express.json());
app.use("/", require("./routes/auth_routes"));
app.use("/treasures", require("./routes/treasure_routes"));

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully");
    
    app
      .listen(port, () => {
        console.log(`Started at port ${port}`);
      })
      .on("error", error => console.log(error));
  })
  .catch(error => {
    console.error("Unable to connect to database:", error);
  });
