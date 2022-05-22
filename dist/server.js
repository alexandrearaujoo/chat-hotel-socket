"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("./http");
const dotenv_1 = require("dotenv");
require("./socket");
(0, dotenv_1.config)();
http_1.server.listen(process.env.PORT || 3333, () => {
    console.log("Server running");
});
