"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const imageProcess_1 = __importDefault(require("../utilities/imageProcess"));
const fileManagement_1 = require("../utilities/fileManagement");
const route = express_1.default.Router();
route.get('/', (req, res) => {
    try {
        const inputImage = `./images/${req.query.filename}.jpg`; // properities of the image
        const width = parseInt(req.query.width);
        const height = parseInt(req.query.height);
        const imageName = req.query.filename + width + height;
        if (isNaN(width) || isNaN(height)) {
            res.send('width or height are not a numbers, please enter valid value');
        }
        else {
            (0, fileManagement_1.readImages)(path_1.default.join(__dirname, '../', 'cachFile.txt'), imageName) // check if the image exists at cach file so we can load it
                .then((result) => {
                if (result) {
                    res.sendFile(path_1.default.join(__dirname, '../', `thump`, `${imageName}.webp`));
                }
                else {
                    // if image doesn't exist we have to process it and store it at cach
                    (0, imageProcess_1.default)(inputImage, width, height, imageName).then(() => {
                        (0, fileManagement_1.storeImages)(imageName + '\n');
                        res.sendFile(path_1.default.join(__dirname, '../', `thump`, `${imageName}.webp`));
                    });
                }
            });
        }
    }
    catch (err) {
        res.send(err);
    }
});
exports.default = route;
