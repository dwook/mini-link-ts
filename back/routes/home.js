const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const { isLoggedIn } = require('./middlewares');
const router = express.Router();
const homeController = require('../controller/home');


/*****
try {
  fs.accessSync('uploads');
} catch (error) {
  console.log('uploads 폴더를 생성');
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads');
    },
    filename(req, file, done) {
      done(null, Date.now() + '_' + file.originalname);
    },
    limits: { fileSize: 15 * 1024 * 1024 }, // 15MB
  }),
});
*****/

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: 'ap-northeast-2',
});
const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: 'mini-link',
    key(req, file, cb) {
      cb(null, `original/${Date.now()}_${path.basename(file.originalname)}`)
    },
    contentType: multerS3.AUTO_CONTENT_TYPE,
  }),
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB
});

router.get('/:username', homeController.getHome);
router.patch(
  '/:userId',
  isLoggedIn,
  upload.single('coverImage'),
  homeController.editHome
);

module.exports = router;
