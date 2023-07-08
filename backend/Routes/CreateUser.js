const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

router.post("/createuser",
    [//express validator
        check('name').notEmpty().withMessage('Name is required'),
        check('email').isEmail().withMessage('Invalid email format'),
        check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
        check('location').notEmpty().withMessage('Location is required')
    ],
    async (req, res) => {
        //express validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //bcrypt added
        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt);
        try {
            //await is import
            await User.create({
                //order can be random
                // after creating create user, we need to connect to main application
                //changing from static to dynamic data, 
                name: req.body.name,
                //genrate hash and store
                password: secPassword,
                email: req.body.email,
                location: req.body.location

            })
            //this msg back when endpoint hit
            res.json({ success: true });
        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    })
//backend route for login page
//jwtkey in .env file.

const jwtKey = "mYNAMEiSnAKULpRAsADmAHATO#$";

router.post("/loginuser", [//express validator

    check('email').isEmail().withMessage('Invalid email format'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let email = req.body.email;
        try {
            //findOne return object if found email
            let userData = await User.findOne({ email });
            if (!userData) {
                return res.status(400).json({ errors: "Try Again!! Invalid user or password" })
            }
            //if password doesn't match
            //matches userdata ko hash me convert kar mongodb se match karta hai.
            const pwdCompare = await bcrypt.compare(req.body.password, userData.password)
            if (!pwdCompare) {
                return res.status(400).json({ errors: "Try Again!! Invalid user or password" })
            }

            //signing with jwt token...
            const data = {
                //signing at backend
                user: {
                    id: userData.id //saves id from db to id

                }
            }
            const authToken = jwt.sign(data, jwtKey);


            return res.json({ success: true, authToken: authToken })
        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    })

module.exports = router;