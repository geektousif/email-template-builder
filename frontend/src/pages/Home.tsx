import { Toaster } from "react-hot-toast";
import EmailBuilder from "../components/EmailBuilder";

const Home = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-100 ">
        <div className="container min-h-screen mx-auto">
          <header className="bg-white shadow ">
            <div className="px-4 py-6 mx-auto max-w-7xl">
              <h1 className="text-3xl font-bold text-gray-900">
                Email Template Builder
              </h1>
            </div>
          </header>
          <main className="min-h-full ">
            <div className="h-full p-6 mx-auto max-w-7xl">
              <EmailBuilder />
            </div>
          </main>
          <Toaster position="bottom-center" />
        </div>
      </div>
    </>
  );
};

export default Home;
