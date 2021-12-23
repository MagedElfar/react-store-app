import multer from "multer";

export const uploader = (save) => {
    const storage = multer.diskStorage({
        destination: function (req , file , cb){
            cb(null , `images/${save}`);
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now()
            cb(null , `${uniqueSuffix}-${file.originalname}`)
        }
    });

    return  multer({storage : storage });
}
