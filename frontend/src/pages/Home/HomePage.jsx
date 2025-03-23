import React, { useRef } from "react";
import Navbar from "../../components/NavBar";
import HeroSection from "./sections/HeroSection";
import Testimonials from "./sections/Testimonials";
import CTASection from "./sections/CTASection";
import Footer from "./sections/Footer";
import Features from "./sections/Features";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const HomePage = () => {
  useDocumentTitle("Home");
  // Create refs for each section
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef = useRef(null);

  // Create an object with all refs to pass to the navbar
  const sectionRefs = {
    hero: heroRef,
    features: featuresRef,
    testimonials: testimonialsRef,
    cta: ctaRef,
  };

  return (
    <>
      <Navbar sectionRefs={sectionRefs} />
      <div ref={heroRef} id="hero" className="scroll-mt-[96px]">
        <HeroSection sectionRefs={sectionRefs} />
      </div>
      <div ref={featuresRef} id="features" className="scroll-mt-[96px]">
        <Features />
      </div>
      <div ref={testimonialsRef} id="testimonials" className="scroll-mt-[96px]">
        <Testimonials />
      </div>
      <div ref={ctaRef} id="cta" className="scroll-mt-[96px]">
        <CTASection />
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
