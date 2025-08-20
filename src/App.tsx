import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import FloatingChat from "./components/ui/floating-chat";
import Home from "./pages/Home";
import Hubs from "./pages/Hubs";
import RegisterHub from "./pages/RegisterHub";
import TrackPackage from "./pages/TrackPackage";
import QRScannerPage from "./pages/QRScanner";
import PartnerDashboard from "./pages/PartnerDashboard";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/hubs" element={<Hubs />} />
              <Route path="/register-hub" element={<RegisterHub />} />
              <Route path="/track" element={<TrackPackage />} />
              <Route path="/scanner" element={<QRScannerPage />} />
              <Route path="/dashboard" element={<PartnerDashboard />} />
              <Route path="/support" element={<Support />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <FloatingChat />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
