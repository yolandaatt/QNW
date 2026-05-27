import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, _file, cb) => {
    cb(null, "uploads/");
  },
  filename: (_req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (
  _req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const isValid = allowedTypes.test(
    path.extname(file.originalname).toLowerCase(),
  );
  if (isValid) {
    cb(null, true);
  } else {
    cb(new Error("Endast jpg, jpeg, png och webp är tillåtna"));
  }
};

export const upload = multer({ storage, fileFilter });
