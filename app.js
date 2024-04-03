const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const upload = require("./utils/multer");
const applicationUpload = require("./utils/application");
const videoUpload = require("./utils/multer-video");
const uploadHero = require("./middlewares/file.uplaod");

const app = express();

const authMiddleware = require("./middlewares/auth");

const blogPostRoute = require("./routes/blog.post");
const applicationRoute = require("./routes/application");
const partnerRoute = require("./routes/home/partner");
const heroRoute = require("./routes/home/hero");
const servicesRoute = require("./routes/home/services");
const aboutBannerRoute = require("./routes/about/banner");
const aboutValuesRoute = require("./routes/about/value");
const visionMissionRoute = require("./routes/about/vision-mission");
const homeWhyRoute = require("./routes/home/why");
const registerRoute = require("./routes/auth/register");
const loginRoute = require("./routes/auth/login");
const caseStudies = require("./routes/case-studies/index");
const videoRoute = require("./routes/home/why-video");
const fabricationRoute = require("./routes/services/fabrication");
const installationRoute = require("./routes/services/installation");
const maintenanceRoute = require("./routes/services/maintenance");
const heroImageOne = require("./routes/home/hero-images/hero-images-one");
const heroImageTwo = require("./routes/home/hero-images/hero-image-two");
const heroImageThree = require("./routes/home/hero-images/hero-image-three");

// Middlewares
app.use(cors());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/v1/blog", upload.single("imageUrl"), blogPostRoute);
app.use(
  "/api/v1/application",
  applicationUpload.single("resumeUrl"),
  applicationRoute
);
app.use("/api/v1/home", partnerRoute);
app.use("/api/v1/home", heroRoute);
app.use("/api/v1/home", servicesRoute);
app.use("/api/v1/about", aboutBannerRoute);
app.use("/api/v1/about", aboutValuesRoute);
app.use("/api/v1/about", visionMissionRoute);
app.use("/api/v1/home", homeWhyRoute);
app.use("/api/v1/auth", registerRoute);
app.use("/api/v1/auth", loginRoute);
app.use("/api/v1/case-studies", caseStudies);
app.use("/api/v1/home-video", videoRoute);
app.use("/api/v1/services/fabrication", fabricationRoute);
app.use("/api/v1/services/installation", installationRoute);
app.use("/api/v1/services/maintenance", maintenanceRoute);
app.use("/api/v1/hero-image-one", heroImageOne);
app.use("/api/v1/hero-image-two", upload.single("imageUrl"), heroImageTwo);
app.use("/api/v1/hero-image-three", upload.single("imageUrl"), heroImageThree);

module.exports = app;
