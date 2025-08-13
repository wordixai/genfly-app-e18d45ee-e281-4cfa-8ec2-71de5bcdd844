import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Toaster } from "sonner";
import { Sidebar } from "@/components/Sidebar";
import { Dashboard } from "@/pages/Dashboard";
import { Projects } from "@/pages/Projects";
import { NewProject } from "@/pages/NewProject";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <Sidebar />
          <SidebarInset className="flex-1">
            <main className="p-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/new" element={<NewProject />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </SidebarInset>
        </div>
        <Toaster position="top-right" />
      </SidebarProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;