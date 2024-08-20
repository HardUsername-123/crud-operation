// app.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import cors
const db = require("./server"); // Import the database connection

const app = express();

// Use cors middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define a simple route to test the connection
//display  data
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (error, results) => {
    if (error) {
      console.error("An error occurred while executing the query:", error);
      res.status(500).send("Internal Server Error");
    } else {
      res.json(results); // Make sure to send JSON response
    }
  });
});

//create user
app.post("/users", (req, res) => {
  const { name, email } = req.body;
  const query = "INSERT INTO users (name, email) VALUES (?, ?)";
  db.query(query, [name, email], (error, results) => {
    if (error) {
      console.error("An error occurred while inserting new user:", error);
      res.status(500).send("Failed to add new user");
    } else {
      res.status(201).send("User added successfully");
    }
  });
});

// Update user
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const query = "UPDATE users SET name = ?, email = ? WHERE id = ?";
  const values = [name, email, id];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("An error occurred while updating user:", err);
      res.status(500).send("Failed to update user");
    } else {
      res.status(200).send("User updated successfully");
    }
  });
});

// Delete user
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM users WHERE id = ?";
  const values = [id];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("An error occurred while deleting user:", err);
      res.status(500).send("Failed to delete user");
    } else {
      res.status(200).send("User deleted successfully");
    }
  });
});

// Set the port
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
