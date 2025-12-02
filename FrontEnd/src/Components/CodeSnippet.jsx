// CodeCard.jsx
import React, { useState } from "react";
import toast from "react-hot-toast";
import { BsFillClipboardCheckFill, BsFillClipboardFill } from "react-icons/bs";

export default function CodeCard({
  initialCode = ``,
  editable = true,
  width = "w-[550px]",
  height = "h-[600px]",
}) {
  const [code, setCode] = useState(initialCode);
    const [IsCopyloading, setIsCopyloading] = useState(false);
  
  const hanleCopySnippetCode = (codeToCopy) => {
    navigator.clipboard.writeText(codeToCopy);
    toast.success("Code Copied")
    setIsCopyloading(true);
    setTimeout(() => {
      setIsCopyloading(false);
    }, 1000);
  };


  return (
    <div className={`mx-auto ${width} ${height} transform transition-all`}>
      <div
        className="rounded-lg bg-[#24233b] shadow-[0px_10px_10px_rgba(73,70,92,0.9)] overflow-hidden"
        style={{ minWidth: 300 }}
      >
        {/* Header */}
        <div className="p-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#ff605c]" />
              <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#ffbd44]" />
              <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#00ca4e]" />
            </div>

            <div className="ml-4">
              <p id="title2" className="text-white text-sm select-none">
                Code.js
              </p>
            </div>
            <button onClick={()=>hanleCopySnippetCode(initialCode)} className="CopyKey">
                          {
                            IsCopyloading ? <BsFillClipboardCheckFill size={23} className="text-slate-200 ml-2" /> :  <BsFillClipboardFill  size={23} className="text-slate-200 ml-2"/> }
                          </button>
          </div>
        </div>

        {/* Code container */}
        <div className="px-3 pb-3">
          <textarea
            id="code"
            name="code"
            readOnly={!editable}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className={`w-full ${height === "h-[600px]" ? "h-[530px]" : "h-[550px]"} resize-none rounded-md border-0 bg-[#49465c] text-white p-3 text-xs leading-5 outline-none`}
          />
        </div>
      </div>
    </div>
  );
}
