import express from "express";
import multer from "multer";
import { uploadVideo, getVideos, deleteVideo } from "../controllers/videoController";

const router = express.Router();
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.post("/", upload.single("video"), uploadVideo);
router.get("/", getVideos);
router.delete("/:filename", deleteVideo);

export default router;
