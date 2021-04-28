const { pool } = require("../db");
const { sendMail } = require("../utils/mail-sender");

const getStatistics = async (req, res) => {
  let service_count = 0;
  let garage_count = 0;
  let user_count = 0;
  let booking_count = 0;

  const poolPromise = pool.promise();

  const [serviceRows, serviceFields] = await poolPromise.query("SELECT COUNT(*) as 'service_count' FROM `services`");
  service_count = typeof serviceRows[0].service_count !== "undefined" ? serviceRows[0].service_count : 0;

  const [garageRows, garageFields] = await poolPromise.query("SELECT COUNT(*) as 'garage_count' FROM `garages`");
  garage_count = typeof garageRows[0].garage_count !== "undefined" ? garageRows[0].garage_count : 0;

  const [userRows, userFields] = await poolPromise.query("SELECT COUNT(*) as 'user_count' FROM `users`");
  user_count = typeof userRows[0].user_count !== "undefined" ? userRows[0].user_count : 0;

  const [bookingRows, bookingFields] = await poolPromise.query("SELECT COUNT(*) as 'booking_count' FROM `bookings`");
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

const getRegions = async (req, res) => {
  pool.query("SELECT * FROM `regions`", (err, results, fields) => {
    if (err) {
      res.json({
        status: "error",
        message: "Cannot fetch regions",
        data: null
      });
    }

    res.json({
      status: "success",
      message: "Regions fetched successfully",
      data: results
    });
  })
}

const getWillayats = async (req, res) => {
  const { id } = req.params;

  if (typeof id !== "undefined" && id !== null) {
    pool.query("SELECT w.*, r.name as 'region_name' FROM `willayats` w LEFT JOIN `regions` r ON r.id = w.region_id WHERE region_id = ?", [id], (err, results, fields) => {
      if (err) {
        res.json({
          status: "error",
          message: "Unknown region",
          data: null
        });
      }

      res.json({
        status: "success",
        message: "Willayats fetched successfully",
        data: results
      });
    });
  } else {
    res.json({
      status: "error",
      message: "Unknown region",
      data: null
    });
  }
}

const sendEmailNotification = (req, res) => {
  if (!req.body) {
    res.json({
      status: "error",
      message: "Data sent not complete",
      data: null
    });
  }

  const { email, subject, message } = req.body;
  sendMail(email, subject, message);

  res.json({
    status: "success",
    message: "Email sent successfully",
    data: true
  });
}

module.exports = {
  getStatistics,
  getRegions,
  getWillayats,
  sendEmailNotification
}