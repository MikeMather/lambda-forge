"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
require("reflect-metadata");
const tsyringe_async_1 = require("@launchtray/tsyringe-async");
// export function Service(target: any) {
//   return injectable()(target)
// }
function Service({ singleton = false } = {}) {
    return function (target) {
        return singleton ? (0, tsyringe_async_1.singleton)()(target) : (0, tsyringe_async_1.injectable)()(target);
    };
}
exports.Service = Service;
