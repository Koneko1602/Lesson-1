import express, {Express, Request, Response} from "express";
import {db} from "./db/in-memory.db";
import {HttpStatus} from "./core/http-statuses";
import {videos} from "./videos/types/videos";
import {videosInputDtoValidation} from "./videos/validation/videosInputDtoValidation";
import {ValidationError} from "./videos/dto/validationError";
import {createErrorsMessages} from "./core/utils/error.utils";
import {VideosInputDto} from "./videos/dto/videos.input-dto";


export const setupApp = (app: Express) => {
    app.use(express.json());

    app.get("/", (req: Request, res: Response) => {
        res.status(200).send("hello world!!!");
    });

    app.get("/videos", (req: Request, res: Response) => {
        res.status(200).send(db.videos);
    });
    app.post('/videos', (req: Request, res: Response) => {
        const errors = videosInputDtoValidation(req.body);

        if (errors.length > 0) {
            res.status(400).send(createErrorsMessages(errors));
            return;
        }
        const newVideo: videos = {
            id: db.videos.length ? db.videos [db.videos.length - 1].id + 1 : 1,
            title: req.body.title,
            author: req.body.author,
            canBeDownloaded: req.body.canBeDownloaded ?? false,
            minAgeRestriction: null,
            createdAt: new Date().toISOString(),
            publicationDate: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
            availableResolutions: req.body.availableResolutions,
        };
        db.videos.push(newVideo);
        res.status(HttpStatus.Created).send(newVideo);

    });
    app.get('/videos/:id', (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        console.log('id  = ', id)
        console.log(db.videos)
        const video = db.videos.find((d) => d.id === id);
        if (!video) {
            res
                .status(404)
                .send(
                    createErrorsMessages([{field: 'id', message: 'Video not found'}]),
                );
            return;
        }
        res.status(200).send(video);
    });

    app.get('/testing', (req: Request, res: Response) => {
        res.status(200).send('testing url');
    });

    app.put('/videos/:id', (req: Request<{ id: string }, {}, VideosInputDto>, res: Response): void => {
        // Валидация
        const errors = videosInputDtoValidation(req.body);
        if (errors.length > 0) {
            res.status(400).send({errorsMessages: errors});
            return;
        }

        // Получаем ID
        const id = parseInt(req.params.id);
        const video = db.videos.find(v => v.id === id);
        if (!video) {
            res.status(HttpStatus.NotFound).send({
                errorsMessages: [{field: 'id', message: 'Video not found'}]
            });
            return;
        }
        // Обновляем поля
        const {
            title,
            author,
            availableResolutions,
            canBeDownloaded,
            minAgeRestriction,
            publicationDate,
        } = req.body;

        video.title = title;
        video.author = author;
        video.availableResolutions = availableResolutions;
        video.canBeDownloaded = canBeDownloaded;
        video.minAgeRestriction = minAgeRestriction;
        video.publicationDate = publicationDate;

        res.status(204).send();
    });
    app.delete('/videos/:id', (req: Request, res: Response) => {
        const id = parseInt(req.params.id);

        const index = db.videos.findIndex(video => video.id === id);

        if (index !== -1) {
            db.videos.splice(index, 1); // Удаляет элемент из массива
            res.status(204).send();
        } else {
            res.status(404).send();
        }
    });
    app.delete("/testing/all-data", (req: Request, res: Response) => {
        db.videos = [];
        res.sendStatus(204);

    });
    return app;
}
