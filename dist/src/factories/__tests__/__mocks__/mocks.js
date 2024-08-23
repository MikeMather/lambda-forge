"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockLambda = exports.MockService = exports.MockDto = void 0;
const class_validator_1 = require("class-validator");
const httpResponse_1 = require("../../../utils/httpResponse");
const decorators_1 = require("../../../decorators");
class MockDto {
}
exports.MockDto = MockDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MockDto.prototype, "name", void 0);
let MockService = class MockService {
    constructor() {
        this.hasRun = false;
    }
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            return 'created';
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.hasRun = true;
            // throw new Error("test")
            return Promise.resolve();
        });
    }
};
exports.MockService = MockService;
__decorate([
    (0, decorators_1.OnExecutionStart)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MockService.prototype, "init", null);
exports.MockService = MockService = __decorate([
    (0, decorators_1.Service)()
], MockService);
let MockLambda = class MockLambda {
    constructor(database) {
        this.database = database;
    }
    main() {
        return __awaiter(this, void 0, void 0, function* () {
            return httpResponse_1.HttpResponse.ok();
        });
    }
};
exports.MockLambda = MockLambda;
exports.MockLambda = MockLambda = __decorate([
    (0, decorators_1.Lambda)(),
    __param(0, (0, decorators_1.Inject)(MockService)),
    __metadata("design:paramtypes", [MockService])
], MockLambda);
