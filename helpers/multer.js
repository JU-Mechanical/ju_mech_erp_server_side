import multer from "multer";
const multerUpload = multer({
  limits: {
    fileSize: 1024 * 1024 * 500000,
  },
});

const attachmentsMulter = multerUpload.fields([
    { name: 'semgrades', maxCount: 10 },
    { name: 'projects', maxCount: 10 },
    { name: 'placement', maxCount: 10 },
    { name: 'rankcards', maxCount: 10 },
    { name: 'clubs', maxCount: 10 },
    { name: 'techfests', maxCount: 10 },
    { name: 'leadership', maxCount: 10 },
    { name: 'sports', maxCount: 10 },
    { name: 'skills', maxCount: 10 },
    { name: 'socialactivities', maxCount: 10 },
    { name: 'seminars', maxCount: 10 },
    { name: 'lor', maxCount: 10 },
  ]);
  
export { attachmentsMulter };

