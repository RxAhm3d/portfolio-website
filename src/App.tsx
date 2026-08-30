import { ThemeProvider } from "./components/ThemeProvider";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Toaster } from "./components/ui/sonner";
import { useEffect } from "react";
import {
  clearChameleonUser,
  identifyChameleonUser,
  wireChameleonNavigateHandler,
} from "./lib/chameleon";

export default function App() {
  useEffect(() => {
    identifyChameleonUser();
    wireChameleonNavigateHandler();

    const handleSessionLogout = () => {
      clearChameleonUser();
    };

    // TODO: verify Chameleon install (logout clear) once a real auth/logout UI flow is exercised in browser.
    window.addEventListener("portfolio:logout", handleSessionLogout);

    return () => {
      window.removeEventListener("portfolio:logout", handleSessionLogout);
    };
  }, []);

  return (
    <ThemeProvider defaultTheme="dark">
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
        <Toaster />
      </div>
    </ThemeProvider>
  );
}