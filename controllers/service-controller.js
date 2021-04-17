const { connection } = require("../db");

const createService = (req, res) => {

}

const updateService = (req, res) => {

}

const deleteService = (req, res) => {

}

const getServiceById = (req, res) => {

}

const getAllServices = (req, res) => {
  connection.query("SELECT * FROM `services`", (err, results, fields) => {
    if (err) {
      res.json({
        status: "error",
        message: "Error occurred while fetching services",
        data: null
      });
    }

    res.json({
      status: "success",
      message: "Services fetched successfully",
      data: results
    });
  });
}

module.exports = {
  createService,
  updateService,
  deleteService,
  getServiceById,
  getAllServices
}