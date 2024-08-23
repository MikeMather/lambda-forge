"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inject = void 0;
const tsyringe_async_1 = require("@launchtray/tsyringe-async");
function Inject(token) {
    return (0, tsyringe_async_1.inject)(token);
}
exports.Inject = Inject;
