import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import blogs from "../Data/BlogsData.json";

const Blogs = () => {
  const [expanded, setExpanded] = useState(null);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
          Latest Blogs
        </h1>
        <div className="max-w-5xl mx-auto space-y-6">
          {blogs.map((blog, index) => {
            const isExpanded = expanded === index;
            const preview = blog.content.slice(0, 200) + (blog.content.length > 200 ? "..." : "");
            return (
              <div
                key={blog.slug}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                {/* Header */}
                <div
                  className="cursor-pointer px-6 py-5 flex justify-between items-start hover:bg-gray-100 transition"
                  onClick={() => setExpanded(isExpanded ? null : index)}
                >
                  <div className="flex flex-col space-y-1">
                    <h2 className="text-2xl font-semibold text-gray-900">{blog.title}</h2>
                    <div className="flex items-center space-x-3 text-sm text-gray-500">
                      <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-medium">
                        {blog.category}
                      </span>
                      <span>{blog.date}</span>
                    </div>
                  </div>
                  <div className="text-gray-500 text-3xl select-none">
                    {isExpanded ? "−" : "+"}
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`px-6 py-4 text-gray-700 text-sm transition-all duration-500 ${
                    isExpanded ? "max-h-screen" : "max-h-20 overflow-hidden"
                  }`}
                >
                  <p>{isExpanded ? blog.content : preview}</p>
                  {!isExpanded && blog.content.length > 200 && (
                    <span
                      className="text-blue-600 cursor-pointer font-medium hover:underline mt-0.5 inline-block"
                      onClick={() => setExpanded(index)}
                    >
                      Read more
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Blogs;
