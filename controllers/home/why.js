const Why = require("../../models/home/why");

exports.postWhy = async (req, res) => {
  try {
    const { why } = req.body;
    const newWhy = new Why({
      why,
    });

    await newWhy.save();

    res.status(201).json({
      why: newWhy,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.getWhy = async (req, res) => {
  try {
    const whyId = req.params.id;

    const why = await Why.findById(whyId);

    if (!why) {
      return res.status(404).json({
        msg: "resource not found",
      });
    }

    res.status(200).json({
      why,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.updateWhy = async (req, res) => {
  try {
    const whyId = req.params.id;
    const { why } = req.body;

    // Find and update the "Why" entry directly in the database
    const updatedWhy = await Why.findByIdAndUpdate(
      whyId,
      { why },
      { new: true } // To return the updated document in the response
    );

    if (!updatedWhy) {
      return res.status(404).json({
        msg: "resource not found",
      });
    }

    res.status(200).json({
      why: updatedWhy,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};