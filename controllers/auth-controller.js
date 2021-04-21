const { pool } = require("../db");

// POST: body(username, password)
const authenticateUser = (req, res) => {
  const body = req.body;

  if (!body) {
    res.json({
      status: "error",
      message: "Data sent is incomplete",
      data: null
    });
  }

  const { username, password } = req.body;

  pool
    .query("SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password],
      (err, results, fields) => {
        if (err) {
          res.json({
            status: "error",
            message: "Error occurred while authenticating user",
            data: null
          });
        }

        if (results.length > 0) {
          res.json({
            status: "success",
            message: "Login successful",
            data: results[0]
          });
        } else {
          res.json({
            status: "error",
            message: "Wrong username or password",
            data: null
          });
        }
      });
}

// POST: body(name, email, phone, username, password, userType, regionId, willayatId)
const createUser = (req, res) => {
  const body = req.body;

  if (!body) {
    res.json({
      status: "error",
      message: "Data sent is incomplete",
      data: null
    });
  }

  const { name, email, phone, username, password, userType, regionId, willayatId } = req.body;

  pool
    .query("INSERT INTO users (name, email, phone, username, password, user_type, region_id, willayat_id) VALUES (?,?,?,?,?,?,?,?)",
      [name, email, phone, username, password, userType, regionId, willayatId],
      (err, result, fields) => {
        if (err) {
          res.json({
            status: "error",
            message: "Cannot create user",
            data: null
          });
        }

        res.json({
          status: "success",
          message: "User created successfully",
          data: true
        });
      });
}

// PUT: params(id) - body(name, email, phone, username, userType, regionId, willayatId)
const updateUserProfile = (req, res) => {
  const body = req.body;

  if (!body) {
    res.json({
      status: "error",
      message: "Data sent is incomplete",
      data: null
    });
  }

  const { id } = req.params;
  const { name, email, phone, region_id, willayat_id } = req.body;

  pool
    .query("UPDATE users SET name = ?, email = ?, phone = ?, region_id = ?, willayat_id = ? WHERE id = ?",
      [name, email, phone, region_id, willayat_id, id],
      (err, result, fields) => {
        if (err) {
          res.json({
            status: "error",
            message: "Cannot update user",
            data: null
          });
        }

        res.json({
          status: "success",
          message: "User updated successfully",
          data: true
        });
      });
}

// GET: params(id)
const getUserProfile = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.json({
      status: "error",
      message: "Data sent is incomplete",
      data: null
    });
  }

  pool
    .query("SELECT * FROM users WHERE id = ?",
      [id],
      (err, results, fields) => {
        if (err) {
          res.json({
            status: "error",
            message: "Error occurred while fetching user info",
            data: null
          });
        }

        if (results.length > 0) {
          res.json({
            status: "success",
            message: "User info fetched successfully",
            data: results[0]
          });
        } else {
          res.json({
            status: "error",
            message: "User not found",
            data: null
          });
        }
      });
}

// PUT: params(id) - body(oldPassword, newPassword)
const changePassword = async (req, res) => {

  if (!req.body) {
    res.json({
      status: "error",
      message: "Data sent is incomplete",
      data: null
    });
  }

  const poolPromise = pool.promise();

  const { id } = req.params;
  const { oldPassword, newPassword } = req.body;

  const [userRows, userFields] = await poolPromise.query("SELECT * FROM users WHERE id = ?", [id]);

  const user = userRows[0];

  if (user.password === oldPassword) {
    const [rows, fields] = await poolPromise.query("UPDATE users SET password = ? WHERE id = ?", [newPassword, id]);

    if (rows.changedRows > 0) {
      res.json({
        status: "success",
        message: "Password updated successfully",
        data: true
      });
    } else {
      res.json({
        status: "error",
        message: "Password cannot be updated",
        data: false
      });
    }
  } else {
    res.json({
      status: "error",
      message: "Old password is incorrect",
      data: null
    });
  }
}

// GET: params(id)
const getUserGarages = (req, res) => {
  const { id } = req.params;

  pool
    .query("SELECT * FROM `garages` WHERE owner_id = ?",
      [id],
      (err, results, fields) => {
        if (err) {
          res.json({
            status: "error",
            message: "Cannot fetch user garage",
            data: null
          });
        }

        if (results.length > 0) {
          res.json({
            status: "success",
            message: "User garage fetched successfully",
            data: results
          });
        } else {
          res.json({
            status: "success",
            message: "Garage not found",
            data: null
          });
        }
      });
}

module.exports = {
  authenticateUser,
  createUser,
  updateUserProfile,
  getUserProfile,
  changePassword,
  getUserGarages
}