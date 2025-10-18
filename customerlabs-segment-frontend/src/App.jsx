import React, { useState } from "react";
import SaveSegmentDrawer from "./components/SaveSegmentDrawer";
import "./index.css";

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <button
        onClick={() => setOpen(true)}
        className="px-6 py-3 bg-gray-800 text-white text-lg rounded-md shadow hover:bg-gray-900"
      >
        Save segment
      </button>
      <SaveSegmentDrawer open={open} setOpen={setOpen} />
    </div>
  );
}
