import React from "react";
import Navbar from "../Components/Navbar";
import Footer from '../Components/Footer'

export default function DontionPage() {
  return (
   <>
   <Navbar/>
    <div className="bg-gray-100 flex items-center justify-center min-h-screen p-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">
        {/* Profile Image */}
        <img
          src="/HMKCodeWebLogo.png"
          className="w-40 h-28 mx-auto"
          alt="Profile"
        />

        {/* Name / Title */}
        <h1 className="text-2xl font-semibold mt-4">Support My Work</h1>
        <p className="text-gray-600 text-sm mt-2 leading-relaxed">
          I'm working hard on cool projects and open-source tools. If my work
          helps you, consider supporting me with a coffee.
        </p>

        {/* Buy Me A Coffee Button */}
        <a
          href="https://buymeacoffee.com/hassaanhaider.dev"
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-2 bg-yellow-400 px-6 py-3 rounded-lg font-semibold text-black hover:bg-yellow-500 transition shadow"
        >
          <img
            src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
            className="w-6 h-6"
            alt="coffee"
          />
          Buy Me A Coffee
        </a>

        {/* Divider */}
        <div className="mt-6 h-px bg-gray-200 w-full"></div>

        {/* Social Links */}
        
      </div>
    </div>
    <Footer/>
   </>
  );
}
