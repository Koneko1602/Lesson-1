"use strict";
// import {Request, Response, Router} from 'express';
// import {HttpStatus} from '../../core/http-statuses';
// import {db} from '../../db/in-memory.db';
// import {videos} from "../types/videos";
//
// export const videosRouter = Router({});
//
// videosRouter
//      // .get("", (req: Request, res: Response) => {
//      //     res.status(200).send("hello world");
//      // })
//     /**
//      * @swagger
//      * /videos:
//      *   get:
//      *     summary: Получить список видео
//      *     responses:
//      *       200:
//      *         description: Успешный ответ
//      */
//     .get('/', (req: Request, res: Response) => {
//         res.status(200).send(db.videos);
//     })
//     .get(
//         "/videos/:id",
//         (
//             req: Request<{ id: string }, videos, {}, {}>,
//             res: Response<videos | null>,
//         ) => {
//             const videos = db.videos.find((d) => d.id === +req.params.id);
//             if (!videos) {
//                 res.sendStatus(404);
//                 return;
//             }
//             res.status(200).send(videos);
//         },
//     )
//
//     .post("/v", (req: Request, res: Response) => {
//         //1) проверяем приходящие данные на валидность
//         const date = Date.parse(req.body.canBeDownloaded);
//         if (isNaN(date)) {
//             res.sendStatus(400)
//
//         }
//
//         //2) создаем newVideo
//         const newVideo: videos = {
//             id: db.videos.length ? db.videos[db.videos.length - 1].id + 1 : 1,
//             title: req.body.title,
//             author: req.body.author,
//             canBeDownloaded: req.body.canBeDownloaded,
//             minAgeRestriction: req.body.minAgeRestriction,
//             createdAt: new Date().toDateString(),
//             publicationDate: req.body.publicationDate,
//             availableResolutions: req.body.availableResolutions,
//
//         };
//
//
//         //3) добавляем newVideo в БД
//         db.videos.push(newVideo);
//         res.status(HttpStatus.Created).send(newVideo);
//         res.status(201).send(newVideo);
//     })
//
//
//     .get("/testing", (req: Request, res: Response) => {
//         res.status(200).send("testing url");
//     })
//
//     .delete("/testing/all-data", (req: Request, res: Response) => {
//         db.videos = [];
//         res.sendStatus(HttpStatus.NoContent);
//     });
