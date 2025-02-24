import { useState } from 'react';
import './App.css';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from './layout/MainLayout';
import { Hovedside } from './pages/Hovedside';
import { SingleArticlePage } from './pages/SingleArticlePage';

function App() {
  const queryClient = new QueryClient();
  const [selectedHashtag, setSelectedHashtag] = useState("");

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path={"/"} element={<MainLayout setSelectedHashtag={setSelectedHashtag} />}>
              <Route index element={<Hovedside selectedHashtag={selectedHashtag} />} />
              <Route path="/article/:id" element={<SingleArticlePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;