// Node.js builtin module hai.
// Iska use values ko secure and random hashing use hota for cryptographic operation k liye
const crypto = require("crypto")

//Password ko hash krne krne aur password verify karne k liye, ye original database m save nahi hoga
const bcrypt = require("bcryptjs")

//JWT(Json Web Token) generate aur verify krne k liye..
const jwt = require("jsonwebtoken")

//Login k bad user ki identity verify krne k liye use karna
const User = require("../Models/User");

const sendEmail = require("../utils/sendEmail")