// Cars Router

const express = require("express");

const router = express.Router();

const Car = require("../models/carsModel");

// Create Route
router.get("/", async (req, res) => {
    console.log("GET");

    try {
        let cars = await Car.find();
        res.json(cars);
    } catch {
        res.status(500).send()
    }
})

// Create Route for detail
router.get("/:id", (req, res) => {
    console.log("GET");
    res.send(`request for car ${req.params.id}`);
})

// POST Route
router.post("/", async (req, res) => {
    let car = new Car({
        model: "812 GTS",
        brand: "Ferrari",
        options: "Carbon Ceramic Brakes"
    })

    try {
        await car.save();

        res.json(car);
    } catch {
        res.status(500).send()
    }

    console.log("POST");
})

// DELETE Route
router.delete("/", (req, res) => {
    console.log("DELETE");
    res.send("Response Correct");
})

// OPTIONS Route
router.options("/", (req, res) => {
    console.log("OPTIONS");
    res.send("Response Correct");
})

module.exports = router;