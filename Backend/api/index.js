const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// MongoDB Connection
const DB = process.env.MONGODB_URI || 'mongodb+srv://dbUser:dbUserPassword@cluster0.dr27b.mongodb.net/expense';

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

// Serve Static Files
app.use(express.static(path.join(__dirname, "../Frontend")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend", "index.html"));
});

const User = require("./model/registration.model.js");

// API Route for Registration
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
