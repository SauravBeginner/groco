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
exports.login = exports.signup = void 0;
const groco_common_1 = require("@10xcoder/groco-common");
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const emailjs_1 = require("emailjs");
const prisma = new client_1.PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const serviceId = "service_jrbss9k";
const templateId = "template_em9kvx4";
const publicKey = "owJnnBZkaCUAA8XxL";
const client = new emailjs_1.SMTPClient({
    user: "techx100x@gmail.com",
    password: "Tech10x@712103",
    host: "smtp.gmail.com",
    // ssl: true,
});
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success } = groco_common_1.signupInput.safeParse(req.body);
    if (!success) {
        return res.status(400).json({ error: "Invalid request body!" });
    }
    const { name, email, password, role } = req.body;
    const salt = yield bcrypt_1.default.genSalt(10);
    const hashedPassword = yield bcrypt_1.default.hash(password, salt);
    const tokens = crypto.randomUUID();
    const verificationTokenExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now
    try {
        yield prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                // @ts-ignore
                verificationToken: tokens,
                verificationTokenExpiresAt,
                role,
            },
        });
        console.log(`User created!`);
        const verificationLink = `${process.env.PROD_SERVER_URL}/verify/${tokens}`;
        // const templateParams = {
        //   to_name: name,
        //   to_email: email,
        //   verificationLink: verificationLink,
        // };
        const message = {
            text: `Hello ${name},\n\nClick on the following link to verify your email:\n${verificationLink}\n\nIf you did not create an account, please ignore this email.`,
            from: '"Groco 👻" <no-reply@groco.email>',
            to: email,
            subject: `Verify your email ${verificationLink} ✔`,
        };
        client.send(message, (err, message) => {
            if (err) {
                console.error("Failed to send email. Error:", err);
                return res.status(500).json({ error: "Internal server error!" });
            }
            console.log("Email sent successfully!", message);
            return res.status(201).json({
                message: "User registered, please check your email for verification link",
            });
        });
    }
    catch (e) {
        return res.status(500).json({ error: "Internal server error!" });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success } = groco_common_1.signinInput.safeParse(req.body);
    if (!success) {
        return res.status(400).json({ error: "Invalid request body!" });
    }
    const { email, password } = req.body;
    try {
        const user = yield prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: "User not found!" });
        }
        const isPasswordCorrect = yield bcrypt_1.default.compare(password, (user === null || user === void 0 ? void 0 : user.password) || "");
        if (!isPasswordCorrect) {
            return res.status(401).json({ error: "Invalid credentials!" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
            expiresIn: "1h",
        });
        res.cookie("token", token, { httpOnly: true });
        const { password: _ } = user, userDetails = __rest(user, ["password"]);
        return res.status(200).json({ user: userDetails, token });
        // return res.status(200).json({ token });
    }
    catch (error) {
        return res.status(500).json({ error: "Internal server error!" });
    }
});
exports.login = login;
