import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { ArrowLeft, Minus } from "lucide-react";

const WEBHOOK_URL = "http://localhost:5000/api/send-segment";

const ALL_OPTIONS = [
  { label: "First Name", value: "first_name", type: "user" },
  { label: "Last Name", value: "last_name", type: "user" },
  { label: "Gender", value: "gender", type: "user" },
  { label: "Age", value: "age", type: "user" },
  { label: "Account Name", value: "account_name", type: "group" },
  { label: "City", value: "city", type: "group" },
  { label: "State", value: "state", type: "group" },
];

export default function SaveSegmentDrawer({ open, setOpen }) {
  const [segmentName, setSegmentName] = useState("");
  const [schemas, setSchemas] = useState([]);
  const [dropdownValue, setDropdownValue] = useState("");

  useEffect(() => {
    if (!open) {
      setSegmentName("");
      setSchemas([]);
      setDropdownValue("");
    }
  }, [open]);

  const usedValues = new Set(schemas.map((s) => s.value));
  const remainingOptions = ALL_OPTIONS.filter((o) => !usedValues.has(o.value));

  const handleAddSchema = () => {
    if (!dropdownValue) return;
    setSchemas([...schemas, { id: Date.now(), value: dropdownValue }]);
    setDropdownValue("");
  };

  const handleRemove = (id) => setSchemas(schemas.filter((s) => s.id !== id));

  const handleSave = async () => {
    if (!segmentName) return alert("Enter segment name");

    const schemaArray = schemas.map((s) => {
      const opt = ALL_OPTIONS.find((o) => o.value === s.value);
      return { [s.value]: opt?.label };
    });

    const body = { segment_name: segmentName, schema: schemaArray };

    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body, null, 2),
      });
      alert("Segment saved!");
      setOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to save segment");
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between bg-teal-600 text-white px-4 py-3 shadow">
          <button onClick={() => setOpen(false)} className="flex items-center">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </button>
          <h2 className="text-lg font-semibold">Save Segment</h2>
          <div></div> {/* empty div for spacing */}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 text-gray-700">
          {/* Segment Name */}
          <div>
            <label className="block font-medium mb-1">Segment Name</label>
            <input
              type="text"
              placeholder="Enter segment name"
              value={segmentName}
              onChange={(e) => setSegmentName(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-teal-400 outline-none"
            />
          </div>

          <p className="text-sm text-gray-600">
            Add schemas to build your segment query.
          </p>

          {/* Legend */}
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1 text-green-600">
              <span className="w-2 h-2 bg-green-600 rounded-full"></span> User Traits
            </span>
            <span className="flex items-center gap-1 text-pink-600">
              <span className="w-2 h-2 bg-pink-600 rounded-full"></span> Group Traits
            </span>
          </div>

          {/* Schema Box */}
          <div className="border border-blue-300 rounded-lg p-4 bg-blue-50 space-y-3">
            {schemas.map((s) => {
              const opt = ALL_OPTIONS.find((o) => o.value === s.value);
              const otherUsed = new Set(
                schemas.filter((x) => x.id !== s.id).map((x) => x.value)
              );
              const available = ALL_OPTIONS.filter(
                (o) => !otherUsed.has(o.value) || o.value === s.value
              );

              return (
                <div
                  key={s.id}
                  className="flex items-center gap-2 bg-white border border-gray-200 rounded-md p-2"
                >
                  <span
                    className={`w-3 h-3 rounded-full ${
                      opt?.type === "user" ? "bg-green-500" : "bg-pink-500"
                    }`}
                  />
                  <select
                    value={s.value}
                    onChange={(e) =>
                      setSchemas((prev) =>
                        prev.map((x) =>
                          x.id === s.id ? { ...x, value: e.target.value } : x
                        )
                      )
                    }
                    className="flex-1 border border-gray-300 rounded-md px-2 py-1 text-gray-700 focus:ring-1 focus:ring-blue-400"
                  >
                    {available.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleRemove(s.id)}
                    className="p-1 text-gray-500 hover:text-red-600"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                </div>
              );
            })}

            <select
              value={dropdownValue}
              onChange={(e) => setDropdownValue(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-2 py-2 text-gray-700 focus:ring-1 focus:ring-blue-400"
            >
              <option value="">Add schema</option>
              {remainingOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>

            <button
              onClick={handleAddSchema}
              className="text-teal-600 text-sm font-medium hover:underline"
            >
              + Add new schema
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t p-4">
          <button
            onClick={() => setOpen(false)}
            className="px-4 py-2 bg-rose-100 text-rose-600 rounded-md hover:bg-rose-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
          >
            Save
          </button>
        </div>
      </div>
    </Dialog>
  );
}
