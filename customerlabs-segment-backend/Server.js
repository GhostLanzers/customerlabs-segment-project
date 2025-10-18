import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

// your webhook.site URL
const WEBHOOK_URL = "https://webhook.site/dab3791e-782b-4df4-b011-5f57f7009c48";

app.post("/api/send-segment", async (req, res) => {
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const text = await response.text();
    res.status(200).send({ message: "Data sent successfully", response: text });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to send data" });
  }
});

app.listen(5000, () => console.log("Proxy server running on port 5000"));