import express from "express";
import { GoogleGenAI } from "@google/genai";

const geminiRouter = express.Router();

// Save grade level into session
geminiRouter.post("/post", (req, res) => {
  req.session.gradeLevel = req.body.selectedGrade;
  console.log("Stored grade level:", req.session.gradeLevel);
  res.json({ success: true, gradeLevel: req.session.gradeLevel });
});

// Generate paragraph based on grade level
geminiRouter.get("/", async (req, res) => {
  if (!req.session.gradeLevel) {
    return res.status(400).json({ error: "No grade level set yet." });
  }

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: `Generate a random 10-line paragraph about a random topic. Write this paragraph at a ${req.session.gradeLevel} grade reading difficulty level.`
    });

    res.json({ answer: response.response.text() });
  } catch (err) {
    console.error("Error generating content:", err);
    res.status(500).json({ error: "AI generation failed" });
  }
});

export default geminiRouter;
