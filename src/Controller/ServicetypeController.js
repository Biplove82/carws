const serviceplanmodells = require("../Modells/ServiceplanModells");

const serviceplan = async function (req, res) {
  try {
    const { ServiceType, Amount, CardContent } = req.body;
    const serviceplan = new serviceplanmodells({
      ServiceType,
      Amount,
      CardContent,
    });
    await serviceplan.save();
    res.status(200).json({ serviceplan });
  } catch (error) {
    res.status(400).json({ msg: "Error" });
  }
};

const getserviceplan = async function (req, res) {
  try {
    const serviceplans = await serviceplanmodells
      .findOne({ ServiceType: "Routine clean" })
      .select("-_id");
    res.status(200).json({ serviceplans });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getmemeberpaln = async function (req, res) {
  try {
    let memberShipPlan = await serviceplanmodells
      .findOne({ ServiceType: "Basic" })
      .select("-_id");
    res.status(200).json({ memberShipPlan });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = { serviceplan, getserviceplan, getmemeberpaln };
