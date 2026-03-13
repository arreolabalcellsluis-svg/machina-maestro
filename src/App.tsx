import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Index from "./pages/Index";

// Lazy-loaded pages — only downloaded when the user navigates to them
const Equipos = lazy(() => import("./pages/Equipos"));
const Categoria = lazy(() => import("./pages/Categoria"));
const Producto = lazy(() => import("./pages/Producto"));
const Contacto = lazy(() => import("./pages/Contacto"));
const Login = lazy(() => import("./pages/Login"));
const Admin = lazy(() => import("./pages/Admin"));
const NotFound = lazy(() => import("./pages/NotFound"));

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="equipos" element={<Suspense fallback={<PageLoader />}><Equipos /></Suspense>} />
            <Route path="categoria/:slug" element={<Suspense fallback={<PageLoader />}><Categoria /></Suspense>} />
            <Route path="producto/:slug" element={<Suspense fallback={<PageLoader />}><Producto /></Suspense>} />
            <Route path="contacto" element={<Suspense fallback={<PageLoader />}><Contacto /></Suspense>} />
            <Route path="login" element={<Suspense fallback={<PageLoader />}><Login /></Suspense>} />
            <Route path="admin" element={<Suspense fallback={<PageLoader />}><Admin /></Suspense>} />
            <Route path="*" element={<Suspense fallback={<PageLoader />}><NotFound /></Suspense>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
