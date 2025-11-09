import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { analyzeQuizRequestSchema, createShareRequestSchema, type VibeAnalysis } from "@shared/schema";
import { z } from "zod";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const vibeAnalysisSchema = z.object({
  results: z.array(z.object({
    percentage: z.number(),
    label: z.string(),
    emoji: z.string(),
  })),
  binaryTags: z.array(z.object({
    code: z.string(),
    meaning: z.string(),
  })),
  description: z.string(),
});

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/analyze", async (req, res) => {
    try {
      const parseResult = analyzeQuizRequestSchema.safeParse(req.body);
      
      if (!parseResult.success) {
        return res.status(400).json({ 
          error: "Invalid request",
          details: parseResult.error.issues
        });
      }
      
      const { answers } = parseResult.data;
      
      if (answers.length === 0) {
        return res.status(400).json({ 
          error: "No quiz answers provided"
        });
      }
      
      const prompt = `You are a personality analyzer for "Binary Babes", a fun AI-powered personality quiz. 
Based on the user's quiz answers, create a playful, insightful, and UNIQUE personality analysis.

Quiz answers (20 questions): ${answers.join(", ")}

IMPORTANT INSTRUCTIONS:
- Analyze the pattern of ALL 20 answers to create a nuanced, multi-dimensional personality profile
- Avoid generic or repetitive traits - make each personality label UNIQUE and specific
- Use creative, unexpected labels that capture different facets of their personality
- The three traits should represent distinct dimensions (e.g., how they think, how they act, how they relate to others)
- Binary tags should reflect specific behavioral patterns or quirks
- Description should weave together contradictions and complexities in their personality

Generate a JSON response with:
1. Three personality trait percentages (must add up to 100%) - make labels creative and specific
2. 5-6 binary personality tags (3-digit binary codes like "101" paired with specific traits)
3. A 2-3 paragraph description that's fun, slightly cheeky, insightful, and captures their unique contradictions

CREATIVE LABEL IDEAS (don't copy these exactly, use them as inspiration):
- "Calculated Chaos Merchant"
- "Philosophical Adrenaline Junkie"
- "Empathetic Mastermind"
- "Strategic Procrastinator"
- "Wholesome Rebel"
- "Analytical Dreamer"
- "Chaotic Good Energy"
- "Methodical Wild Card"
- "Socially Selective Extrovert"
- "Ambitious Chill Vibes"

The tone should be playful, witty, and insightful - like a friend who really gets them.

Return ONLY a valid JSON object with this structure:
{
  "results": [
    {"percentage": 65, "label": "Creative Label Here", "emoji": "⚡"},
    {"percentage": 25, "label": "Another Creative Label", "emoji": "🧘"},
    {"percentage": 10, "label": "Third Creative Label", "emoji": "😎"}
  ],
  "binaryTags": [
    {"code": "101", "meaning": "specific trait"},
    {"code": "011", "meaning": "specific trait"},
    {"code": "110", "meaning": "specific trait"},
    {"code": "100", "meaning": "specific trait"},
    {"code": "001", "meaning": "specific trait"}
  ],
  "description": "A fun 2-3 paragraph analysis that captures their unique personality patterns, contradictions, and what makes them tick. Be specific and insightful."
}`;

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a creative personality analyzer. Return only valid JSON, no additional text."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.8,
        response_format: { type: "json_object" }
      });

      const content = completion.choices[0].message.content;
      if (!content) {
        return res.status(500).json({ 
          error: "AI analysis failed",
          message: "No response from AI"
        });
      }

      let parsedContent;
      try {
        parsedContent = JSON.parse(content);
      } catch (e) {
        return res.status(500).json({ 
          error: "AI analysis failed",
          message: "Invalid JSON from AI"
        });
      }

      const validationResult = vibeAnalysisSchema.safeParse(parsedContent);
      if (!validationResult.success) {
        console.error("AI returned invalid schema:", validationResult.error);
        return res.status(500).json({ 
          error: "AI analysis failed",
          message: "AI returned invalid data format"
        });
      }

      const analysis: VibeAnalysis = validationResult.data;
      
      const quizResult = await storage.createQuizResult({
        answers,
        analysis,
      });

      res.json({
        id: quizResult.id,
        analysis,
      });
    } catch (error) {
      console.error("Error analyzing quiz:", error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          error: "Invalid request format",
          details: error.issues
        });
      }
      
      res.status(500).json({ 
        error: "Server error",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Share API routes
  app.post("/api/share", async (req, res) => {
    try {
      const parseResult = createShareRequestSchema.safeParse(req.body);
      
      if (!parseResult.success) {
        return res.status(400).json({ 
          error: "Invalid request",
          details: parseResult.error.issues
        });
      }
      
      const { resultId, imageData } = parseResult.data;
      
      // Get the quiz result to include analysis
      const quizResult = await storage.getQuizResult(resultId);
      if (!quizResult) {
        return res.status(404).json({ 
          error: "Quiz result not found"
        });
      }
      
      const sharedVibe = await storage.createSharedVibe(
        resultId,
        imageData,
        quizResult.analysis as VibeAnalysis
      );
      
      res.json({
        id: sharedVibe.id,
        shareUrl: `${req.protocol}://${req.get('host')}/share/${sharedVibe.id}`,
      });
    } catch (error) {
      console.error("Error creating share:", error);
      res.status(500).json({ 
        error: "Server error",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  app.get("/api/share/:id/data", async (req, res) => {
    try {
      const sharedVibe = await storage.getSharedVibe(req.params.id);
      
      if (!sharedVibe) {
        return res.status(404).json({ 
          error: "Share not found"
        });
      }
      
      res.json({
        id: sharedVibe.id,
        analysis: sharedVibe.analysis,
      });
    } catch (error) {
      console.error("Error fetching share data:", error);
      res.status(500).json({ 
        error: "Server error"
      });
    }
  });

  app.get("/share/:id/image.png", async (req, res) => {
    try {
      const sharedVibe = await storage.getSharedVibe(req.params.id);
      
      if (!sharedVibe) {
        return res.status(404).send("Not found");
      }
      
      // Convert base64 to buffer
      const base64Data = sharedVibe.imageData.replace(/^data:image\/png;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');
      
      res.setHeader('Content-Type', 'image/png');
      res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 1 day
      res.send(buffer);
    } catch (error) {
      console.error("Error serving image:", error);
      res.status(500).send("Error serving image");
    }
  });

  app.get("/share/:id", async (req, res) => {
    try {
      const sharedVibe = await storage.getSharedVibe(req.params.id);
      
      if (!sharedVibe) {
        return res.status(404).send("Share not found");
      }
      
      const analysis = sharedVibe.analysis as VibeAnalysis;
      const imageUrl = `${req.protocol}://${req.get('host')}/share/${req.params.id}/image.png`;
      const pageUrl = `${req.protocol}://${req.get('host')}/share/${req.params.id}`;
      
      // Generate HTML with Open Graph tags
      const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${analysis.results[0].label} - Binary Babes</title>
  
  <!-- Open Graph Meta Tags -->
  <meta property="og:title" content="I'm ${analysis.results[0].percentage}% ${analysis.results[0].label}!" />
  <meta property="og:description" content="Check out my Binary Vibe personality analysis! ${analysis.description.substring(0, 150)}..." />
  <meta property="og:image" content="${imageUrl}" />
  <meta property="og:url" content="${pageUrl}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Binary Babes" />
  
  <!-- Twitter Card Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="I'm ${analysis.results[0].percentage}% ${analysis.results[0].label}!" />
  <meta name="twitter:description" content="${analysis.description.substring(0, 150)}..." />
  <meta name="twitter:image" content="${imageUrl}" />
  
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 0;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      background: white;
      border-radius: 16px;
      padding: 40px;
      text-align: center;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }
    h1 {
      color: #667eea;
      margin: 0 0 20px 0;
    }
    img {
      max-width: 100%;
      border-radius: 8px;
      margin: 20px 0;
    }
    .cta {
      display: inline-block;
      background: #667eea;
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      margin-top: 20px;
    }
    .cta:hover {
      background: #5568d3;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Binary Babes</h1>
    <p>I'm ${analysis.results[0].percentage}% ${analysis.results[0].label}!</p>
    <img src="${imageUrl}" alt="My Binary Vibe" />
    <a href="/" class="cta">Discover Your Vibe</a>
  </div>
</body>
</html>`;
      
      res.send(html);
    } catch (error) {
      console.error("Error serving share page:", error);
      res.status(500).send("Error loading page");
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
