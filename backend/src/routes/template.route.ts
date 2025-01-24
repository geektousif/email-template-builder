import { Router } from "express";
import {
  getLayout,
  renderAndDownloadTemplate,
  uploadEmailConfig,
  uploadImage,
} from "../controllers/template.controller";
import upload from "../utils/imageUploader";

const router = Router();

router.get("/getLayout", getLayout);
router.post("/uploadImage", upload.single("image"), uploadImage);
router.post("/uploadEmailConfig", uploadEmailConfig);
router.get("/renderAndDownloadTemplate/:id", renderAndDownloadTemplate);

export default router;
