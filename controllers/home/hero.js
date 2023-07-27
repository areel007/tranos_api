const Hero = require("../../models/home/hero");

exports.addHeroText = async (req, res) => {
  try {
    const { lightTextOne, lightTextTwo, boldText, smallText } = req.body;
    const newHero = new Hero({
      lightTextOne,
      lightTextTwo,
      boldText,
      smallText,
    });

    await newHero.save();

    res.status(201).json({
      msg: "hero text added",
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.getHeroText = async (req, res) => {
  try {
    const heroId = req.params.id;

    const heroText = await Hero.findById(heroId);

    if (!heroText) {
      return res.status(404).json({
        error: "hero text not found",
      });
    }

    res.status(200).json({
      heroText,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.updateHeroText = async (req, res) => {
  try {
    const heroId = req.params.id;
    const { lightTextOne, lightTextTwo, boldText, smallText } = req.body;

    const updatedHeroText = await Hero.findByIdAndUpdate(
      heroId,
      {
        lightTextOne,
        lightTextTwo,
        boldText,
        smallText,
      },
      { new: true } // To return the updated document
    );

    if (!updatedHeroText) {
      return res.status(404).json({
        error: "hero text not found",
      });
    }

    res.status(200).json({
      msg: "hero text updated",
      heroText: updatedHeroText,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

