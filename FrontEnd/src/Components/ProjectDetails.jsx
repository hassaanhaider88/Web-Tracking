import React from "react";
// Fixing import paths for react-icons to ensure compatibility with the build environment
import { BsThreeDotsVertical } from "react-icons/bs";
import { HiOutlineBell } from "react-icons/hi";
import { FiClock, FiCheckSquare } from "react-icons/fi";

const ControlDashboardUI = ({ projectDetails }) => {
  function formatNumber(num) {
    if (num < 1000) return num.toString();
    if (num < 1_000_000)
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    if (num < 1_000_000_000)
      return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
  }

  // Define the style mappings once, to be used directly in the JSX
  const valueClasses = {
    blue: "bg-blue-500/90 text-white text-sm shadow-blue-500/50",
    green: "bg-green-500/90 text-white text-sm shadow-green-500/50",
    red: "bg-red-500/90 text-white text-sm shadow-red-500/50",
  };

  // Function to generate the colored box-shadow style
  const getShadowStyle = (valueColor) => {
    let colorRgba;
    if (valueColor === "blue") {
      colorRgba = "rgba(59, 130, 246, 0.5)";
    } else if (valueColor === "green") {
      colorRgba = "rgba(34, 197, 94, 0.5)";
    } else {
      colorRgba = "rgba(239, 68, 68, 0.5)";
    }
    return {
      boxShadow: `0 8px 15px -3px ${colorRgba}`,
    };
  };

  return (
    <div
      className="min-h-screen bg-gray-100 p-8 flex items-center justify-center"
      style={{
        background: "linear-gradient(135deg, #e0eafc, #c5d7f1)", // Soft gradient background
      }}
    >
      <div
        className="max-w-4xl w-full bg-white/50 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl border border-white/90"
        style={{
          boxShadow:
            "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.5) inset",
        }}
      >
        {/* ## Navbar/Header Section */}
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            {/* Custom SVG icon as provided by the user */}
            <svg
              stroke="#F97316"
              fill="#F97316"
              strokeWidth="0"
              role="img"
              viewBox="0 0 24 24"
              height="40px"
              width="40px"
              xmlns="http://www.w3.org/2000/svg"
              className="copy-svg-injected"
            >
              <path d="M11.4602 2.9425c-.5626.1289-1.087.4605-1.4268.902-.1981.2576-.3965.6748-.4631.9742l-.054.2429H3.5794v-.5451c0-.6036-.0258-.7113-.1944-.811-.0858-.0505-.2419-.056-1.6282-.056H.2234l-.1116.1117L0 3.873v3.125l.0958.1073.0958.1072 1.5378.008c1.6822.009 1.6406.0134 1.775-.186.0706-.1047.0749-.1428.0749-.6644v-.5534h3.9553l-.3769.1912c-.8331.4228-1.4973.8874-2.0969 1.467-.628.607-1.088 1.2325-1.4461 1.9655-.1896.3882-.444 1.0768-.5266 1.425-.0339.143-.053.1724-.1127.1724-.1225 0-.4497.0964-.6247.1842-.822.4118-1.2305 1.3308-.9832 2.2115.2266.8072.977 1.3805 1.8066 1.3805.3291 0 .54-.0497.8615-.2032.6385-.305 1.0542-.9742 1.0542-1.6977 0-.3075-.1065-.6967-.2624-.9592-.1723-.29-.5245-.6142-.802-.7381-.118-.0527-.215-.1143-.2154-.1368s.0651-.2415.1459-.4868c.7245-2.202 2.4014-3.6894 5.14-4.5596.2077-.066.3941-.1256.4143-.1324.021-.007.074.1002.1233.2503.273.8284.919 1.419 1.794 1.6404.3813.0964.9449.0759 1.3297-.0484.7415-.2395 1.368-.8767 1.6089-1.6366l.0697-.2198.3264.1096c1.161.39 2.2134 1.0413 3.129 1.9366 1.0849 1.061 1.8142 2.2829 2.2176 3.7155l.079.2805-.1689.0756c-.7889.353-1.2652 1.2638-1.0914 2.0866.1672.7919.7946 1.396 1.5759 1.5175.8882.138 1.7792-.4011 2.0782-1.2575.3469-.9937-.2055-2.09-1.2146-2.4104-.1409-.0448-.297-.0814-.347-.0814-.0862 0-.0938-.0128-.1506-.2545-.3385-1.4397-1.2326-3.0012-2.3646-4.1292-.5791-.5772-1.4676-1.2477-2.0288-1.531-.1039-.0525-.1888-.1026-.1888-.1114 0-.009.931-.0159 2.0687-.0159h2.0688v1.1811l.0958.1073.0958.1072h3.1565l.1073-.1073.1073-.1074.009-1.5112c.0101-1.661.01-1.6647-.1871-1.781-.0858-.0506-.2419-.056-1.6282-.056h-1.5334l-.1116.1117-.1116.1116v1.1887h-5.9689l-.0223-.149c-.0615-.41-.3043-.8823-.633-1.2318-.3535-.3758-.7755-.6217-1.2647-.737-.2482-.0585-.823-.0592-1.0756-.001m-.0372 9.1302c-.0553.03-.14.1509-.2346.3352-1.723 3.3554-4.1678 8.1776-4.182 8.2486-.0436.218.1804.4549.3969.4198.0567-.009.989-.4191 2.0718-.9109s2.0056-.9086 2.0508-.9263c.0713-.0279.3408.0876 2.0523.8794 1.0836.5014 2.0274.932 2.0974.9572.1543.0554.2997.0178.418-.1082.181-.1926.2654-.003-2.0343-4.5771-1.497-2.9778-2.1337-4.2128-2.2047-4.277-.1137-.1028-.2873-.1192-.4316-.0407"></path>
            </svg>
            <h1 className="text-2xl font-bold text-gray-700">Project Name</h1>
          </div>
          <BsThreeDotsVertical className="text-gray-400 text-xl cursor-pointer" />
        </header>

        {/* --- Main Content Tiles Container --- */}
        <div className="flex flex-wrap gap-6 justify-start relative">
          {/* 1. Visits Tile (Blue) */}
          <div
            className="bg-white/50 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/80"
            style={{ minWidth: "150px", flexBasis: "1" }}
          >
            <div className="flex justify-between items-start">
              <h3 className="text-gray-600 font-semibold mb-3">Visits</h3>
              {/* No notification dot here */}
            </div>

            {/* Large Value Circle */}
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold mb-3 shadow-lg ${valueClasses.blue}`}
              style={getShadowStyle("blue")}
            >
              {formatNumber(2300000)}
            </div>

            {/* Footer Section (Inline) */}
            <div className="flex justify-between items-center text-xs mt-2 pt-2 border-t border-gray-100/50">
              <span className="text-gray-400 font-medium">Mde/</span>
              <FiClock className="text-gray-400" />
            </div>
          </div>

          {/* 2. Tasks Tile (Green) */}
          <div
            className="bg-white/50 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/80 relative"
            style={{ minWidth: "150px", flexBasis: "1" }}
          >
            <div className="flex justify-between items-start">
              <h3 className="text-gray-600 font-semibold mb-3">Tasks</h3>
              {/* Small purple notification dot */}
              <div className="absolute top-0 right-0 -mt-2 -mr-2 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-purple-500/50">
                1
              </div>
            </div>

            {/* Large Value Circle */}
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold mb-3 shadow-lg ${valueClasses.green}`}
              style={getShadowStyle("green")}
            >
              12
            </div>

            {/* Footer Section (Inline) */}
            <div className="flex justify-between items-center text-xs mt-2 pt-2 border-t border-gray-100/50">
              <span className="text-gray-400 font-medium">Ghatiy</span>
              <FiCheckSquare className="text-gray-400" />
            </div>
          </div>

          {/* 3. Alerts Tile (Red) */}
          <div
            className="bg-white/50 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/80"
            style={{ minWidth: "150px", flexBasis: "1" }}
          >
            <div className="flex justify-between items-start">
              <h3 className="text-gray-600 font-semibold mb-3">Alerts</h3>
              {/* No notification dot here */}
            </div>

            {/* Large Value Circle */}
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold mb-3 shadow-lg ${valueClasses.red}`}
              style={getShadowStyle("red")}
            >
              3
            </div>

            {/* Footer Section (Inline) */}
            <div className="flex justify-between items-center text-xs mt-2 pt-2 border-t border-gray-100/50">
              <span className="text-gray-400 font-medium">Mrhey</span>
              <HiOutlineBell className="text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlDashboardUI;
