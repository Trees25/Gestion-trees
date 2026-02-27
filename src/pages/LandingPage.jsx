import React from "react";
import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Services from "../components/landing/Services";
import About from "../components/landing/About";
import Portfolio from "../components/landing/Portfolio";
import Clients from "../components/landing/Clients";
import Contact from "../components/landing/Contact";
import Footer from "../components/landing/Footer";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Portfolio />
      <Clients />
      <Contact />
      <Footer />
    </>
  );
};

export default LandingPage;