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
exports.readImages = exports.storeImages = void 0;
const fs_1 = require("fs");
const csvtojson_1 = __importDefault(require("csvtojson"));
const storeImages = (fileName) => __awaiter(void 0, void 0, void 0, function* () {
    // function to store image at cach file
    try {
        const imagesFile = yield fs_1.promises.open('./src/cachFile.txt', 'a+');
        yield imagesFile.write(fileName);
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
});
exports.storeImages = storeImages;
const readImages = (filePath, searchImage) => __awaiter(void 0, void 0, void 0, function* () {
    // read cach file to check if the image is processed before
    let found = false;
    yield (0, csvtojson_1.default)()
        .fromFile(filePath)
        .then((images) => {
        images.map((item) => {
            if (item.filename == searchImage) {
                found = true;
            }
        });
    });
    return found;
});
exports.readImages = readImages;
