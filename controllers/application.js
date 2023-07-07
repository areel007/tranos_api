const Application = require("../models/application");
const cloudinary = require("../utils/cloudinary");
const nodemailer = require("nodemailer");

exports.newApplication = async (req, res) => {
  try {
    const options = {
      folder: "tranos/application",
      resource_type: "auto",
    };
    const result = await cloudinary.uploader.upload(req.file.path, options);
    const { firstname, lastname, phone, email, experience, designation } =
      req.body;

    const newApplication = new Application({
      firstname,
      lastname,
      phone,
      email,
      experience,
      designation,
      resumeUrl: result.secure_url,
      cloudinaryId: result.public_id,
    });

    await newApplication.save();

    // Send application notification to email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: "Tranos Application form",
      to: process.env.USER_EMAIL,
      subject: "Notification",
      text: `An application has just been submitted`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error:", error);
        res.status(500).json({ error: "failed to send notification." });
      } else {
        console.log("Email sent:", info.response);
        res.status(200).json({
          status: "success",
          newApplication,
        });
      }
    });

    // res.status(201).json({
    //   status: "success",
    //   newApplication,
    // })
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

exports.getApplications = async (req, res) => {
  try {
    const applications = await Application.find();

    res.status(200).json({
      status: "success",
      applications,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

exports.deleteApplication = async (req, res) => {
  try {
    const applicationId = req.params.id;
    // Find the application in MongoDB
    const application = await Application.findById(applicationId);

    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    // Delete the file from Cloudinary
    await cloudinary.uploader.destroy(application.cloudinaryId);

    await Application.findByIdAndDelete(applicationId)

    res.status(200).json({ message: "Application deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete application" });
  }
};
