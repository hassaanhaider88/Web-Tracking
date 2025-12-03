import { BiArrowBack } from "react-icons/bi";
import React, { useEffect, useState, useRef } from "react";
import API, { BackEndURI } from "../utils/api";
import { useNavigate, useParams } from "react-router-dom";
import { connectSocket, getSocket } from "../store/socket";
import copy from "copy-to-clipboard";
import { toast } from "react-hot-toast";
import ControlDashboardUI from "../Components/ProjectDetails";
import CodeCard from "../Components/CodeSnippet";
import getUniqueUsers from "../utils/getUniqueUser";
// import UniqueUserCard from "../Components/UniqueUserCard";
import ModernUniqueUserCard from "../Components/UniqueUserCard";

const TRACK_SNIPPET = (key) => `
<!-- Paste This Code Into Your Route .html File -->
<script>
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
    function getOrCreateUserId() {
    let id = localStorage.getItem("uniqueUserId");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("uniqueUserId", id);
    }
    return id;
  }
    const userId = getOrCreateUserId();
    const payload = {
      apiKey: API_KEY,
      userId,
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
  const [summary, setSummary] = useState({ totalVisits: 0 });
  const [LoadingState, setLoadingState] = useState(false);
  const [AllUniqueUser, setAllUniqueUser] = useState([]);
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
        console.log(summary);
      } catch (e) {}
    };
  }, [id]);

  async function fetchData() {
    setLoadingState(true);
    try {
      const res = await API.get(`/projects/${id}/visits`);
      console.log(res);
      setVisits(res.data.visits || []);
      setSummary(res.data.summary || {});
      setProject(res.data.project || null);
      var ResUsers = getUniqueUsers(res.data.visits || []);
      setAllUniqueUser(ResUsers);
      console.log(ResUsers);

      setLoadingState(false);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Failed");
      setLoadingState(false);
      navigate("/dashboard");
    }
  }

  return LoadingState ? (
    "Loading..."
  ) : (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
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
      <div className="mt-20">
        <ControlDashboardUI
          projectDetails={{
            projectName: project?.name,
            porjectAPIKey: project?.apiKey,
            projectVisits: summary.totalVisits || 0,
            projectUniqueUsers: AllUniqueUser.length || 0,
            projectErrors: "0",
          }}
        />
      </div>
      <div className="CopyCodeView science-gothic-Code">
        <CodeCard
          initialCode={TRACK_SNIPPET(
            project?.apiKey || "PASTE_PROJECT_API_KEY_HERE"
          )}
        />
      </div>
      <h1 className="py-5 text-5xl">Unique User Info</h1>
      <div className="w-full flex flex-col px-5 py-4 gap-5">
        {AllUniqueUser.length > 0
          ? AllUniqueUser.map((user, index) => {
              return <ModernUniqueUserCard user={user} key={index} />;
            })
          : "Nothing to Show"}
      </div>
    </div>
  );
}
