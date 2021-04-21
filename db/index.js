const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "192.168.64.3",
  user: "test",
  password: "",
  database: "car_service"
});

module.exports = {
  pool
};