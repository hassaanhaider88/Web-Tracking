import React, { useEffect, useState, useRef } from "react";
import API from "../utils/api";
import { useParams } from "react-router-dom";
import { connectSocket, getSocket } from "../store/socket";
import copy from "copy-to-clipboard";
import { toast } from "react-hot-toast";

const TRACK_SNIPPET = (
  key
) => `<!-- Web Tracking script: paste before </body> on the site you want to track -->
<script>
(function () {
  const API = "http://localhost:3000/api/track";
  const API_KEY = "${key}";

  function getClientInfo() {
    return {
      ua: navigator.userAgent || "",
      platform: navigator.platform || "",
      language: navigator.language || "",
      screen: { width: screen.width, height: screen.height }
    };
  }

  function sendPing() {
    const payload = {
      apiKey: API_KEY,
      url: location.href,
      path: location.pathname + location.search,
      referrer: document.referrer || null,
      timestamp: Date.now(),
      client: getClientInfo()
    };
    const body = JSON.stringify(payload);

    try {
         fetch(API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body
        })
      } 
      catch(e){
      console.log(e)
      }
  }

  if (document.readyState === "complete" || document.readyState === "interactive") {
    sendPing();
  } else {
    window.addEventListener("DOMContentLoaded", sendPing);
  }
  document.addEventListener("visibilitychange", function(){ if (document.visibilityState === 'visible') sendPing(); });
})();
</script>`;

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [visits, setVisits] = useState([]);
  const [summary, setSummary] = useState({ totalVisits: 0, uniqueIPs: 0 });
  const socketRef = useRef(null);

  useEffect(() => {
    fetchData();
    connectSocket();
    const socket = getSocket();
    socketRef.current = socket;
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
    try {
      const res = await API.get(`/projects/${id}/visits`);
      setVisits(res.data.visits || []);
      setSummary(res.data.summary || {});
      setProject(res.data.project || null);
    } catch (err) {
      console.error(err);
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
    <div className="p-6">
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
    </div>
  );
}
