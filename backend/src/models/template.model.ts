import mongoose from "mongoose";

const templateSchema = new mongoose.Schema(
  {
    //TODO Name of the template
    name: {
      type: String,
      required: true,
      default: "Unnamed Template",
    },
    // TODO implement user
    title: String,
    content: String,
    footer: String,
    imageUrl: String,
    styles: {
      headerBgColor: String,
      headerTextColor: String,
      footerBgColor: String,
      footerTextColor: String,
      bodyBgColor: String,
      bodyTextColor: String,
      titleFontSize: String,
      contentFontSize: String,
      footerFontSize: String,
      titleAlignment: String,
      contentAlignment: String,
      footerAlignment: String,
    },
  },
  {
    timestamps: true,
  }
);

const Template = mongoose.model("Template", templateSchema);

export default Template;
