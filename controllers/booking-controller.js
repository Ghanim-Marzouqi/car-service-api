const { connection } = require("../db");
const mysql = require("mysql2/promise");
const bluebird = require('bluebird');

const createBooking = (req, res) => {

}

const updateBooking = (req, res) => {

}

const deleteBooking = (req, res) => {

}

const getBookingById = (req, res) => {

}

const getAllBookings = async (req, res) => {
  let bookings = [];

  const connect = await mysql.createConnection({
    host: "192.168.64.3",
    user: "test",
    password: "",
    database: "car_service",
    Promise: bluebird
  });

  const { garageIds } = req.body;

  if (typeof garageIds !== "undefined" && garageIds.length > 0) {
    for (let i = 0; i < garageIds.length; i++) {
      const [rows, fields] = await connect.execute("SELECT b.id, b.booking_date, b.is_confirmed, b.is_paid, u.name as 'customer_name', s.name as 'service_name', g.name as 'garage_name' FROM `bookings` b LEFT JOIN `users` u ON u.id = b.user_id LEFT JOIN `services` s ON s.id = b.service_id LEFT JOIN `garages` g ON g.id = b.garage_id WHERE b.garage_id = ? ORDER BY b.booking_date", [garageIds[i]]);
      if (rows.length > 0) {
        bookings = [...bookings, ...rows];
      }
    }

    res.json({
      status: "success",
      message: "Booking fetched successfully",
      data: bookings
    })
  } else {
    res.json({
      status: "success",
      message: "No garages were sent",
      data: null
    });
  }
}

module.exports = {
  createBooking,
  updateBooking,
  deleteBooking,
  getBookingById,
  getAllBookings
}
