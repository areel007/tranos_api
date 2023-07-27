const VisionMission = require("../../models/about/vision-mission")

exports.createVisionMission = async (req, res) => {
  try {
    const {vision, mission} = req.body

    const newVisionMission = new VisionMission({
      vision,
      mission,
    })

    await newVisionMission.save()

    res.status(201).json({
      newVisionMission
    })
  } catch (error) {
    res.status(500).json({
      error
    })
  }
}

exports.getVisionMission = async (req, res) => {
  try {
    const visionMissionId = req.params.id

    const visionMission = await VisionMission.findById(visionMissionId)

    if (!visionMission) {
      return res.status(404).json({
        msg: "resource not found"
      })
    }

    res.status(200).json({
      visionMission
    })
  } catch (error) {
    res.status(500).json({
      error
    })
  }
}

exports.updateVisionMission = async (req, res) => {
  try {
    const visionMissionId = req.params.id;
    const { vision, mission } = req.body;

    // Update the vision and mission properties in the database directly
    const updatedVisionMission = await VisionMission.findByIdAndUpdate(
      visionMissionId,
      { vision, mission },
      { new: true } // To return the updated document in the response
    );

    if (!updatedVisionMission) {
      return res.status(404).json({
        msg: "resource not found",
      });
    }

    res.status(200).json({
      visionMission: updatedVisionMission,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};