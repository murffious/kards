import fs   from 'fs';
import path from 'path';

/**
 * Image helper class
 */
export default class FileUpload {
    constructor(file_object) {
        if (!file_object) {
            throw new Error('An uploaded file needs to be defined.');
        }

        if (typeof file_object !== 'object') {
            throw new Error('An uploaded file needs to be an object.');
        }

        if (
            !file_object.hasOwnProperty('mimetype') ||
            !file_object.hasOwnProperty('originalname') ||
            !file_object.hasOwnProperty('size') ||
            !file_object.hasOwnProperty('buffer')
        ) {
            throw new Error('An uploaded file is missing some properties.');
        }

        if (!(Buffer.isBuffer(file_object.buffer))) {
            throw new Error('The uploaded file buffer is not a buffer.');
        }

        this.file_info = path.parse(file_object.originalname);
        this.file      = file_object;
    }

    requiresConversion() {
        return (this.getFileType() !== 'image');
    }

    getFileExtension() {
        return this.file_info.ext;
    }

    getFileType() {
        return this.file.mimetype.split('/')[0];
    }

    getFileSize(format = null) {
        return this.file.size;
    }

    getFileName() {
        return this.file_info.name;
    }

    getBuffer() {
        return this.file.buffer;
    }

}