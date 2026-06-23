const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../db/database");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { firstName, lastName, username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.run(
      `
      INSERT INTO users
      (first_name, last_name, username, password)
      VALUES (?, ?, ?, ?)
      `,
      [firstName, lastName, username, hashedPassword],
      function (err) {
        if (err) {
          return res.status(400).json({
            error: err.message
          });
        }

        res.status(201).json({
          message: "User created successfully",
          userId: this.lastID
        });
      }
    );
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

//login user story
const jwt = require("jsonwebtoken");

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.get(
    `
    SELECT * FROM users
    WHERE username = ?
    `,
    [username],
    async (err, user) => {
      if (err) {
        return res.status(500).json({
          error: err.message
        });
      }

      if (!user) {
        return res.status(401).json({
          error: "Invalid username or password"
        });
      }

      const passwordMatch = await bcrypt.compare(
        password,
        user.password
      );

      if (!passwordMatch) {
        return res.status(401).json({
          error: "Invalid username or password"
        });
      }

      const token = jwt.sign(
        {
          userId: user.id,
          username: user.username
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h"
        }
      );

      res.json({
        token,
        userId: user.id,
        username: user.username
      });
    }
  );
});

module.exports = router;