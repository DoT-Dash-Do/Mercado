"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const addressRoutes_1 = __importDefault(require("./routes/addressRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const paymentRoutes_1 = __importDefault(require("./routes/paymentRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const reviewRoutes_1 = __importDefault(require("./routes/reviewRoutes"));
const sellerRoutes_1 = __importDefault(require("./routes/sellerRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
dotenv_1.default.config();
mongoose_1.default
    .connect(process.env.DB_URI || "enterYourDBURI", { dbName: "MarketPlace" })
    .then(() => console.log("MongoDB connected new"))
    .catch((err) => console.error("MongoDB connection error:", err));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "*",
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.get("/",(req,res)=>{
    res.write("hello world")
})
app.use("/api/user", userRoutes_1.default);
app.use("/api/seller", sellerRoutes_1.default);
app.use("/api/product", productRoutes_1.default);
app.use("/api/address", addressRoutes_1.default);
app.use("/api/order", orderRoutes_1.default);
app.use("/api/payment", paymentRoutes_1.default);
app.use("/api/review", reviewRoutes_1.default);
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});
app.listen(3003, () => {
    console.log("server started");
});
