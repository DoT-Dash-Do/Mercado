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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAddress = exports.displaySingleAddress = exports.displayAllAddressesOfUser = exports.deleteAddress = exports.saveAddress = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const address_1 = __importDefault(require("../models/address"));
const error_1 = require("../utils/error");
dotenv_1.default.config();
const saveAddress = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, houseNo, street, pincode, city, state } = req.body;
    try {
        const user = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "haklabaBuptis", (err, result) => {
            if (err)
                return next((0, error_1.errorHandler)(403, "forbidden"));
            return result.id;
        });
        if (user === undefined) {
            return next((0, error_1.errorHandler)(501, "Unauthorized access"));
        }
        const newAddress = new address_1.default({
            user,
            houseNo,
            street,
            pincode,
            city,
            state,
        });
        const saved = yield newAddress.save();
        res.status(201).json({
            success: true,
            saved,
            message: "New Address Created",
        });
    }
    catch (err) {
        return next((0, error_1.errorHandler)(501, "Seller already exists"));
    }
});
exports.saveAddress = saveAddress;
const deleteAddress = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, deletionId } = req.body;
    try {
        const user = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "haklabaBuptis");
        if (user === undefined) {
            return next((0, error_1.errorHandler)(501, "Unauthorized access"));
        }
        yield address_1.default.findByIdAndDelete({ _id: deletionId });
        return res
            .status(201)
            .json({ status: "ok", message: "Successfully deleted" });
    }
    catch (err) {
        return next((0, error_1.errorHandler)(501, "Could not find the address to delete"));
    }
});
exports.deleteAddress = deleteAddress;
const displayAllAddressesOfUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.body;
    try {
        const user = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "haklabaBuptis", (err, data) => {
            if (err) {
                return undefined;
            }
            else {
                return data.id;
            }
        });
        if (user === undefined) {
            return next((0, error_1.errorHandler)(501, "Unauthorized access"));
        }
        const addresses = yield address_1.default.find({ user });
        return res.status(201).json({ addresses });
    }
    catch (err) {
        return next((0, error_1.errorHandler)(501, "Unauthorized access"));
    }
});
exports.displayAllAddressesOfUser = displayAllAddressesOfUser;
const displaySingleAddress = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, addressId } = req.body;
    try {
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "haklabaBuptis");
        const address = yield address_1.default.findById({ _id: addressId });
        return res.status(201).json({ address });
    }
    catch (err) {
        return next((0, error_1.errorHandler)(501, "Unauthorized access"));
    }
});
exports.displaySingleAddress = displaySingleAddress;
const updateAddress = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, addressId, updatedField } = req.body;
    try {
        const fieldToUpdate = req.params.id;
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "haklabaBuptis", (err, result) => {
            if (err)
                return undefined;
            return result.id;
        });
        if (decoded === undefined) {
            return next((0, error_1.errorHandler)(501, "Unauthorized access"));
        }
        if (updatedField === "") {
            return next((0, error_1.errorHandler)(404, "the field cannot be empty"));
        }
        if (addressId === "") {
            return next((0, error_1.errorHandler)(404, "Address to update was not provided"));
        }
        yield address_1.default.findByIdAndUpdate({ _id: addressId }, { [fieldToUpdate]: updatedField }, { new: true });
        return res.status(201).json({
            success: true,
            message: "Updated the address successfully",
        });
    }
    catch (err) {
        return next((0, error_1.errorHandler)(501, "Unauthorized access"));
    }
});
exports.updateAddress = updateAddress;
