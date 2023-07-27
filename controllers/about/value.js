const Value = require("../../models/about/values");

exports.addValues = async (req, res) => {
  try {
    const { ourValues, canDo, proactive, surpassing, continuous, responsibility } =
      req.body;

    const newValues = new Value({
      ourValues,
      canDo,
      proactive,
      surpassing,
      continuous,
      responsibility,
    });

    await newValues.save();

    res.status(201).json({
      values: newValues,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.getValue = async (req, res) => {
  try {
    const valuesId = req.params.id;
    const values = await Value.findById(valuesId);

    if (!values) {
      return res.status(404).json({
        msg: "resource not found",
      });
    }

    res.status(200).json({
      values,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.updateValues = async (req, res) => {
  try {
    const valuesId = req.params.id;
    const { ourValues, canDo, proactive, surpassing, continuous, responsibility } =
      req.body;

    const values = await Value.findByIdAndUpdate(
      valuesId,
      {
        ourValues,
        canDo,
        proactive,
        surpassing,
        continuous,
        responsibility,
      },
      { new: true }
    ); // To return the updated document

    await values.save();

    res.status(200).json({
      values,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};
