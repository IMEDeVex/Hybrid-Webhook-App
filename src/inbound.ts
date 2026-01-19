import { Router } from "express";
import Ajv from "ajv";
import eventSchema from "../schemas/eventEnvelope.schema.json";

const router = Router();
const ajv = new Ajv();

router.post("/", (req, res) => {
  const valid = ajv.validate(eventSchema, req.body);
  if (!valid) return res.status(400).json({ error: "schema_violation" });

  if (req.body.signature !== null)
    return res.status(400).json({ error: "signature_not_allowed" });

  console.log("[INBOUND EVENT]", req.body);

  res.json({
    status: "ok",
    received: req.body.id
  });
});

export default router;
