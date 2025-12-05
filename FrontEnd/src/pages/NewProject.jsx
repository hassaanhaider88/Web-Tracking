// import React, { useState } from "react";
// import API from "../utils/api";
// import { toast } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// export default function NewProject() {
//   const [form, setForm] = useState({ name: "", siteUrl: "" });
//   const [IsFormSubmiting, setIsFormSubmiting] = useState(false);

//   const nav = useNavigate();

//   async function submit(e) {
//     e.preventDefault();
//     setIsFormSubmiting(true);
//     try {
      
//       const res = await API.post("/projects", form);
//       toast.success("Project created");
//       nav("/dashboard");
//       setIsFormSubmiting(false);
//     } catch (err) {
//       console.error(err);
//       toast.error(err.response?.data?.error || "Failed");
//       setIsFormSubmiting(false);
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <form
//         onSubmit={submit}
//         className="flex flex-col items-center text-sm text-slate-800"
//       >
//         <h1 className="text-4xl font-bold py-4 text-center">
//           Let’s Create Site
//         </h1>

//         <div className="max-w-96 w-full px-4">
//           <label htmlFor="Sitename" className="font-medium">
//             Site Name
//           </label>
//           <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-orange-400 transition-all overflow-hidden">
//             <input
//               className="input h-full px-2 w-full outline-none bg-transparent "
//               placeholder="Site Name"
//               value={form.name}
//               onChange={(e) => setForm({ ...form, name: e.target.value })}
//               required
//             />
//           </div>

//           <label htmlFor="email-address" className="font-medium mt-4">
//             Site Live URL
//           </label>
//           <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-orange-400 transition-all overflow-hidden">
//             <input
//               type="url"
//               className="input input h-full px-2 w-full outline-none bg-transparent"
//               placeholder="https://example.com"
//               value={form.siteUrl}
//               onChange={(e) => setForm({ ...form, siteUrl: e.target.value })}
//               required
//             />
//           </div>

//           <button
//             disabled={IsFormSubmiting}
//             type="submit"
//             className={`${
//               IsFormSubmiting ? "cursor-not-allowed" : "cursor-pointer"
//             } flex items-center justify-center gap-1 mt-5 bg-orange-500 hover:bg-orange-600 text-white py-2.5 w-full rounded-full transition`}
//           >
//             {IsFormSubmiting ? "Creating..." : "Create"}
//           </button>
//           <button
//             type="button"
//             onClick={() => window.history.back()}
//             className="cursor-pointer flex items-center justify-center gap-1 mt-2 bg-white text-black border border-orange-600  py-2.5 w-full rounded-full transition"
//           >
//             Cencel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }


import React, { useState } from "react";
import API from "../utils/api";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function NewProject() {
  const [name, setName] = useState("");
  const [siteUrl, setSiteUrl] = useState("");

  const [step, setStep] = useState(1); 
  const [metaTag, setMetaTag] = useState("");
  const [siteId, setSiteId] = useState("");

  const [loading, setLoading] = useState(false);

  const nav = useNavigate();

  // STEP 1: Request Ownership Meta Tag
  async function requestVerification(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/website/add", { url: siteUrl });

      if (!res.data.success) {
        toast.error(res.data.message || "Failed");
        setLoading(false);
        return;
      }

      setMetaTag(res.data.verificationTag);
      setSiteId(res.data.site._id);
      setStep(2);
      toast.success("Meta tag generated!");
    } catch (err) {
      toast.error("Something went wrong");
    }

    setLoading(false);
  }

  // STEP 2: Verify Ownership
  async function verifySite() {
    setLoading(true);

    try {
      const res = await API.post("/website/verify", { siteId });

      if (res.data.success && res.data.verified) {
        toast.success("Ownership Verified");
        setStep(3);
      } else {
        toast.error("Verification failed. Make sure meta tag is added correctly.");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }

    setLoading(false);
  }

  // STEP 3: Create Project Only After Verification
  async function createProject() {
    setLoading(true);

    try {
      await API.post("/projects", { name, siteUrl });
      toast.success("Project created");
      nav("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-96 w-full px-4 text-sm text-slate-800">

        <h1 className="text-4xl font-bold py-4 text-center">
          Let’s Create Site
        </h1>

        {/* STEP 1 UI */}
        {step === 1 && (
          <form onSubmit={requestVerification}>
            <label className="font-medium">Site Name</label>
            <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full">
              <input
                className="h-full px-2 w-full outline-none bg-transparent"
                placeholder="Site Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <label className="font-medium mt-4">Site Live URL</label>
            <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full">
              <input
                type="url"
                className="h-full px-2 w-full outline-none bg-transparent"
                placeholder="https://example.com"
                value={siteUrl}
                onChange={(e) => setSiteUrl(e.target.value)}
                required
              />
            </div>

            <button
              disabled={loading}
              type="submit"
              className="bg-orange-500 text-white py-2.5 w-full rounded-full"
            >
              {loading ? "Processing..." : "Verify Ownership"}
            </button>
          </form>
        )}

        {/* STEP 2 UI */}
        {step === 2 && (
          <div className="mt-6">
            <p className="font-medium text-slate-700">Add this meta tag to your site:</p>

            <pre className="mt-3 p-3 select-all bg-gray-100 rounded text-xs whitespace-pre-wrap">
              {metaTag}
            </pre>

            <p className="mt-3 text-sm text-gray-600">
              After adding the meta tag to your website’s &lt;head&gt; section, click verify.
            </p>

            <button
              onClick={verifySite}
              disabled={loading}
              className="mt-4 bg-orange-500 text-white py-2.5 w-full rounded-full"
            >
              {loading ? "Verifying..." : "Verify Now"}
            </button>
          </div>
        )}

        {/* STEP 3 UI */}
        {step === 3 && (
          <div className="mt-6 text-center">
            <p className="text-green-600 font-medium">Ownership Verified!</p>

            <button
              onClick={createProject}
              disabled={loading}
              className="mt-4 bg-orange-500 text-white py-2.5 w-full rounded-full"
            >
              {loading ? "Creating..." : "Create Project"}
            </button>
          </div>
        )}
        <button
            type="button"
            onClick={() => window.history.back()}
            className="cursor-pointer flex items-center justify-center gap-1 mt-2 bg-white text-black border border-orange-600  py-2.5 w-full rounded-full transition"
          >
            Cencel
          </button>
      </div>
    </div>
  );
}
