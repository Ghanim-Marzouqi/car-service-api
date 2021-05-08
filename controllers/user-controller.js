const { pool } = require("../db");

const createUser = (req, res) => {
  if (!req.body) {
    res.json({
      status: "error",
      message: "Data sent are not complete",
      data: null
    });
  }

  const { name, email, phone, username, password, user_type, region_id, willayat_id } = req.body;

  pool.query("INSERT INTO `users` (name, email, phone, username, password, user_type, region_id, willayat_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [name, email, phone, username, password, user_type, region_id, willayat_id],
    (err, results, fields) => {
      if (err) {
        res.json({
          status: "error",
          message: "User already exists",
          data: null
        });
      }

      if (results && results.affectedRows === 1) {
        res.json({
          status: "success",
          message: "User created successfully",
          data: {
            id: results.insertId,
            name,
            email,
            phone,
            username,
            user_type,
            password,
            region_id,
            willayat_id
          }
        });
      } else {
        res.json({
          status: "error",
          message: "User not created",
          data: null
        });
      }
    });
}

const updateUser = (req, res) => {

  if (!req.body || !req.params) {
    res.json({
      status: "error",
      message: "Missing user data",
      data: null
    });
  }

  const { id } = req.params;
  const { name, email, phone, user_type, region_id, willayat_id } = req.body;

  pool.query("UPDATE `users` SET name = ?, email = ?, phone = ?, user_type = ?, region_id = ?, willayat_id = ? WHERE id = ?",
    [name, email, phone, user_type, region_id, willayat_id, id],
    (err, results, fields) => {
      if (err) {
        res.json({
          status: "error",
          message: "Cannot update user",
          data: null
        });
      }

      if (results.affectedRows === 1) {
        res.json({
          status: "success",
          message: "User updated successfully",
          data: true
        });
      } else {
        res.json({
          status: "error",
          message: "User NOT updated",
          data: false
        });
      }
    });
}

const deleteUser = (req, res) => {
  if (!req.params) {
    res.json({
      status: "error",
      message: "Data sent is not complete",
      data: null
    });
  }

  const { id } = req.params;

  pool.query("DELETE FROM `users` WHERE id = ?", [id], (err, result, fields) => {
    if (err) {
      res.json({
        status: "error",
        message: "Cannot delete user",
        data: null
      });
    }

    if (result.affectedRows === 1) {
      res.json({
        status: "success",
        message: "User deleted successfully",
        data: true
      });
    } else {
      es.json({
        status: "error",
        message: "User not found",
        data: false
      });
    }
  });
}

const getUserById = (req, res) => {
  if (!req.params) {
    res.json({
      status: "error",
      message: "Data sent is not complete",
      data: null
    });
  }

  const { id } = req.params;

  pool.query("SELECT * FROM `users` WHERE id = ?", [id], (err, result, fields) => {
    if (err) {
      res.json({
        status: "error",
        message: "Cannot get user",
        data: null
      });
    }

    res.json({
      status: "success",
      message: "User fetched successfully",
      data: result[0]
    });
  });
}

const getAllUsers = (req, res) => {
  pool.query("SELECT u.id, u.name, u.email, u.phone, u.username, u.user_type, u.region_id, u.willayat_id, r.name as 'region_name', w.name as 'willayat_name' FROM `users` u LEFT JOIN `regions` r ON r.id = u.region_id LEFT JOIN `willayats` w ON w.id = u.willayat_id", (err, results, fields) => {
    if (err) {
      res.json({
        status: "error",
        message: "Error occurred while fetching users",
        data: null
      });
    }

    res.json({
      status: "success",
      message: "Users fetched successfully",
      data: results
    });
  });
}

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  getAllUsers
}