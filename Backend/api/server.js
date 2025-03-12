const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

const port = process.env.PORT || 3000;
const DB = 'mongodb+srv://dbUser:dbUserPassword@cluster0.dr27b.mongodb.net/expense';

async function connectToDatabase() {
    try {
        await mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Successfully connected to Database");
    } catch (err) {
        console.error("Connection failed", err);
    }
}

connectToDatabase();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, "../Frontend")));

// Creating our Home Page Route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend", "index.html"));
});

const User = require("./model/registration.model.js");

app.post("/api/register", async (req, res) => {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });

    try {
        await newUser.save();
        res.sendFile(path.join(__dirname, "../Frontend", "Successful.html"));
    } catch (err) {
        res.status(500).send({ message: "Something went wrong" });
    }
});

module.exports = app;
