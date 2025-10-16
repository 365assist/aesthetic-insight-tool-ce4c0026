import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import Index from "./pages/Index";
import Members from "./pages/Members";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import MarketingHub from "./pages/MarketingHub";
import DeveloperTools from "./pages/DeveloperTools";
import UDIProgram from "./pages/UDIProgram";
import SupportPortal from "./pages/SupportPortal";
import Shop from "./pages/Shop";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/members" element={<Members />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/marketing-hub" element={<MarketingHub />} />
            <Route path="/developer-tools" element={<DeveloperTools />} />
            <Route path="/udi-program" element={<UDIProgram />} />
            <Route path="/support-portal" element={<SupportPortal />} />
            <Route path="/shop" element={<Shop />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
