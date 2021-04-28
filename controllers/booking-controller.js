const { connection, pool } = require("../db");
const mysql = require("mysql2/promise");
const bluebird = require('bluebird');

const createBooking = (req, res) => {
  if (!req.body) {
    res.json({
      status: "error",
      message: "Data sent not complete",
      data: null
    });
  }

  const { booking_date, user_id, service_id, garage_id } = req.body;

  pool.query("INSERT INTO `bookings` (booking_date, user_id, service_id, garage_id) VALUES (?, ?, ?, ?)", [booking_date, user_id, service_id, garage_id], (err, result, fields) => {
    if (err) {
      res.json({
        status: "error",
        message: "Cannot make booking",
        data: null
      });
    }

    if (result.affectedRows === 1) {
      res.json({
        status: "success",
        message: "Booking done successfully",
        data: {
          id: result.insertId,
          booking_date,
          user_id,
          service_id,
          garage_id
        }
      });
    } else {
      res.json({
        status: "success",
        message: "Booking cannot be done",
        data: null
      });
    }
  });
}

const updateBooking = (req, res) => {
  if (!req.params) {
    res.json({
      status: "error",
      message: "Data sent is complete",
      data: null
    });
  }

  const { id } = req.params;
  const { is_confirmed, is_paid } = req.body;

  pool.query("UPDATE `bookings` SET is_confirmed = ?, is_paid = ? WHERE id = ?", [is_confirmed, is_paid, id], (err, result, fields) => {
    if (err) {
      res.json({
        status: "error",
        message: "Cannot update booking",
        data: null
      });
    }

    if (result.affectedRows === 1) {
      res.json({
        status: "success",
        message: "Booking updated successfully",
        data: true
      });
    } else {
      res.json({
        status: "error",
        message: "Booking not found",
        data: false
      });
    }
  });
}

const deleteBooking = (req, res) => {

}

const getBookingById = (req, res) => {

}

const getAllBookings = async (req, res) => {
  let bookings = [];

  const poolPromise = pool.promise();

  const { garageIds } = req.body;

  if (typeof garageIds !== "undefined" && garageIds.length > 0) {
    for (let i = 0; i < garageIds.length; i++) {
      const [rows, fields] = await poolPromise.query("SELECT b.id, b.booking_date, b.is_confirmed, b.is_paid, u.name as 'customer_name', u.email as 'customer_email', s.name as 'service_name', g.name as 'garage_name' FROM `bookings` b LEFT JOIN `users` u ON u.id = b.user_id LEFT JOIN `services` s ON s.id = b.service_id LEFT JOIN `garages` g ON g.id = b.garage_id WHERE b.garage_id = ? ORDER BY b.booking_date", [garageIds[i]]);
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

const getAllBookingsByCustomerId = (req, res) => {
  if (!req.params) {
    res.json({
      status: "error",
      message: "Data sent not complete",
      data: null
    });
  }

  const { id } = req.params;

  pool.query("SELECT b.*, s.name as 'service_name', g.name as 'garage_name' FROM `bookings` b LEFT JOIN `services` s ON b.service_id = s.id LEFT JOIN `garages` g ON b.garage_id = g.id WHERE b.user_id = ?", [id], (err, result, fields) => {
    if (err) {
      res.json({
        status: "error",
        message: "Cannot get bookings",
        data: null
      });
    }

    res.json({
      status: "success",
      message: "Bookings fetched successfully",
      data: result
    });
  });
}

const updateBookingStatus = (req, res) => {
  if (!req.params) {
    res.json({
      status: "error",
      message: "Data sent not complete",
      data: null
    });
  }

  const { id } = req.params;

  pool.query("UPDATE `bookings` SET is_paid = 1 WHERE id = ?", [id], (err, result, fields) => {
    if (err) {
      res.json({
        status: "error",
        message: "Cannot make payment",
        data: null
      });
    }

    if (result.affectedRows === 1) {
      res.json({
        status: "success",
        message: "Payment done successfully",
        data: true
      });
    } else {
      res.json({
        status: "error",
        message: "Booking not found",
        data: false
      });
    }
  });
}

module.exports = {
  createBooking,
  updateBooking,
  deleteBooking,
  getBookingById,
  getAllBookings,
  getAllBookingsByCustomerId,
  updateBookingStatus
}
