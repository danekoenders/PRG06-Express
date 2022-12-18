

// Require Express
const express = require("express");

const router = express.Router();

const Car = require("../models/carsModel");

// GET Route
router.get("/", async (req, res) => {
    console.log("GET");

    if(req.header('Accept') != "application/json"){
        res.status(415).send();
    }

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
        
        res.setHeader("Access-Control-Allow-Origin", '*');
        res.setHeader("Access-Control-Allow-Headers", 'example-request');
        res.setHeader("Access-Control-Allow-Method", 'GET, POST, OPTIONS');
        res.json(carsCollection);
    } catch {
        res.status(500).send();
    }
})

// Create Route for detail
router.get("/:_id", async (req, res) => {

    try {
        let car = await Car.findById(req.params._id)
        if (car == null) {
            res.status(404).send();
        } else {

            res.setHeader("Access-Control-Allow-Origin", '*');
            res.setHeader("Access-Control-Allow-Headers", 'example-request');
            res.setHeader("Access-Control-Allow-Method", 'GET, PUT, DELETE, OPTIONS');
            res.json(car)
        }

    } catch {
        res.status(415).send();
    }
})

// Middleware checken content-type
router.post("/", (req, res, next) => {

    if (req.header("Content-Type") != "application/json" && req.header("Content-Type") != "application/x-www-form-urlencoded") {
        res.status(400).send();
    } else {
        next();
    }
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

// Middleware checking headers PUT
router.put("/:_id", (req, res, next) => {
    console.log("Middleware to check content type")

    if (req.header("Content-Type") != "application/json" && req.header("Content-Type") != "application/x-www-form-urlencoded"){
        
        res.status(400).send();
    } else {
        next();
    }
})

// Middleware checking empty values PUT
router.put("/:_id", (req, res, next) => {
    console.log("Middleware to check for empty values")

    if (req.body.model && req.body.brand && req.body.options) {

        next();
    } else {
        res.status(400).send();
    }
})

// PUT Route
router.put("/:_id", async (req, res) => {

    let car = await Car.findOneAndUpdate(req.params,
        {
            title: req.body.model,
            ingredients: req.body.brand,
            sauce: req.body.options
        })

    try {
        car.save();

        res.status(200).send();
    } catch {
        res.status(500).send();
    }
})

// DELETE Route
router.delete("/:_id", async (req, res) => {
    console.log("DELETE");

    try {
        await Car.findByIdAndDelete(req.params._id);

        res.status(204).send();

    } catch {
        res.status(404).send();
    }
})

// OPTIONS Route
router.options("/", (req, res) => {
    console.log("OPTIONS");

    res.setHeader("Allow", "GET, POST, OPTIONS");
    res.send();
})

// OPTIONS Route for details
router.options("/:id", async (req, res) => {
    console.log("OPTIONS (Details)");
    
    res.setHeader('Allow', 'GET, PUT, DELETE, OPTIONS')
    res.send()
})

module.exports = router;