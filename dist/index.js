"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:5173",
        "https://groco-nu.vercel.app",
        "http://localhost:5174",
        "https://groco.tech10x.online",
    ],
    credentials: true,
}));
app.get("/", (req, res) => {
    res.status(200).json("Hello from server!");
});
app.use("/api/v1", routes_1.default);
app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
});
