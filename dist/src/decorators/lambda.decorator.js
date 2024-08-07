"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lambda = void 0;
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
function Lambda(target) {
    return (0, tsyringe_1.injectable)()(target);
}
exports.Lambda = Lambda;
