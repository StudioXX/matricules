'use strict';

let Jimp = require('jimp')
    ,fs = require('fs')
    ,path = require('path')
    ,_ = require('lodash')
    ,Promise = require('bluebird')
    ,fileType = require('file-type');

module.exports = {
    convertImgs(files, accession) {
        let promises = [];

        _.forEach(files, (file)=>{
            console.log(file);
            //Create a new promise for each image processing
            let promise = new Promise((resolve, reject) => {

            //Resolve image file type
            let type = fileType(file.buffer);

            //Create a jimp instance for this image
            new Jimp(file.buffer, (err, image)=>{
                console.log('creating image');
                const path = `server/media/${accession}/${file.originalname}`;
                //Resize this image
                image.resize(777, 777)
                    //lower the quality by 90%
                    .quality(90)
                    .write(path, () => {
                    resolve({ name: file.originalname, type: 'image', });
                  }); // save
                });
            });

            promises.push(promise);
        });

        // Return promise array
        return Promise.all(promises);
    }
};
            // Jimp.read(Buffer.concat(buffers), (err, image) => {
            //   if (err) console.log(err);
            //   console.log('big file in jimp');
            //   image.resize(256, 256)            // resize
            //       .quality(80)                 // set JPEG quality
            //       .write(path, () => {
            //         console.log('completed resize and upload');
            //         if (--numfiles === 0 && finished) {
            //           console.log('completed all upload');
            //           res.writeHead(200, { Connection: 'close', });
            //           // use this to send response text
            //           res.end('');
            //         }
            //       }); // save