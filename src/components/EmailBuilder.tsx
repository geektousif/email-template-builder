import { useEffect, useState } from "react";
import PreviewPanel from "./PreviewPanel";
import TemplateEditor from "./TemplateEditor";
import { getLayout } from "../api";

const EmailBuilder = () => {
  const [template, setTemplate] = useState({
    title: "Your Template Title",
    imageUrl: "",
    content: "Customize your email content here",
    footer: "&copy; Email Footer / Your Company Name",
    styles: {
      headerBgColor: "#251b70",
      headerTextColor: "#ffffff",
      footerBgColor: "#e5e7eb",
      footerTextColor: "#4b5563",
      bodyBgColor: "#f3f4f6",
      bodyTextColor: "#1f2937",
      titleFontSize: "24px",
      contentFontSize: "16px",
      footerFontSize: "14px",
      titleAlignment: "center",
      contentAlignment: "left",
      footerAlignment: "center",
    },
  });
  const [preview, setPreview] = useState("");

  const fetchEmailLayout = async () => {
    const layout = await getLayout();
    setPreview(layout);
  };

  useEffect(() => {
    fetchEmailLayout();
  }, []);

  return (
    <>
      <div className="container h-full px-4 pt-8 mx-auto">
        <div className="grid h-[calc(100vh-14rem)] grid-cols-2 gap-8">
          <div className="h-full overflow-y-auto">
            <TemplateEditor template={template} setTemplate={setTemplate} />
          </div>
          <div className="h-full overflow-y-auto">
            <PreviewPanel preview={preview} template={template} />
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailBuilder;
