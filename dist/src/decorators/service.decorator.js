"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
function Service(target) {
    return (0, tsyringe_1.injectable)()(target);
}
exports.Service = Service;
