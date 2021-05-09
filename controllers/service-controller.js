const { pool } = require("../db");

const createService = (req, res) => {
  if (!req.body) {
    res.json({
      status: "error",
      message: "Data sent are not complete",
      data: null
    });
  }

  const { name, description } = req.body;

  pool.query("INSERT INTO `services` (name, description) VALUES (?, ?)",
    [name, description],
    (err, results, fields) => {
      if (err) {
        res.json({
          status: "error",
          message: "Data sent are not complete",
          data: null
        });
      }

      res.json({
        status: "success",
        message: "Service Added Successfully",
        data: {
          id: results.insertId,
          name,
          description
        }
      });
    });
}

const updateService = (req, res) => {
  if (!req.params) {
    res.json({
      status: "error",
      message: "Data sent are not complete",
      data: null
    });
  }

  if (!req.body) {
    res.json({
      status: "error",
      message: "Data sent are not complete",
      data: null
    });
  }

  const { id } = req.params;
  const { name, description } = req.body;

  pool.query("UPDATE `services` SET name = ?, description = ? WHERE id = ?",
    [name, description, id],
    (err, results, fields) => {
      if (err) {
        res.json({
          status: "error",
          message: "Data sent are not complete",
          data: null
        });
      }

      if (results.affectedRows === 1) {
        res.json({
          status: "success",
          message: "Service updated successfully",
          data: {
            id,
            name,
            description
          }
        });
      } else {
        res.json({
          status: "success",
          message: "Service not updated",
          data: {
            id,
            name,
            description
          }
        });
      }
    });
}

const deleteService = (req, res) => {
  if (!req.params) {
    res.json({
      status: "error",
      message: "Data sent are not complete",
      data: null
    });
  }

  const { id } = req.params;

  pool.query("DELETE FROM `services` WHERE id = ?", [id], (err, results, fields) => {
    if (err) {
      res.json({
        status: "error",
        message: "Cannot delete service",
        data: null
      });
    }

    if (results.affectedRows === 1) {
      res.json({
        status: "success",
        message: "Service deleted successfully",
        data: id
      });
    } else {
      res.json({
        status: "error",
        message: "Service not found",
        data: id
      });
    }
  });
}

const getServiceById = (req, res) => {
  if (!req.params) {
    res.json({
      status: "error",
      message: "Data sent are not complete",
      data: null
    });
  }

  const { id } = req.params;

  pool.query("SELECT * FROM `services` WHERE id = ?", [id], (err, results, fields) => {
    if (err) {
      res.json({
        status: "error",
        message: "Cannot load service",
        data: null
      });
    }

    if (results.length > 0) {
      res.json({
        status: "success",
        message: "Service loaded successfully",
        data: results[0]
      });
    } else {
      res.json({
        status: "error",
        message: "Service not found",
        data: null
      });
    }
  });
}

const getAllServices = (req, res) => {
  pool.query("SELECT * FROM `services`", (err, results, fields) => {
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