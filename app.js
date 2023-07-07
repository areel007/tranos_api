const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const upload = require("./utils/multer");
const applicationUpload = require("./utils/application")

const app = express();

const blogPostRoute = require("./routes/blog.post")
const applicationRoute = require("./routes/application")

// Middlewares
app.use(cors());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

app.use("/api/v1/blog", upload.single("imageUrl"), blogPostRoute);
app.use("/api/v1/application", applicationUpload.single("resumeUrl"), applicationRoute);

module.exports = app;