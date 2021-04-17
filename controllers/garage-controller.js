const { connection } = require("../db");

const createGarage = (req, res) => {

}

const updateGarage = (req, res) => {

}

const deleteGarage = (req, res) => {

}

const getGarageById = (req, res) => {

}

const getAllGarages = (req, res) => {
  connection.query("SELECT g.id, g.name, g.description, g.owner_id, u.name as 'owner_name', g.service_id, s.name as 'service_name', s.price as 'service_price', g.region_id, r.name as 'region_name', g.willayat_id, w.name as 'willayat_name' FROM `garages` g LEFT JOIN `services` s ON s.id = g.service_id LEFT JOIN `users` u ON u.id = g.owner_id LEFT JOIN `regions` r ON r.id = g.region_id LEFT JOIN `willayats` w ON w.id = g.willayat_id", (err, results, fields) => {
    if (err) {
      res.json({
        status: "error",
        message: "Error occurred while fetching garages",
        data: null
      });
    }

    res.json({
      status: "success",
      message: "Garages fetched successfully",
      data: results
    });
  });
}

module.exports = {
  createGarage,
  updateGarage,
  deleteGarage,
  getGarageById,
  getAllGarages
}