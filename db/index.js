const mysql = require("mysql2");
const mysqlAsync = require("mysql2/promise");

const connection = mysql.createConnection({
  host: "192.168.64.3",
  user: "test",
  password: "",
  database: "car_service"
});

connectionAsync = async () => {
  return await mysqlAsync.createConnection({
    host: "192.168.64.3",
    user: "test",
    password: "",
    database: "car_service"
  });
}

module.exports = {
  connection,
  connectionAsync
};