import React, { useState } from 'react';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { navItems } from "./nav-items";

const queryClient = new QueryClient();

const App = () => {
  const [blogPosts, setBlogPosts] = useState([
    { id: 1, title: "My First Blog Post", content: "This is the beginning of my blogging journey. I'm excited to share my thoughts and experiences with you all.", date: "2023-04-01" },
    { id: 2, title: "Reflections on Web Development", content: "As I delve deeper into web development, I'm constantly amazed by the rapid pace of change in this field.", date: "2023-04-15" },
    { id: 3, title: "The Importance of User Experience", content: "User experience is at the heart of every successful website. In this post, I'll explore why UX matters so much.", date: "2023-05-01" },
  ]);

  const addPost = (newPost) => {
    setBlogPosts([...blogPosts, newPost]);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <Routes>
              {navItems.map(({ to, page: PageComponent }) => (
                <Route 
                  key={to} 
                  path={to} 
                  element={
                    React.cloneElement(PageComponent, { 
                      blogPosts: blogPosts, 
                      addPost: addPost 
                    })
                  } 
                />
              ))}
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
