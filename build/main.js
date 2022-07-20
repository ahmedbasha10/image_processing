"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const imagesRoute_1 = __importDefault(require("./routes/imagesRoute"));
const api_1 = __importDefault(require("./routes/api"));
const app = (0, express_1.default)();
app.use('/api', api_1.default);
app.use('/api/images', imagesRoute_1.default);
app.listen(8000, () => {
    console.log('server is running on port 8000');
});
exports.default = app;
