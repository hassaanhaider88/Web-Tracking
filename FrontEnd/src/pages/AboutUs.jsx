import { GiThink } from "react-icons/gi";
import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";
// import { Menu } from 'lucide-react';

export default function AboutUs() {
  return (
    <div className=" min-h-screen">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-8xl font-bold flex justify-center gap-2 mb-6">
            About Us <GiThink />
          </h1>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80"
              alt="Video editing workspace"
              className="w-full h-auto rounded-lg"
            />
          </div>

          <div>
            <h3 className="text-gray-700 mb-4">About Us</h3>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              We Always Make The Best
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed indent-4 text-center">
              <span className="text-orange-500">DevTrace </span> is a real-time
              user tracking platform that helps developers monitor website
              visits and unique users effortlessly. It provides detailed
              analytics including browser, device, location, and visit history.
              With an intuitive dashboard, developers can gain actionable
              insights to optimize user experience and engagement.
            </p>
            <Link
              to={"/contact"}
              className="bg-orange-500 text-white px-8 py-3 rounded-full font-medium hover:bg-orange-400 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Skills */}
            <div>
              <h2 className="text-4xl font-bold mb-4 text-orange-500">
                Our Skills
              </h2>
              <p className="text-gray-300 mb-12">
                We specialize in tracking, analyzing, and optimizing website
                traffic with precision. Our tools provide real-time insights for
                developers to enhance user engagement.
              </p>

              <div className="space-y-6">
                {[
                  { name: "Real-Time Tracking", value: 95 },
                  { name: "User Analytics", value: 90 },
                  { name: "Dashboard Design", value: 85 },
                  { name: "API Integration", value: 80 },
                ].map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">{skill.name}</span>
                      <span className="font-semibold">{skill.value}%</span>
                    </div>
                    <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${skill.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-8">
              {[
                { value: "2+", label: "Months of Services" },
                { value: "10+", label: "Kive Website's" },
                { value: "8+", label: "Satisfied Clients" },
                { value: "5", label: "Awards Received" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center bg-gray-900/30 backdrop-blur-md rounded-xl p-6 shadow-lg hover:scale-105 transition-transform"
                >
                  <h3 className="text-4xl font-bold mb-2 text-orange-500">
                    {stat.value}
                  </h3>
                  <p className="text-gray-300">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
