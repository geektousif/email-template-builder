import Handlebars from "handlebars";

const PreviewPanel = ({ template, preview }) => {
  const renderPreview = () => {
    try {
      console.log(template);
      const compiledTemplate = Handlebars.compile(preview);
      return compiledTemplate(template);
    } catch (error) {
      console.log(error);
      return "Error in rendering preview";
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="mb-6 text-2xl font-bold">Preview</h2>

      <div className="p-4 border rounded-lg">
        <div dangerouslySetInnerHTML={{ __html: renderPreview() }} />
      </div>
    </div>
  );
};

export default PreviewPanel;
