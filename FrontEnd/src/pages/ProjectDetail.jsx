import { BiArrowBack } from "react-icons/bi";
import React, { useEffect, useState, useRef } from "react";
import API, { BackEndURI } from "../utils/api";
import { useNavigate, useParams } from "react-router-dom";
import { connectSocket, getSocket } from "../store/socket";
import copy from "copy-to-clipboard";
import { toast } from "react-hot-toast";
import ControlDashboardUI from "../Components/ProjectDetails";
import CodeCard from "../Components/CodeSnippet";


const TRACK_SNIPPET = (
  key
) => `<script>
(function () {
  const API = "${BackEndURI}/api/track";
  const API_KEY = "${key}";

  let hasPinged = false;

  function sendPing() {
    // block duplicates by page load
    if (hasPinged) return;
    hasPinged = true;

    // block duplicates per tab
    if (sessionStorage.getItem("hasPinged") === "true") return;
    sessionStorage.setItem("hasPinged", "true");

    const payload = {
      apiKey: API_KEY,
      url: location.href,
      path: location.pathname + location.search,
      referrer: document.referrer || null,
      timestamp: Date.now(),
      client: {
        ua: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        screen: { width: screen.width, height: screen.height }
      }
    };

    fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }).catch(console.error);
  }

  // Run only once
  if (document.readyState === "complete" || document.readyState === "interactive") {
    sendPing();
  } else {
    document.addEventListener("DOMContentLoaded", sendPing, { once: true });
  }

})();
</script>
`;

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [visits, setVisits] = useState([]);
  const [summary, setSummary] = useState({ totalVisits: 0, uniqueIPs: 0 });
  const [LoadingState, setLoadingState] = useState(false);

  const socketRef = useRef(null);

  useEffect(() => {
    fetchData();
    connectSocket();
    const socket = getSocket();
    socketRef.current = socket;
    console.log(project);
    console.log(visits);
    if (socket) {
      socket.on("visit", (payload) => {
        if (payload.projectId === id) {
          setVisits((v) => [payload.visit, ...v]);
          setSummary((s) => ({ ...s, totalVisits: (s.totalVisits || 0) + 1 }));
        }
      });
    }
    return () => {
      // cleanup
      try {
        socketRef.current?.off && socketRef.current.off("visit");
      } catch (e) {}
    };
  }, [id]);

  async function fetchData() {
    setLoadingState(true)
    try {
      const res = await API.get(`/projects/${id}/visits`);
      console.log(res)
      setVisits(res.data.visits || []);
      setSummary(res.data.summary || {});
      setProject(res.data.project || null);
      setLoadingState(false)
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Failed");
      setLoadingState(false)
      navigate("/dashboard");
    }
  }

  function maskIp(ip = "") {
    if (!ip) return "";
    const parts = ip.split(".");
    if (parts.length === 4)
      return parts[0] + "." + parts[1] + ".***." + parts[3];
    return ip;
  }

  function copySnippet() {
    copy(TRACK_SNIPPET(project?.apiKey || "PASTE_PROJECT_API_KEY_HERE"));
    toast.success("Snippet copied");
  }

  return (
    LoadingState ? 
   "Loading..." : <div className="min-h-screen flex flex-col items-center justify-center"
    style={{
        background: "linear-gradient(135deg, #e0eafc, #c5d7f1)", // Soft gradient background
      }}
    >
      <div

        onClick={() => window.history.back()}
        id="ReturnArrow"
        className="w-12 h-12 fixed left-3 top-3 cursor-pointer active:scale-95 duration-200 transition-all rounded-full bg-orange-500 flex justify-center items-center"
      >
        <BiArrowBack size={26} color="white" />
      </div>
      <div 
      
      className="mt-20">
        <ControlDashboardUI 
        projectDetails={{
        projectName: project?.name,
        porjectAPIKey : project?.apiKey,
        projectVisits: summary.totalVisits || 0,
        projectUniqueUsers: summary.uniqueIPs || 0,
        projectErrors: "0",
        }}/>
      </div>
      <div className="CopyCodeView">
        <CodeCard initialCode={TRACK_SNIPPET(project?.apiKey || "PASTE_PROJECT_API_KEY_HERE")}/>
      </div>
      {/* <div className="p-6 mt-20">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{project?.name || "Project"}</h1>
          <div>
            <button onClick={copySnippet} className="btn">
              Copy snippet
            </button>
          </div>
        </header>

        <section className="mb-6">
          <h2 className="font-semibold">Summary</h2>
          <div className="flex space-x-4 mt-2">
            <div className="bg-white p-4 rounded shadow">
              Total Visits
              <br />
              <strong>{summary.totalVisits || 0}</strong>
            </div>
            <div className="bg-white p-4 rounded shadow">
              Unique IPs
              <br />
              <strong>{summary.uniqueIPs || 0}</strong>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-semibold mb-2">Live Visits</h2>
          <div className="space-y-2 flex flex-wrap w-full justify-center items-center gap-4">
            {visits.map((v) => (
              <div
                key={v._id || Math.random()}
                className="bg-white shrink-0 w-fit p-3 rounded shadow flex justify-between"
              >
                <div>
                  <div className="text-sm text-gray-600">
                    {maskIp(v.ip)} • {v.geo?.country || ""}{" "}
                    {v.geo?.city ? "/" + v.geo.city : ""}
                  </div>
                  <div className="font-medium">{v.path}</div>
                  <div className="text-xs text-gray-500">
                    {v.browser} • {v.os} • {v.device}
                  </div>
                </div>
                <div className="text-xs text-gray-400">
                  {new Date(v.createdAt).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div> */}
    </div> 
  );
}
