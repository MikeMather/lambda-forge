"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Middleware = void 0;
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
function Middleware(target) {
    return (0, tsyringe_1.injectable)()(target);
}
exports.Middleware = Middleware;
