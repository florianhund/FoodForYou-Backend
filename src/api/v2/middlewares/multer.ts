import multer from 'multer';

export default multer({
  storage: multer.diskStorage({}),
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.match(/png||jpeg||jpg||gif$i/))
      return cb(new Error('File type is not supported'));

    cb(null, true);
  }
});
