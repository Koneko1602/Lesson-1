"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videosInputDtoValidation = void 0;
const videosInputDtoValidation = (data) => {
    const errors = [];
    if (!data.title ||
        typeof data.title !== 'string' ||
        data.title.trim().length < 2 ||
        data.title.trim().length > 20) {
        errors.push({ field: 'title', message: 'Invalid title' });
    }
    if (!data.author ||
        typeof data.author !== 'string' ||
        data.author.trim().length < 2 ||
        data.author.trim().length > 20) {
        errors.push({ field: 'author', message: 'Invalid author' });
    }
    const allowedResolutions = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"];
    if (!Array.isArray(data.availableResolutions)) {
        errors.push({
            field: 'availableResolutions',
            message: 'availableResolutions must be an array',
        });
    }
    else if (data.availableResolutions.length === 0) {
        errors.push({
            field: 'availableResolutions',
            message: 'availableResolutions cannot be empty',
        });
    }
    else {
        // Проверка, что все элементы — строки и входят в допустимый список
        const invalidValues = data.availableResolutions.filter((res) => typeof res !== 'string' || !allowedResolutions.includes(res));
        if (invalidValues.length > 0) {
            errors.push({
                field: 'availableResolutions',
                message: `Invalid values in availableResolutions: ${invalidValues.join(', ')}`,
            });
        }
    }
    if ('canBeDownloaded' in data && typeof data.canBeDownloaded !== 'boolean') {
        errors.push({
            field: 'canBeDownloaded',
            message: 'canBeDownloaded must be a boolean value'
        });
    }
    if (data.minAgeRestriction !== undefined &&
        (typeof data.minAgeRestriction !== 'number' ||
            !Number.isInteger(data.minAgeRestriction) ||
            data.minAgeRestriction < 1 ||
            data.minAgeRestriction > 18)) {
        errors.push({
            field: 'minAgeRestriction',
            message: 'Invalid minAgeRestriction'
        });
    }
    if (data.publicationDate !== undefined // если поле есть
    ) {
        if (typeof data.publicationDate !== 'string' ||
            isNaN(Date.parse(data.publicationDate))) {
            errors.push({ field: 'publicationDate', message: 'Invalid publicationDate' });
        }
    }
    return errors;
};
exports.videosInputDtoValidation = videosInputDtoValidation;
