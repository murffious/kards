import jimp from 'jimp';

/**
 * Image helper class
 */
export default class Image {
    /**
     * Generate a square thumbnail
     *
     * @param {String} src_path  The path of the source image
     * @param {String} dest_path The path of the destination image
     * @returns                  A promise wrapping the image operations
     */
    static async generateThumbnail(src_buffer, thumb_size) {
        return new Promise((resolve, reject) => {
            jimp.read(src_buffer, (err, image) => {
                if (err) reject(err);

                image.cover(thumb_size, thumb_size)
                    .quality(60)
                    .getBuffer(jimp.AUTO, function (err, data) {
                        if (err) reject(err);

                        resolve(data);
                    });
            });
        });
    }
}