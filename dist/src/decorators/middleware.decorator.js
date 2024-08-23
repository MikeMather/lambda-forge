"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Middleware = void 0;
require("reflect-metadata");
const tsyringe_async_1 = require("@launchtray/tsyringe-async");
function Middleware(target) {
    return (0, tsyringe_async_1.injectable)()(target);
}
exports.Middleware = Middleware;
