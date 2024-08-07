"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inject = void 0;
const tsyringe_1 = require("tsyringe");
function Inject(target) {
    return (0, tsyringe_1.inject)(target);
}
exports.Inject = Inject;
