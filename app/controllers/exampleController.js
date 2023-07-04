const db = require("../models");
// const Model = db.Model;
// const { Op } = require("sequelize");

exports.refactoreMe1 = (req, res) => {
  // function ini sebenarnya adalah hasil survey dri beberapa pertnayaan, yang mana nilai dri jawaban tsb akan di store pada array seperti yang ada di dataset
  db.sequelize.query(`select values from "surveys"`).then((data) => {
    let counter = 0;
    let totalIndex = [];
    // console.log(data[1].rows);
    for (let i = 0; i < data[1].rows[counter].values.length; i++) {
      let tempSum = 0;
      for (let j = 0; j < data[1].rows.length; j++) {
        counter++;
        tempSum += data[1].rows[j].values[i];
      }
      totalIndex.push(tempSum / 10);
      counter = 0;
    }

    res.status(200).send({
      statusCode: 200,
      success: true,
      data: totalIndex,
    });
  });
};

exports.refactoreMe2 = (req, res) => {
  // function ini untuk menjalakan query sql insert dan mengupdate field "dosurvey" yang ada di table user menjadi true, jika melihat data yang di berikan, salah satu usernnya memiliki dosurvey dengan data false
  let today = new Date();
  let date = today.toLocaleDateString("id-ID");
  db.sequelize
    .query(
      `INSERT INTO surveys ("userId","values", "createdAt","updatedAt") VALUES (${
        req.body.userId
      },'${req.body.values
        .replace("[", "{")
        .replace("]", "}")}', '${date}', '${date}') RETURNING *;`
    )
    .then((data) => {
      db.sequelize
        .query(
          `UPDATE users SET "dosurvey" = ${true} WHERE "id" = ${req.body.id};`
        )
        .then(() => {
          console.log("success");
        })
        .catch((err) => console.log(err));

      res.status(201).send({
        statusCode: 201,
        message: "Survey sent successfully!",
        success: true,
        data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        statusCode: 500,
        message: "Cannot post survey.",
        success: false,
      });
    });
};

exports.callmeWebSocket = (req, res) => {
  // do something
};

exports.getData = (req, res) => {
  // do something
};
