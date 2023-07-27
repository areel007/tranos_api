const Service = require("../../models/home/services")

exports.newServices = async (req, res) => {
  try {
    const {fabrication, installation, maintenance} = req.body;
    const newServices = new Service({
      fabrication,
      installation,
      maintenance
    });

    await newServices.save();

    res.status(201).json({
      msg: "services added",
    });
  } catch (error) {
    res.status(500).json({
      error
    })
  }
}

exports.getServicesText = async (req, res) => {
  try {
    const servicesId = req.params.id;

    const servicesText = await Service.findById(servicesId);

    if (!servicesText) {
      return res.status(404).json({
        error: "services text not found",
      });
    }

    res.status(200).json({
      servicesText,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.updateServicesText = async (req, res) => {
  try {
    const servicesId = req.params.id;
    const { fabrication, installation, maintenance } = req.body;

    const updatedServicesText = await Service.findByIdAndUpdate(
      servicesId,
      {
        fabrication,
        installation,
        maintenance
      },
      { new: true } // To return the updated document
    );

    if (!updatedServicesText) {
      return res.status(404).json({
        error: "services text not found",
      });
    }

    res.status(200).json({
      msg: "services text updated",
      servicesText: updatedServicesText,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};