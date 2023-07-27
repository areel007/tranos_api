const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const upload = require("./utils/multer");
const applicationUpload = require("./utils/application");

const app = express();

const blogPostRoute = require("./routes/blog.post");
const applicationRoute = require("./routes/application");
const partnerRoute = require("./routes/home/partner");
const heroRoute = require("./routes/home/hero");
const servicesRoute = require("./routes/home/services");
const aboutBannerRoute = require("./routes/about/banner");
const aboutValuesRoute = require("./routes/about/value");
const visionMissionRoute = require("./routes/about/vision-mission");
const homeWhyRoute = require("./routes/home/why")

// Middlewares
app.use(cors());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

app.use("/api/v1/blog", upload.single("imageUrl"), blogPostRoute);
app.use(
  "/api/v1/application",
  applicationUpload.single("resumeUrl"),
  applicationRoute
);
app.use("/api/v1/home", upload.single("partner"), partnerRoute);
app.use("/api/v1/home", heroRoute);
app.use("/api/v1/home", servicesRoute);
app.use("/api/v1/about", upload.single("banner"), aboutBannerRoute);
app.use("/api/v1/about", aboutValuesRoute);
app.use("/api/v1/about", visionMissionRoute);
app.use("/api/v1/home", homeWhyRoute)

module.exports = app;
