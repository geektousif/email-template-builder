import path from "path";
import fs from "fs";
import handlebars from "handlebars";
import asyncHandler from "../utils/asyncHandler";
import AppError from "../utils/AppError";
import { SuccessResponse } from "../utils/apiResponse";
import Template from "../models/template.model";

const getLayout = asyncHandler(async (req, res) => {
  const layout = path.join(__dirname, "../../templates", "layout.html");
  return res.status(200).sendFile(layout);
  //   return res.status(200).send(layout);
});

const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new AppError(400, "No file uploaded");
  }

  const imageUrl = `${req.protocol}://${req.hostname}:${process.env.PORT}/uploads/${req.file.filename}`;

  return res
    .status(200)
    .json(new SuccessResponse(imageUrl, "Image uploaded successfully"));
});

const uploadEmailConfig = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, title, content, footer, imageUrl, styles } = req.body;

  if ([title, content, footer].some((field) => !field)) {
    throw new AppError(400, "All fields are required");
  }

  const template = await Template.create({
    name,
    title,
    content,
    footer,
    styles,
    imageUrl,
  });

  return res
    .status(200)
    .json(new SuccessResponse(template, "Template created successfully"));
});

const renderAndDownloadTemplate = asyncHandler(async (req, res) => {
  const templateDoc = await Template.findById(req.params.id);
  if (!templateDoc) {
    throw new AppError(404, "Template not found");
  }

  const template = {
    name: templateDoc.name,
    title: templateDoc.title,
    content: templateDoc.content,
    footer: templateDoc.footer,
    imageUrl: templateDoc.imageUrl,
    styles: templateDoc.styles,
  };

  const layoutPath = path.join(__dirname, "../../templates", "layout.html");
  const layout = fs.readFileSync(layoutPath, "utf-8");

  const compiledTemplate = handlebars.compile(layout);

  const html = compiledTemplate(template);

  res.set({
    "Content-Type": "text/html",
    "Content-Disposition": `attachment; filename="email-template-${templateDoc._id}.html"`,
  });
  return res.status(200).send(html);
});

export { getLayout, uploadImage, uploadEmailConfig, renderAndDownloadTemplate };
