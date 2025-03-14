const app = require("./src/app");
const connectDB = require("./src/db.config");
const { port } = require("./src/constant");

app.get("/test", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
  connectDB();
});
