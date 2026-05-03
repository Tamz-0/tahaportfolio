// src/pages/Home.jsx
import { useState, useEffect, useCallback } from "react";
import { Navbar } from "../components/layout/Navbar";
import { MobileSidebar } from "../components/layout/MobileSidebar";
import { Hero } from "../components/sections/Hero";
import { ProofSection } from "../components/sections/Proof";
import { About } from "../components/sections/About";
import { Projects } from "../components/sections/Projects";
import { Experience } from "../components/sections/Experience";
import { Writing } from "../components/sections/Writing";
import { Contact } from "../components/sections/Contact";
import { Footer } from "../components/sections/Footer";
import { useDarkMode } from "../hooks/useDarkMode";

export function Home() {
  const [dark, setDark]     = useDarkMode();
  const [toast, setToast]   = useState(false);
  const [menuOpen, setMenu] = useState(false);

  const showToast = useCallback(msg => {
    setToast(msg);
    setTimeout(() => setToast(false), 2200);
  }, []);

  const toggleTheme = useCallback(() => { setDark(d => !d); }, [setDark]);

  // Keyboard shortcut: T = toggle theme
  useEffect(() => {
    const fn = e => {
      const inInput = ["INPUT","TEXTAREA"].includes(e.target.tagName);
      if (e.key === "t" && !inInput) { e.preventDefault(); toggleTheme(); }
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [toggleTheme]);

  return (
    <>
      <MobileSidebar open={menuOpen} onClose={() => setMenu(false)} dark={dark} setDark={setDark}/>
      <div className="portfolio-root">
        <Navbar dark={dark} setDark={setDark} onMenuOpen={() => setMenu(true)}/>
        <Hero/>
        <ProofSection/>
        <About/>
        <Projects/>
        <Experience/>
        <Writing/>
        <Contact showToast={showToast}/>
        <Footer/>
        <div className={`copy-toast${toast ? " visible" : ""}`}>{toast}</div>
      </div>
    </>
  );
}