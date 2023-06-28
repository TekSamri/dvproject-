const EntrantInfo = require("../model/entantInfo");

// Create Entrant Info in database

const createEntrantInfo = async (req, res) => {
  const { firstName, lastName, middleName, birthYear } = req.body;

  try {
    const entrantInfo = await EntrantInfo.create({
      firstName,
      lastName,
      middleName,
      birthYear,
    });
    res.status(200).send({
      entrantInfo,
    });
  } catch (err) {
    res.status(404).send("Error " + err.message);
  }
};

module.exports = createEntrantInfo;
