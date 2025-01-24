import { ChangeEvent, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  AlignCenterVertical,
  AlignStartVertical,
  AlignEndVertical,
} from "lucide-react";
import { saveEmailConfig, uploadImage } from "../api";

const TemplateEditor = ({ template, setTemplate }: any) => {
  const imageRef = useRef<File | null>(null);
  const [activeTab, setActiveTab] = useState("design");

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setTemplate((prevTemplate: any) => ({
      ...prevTemplate,
      [name]: value,
    }));
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validImageTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    if (!validImageTypes.includes(file.type)) {
      toast.error("Please upload a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB.");
      return;
    }

    imageRef.current = file;
  };

  // BUG selected image getting deleted if clicked on "Choose File" but not select any image
  const handleImageUpload = async () => {
    if (!imageRef.current) {
      toast.error("Please select an image.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("image", imageRef.current as File);
      const response: any = await uploadImage(formData);
      setTemplate((prevTemplate: any) => ({
        ...prevTemplate,
        imageUrl: response.data,
      }));
    } catch (error) {
      toast.error("Error in uploading image");
    }
  };

  const saveTemplate = async () => {
    const response: any = await saveEmailConfig(template);
    console.log(response);

    window.open(
      `${import.meta.env.VITE_BACKEND_URL}/renderAndDownloadTemplate/${
        response.data._id
      }`
    );
  };

  const renderDesignPanel = () => (
    <div className="p-4 border rounded-lg">
      <h3 className="mb-4 text-lg font-bold">Design</h3>
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: "Header Background", key: "headerBgColor" },
          { label: "Header Text", key: "headerTextColor" },
          { label: "Body Background", key: "bodyBgColor" },
          { label: "Body Text", key: "bodyTextColor" },
          { label: "Footer Background", key: "footerBgColor" },
          { label: "Footer Text", key: "footerTextColor" },
        ].map(({ label, key }) => (
          <div key={key} className="flex flex-col items-center">
            <label htmlFor={key} className="block mb-2 text-gray-700">
              {label}
            </label>
            <input
              type="color"
              id={key}
              name={key}
              value={template.styles[key]}
              onChange={(e) =>
                setTemplate((prevTemplate: { styles: any }) => ({
                  ...prevTemplate,
                  styles: {
                    ...prevTemplate.styles,
                    [key]: e.target.value,
                  },
                }))
              }
              className="bg-transparent border border-transparent rounded-md focus:outline-none"
            />
          </div>
        ))}
      </div>

      <div className="mt-4">
        <h3 className="mb-2 text-lg font-bold">Typography & Alignment</h3>
        <div className="grid items-center grid-cols-2 gap-4">
          <div className="flex flex-col">
            {[
              { label: "Title Font Size", key: "titleFontSize" },
              { label: "Content Font Size", key: "contentFontSize" },
              { label: "Footer Font Size", key: "footerFontSize" },
            ].map(({ label, key }) => (
              <fieldset key={key} className="flex flex-col p-4 mb-4 border">
                <legend className="text-gray-700 ">{label}</legend>
                <span className="relative self-end text-sm text-gray-500 -top-1">{`${template.styles[key]}`}</span>
                <input
                  type="range"
                  min="12"
                  max="48"
                  id={key}
                  name={key}
                  value={parseInt(template.styles[key])}
                  onChange={(e) =>
                    setTemplate((prevTemplate: { styles: any }) => ({
                      ...prevTemplate,
                      styles: {
                        ...prevTemplate.styles,
                        [key]: `${e.target.value}px`,
                      },
                    }))
                  }
                  className="px-3 border border-gray-300 rounded-md focus:outline-none"
                />
              </fieldset>
            ))}
          </div>

          <div className="flex flex-col">
            {[
              { label: "Title Alignment", key: "titleAlignment" },
              { label: "Content Alignment", key: "contentAlignment" },
              { label: "Footer Alignment", key: "footerAlignment" },
            ].map(({ label, key }) => (
              <fieldset
                key={key}
                className="flex flex-col p-[0.8rem] mb-4 border"
              >
                <legend className="text-gray-700 ">{label}</legend>
                <div className="flex items-center justify-between">
                  {["left", "center", "right"].map((alignment) => (
                    <label
                      key={alignment}
                      className="flex flex-col items-center cursor-pointer justify-center rounded-sm border border-gray-200 bg-white px-3 py-2 text-gray-600 hover:border-gray-300 has-[:checked]:border-slate-600 has-[:checked]:bg-slate-600 has-[:checked]:text-white"
                    >
                      <input
                        type="radio"
                        name={key}
                        value={alignment}
                        checked={template.styles[key] === alignment}
                        onChange={(e) =>
                          setTemplate((prevTemplate: { styles: any }) => ({
                            ...prevTemplate,
                            styles: {
                              ...prevTemplate.styles,
                              [key]: e.target.value,
                            },
                          }))
                        }
                        className="sr-only"
                      />
                      {alignment === "left" ? (
                        <AlignStartVertical
                          strokeWidth={"1.5px"}
                          size={"20px"}
                        />
                      ) : alignment === "center" ? (
                        <AlignCenterVertical
                          strokeWidth={"1.5px"}
                          size={"20px"}
                        />
                      ) : (
                        <AlignEndVertical strokeWidth={"1.5px"} size={"20px"} />
                      )}

                      <span className="mt-0.5 text-xs">{alignment}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg ">
      <h2 className="mb-6 text-2xl font-bold">Template Editor</h2>

      <div className="mb-6 border-b border-gray-200">
        <div className="flex justify-between -mb-px">
          {["design", "content", "sections"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`shrink-0 px-6 py-2 font-medium focus:outline-none ${
                activeTab === tab
                  ? "bg-indigo-500 text-white rounded-t-lg border border-transparent"
                  : " text-gray-700 rounded-sm border border-gray-300 border-b-white"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "content" && (
        <div>
          <div className="mb-4">
            <label htmlFor="title" className="block mb-2 text-gray-700 ">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={template.title}
              onChange={handleInputChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm border-opacity-40"
            />
          </div>

          <div className="flex items-center justify-between mb-4">
            <div>
              <label htmlFor="imageUrl" className="block mb-2 text-gray-700">
                Upload Image
              </label>
              <input
                onChange={handleImageChange}
                type="file"
                accept="image/*"
                name="imageUrl"
                id="imageUrl"
                className="block w-full"
              />
            </div>

            <button
              type="button"
              className="px-4 py-2 font-semibold text-white rounded-full bg-slate-500 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleImageUpload}
            >
              Upload
            </button>
          </div>

          <div className="mb-4">
            <label htmlFor="content" className="block mb-2 text-gray-700">
              Content
            </label>
            <textarea
              name="content"
              id="content"
              rows={6}
              value={template.content}
              onChange={handleInputChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm border-opacity-40"
            ></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="footer" className="block mb-2 text-gray-700">
              Footer
            </label>
            <input
              type="text"
              name="footer"
              id="footer"
              value={template.footer}
              onChange={handleInputChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm border-opacity-40"
            />
          </div>
        </div>
      )}

      {activeTab === "design" && renderDesignPanel()}

      {activeTab === "sections" && (
        // to be implemented
        <div>
          <h1 className="mb-6 text-2xl font-bold">Sections</h1>
          <div
            role="alert"
            className="p-4 border-indigo-500 rounded border-s-4 bg-indigo-50"
          >
            <div className="flex items-center gap-2 text-indigo-800">
              <span className="sr-only">Info</span>
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                ></path>
              </svg>

              <strong className="block font-medium">
                {" "}
                To be implemented soon &#128517;
              </strong>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6">
        <button
          onClick={saveTemplate}
          className="w-full px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700 "
        >
          Save Template
        </button>
      </div>
    </div>
  );
};

export default TemplateEditor;
