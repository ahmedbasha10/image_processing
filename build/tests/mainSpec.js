"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const main_1 = __importDefault(require("../main"));
const imageProcess_1 = __importDefault(require("../utilities/imageProcess"));
const fileManagement_1 = require("../utilities/fileManagement");
const req = (0, supertest_1.default)(main_1.default);
describe('test image processing end point response', () => {
    // test if we can access api end point
    it('access end point', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield req.get('/api');
        expect(res.status).toBe(200);
    }));
    it('access end point', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield req.get('/api/images');
        expect(res.status).toBe(200);
    }));
});
describe('test image transformation', () => {
    // test if we can transform image exists at our server
    it('Expect to process image without error', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, imageProcess_1.default)('././images/fjord.jpg', 200, 200, 'fjord');
        expect(result).toBeTrue();
    }));
    it('Expect to throw error when file is not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        // should be false if tried to access non exist image
        const result = yield (0, imageProcess_1.default)('././images/Egypt.jpg', 300, 300, 'Egypt');
        expect(result).toBeFalse();
    }));
});
describe('test cach file methods', () => {
    it('Expect to store image name at cach file successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        // check if we can store image name at cach file successfully
        const result = yield (0, fileManagement_1.storeImages)('fjord200200');
        expect(result).toBeTrue();
    }));
    it('Expect to read cach file successfully to check if the image exists at the cach', () => __awaiter(void 0, void 0, void 0, function* () {
        // return true if the image exist
        const result = yield (0, fileManagement_1.readImages)('./src/cachFile.txt', 'fjord200200');
        expect(result).toBeTrue();
    }));
});
