const { connection } = require("../db");

const createUser = (req, res) => {

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
  const { name, email, phone, region_id, willayat_id } = req.body;

  connection.query("UPDATE `users` SET name = ?, email = ?, phone = ?, region_id = ?, willayat_id = ? WHERE id = ?",
    [name, email, phone, region_id, willayat_id, id],
    (err, results, fields) => {
      if (err) {
        res.json({
          status: "error",
          message: "Cannot update user",
          data: null
        });
      }

      if (results.length > 0) {
        res.json({
          status: "success",
          message: "User updated successfully",
          data: true
        });
      } else {
        res.json({
          status: "success",
          message: "User NOT updated",
          data: false
        });
      }
    });
}

const deleteUser = (req, res) => {

}

const getUserById = (req, res) => {

}

const getAllUsers = (req, res) => {
  connection.query("SELECT u.id, u.name, u.email, u.phone, u.username, u.user_type, u.region_id, u.willayat_id, r.name as 'region_name', w.name as 'willayat_name' FROM `users` u LEFT JOIN `regions` r ON r.id = u.region_id LEFT JOIN `willayats` w ON w.id = u.willayat_id", (err, results, fields) => {
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