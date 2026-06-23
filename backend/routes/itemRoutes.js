const express = require("express");
const db = require("../db/database");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  (req, res) => {

    const {
      itemName,
      description,
      quantity
    } = req.body;

    const userId = req.user.userId;

    db.run(
      `
      INSERT INTO items
      (user_id, item_name, description, quantity)
      VALUES (?, ?, ?, ?)
      `,
      [
        userId,
        itemName,
        description,
        quantity
      ],
      function(err) {

        if (err) {
          return res.status(500).json({
            error: err.message
          });
        }

        res.status(201).json({
          message: "Item created",
          itemId: this.lastID
        });
      }
    );
  }
);

//get user's current inventory
router.get(
  "/my-items",
  authMiddleware,
  (req, res) => {

    const userId = req.user.userId;

    db.all(
      `
      SELECT *
      FROM items
      WHERE user_id = ?
      `,
      [userId],
      (err, rows) => {

        if (err) {
          return res.status(500).json({
            error: err.message
          });
        }

        res.json(rows);
      }
    );
  }
);

//view with no token (public browse)
router.get(
  "/",
  (req, res) => {

    db.all(
      `
      SELECT *
      FROM items
      `,
      [],
      (err, rows) => {

        if (err) {
          return res.status(500).json({
            error: err.message
          });
        }

        res.json(rows);
      }
    );
  }
);

//get single item
router.get("/:id", (req, res) => {

  db.get(
    `
    SELECT *
    FROM items
    WHERE id = ?
    `,
    [req.params.id],
    (err, row) => {

      if (err) {
        return res.status(500).json({
          error: err.message
        });
      }

      if (!row) {
        return res.status(404).json({
          error: "Item not found"
        });
      }

      res.json(row);
    }
  );
});

//update item
router.put(
  "/:id",
  authMiddleware,
  (req, res) => {

    const {
      itemName,
      description,
      quantity
    } = req.body;

    db.run(
      `
      UPDATE items
      SET
        item_name = ?,
        description = ?,
        quantity = ?
      WHERE id = ?
      `,
      [
        itemName,
        description,
        quantity,
        req.params.id
      ],
      function(err) {

        if (err) {
          return res.status(500).json({
            error: err.message
          });
        }

        res.json({
          message: "Item updated"
        });
      }
    );
  }
);

//delete item
router.delete(
  "/:id",
  authMiddleware,
  (req, res) => {

    db.run(
      `
      DELETE FROM items
      WHERE id = ?
      `,
      [req.params.id],
      function(err) {

        if (err) {
          return res.status(500).json({
            error: err.message
          });
        }

        res.json({
          message: "Item deleted"
        });
      }
    );
  }
);

module.exports = router;