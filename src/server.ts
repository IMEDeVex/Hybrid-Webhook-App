import express from "express";
import bodyParser from "body-parser";
import inbound from "./routes/inbound";
import outbound from "./routes/outbound";

const app = express();
app.use(bodyParser.json());

app.use("/webhook/inbound", inbound);
app.use("/webhook/outbound", outbound);

app.get("/webhook/test", (req, res) => {
  res.json({
    status: "ready",
    publicKeyFingerprint: "TODO",
    supportedEvents: ["manifest.update", "resolver.hint"]
  });
});

app.listen(3000, () => {
  console.log("Hybrid webhook server running on port 3000");
});
