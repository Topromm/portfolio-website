import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import ThemeManager from "./ThemeManager";
import LandingPage from "./LandingPage";
import About from "./About";
import Services from "./Services";
import Portfolio from "./Portfolio";
import Contact from "./Contact";
import LunaBox from "./LunaBox";
import NoBrakes from "./NoBrakes";
import React from "react";
import "./style.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <ThemeManager/>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/About" element={<About/>}/>
        <Route path="/Services" element={<Services/>}/>
        <Route path="/Portfolio" element={<Portfolio/>}/>
        <Route path="/Contact" element={<Contact/>}/>
        <Route path="/LunaBox" element={<LunaBox/>}/>
        <Route path="/NoBrakes" element={<NoBrakes/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
