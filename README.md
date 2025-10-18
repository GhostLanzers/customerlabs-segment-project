# 🎯 CustomerLabs Segment Builder — React + Tailwind v4 + Node Proxy

This project is a **Segment Builder UI**, inspired by CustomerLabs-style audience segmentation. It allows users to **dynamically create and save user/group-based segments**, which are then **sent to a webhook endpoint via a backend proxy** to bypass CORS issues.

---

## 🚀 Project Goal

The goal of this project is to simulate how SaaS platforms (like CustomerLabs, Segment.com, Mixpanel, Clevertap) allow marketers to:

- 🎛 Build **dynamic rules/segments** using schema selectors (User Traits & Group Traits)
- ➕ **Add or remove conditions** interactively via a modern UI drawer
- 💾 **Save & send the segment data** to a backend safely using an **Express proxy**
- 🔐 Bypass **CORS restrictions** by routing frontend requests through a **local Node backend**

---

## 🏗 Tech Stack

| Layer         | Technology Used |
|--------------|-----------------|
| Frontend      | React.js (Vite) ✅ |
| Styling       | Tailwind CSS v4 ✅ |
| UI Components | Headless UI + Lucide Icons ✅ |
| Backend Proxy | Node.js + Express + CORS + node-fetch ✅ |
| Data Transfer | Webhook via Proxy Server (`/api/send-segment`) ✅ |

---

## 📌 Features Implemented

- ✅ **Modern Drawer UI** for saving segments (Headless UI + Tailwind v4)
- ✅ **Dynamic Schema Selection** with prevention of duplicate options
- ✅ **Categorized Schemas** (User Traits 🟢 / Group Traits 🔴)
- ✅ **Express Backend Proxy** to safely forward data to Webhook
- ✅ **CORS-safe API routing**
- ✅ Clean **React component architecture**

---

## 🧠 How It Works — Flow Diagram

React UI (Save Segment Drawer)
|
| POST /api/send-segment ➡ (Local Node.js Proxy Server)
|
Node.js Proxy (sends sanitized payload)
|
| POST https://webhook.site/dab3791e-782b-4df4-b011-5f57f7009c48

|
Webhook Receives Final JSON ✅

---

## 📂 Project Structure

customerlabs-segment/
│
├── customerlabs-segment-frontend/ src/
│ ├── components/
│ │ └── SaveSegmentDrawer.jsx
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css (Tailwind v4 import)
│
├── customerlabs-segment-backend/ server.js (Express Proxy Backend)
├── postcss.config.js (Tailwind v4 + PostCSS Fix for Vite)
├── package.json
└── README.md


---

🔌 API Configuration

In your frontend file SaveSegmentDrawer.jsx, set: const WEBHOOK_URL = "http://localhost:5000/api/send-segment";

The Express backend will forward payloads to: https://webhook.site/xxxxxxxxx

This eliminates CORS issues, as the browser talks only to the local proxy, not directly to the webhook.


---

## ⚙️ Installation & Setup Guide

```bash
git clone https://github.com/YOUR_USERNAME/customerlabs-segment.git
cd customerlabs-segment
```
Install Frontend Dependencies : npm install
Install Backend Dependencies : npm install express cors node-fetch
Start Backend Proxy Server : node server.js
Start Frontend (React + Vite) : npm run dev

---

**##Future Enhancements (Optional)**

✅ Save segment history in localStorage

✅ Deploy backend to Render / Railway

✅ Add loader and toast notifications

---


📎 Credits

Built with ❤️ using React 18 + Tailwind v4 + Vite + Node.js (Express Proxy).
