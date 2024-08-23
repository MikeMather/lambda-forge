"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lambda = void 0;
require("reflect-metadata");
const tsyringe_async_1 = require("@launchtray/tsyringe-async");
function Lambda() {
    return (target) => (0, tsyringe_async_1.injectable)()(target);
}
exports.Lambda = Lambda;
