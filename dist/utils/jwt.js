"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client_URL = exports.base_URL = void 0;
exports.base_URL = process.env.PROD_SERVER_URL || "http://localhost:5000/api/v1";
exports.client_URL = process.env.CLIENT_URL || "http://localhost:5173";
