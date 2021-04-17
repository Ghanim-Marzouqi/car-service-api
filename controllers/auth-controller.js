const { connection } = require("../db");

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

  connection
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

  connection
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
  const { name, email, phone, username, userType, regionId, willayatId } = req.body;

  connection
    .query("UPDATE users SET name = ? AND email = ? AND phone = ? AND username = ? AND user_type = ? AND region_id = ? AND willayat_id = ? WHERE id = ?",
      [name, email, phone, username, userType, regionId, willayatId, id],
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

  connection
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
const changePassword = (req, res) => {
  const body = req.body;

  if (!body) {
    res.json({
      status: "error",
      message: "Data sent is incomplete",
      data: null
    });
  }

  const { id } = req.params;
  const { oldPassword, newPassword } = req.body;

  connection
    .query("SELECT * FROM users WHERE id = ?",
      [id],
      (err, user, fields) => {
        if (err) {
          res.json({
            status: "error",
            message: "Cannot fetch user",
            data: null
          });
        }

        if (user.password === oldPassword) {
          connection
            .query("UPDATE users SET password = ? WHERE id = ?",
              [newPassword],
              (err, result, fields) => {
                if (err) {
                  res.json({
                    status: "error",
                    message: "Cannot update password",
                    data: null
                  });
                }

                res.json({
                  status: "success",
                  message: "Password updated successfully",
                  data: true
                });
              });
        } else {
          res.json({
            status: "error",
            message: "Old password is incorrect",
            data: null
          });
        }
      });
}

// GET: params(id)
const getUserGarages = (req, res) => {
  const { id } = req.params;

  connection
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