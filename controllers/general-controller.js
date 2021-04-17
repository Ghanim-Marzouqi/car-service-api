const mysql = require("mysql2/promise");
const bluebird = require('bluebird');

const getStatistics = async (req, res) => {
  let service_count = 0;
  let garage_count = 0;
  let user_count = 0;
  let booking_count = 0;

  const connection = await mysql.createConnection({
    host: "192.168.64.3",
    user: "test",
    password: "",
    database: "car_service",
    Promise: bluebird
  });

  const [serviceRows, serviceFields] = await connection.execute("SELECT COUNT(*) as 'service_count' FROM `services`");
  service_count = typeof serviceRows[0].service_count !== "undefined" ? serviceRows[0].service_count : 0;

  const [garageRows, garageFields] = await connection.execute("SELECT COUNT(*) as 'garage_count' FROM `garages`");
  garage_count = typeof garageRows[0].garage_count !== "undefined" ? garageRows[0].garage_count : 0;

  const [userRows, userFields] = await connection.execute("SELECT COUNT(*) as 'user_count' FROM `users`");
  user_count = typeof userRows[0].user_count !== "undefined" ? userRows[0].user_count : 0;

  const [bookingRows, bookingFields] = await connection.execute("SELECT COUNT(*) as 'booking_count' FROM `bookings`");
  booking_count = typeof bookingRows[0].booking_count !== "undefined" ? bookingRows[0].booking_count : 0;

  res.json({
    status: "success",
    message: "Statistics fetched successfully",
    data: {
      service_count,
      garage_count,
      user_count,
      booking_count
    }
  });
}

module.exports = {
  getStatistics
}