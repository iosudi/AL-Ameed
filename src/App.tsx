import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useRoutes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import i18n from "./i18n";
import { routes } from "./routes";
import banner from "./assets/بانر.png العميد.png";
import { Dialog, DialogContent } from "./components/ui/dialog";

const queryClient = new QueryClient();
const SIX_HOURS_MS = 6 * 60 * 60 * 1000;

const updateDir = (lng: string) => {
  const dir = lng === "ar" ? "rtl" : "ltr";
  document.documentElement.dir = dir;
  document.body.dir = dir;
};

function App() {
  const routing = useRoutes(routes);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const currentLang = i18n.language || "en";
    updateDir(currentLang);

    i18n.on("languageChanged", (lng) => {
      updateDir(lng);
    });

    const lastShown = localStorage.getItem("lastBannerShown");
    const now = Date.now();

    if (!lastShown || now - parseInt(lastShown) > SIX_HOURS_MS) {
      setShowBanner(true);
      localStorage.setItem("lastBannerShown", now.toString());
    }
  }, []);

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Dialog open={showBanner} onOpenChange={setShowBanner}>
          <DialogContent className="p-0 overflow-hidden [&_svg]:bg-red-700 [&_svg]:rounded-full [&_svg]:p-0.5 [&_svg]:size-6! ">
            <img src={banner} alt="Banner" className="max-w-full" />
          </DialogContent>
        </Dialog>

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
