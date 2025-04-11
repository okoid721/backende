import { Request, Response } from "express";
import fs from "fs";
import path from "path";

const UPLOAD_DIR = path.join(__dirname, "../../uploads");

export const uploadVideo = (req: Request, res: Response) => {
  if (!req.file) return res.status(400).send("No video uploaded");
  res.status(200).json({ filename: req.file.filename });
};

export const getVideos = (req: Request, res: Response) => {
  fs.readdir(UPLOAD_DIR, (err, files) => {
    if (err) return res.status(500).send("Error reading files");
    res.status(200).json(files);
  });
};

export const deleteVideo = (req: Request, res: Response) => {
  const filePath = path.join(UPLOAD_DIR, req.params.filename);
  fs.unlink(filePath, (err) => {
    if (err) return res.status(404).send("File not found");
    res.status(200).send("Deleted successfully");
  });
};
