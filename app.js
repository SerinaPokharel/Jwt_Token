require("dotenv").config();// Importing dotenv to access environment variables
require("./config/database").connect(); // Connecting to the database
const express = require("express"); // Importing express
const bcrypt = require("bcryptjs"); // Importing bcryptjs
const jwt = require("jsonwebtoken"); // Importing jsonwebtoken


const User = require("./model/User"); // Importing the user model
const auth = require("./middleware/auth"); //  Importing the auth middleware


const app = express();// Creating the express app

app.use(express.json());// Using express.json middleware to parse json bodies

//Logic fo registration
app.post("/register", async (req, res) => {
    try{
        const { name, email, password } = req.body; // user input

        //validate the user input
        if(!(name && email && password)){
            res.status(400).send("All input is required");
        }

        encryptedPassword = await bcrypt.hash(password, 10); // encrypt password

        const user = await User.create({
            name,
            email: email.toLowerCase(),
            password: encryptedPassword,
        });

        const token = jwt.sign( // create token
            { user_id: user._id, email },
            process.env.TOKEN_KEY, // secret key
            {
                expiresIn: "2h",
            }
            );
    //save user token
    user.token = token;
    res.status(201).json(user);
    } catch (err){
    console.log(err);
    }

    });

//Logic for login
app.post("/login", async (req, res) => {
try{
    const { email, password } = req.body;

    if(!(email && password)){
        res.status(400).send("All input is required");
    }

    const user = await User.findOne({ email });

    if(user && (await bcrypt.compare(password, user.password))){
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
            );
            user.token = token;
            res.status(200).json(user);
    }
    res.status(400).send("Invalid Credentials");
} catch (err){
    console.log(err);
}
});
 app.get("/welcome", auth, (req, res) => {
        res.status(200).send("Welcome to the site. ");
 });

 app.use("*", (req, res) => {
        res.status(404).send("404 Not found");
 });
module.exports = app;