import { BiDownArrow } from "react-icons/bi"; 
// ModernUniqueUserAccordion.jsx
import React, { useState } from "react";

const ModernUniqueUserAccordion = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full  border border-orange-300 rounded-xl shadow-lg mb-0 bg-white/90 backdrop-blur-md overflow-hidden">
      
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 text-left hover:bg-orange-50 transition-colors"
      >
        <div>
          <h2 className="text-lg font-bold text-orange-600">User ID: {user.userId}</h2>
          <p className="text-gray-500 text-sm">{user.count} visits</p>
        </div>
        <span className={`text-orange-500 text-xl transform transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}>
          <BiDownArrow size={23}/>
        </span>
      </button>

      {/* Collapsible content */}
      {isOpen && (
        <div className="p-4 border-t border-orange-200 space-y-3">
          
          {/* User info table */}
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-800">
            <div>
              <span className="font-semibold text-orange-500">Country:</span>
              <p>{user.visits[0]?.country || "Unknown"}</p>
            </div>
            <div>
              <span className="font-semibold text-orange-500">Browser:</span>
              <p>{user.visits[0]?.browser}</p>
            </div>
            <div>
              <span className="font-semibold text-orange-500">OS:</span>
              <p>{user.visits[0]?.os}</p>
            </div>
            <div>
              <span className="font-semibold text-orange-500">Device:</span>
              <p>{user.visits[0]?.device}</p>
            </div>
            <div className="col-span-2">
              <span className="font-semibold text-orange-500">UA:</span>
              <p className="text-xs break-all">{user.visits[0]?.ua}</p>
            </div>
          </div>

          {/* Visits list */}
          <div>
            <h3 className="text-orange-600 font-semibold mb-2 text-sm">Visits Timeline</h3>
            <ul className="space-y-2 max-h-48 overflow-y-auto pr-2">
              {user.visits.map((visit) => (
                <li
                  key={visit._id}
                  className="p-2 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors flex justify-between items-center text-xs shadow-sm"
                >
                  <div className="flex flex-col">
                    <span className="text-gray-800 truncate">{visit.path}</span>
                    <span className="text-gray-500 truncate">Referrer: {visit.referrer || "Direct"}</span>
                  </div>
                  <span className="text-gray-400 text-[10px] ml-2">{new Date(visit.createdAt).toLocaleTimeString()}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModernUniqueUserAccordion;
