//Adapted from https://www.freecodecamp.org/news/how-to-upload-files-to-aws-s3-with-node/

import { Upload } from '@aws-sdk/lib-storage';
import { S3Client } from '@aws-sdk/client-s3';
import transform from 'stream';

const Transform = transform.Transform;

const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const region = process.env.S3_REGION;
const Bucket = process.env.S3_BUCKET;

const parsefile = async (req) => {
    return new Promise((resolve, reject) => {
        let options = {
            maxFileSize: 25 * 1024 * 1024, //25 MBs converted to bytes
            allowEmptyFiles: false
        }

        const form = formidable(options);
        
        form.parse(req, (err, fields, files) => {});

        form.on('error', error => {
            reject(error.message)
        })
        
        form.on('data', data => {
            if (data.name === "successUpload") {
                resolve(data.value);
            }
        })
        
        form.on('fileBegin', (formName, file) => {

            file.open = async function () {
                this._writeStream = new Transform({
                    transform(chunk, encoding, callback) {
                        callback(null, chunk)
                    }
                })

                this._writeStream.on('error', e => {
                    form.emit('error', e)
                });
                
                // upload to S3
                new Upload({
                    client: new S3Client({
                        credentials: {
                            accessKeyId,
                            secretAccessKey
                        },
                        region
                    }),
                    params: {
                        ACL: 'public-read',
                        Bucket,
                        Key: `${Date.now().toString()}-${this.originalFilename}`,
                        Body: this._writeStream
                    },
                    tags: [], // optional tags
                    queueSize: 4, // optional concurrency configuration
                    partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 5MB
                    leavePartsOnError: false, // optional manually handle dropped parts
                })
                    .done()
                    .then(data => {
                        form.emit('data', { name: "complete", value: data });
                    }).catch((err) => {
                        form.emit('error', err);
                    })
            }
            
            file.end = function (cb) {
                this._writeStream.on('finish', () => {
                    this.emit('end')
                    cb()
                })
                this._writeStream.end()
            }

        })

        
    })
}

export default parsefile;