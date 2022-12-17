

// Require Express
const express = require("express");

const router = express.Router();

const Car = require("../models/carsModel");

// GET Route
router.get("/", async (req, res) => {
    console.log("GET");

    try {
        let cars = await Car.find();
        // Representation for the collection
        let carsCollection = {
            items: cars,
            _links: {
                self: {
                    href: `${process.env.BASE_URI}cars/`
                },
                collection: {
                    href: `${process.env.BASE_URI}cars/`
                }
            },
            pagination: {
                temp: "Doen we een andere keer, maar er moet iets in staan."
            }
        }

        res.json(carsCollection);
    } catch {
        res.status(500).send();
    }
})

// Create Route for detail
router.get("/:id", async (req, res) => {
    console.log("GET");

    try {
        let car = await Car.find(this._id);

        res.json(car);
    } catch {
        res.status(500).send();
    }

    // res.send(`request for car ${req.params.id}`);
})

// Middleware to disallow empty values
router.post("/", (req, res, next) => {
    console.log("POST middleware to check empty values")

    if (req.body.model && req.body.brand && req.body.options) {
        next();
    } else {
        res.status(400).send();
    }
})

// Middleware checken content-type
router.post("/", (req, res, next) => {

    if (req.header("Content-Type") === "application/json") {
        next();
    } else {
        res.status(415).send();
    }
})

// POST Route
router.post("/", async (req, res) => {
    let car = Car({
        model: req.body.model,
        brand: req.body.brand,
        options: req.body.options,
    })

    try {
        await car.save();

        res.status(201).send();
    } catch {
        res.status(500).send();
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

    res.setHeader("Allow", "GET, POST, OPTIONS")
    res.send();
})

module.exports = router;