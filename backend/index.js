const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const createEntrantInfo = require("./controller/entrantInfo2023.js");
const EntrantInfo = require("./model/entantInfo");

// Invoking Express
const app = express();

//Cross Orgin Resource Sharing CORS middleware
app.use(cors());
app.use(express.json());
mongoose
  .connect(process.env.DATA_BASE)
  .then(() => {
    console.log("DB connection is set");
  })
  .catch(() => {
    console.log("Something goes wrong!!");
  });

// Rest of your code...

app.post("/new-entry", async (req, res) => {
  const { firstName, lastName, middleName, birthYear } = req.body;
  // console.log(req.body);
  try {
    const entrantInfo = await EntrantInfo.create({
      firstName,
      lastName,
      middleName,
      birthYear,
    });
    res.status(200).send(entrantInfo);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

// Entrant Status Check
app.post("/status-check", (req, res) => {
  const { confirmNum, lastName, birthYear } = req.body;
  console.log(req.body);
  const entranID = [...confirmNum].slice(4).join("");
  EntrantInfo.findOne({ _id: entranID })
    .then((entrant) => {
      console.log(entrant, entrant.lastName, entrant.birthYear);
      if (entrant.lastName !== lastName || entrant.birthYear !== birthYear) {
        res
          .status(404)
          .send(
            "Error: Make sure you insert the Name, birth year and confirmation correctly"
          );
      }
      if (entrant) {
        res.status(200).send(entrant);
      }
    })

    .catch((err) => console.log(err.message));
});

app.listen(4000, console.log("server is running in background"));
