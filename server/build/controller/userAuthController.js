"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfilePic = exports.userValidity = exports.getUserData = exports.verifyEmail = exports.loginUser = exports.regUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const error_1 = require("../utils/error");
const htmlResponse_1 = require("../utils/htmlResponse");
const nodemailer_1 = require("../utils/nodemailer");
dotenv_1.default.config();
const regUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, username, email, password } = req.body;
    const hashedPassword = bcrypt_1.default.hashSync(password, 10);
    const newUser = new user_1.default({
        firstName,
        lastName,
        username,
        email,
        password: hashedPassword,
    });
    try {
        const hello = yield newUser.save();
        const verifyLink = hello.email + "*_*" + newUser._id;
        yield nodemailer_1.transporter.sendMail({
            from: "fakesteam26@gmail.com",
            to: newUser.email,
            subject: "verification mail",
            text: "",
            html: `<div style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
        <div style="max-width: 600px; margin: 20px auto; background-color: #fff; border-radius: 10px; padding: 20px;">
            <h2 style="text-align: center; color: #333;">Email Verification</h2>
            <p style="text-align: left; color: #333;">Dear User,</p>
            <p style="text-align: left; color: #333;">Welcome to our platform! To complete your registration, please click the link below to verify your email address:</p>
            <p style="text-align: center; margin-top: 30px;"><a href="https://mercado-bq2x.onrender.com/api/user/verify-email/${verifyLink}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Verify Email</a></p>
            <p style="text-align: left; color: #333;">If you didn't sign up for our platform, you can ignore this email.</p>
            <p style="text-align: left; color: #333;">Thanks,<br> Your Company Name</p>
        </div>
    </div>`,
        }, (error, info) => {
            if (error) {
                return next((0, error_1.errorHandler)(401, "Not able to send the verification mail"));
            }
        });
        return res.status(201).json({
            success: true,
            message: "user created successfully",
        });
    }
    catch (error) {
        return next((0, error_1.errorHandler)(500, "The mail or username entered already exists"));
    }
});
exports.regUser = regUser;
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const validU = yield user_1.default.findOne({ email: email });
        if (!validU)
            return next((0, error_1.errorHandler)(401, "wrong credentials"));
        const passCheck = bcrypt_1.default.compareSync(password, validU.password);
        if (!passCheck)
            return next((0, error_1.errorHandler)(401, "wrong credentials"));
        const token = jsonwebtoken_1.default.sign({ id: validU._id }, process.env.JWT_SECRET || "haklabaBuptis");
        const _a = validU.toObject(), { password: pass, cart } = _a, rest = __rest(_a, ["password", "cart"]);
        if (rest.emailVerified == false) {
            return next((0, error_1.errorHandler)(550, "Email has not been verified"));
        }
        return res.status(200).json({
            success: true,
            data: rest,
            token: token,
            type: "user",
        });
    }
    catch (error) {
        return next((0, error_1.errorHandler)(500, "internal server error"));
    }
});
exports.loginUser = loginUser;
const verifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chk = req.params.chk;
        const linkSplit = chk.split("*_*");
        yield user_1.default.findByIdAndUpdate(linkSplit[1], { emailVerified: true }, { new: true });
        res.status(200).send(htmlResponse_1.htmlResponse);
    }
    catch (error) {
        console.log(error);
    }
});
exports.verifyEmail = verifyEmail;
const getUserData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.body;
    if (token == undefined)
        return next((0, error_1.errorHandler)(401, "unAuthenticated"));
    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "haklabaBuptis", (err, result) => {
        if (err)
            return next((0, error_1.errorHandler)(403, "forbidden"));
        return result.id;
    });
    const user = yield user_1.default.findById(decoded);
    const { username, firstName, lastName, email, emailVerified, profilePic } = user;
    return res.json({
        userData: {
            username,
            firstName,
            lastName,
            email,
            emailVerified,
            profilePic,
        },
    });
});
exports.getUserData = getUserData;
const userValidity = (req, res, next) => {
    const { token } = req.body;
    try {
        if (token == undefined)
            return next((0, error_1.errorHandler)(401, "unAuthenticated"));
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "haklabaBuptis");
        res.status(200).json({ tokenStatus: true });
    }
    catch (err) {
        next((0, error_1.errorHandler)(401, "unAuthenticated"));
    }
};
exports.userValidity = userValidity;
const getUserProfilePic = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.body;
    try {
        const user = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "haklabaBuptis", (err, result) => {
            if (err)
                undefined;
            return result.id;
        });
        const { profilePic } = (yield user_1.default.findById({
            _id: user,
        }));
        return res.status(201).json({ profilePic });
    }
    catch (err) {
        return next((0, error_1.errorHandler)(501, "Unauthorized access"));
    }
});
exports.getUserProfilePic = getUserProfilePic;
