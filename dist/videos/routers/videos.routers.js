"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videosRouter = void 0;
const express_1 = require("express");
const http_statuses_1 = require("../../core/http-statuses");
const in_memory_db_1 = require("../../db/in-memory.db");
exports.videosRouter = (0, express_1.Router)({});
exports.videosRouter
    .get("/", (req, res) => {
    res.status(200).send("hello world!!!");
})
    /**
     * @swagger
     * /videos:
     *   get:
     *     summary: Получить список видео
     *     responses:
     *       200:
     *         description: Успешный ответ
     */
    .get('', (req, res) => {
    res.status(200).send(in_memory_db_1.db.videos);
})
    .get("/videos/:id", (req, res) => {
    const videos = in_memory_db_1.db.videos.find((d) => d.id === +req.params.id);
    if (!videos) {
        res.sendStatus(404);
        return;
    }
    res.status(200).send(videos);
})
    .post("/videos", (req, res) => {
    //1) проверяем приходящие данные на валидность
    const date = Date.parse(req.body.canBeDownloaded);
    if (isNaN(date)) {
        res.sendStatus(400);
    }
    //2) создаем newVideo
    const newVideo = {
        id: in_memory_db_1.db.videos.length ? in_memory_db_1.db.videos[in_memory_db_1.db.videos.length - 1].id + 1 : 1,
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: req.body.canBeDownloaded,
        minAgeRestriction: req.body.minAgeRestriction,
        createdAt: req.body.createdAt,
        publicationDate: req.body.publicationDate,
        availableResolutions: req.body.availableResolutions,
    };
    //3) добавляем newVideo в БД
    in_memory_db_1.db.videos.push(newVideo);
    res.status(http_statuses_1.HttpStatus.Created).send(newVideo);
    res.status(201).send(newVideo);
})
    .get("/testing", (req, res) => {
    res.status(200).send("testing url");
})
    .delete("/testing/all-data", (req, res) => {
    in_memory_db_1.db.videos = [];
    res.sendStatus(http_statuses_1.HttpStatus.NoContent);
});
