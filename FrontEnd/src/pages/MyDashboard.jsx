import { FiDelete } from "react-icons/fi";
import { useContext, useState, useEffect } from "react";
import {  FaChevronDown, FaChevronRight } from "react-icons/fa";
import { UserContext } from "../store/UserContext";
import { Link } from "react-router-dom";
import ModalBox from "../Components/ModalBox";
import API from "../utils/api";
import toast from "react-hot-toast";

export default function MyDashboard() {
  const { UserData } = useContext(UserContext);
  const [IsModalOpen, setIsModalOpen] = useState(false);
  const [IsConfrimed, setIsConfrimed] = useState(false);
  const [AllProjects, setAllProjects] = useState([]);
  const [DelProjectId, setDelProjectId] = useState("");
  const [ShowUserMenu, setShowUserMenu] = useState(false);
  const [LoadingProjects, setLoadingProjects] = useState(false);
  useEffect(() => {
    fetchProjects();
  }, [IsConfrimed, window.location.pathname]);

  async function fetchProjects() {
    try {
      setLoadingProjects(true);
      const res = await API.get("/mywebsites");
      setAllProjects(res.data.projects || []);
      console.log(res.data.projects);
      setLoadingProjects(false);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Failed");
      setLoadingProjects(false);
    }
  }

  const hanldeSiteDeletion = (siteName) => {
    setIsModalOpen(true);
    setDelProjectId(siteName);
  };

  const FromatDate = (date) => {
    return new Date(date).toISOString().split("T")[0];
  };

  const handleUserSignOut = () => {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <>
      {IsModalOpen && (
        <ModalBox
          setIsModalOpen={setIsModalOpen}
          setIsConfrimed={setIsConfrimed}
          DelProjectId={DelProjectId}
        />
      )}
      {/* <Navbar/> */}
      <div className="min-h-screen bg-gradient-to from-orange-100 via-orange-50 to-orange-100 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Main Card */}
          <div className="bg-white rounded-3xl shadow-lg p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <Link to={'/'} className="flex justify-center items-center gap-2">
                <svg
                  stroke="#F97316"
                  fill="#F97316"
                  stroke-width="0"
                  role="img"
                  viewBox="0 0 24 24"
                  height="30px"
                  width="30px"
                  xmlns="http://www.w3.org/2000/svg"
                  class="copy-svg-injected"
                >
                  <path d="M11.4602 2.9425c-.5626.1289-1.087.4605-1.4268.902-.1981.2576-.3965.6748-.4631.9742l-.054.2429H3.5794v-.5451c0-.6036-.0258-.7113-.1944-.811-.0858-.0505-.2419-.056-1.6282-.056H.2234l-.1116.1117L0 3.873v3.125l.0958.1073.0958.1072 1.5378.008c1.6822.009 1.6406.0134 1.775-.186.0706-.1047.0749-.1428.0749-.6644v-.5534h3.9553l-.3769.1912c-.8331.4228-1.4973.8874-2.0969 1.467-.628.607-1.088 1.2325-1.4461 1.9655-.1896.3882-.444 1.0768-.5266 1.425-.0339.143-.053.1724-.1127.1724-.1225 0-.4497.0964-.6247.1842-.822.4118-1.2305 1.3308-.9832 2.2115.2266.8072.977 1.3805 1.8066 1.3805.3291 0 .54-.0497.8615-.2032.6385-.305 1.0542-.9742 1.0542-1.6977 0-.3075-.1065-.6967-.2624-.9592-.1723-.29-.5245-.6142-.802-.7381-.118-.0527-.215-.1143-.2154-.1368s.0651-.2415.1459-.4868c.7245-2.202 2.4014-3.6894 5.14-4.5596.2077-.066.3941-.1256.4143-.1324.021-.007.074.1002.1233.2503.273.8284.919 1.419 1.794 1.6404.3813.0964.9449.0759 1.3297-.0484.7415-.2395 1.368-.8767 1.6089-1.6366l.0697-.2198.3264.1096c1.161.39 2.2134 1.0413 3.129 1.9366 1.0849 1.061 1.8142 2.2829 2.2176 3.7155l.079.2805-.1689.0756c-.7889.353-1.2652 1.2638-1.0914 2.0866.1672.7919.7946 1.396 1.5759 1.5175.8882.138 1.7792-.4011 2.0782-1.2575.3469-.9937-.2055-2.09-1.2146-2.4104-.1409-.0448-.297-.0814-.347-.0814-.0862 0-.0938-.0128-.1506-.2545-.3385-1.4397-1.2326-3.0012-2.3646-4.1292-.5791-.5772-1.4676-1.2477-2.0288-1.531-.1039-.0525-.1888-.1026-.1888-.1114 0-.009.931-.0159 2.0687-.0159h2.0688v1.1811l.0958.1073.0958.1072h3.1565l.1073-.1073.1073-.1074.009-1.5112c.0101-1.661.01-1.6647-.1871-1.781-.0858-.0506-.2419-.056-1.6282-.056h-1.5334l-.1116.1117-.1116.1116v1.1887h-5.9689l-.0223-.149c-.0615-.41-.3043-.8823-.633-1.2318-.3535-.3758-.7755-.6217-1.2647-.737-.2482-.0585-.823-.0592-1.0756-.001m-.0372 9.1302c-.0553.03-.14.1509-.2346.3352-1.723 3.3554-4.1678 8.1776-4.182 8.2486-.0436.218.1804.4549.3969.4198.0567-.009.989-.4191 2.0718-.9109s2.0056-.9086 2.0508-.9263c.0713-.0279.3408.0876 2.0523.8794 1.0836.5014 2.0274.932 2.0974.9572.1543.0554.2997.0178.418-.1082.181-.1926.2654-.003-2.0343-4.5771-1.497-2.9778-2.1337-4.2128-2.2047-4.277-.1137-.1028-.2873-.1192-.4316-.0407"></path>
                </svg>
                <h1 className="playfair-display-WebAndAppText">DevTrace</h1>
              </Link>

              <div
                onClick={() => setShowUserMenu(!ShowUserMenu)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <img
                  src={`https://ui-avatars.com/api/?name=${UserData?.name}&background=f97316&color=fff`}
                  alt="Diana"
                  className="w-9 h-9 rounded-full"
                />
                <span className="font-medium sm:inline hidden text-gray-800">
                  {UserData?.name}
                </span>
                <FaChevronDown className="text-xs sm:inline hidden text-gray-400" />
              </div>
              {ShowUserMenu && (
                <div className="absolute right-10 top-[18%] cursor-pointer overflow-hidden gap-3 w-[200px] flex flex-col justify-center items-center h-20 bg-gray-300 rounded-3xl ">
                  <div
                    onClick={handleUserSignOut}
                    className="SignOut w-full hover:text-gray-400  flex justify-center items-center"
                  >
                    Sign Out
                  </div>
                  <Link to={"/"} className="SignOut">
                    Home
                  </Link>
                </div>
              )}
            </div>

            <div className="flex">
              {/* Main Content */}
              <div className="flex-1 w-full">
                {/* Welcome Section */}
                <h2 className="text-2xl font-semibold text-gray-800 mb-8">
                  Welcome back, {UserData?.name}!
                </h2>

                <div className="">
                  {/* Left Section - Delivery Info */}
                  <div className="flex-1 bg-gray-50 rounded-2xl">
                    <div className="flex  w-full md:flex-row flex-col md:justify-between md:items-start justify-center items-center mb-6">
                      <div>
                        <div className="text-7xl font-bold text-gray-900 mb-2">
                          #1
                        </div>
                        <div className="text-gray-600 text-lg">
                          Web/App Tracking Site OS
                        </div>
                      </div>
                      <div className="ml-8">
                        <img
                          src="https://ik.imagekit.io/hassaan/DevTrace_ozYQTcy35"
                          alt="Package"
                          className="w-full h-full mr-5 object-contain"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm md:w-1/2 sm:w-1/3 w-full text-gray-600 mb-1">
                        DevTrace tracks user interactions across your site and
                        turns them into useful data. It’s built to help
                        developers understand real user behavior without any
                        extra complexity.
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <Link
                        to={"/projects/new"}
                        className="bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600"
                      >
                        Add New Site
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Recent Sites Table */}
                
                {LoadingProjects ? "Loading.." : AllProjects.length > 0 ? (
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Your Recent Sites
                    </h3>

                    <div style={{ overflowX: "scroll" }}>
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                              Since
                            </th>
                            <th className="text-left text-nowrap py-3 px-4 text-sm font-medium text-gray-600">
                              Site Name
                            </th>
                            <th className="text-left text-nowrap py-3 px-4 text-sm font-medium text-gray-600">
                              Site Views
                            </th>
                            <th className="text-left text-nowrap py-3 px-4 text-sm font-medium text-gray-600">
                              Site Link
                            </th>
                            <th className="text-left text-nowrap py-3 px-4 text-sm font-medium text-gray-600">
                              API Key
                            </th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                              Delete
                            </th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                              View
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {AllProjects.map((project, index) => (
                            <tr
                              key={index}
                              className="border-b text-nowrap border-gray-100 hover:bg-white"
                            >
                              <td className="py-4 px-4 text-sm text-gray-700">
                                {FromatDate(project.createdAt)}
                              </td>
                              <td className="py-4 px-4 text-sm text-gray-700">
                                {project.name}
                              </td>
                              <td className="py-4 px-4 text-sm text-gray-700">
                                {project.stats.totalVisits}
                              </td>
                              <td className="py-4 px-4 text-sm text-gray-700">
                                <Link
                                  to={project.siteUrl}
                                  className="hover:text-blue-400 "
                                  target="_blank"
                                >
                                  {project.siteUrl}
                                </Link>
                              </td>
                              <div className="w-40 p-4 ellipsis relative">
                                {project.apiKey}
                              </div>
                              <td className="py-4 px-4">
                                <FiDelete
                                  onClick={() =>
                                    hanldeSiteDeletion(project._id)
                                  }
                                  size={27}
                                  className="text-red-500 cursor-pointer"
                                />
                              </td>
                              <td className="py-4 px-4">
                                <Link
                                  to={`/projects/${project._id}`}
                                  className="text-orange-500 text-nowrap text-sm font-medium flex items-center gap-1 hover:text-orange-600"
                                >
                                  View details
                                  <FaChevronRight className="text-xs" />
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-2xl flex-col mt-4 flex justify-center items-center w-full">
                    <svg
                      width={100}
                      height={100}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 88 88"
                    >
                      <path
                        d="m86.69 32.608-8.65-4.868 8.65-4.868a1 1 0 0 0 0-1.744l-32-18a1.002 1.002 0 0 0-.98 0L44 8.593l-9.71-5.465a1.002 1.002 0 0 0-.98 0l-32 18a1 1 0 0 0 0 1.744l8.65 4.868-8.65 4.868a1 1 0 0 0 0 1.744l9.69 5.45V66a1.001 1.001 0 0 0 .51.872l32 18A1.203 1.203 0 0 0 44 85a1.232 1.232 0 0 0 .49-.128l32-18A1.001 1.001 0 0 0 77 66V39.802l9.69-5.45a1 1 0 0 0 0-1.744zM43 44.03 14.04 27.74 43 11.45zm2-32.58 28.96 16.29L45 44.03zm9.2-6.303L84.161 22 76 26.593 46.04 9.74zm-20.4 0 8.16 4.593-22.47 12.64L12 26.593 3.839 22zM12 28.887 41.96 45.74l-8.16 4.593L3.839 33.48zm1 12.042 20.31 11.423a1 1 0 0 0 .98 0L43 47.45v34.84L13 65.415zm62 0v24.486L45 82.29V47.45l8.71 4.901a1 1 0 0 0 .98 0zm-20.8 9.404-8.16-4.593L76 28.888l8.161 4.592z"
                        style={{ fill: "#1d1b1e" }}
                        dataName="Unbox"
                      />
                    </svg>
                    <p>Nothing to Show</p>
                  </div>
                ) }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
