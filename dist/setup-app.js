"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupApp = void 0;
const express_1 = __importDefault(require("express"));
const in_memory_db_1 = require("./db/in-memory.db");
const http_statuses_1 = require("./core/http-statuses");
const videosInputDtoValidation_1 = require("./videos/validation/videosInputDtoValidation");
const error_utils_1 = require("./core/utils/error.utils");
const setupApp = (app) => {
    app.use(express_1.default.json());
    app.get("/", (req, res) => {
        res.status(200).send("hello world!!!");
    });
    app.get("/videos", (req, res) => {
        res.status(200).send(in_memory_db_1.db.videos);
    });
    app.post('/videos', (req, res) => {
        var _a;
        const errors = (0, videosInputDtoValidation_1.videosInputDtoValidation)(req.body);
        if (errors.length > 0) {
            res.status(400).send((0, error_utils_1.createErrorsMessages)(errors));
            return;
        }
        const newVideo = {
            id: in_memory_db_1.db.videos.length ? in_memory_db_1.db.videos[in_memory_db_1.db.videos.length - 1].id + 1 : 1,
            title: req.body.title,
            author: req.body.author,
            canBeDownloaded: (_a = req.body.canBeDownloaded) !== null && _a !== void 0 ? _a : false,
            minAgeRestriction: null,
            createdAt: new Date().toISOString(),
            publicationDate: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
            availableResolutions: req.body.availableResolutions,
        };
        in_memory_db_1.db.videos.push(newVideo);
        res.status(http_statuses_1.HttpStatus.Created).send(newVideo);
    });
    app.get('/videos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        console.log('id  = ', id);
        console.log(in_memory_db_1.db.videos);
        const video = in_memory_db_1.db.videos.find((d) => d.id === id);
        if (!video) {
            res
                .status(404)
                .send((0, error_utils_1.createErrorsMessages)([{ field: 'id', message: 'Video not found' }]));
            return;
        }
        res.status(200).send(video);
    });
    app.get('/testing', (req, res) => {
        res.status(200).send('testing url');
    });
    app.put('/videos/:id', (req, res) => {
        // Валидация
        const errors = (0, videosInputDtoValidation_1.videosInputDtoValidation)(req.body);
        if (errors.length > 0) {
            res.status(400).send({ errorsMessages: errors });
            return;
        }
        // Получаем ID
        const id = parseInt(req.params.id);
        const video = in_memory_db_1.db.videos.find(v => v.id === id);
        if (!video) {
            res.status(http_statuses_1.HttpStatus.NotFound).send({
                errorsMessages: [{ field: 'id', message: 'Video not found' }]
            });
            return;
        }
        // Обновляем поля
        const { title, author, availableResolutions, canBeDownloaded, minAgeRestriction, publicationDate, } = req.body;
        video.title = title;
        video.author = author;
        video.availableResolutions = availableResolutions;
        video.canBeDownloaded = canBeDownloaded;
        video.minAgeRestriction = minAgeRestriction;
        video.publicationDate = publicationDate;
        res.status(204).send();
    });
    app.delete('/videos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const index = in_memory_db_1.db.videos.findIndex(video => video.id === id);
        if (index !== -1) {
            in_memory_db_1.db.videos.splice(index, 1); // Удаляет элемент из массива
            res.status(204).send();
        }
        else {
            res.status(404).send();
        }
    });
    app.delete("/testing/all-data", (req, res) => {
        in_memory_db_1.db.videos = [];
        res.sendStatus(204);
    });
    return app;
};
exports.setupApp = setupApp;
