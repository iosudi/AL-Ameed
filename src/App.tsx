import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useRoutes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import i18n from "./i18n";
import { routes } from "./routes";

const queryClient = new QueryClient();
// const SIX_HOURS_MS = 6 * 60 * 60 * 1000;

const updateDir = (lng: string) => {
  const dir = lng === "ar" ? "rtl" : "ltr";
  document.documentElement.dir = dir;
  document.body.dir = dir;
};

function App() {
  const routing = useRoutes(routes);
  // const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const currentLang = i18n.language || "en";
    updateDir(currentLang);

    i18n.on("languageChanged", (lng) => {
      updateDir(lng);
    });

    // const lastShown = localStorage.getItem("lastBannerShown");
    // const now = Date.now();

    // if (!lastShown || now - parseInt(lastShown) > SIX_HOURS_MS) {
    //   setShowBanner(true);
    //   localStorage.setItem("lastBannerShown", now.toString());
    // }
  }, []);

  // const closeModal = () => setShowBanner(false);

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        {/* <Modal
          isOpen={showBanner}
          onRequestClose={closeModal}
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              background: "transparent",
              border: "none",
              zIndex: 50,
            },
            overlay: {
              backgroundColor: "rgba(0,0,0,0.6)",
              zIndex: 50,
            },
          }}
          ariaHideApp={false}
        >
          <img
            src={banner}
            alt="Banner"
            onClick={closeModal}
            className="max-w-full"
          />
        </Modal> */}
        <div className="relative">
          {/* <img
            src={soon}
            alt="Banner"
            className="w-dvw h-dvh fixed top-0 z-50"
          /> */}

          {routing}
          <Toaster />
          {/* <Footer /> */}
        </div>

        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
