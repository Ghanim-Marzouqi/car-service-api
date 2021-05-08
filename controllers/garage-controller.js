const { pool } = require("../db");

const createGarage = (req, res) => {
  if (!req.body) {
    res.json({
      status: "error",
      message: "Data sent not complete",
      data: null
    });
  }

  const { name, description, owner_id, service_id, region_id, willayat_id } = req.body;

  pool.query("INSERT INTO `garages` (name, description, owner_id, service_id, region_id, willayat_id) VALUES (?, ?, ?, ?, ?, ?)",
    [name, description, owner_id, service_id, region_id, willayat_id], (err, result, fields) => {
      if (err) {
        res.json({
          status: "error",
          message: "Cannot create garage",
          data: null
        });
      }

      if (result && result.affectedRows === 1) {
        res.json({
          status: "success",
          message: "Garage created successfully",
          data: {
            id: result.insertId,
            name,
            description,
            service_id,
            owner_id,
            region_id,
            willayat_id
          }
        });
      } else {
        res.json({
          status: "error",
          message: "Garage not created",
          data: null
        });
      }
    });
}

const updateGarage = (req, res) => {
  if (!req.params) {
    res.json({
      status: "error",
      message: "Data sent not complete",
      data: null
    });
  }

  if (!req.body) {
    res.json({
      status: "error",
      message: "Data sent not complete",
      data: null
    });
  }

  const { id } = req.params;
  const { name, description, owner_id, service_id, region_id, willayat_id } = req.body;

  pool.query("UPDATE `garages` SET name = ?, description = ?, owner_id = ?, service_id = ?, region_id = ?, willayat_id = ? WHERE id = ?",
    [name, description, owner_id, service_id, region_id, willayat_id, id],
    (err, result, fields) => {
      if (err) {
        res.json({
          status: "error",
          message: "Data sent not complete",
          data: null
        });
      }

      if (result.affectedRows === 1) {
        res.json({
          status: "success",
          message: "Garage updated successfully",
          data: {
            id,
            name,
            description,
            owner_id,
            service_id,
            region_id,
            willayat_id
          }
        });
      } else {
        res.json({
          status: "error",
          message: "Garage not updated",
          data: {
            id,
            name,
            description,
            owner_id,
            service_id,
            region_id,
            willayat_id
          }
        });
      }
    });
}

const deleteGarage = (req, res) => {
  if (!req.params) {
    res.json({
      status: "error",
      message: "Data sent not complete",
      data: null
    });
  }

  const { id } = req.params;

  pool.query("DELETE FROM `garages` WHERE id = ?", [id], (err, result, fields) => {
    if (err) {
      res.json({
        status: "error",
        message: "Cannot delete garage",
        data: null
      });
    }

    if (result.affectedRows === 1) {
      res.json({
        status: "success",
        message: "Garage delete successfully",
        data: true
      });
    } else {
      res.json({
        status: "error",
        message: "Cannot delete garage",
        data: null
      });
    }
  });
}

const getGarageById = (req, res) => {
  if (!req.params) {
    res.json({
      status: "error",
      message: "Data sent not complete",
      data: null
    });
  }

  const { id } = req.params;

  pool.query("SELECT * FROM `garages` WHERE id = ?", [id], (err, result, fields) => {
    if (err) {
      res.json({
        status: "error",
        message: "Cannot get garage",
        data: null
      });
    }

    res.json({
      status: "success",
      message: "Garage loaded successfully",
      data: result[0]
    });
  });
}

const getAllGarages = (req, res) => {
  pool.query("SELECT g.id, g.name, g.description, g.owner_id, u.name as 'owner_name', g.service_id, s.name as 'service_name', s.price as 'service_price', g.region_id, r.name as 'region_name', g.willayat_id, w.name as 'willayat_name' FROM `garages` g LEFT JOIN `services` s ON s.id = g.service_id LEFT JOIN `users` u ON u.id = g.owner_id LEFT JOIN `regions` r ON r.id = g.region_id LEFT JOIN `willayats` w ON w.id = g.willayat_id", (err, results, fields) => {
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

const getAllGaragesByRegionIdAndWillayatId = (req, res) => {
  if (!req.body) {
    res.json({
      status: "error",
      message: "Data sent is not complete",
      data: null
    });
  }

  const { region_id, willayat_id } = req.body;

  pool.query("SELECT * FROM `garages` WHERE region_id = ? AND willayat_id = ?", [region_id, willayat_id], (err, result, fields) => {
    if (err) {
      res.json({
        status: "error",
        message: "Cannot get garages",
        data: null
      });
    }

    res.json({
      status: "success",
      message: "Garages fetched successfully",
      data: result
    });
  });
}

const getGarageOwners = (req, res) => {
  pool.query("SELECT * FROM `users` WHERE user_type = 'GARAGE_OWNER'", (err, result, fields) => {
    if (err) {
      res.json({
        status: "error",
        message: "Error occurred while fetching garage owners",
        data: null
      });
    }

    res.json({
      status: "success",
      message: "Garage owners loaded successfully",
      data: result
    })
  });
}

const getFullGarageDetails = (req, res) => {
  if (!req.params) {
    res.json({
      status: "error",
      message: "Data sent is not complete",
      data: null
    });
  }

  const { id } = req.params;

  pool.query("SELECT g.*, u.name as 'owner_name', s.name as 'service_name', s.price as 'service_price', r.name as 'region_name', w.name as 'willayat_name' FROM `garages` g LEFT JOIN `users` u ON g.owner_id = u.id LEFT JOIN `services` s ON g.service_id = s.id LEFT JOIN `regions` r ON g.region_id = r.id LEFT JOIN `willayats` w ON g.willayat_id = w.id WHERE g.id = ?", [id], (err, result, fields) => {
    if (err) {
      res.json({
        status: "error",
        message: "Cannot get garage details",
        data: null
      });
    }

    if (result.length > 0) {
      res.json({
        status: "success",
        message: "Garage details fetched successfully",
        data: result[0]
      });
    } else {
      res.json({
        status: "error",
        message: "Garage not found",
        data: null
      });
    }
  })
}

const getOwnerGarages = (req, res) => {
  if (!req.params) {
    res.json({
      status: "error",
      message: "Data sent is not complate",
      data: null
    });
  }

  const { owner_id } = req.params;

  pool.query("SELECT g.*, u.name as 'owner_name', s.name as 'service_name', r.name as 'region_name', w.name as 'willayat_name' FROM `garages` g LEFT JOIN `users` u ON g.owner_id = u.id LEFT JOIN `services` s ON g.service_id = s.id LEFT JOIN `regions` r ON g.region_id = r.id LEFT JOIN `willayats` w ON g.willayat_id = w.id WHERE g.owner_id = ?", [owner_id], (err, result, fields) => {
    if (err) {
      res.json({
        status: "error",
        message: "Cannot get owner garages",
        data: null
      });
    }

    res.json({
      status: "success",
      message: "Garages fetched successfully",
      data: result
    });
  });
}

module.exports = {
  createGarage,
  updateGarage,
  deleteGarage,
  getGarageById,
  getAllGarages,
  getGarageOwners,
  getAllGaragesByRegionIdAndWillayatId,
  getFullGarageDetails,
  getOwnerGarages
}