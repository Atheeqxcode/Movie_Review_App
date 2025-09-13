import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/generate-description', async (req, res) => {
  const { title, genre } = req.body;
  const prompt = `Write a short movie description for a ${genre} movie titled "${title}".`;
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    res.json({ description: result.response.text() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/summarize-reviews', async (req, res) => {
  const { reviews } = req.body;
  const prompt = `Summarize these reviews into a consensus (positive/neutral/negative): ${reviews.join(' ')}`;
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    res.json({ consensus: result.response.text() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/suggest-movies', async (req, res) => {
  const { genre } = req.body;
  const prompt = `Suggest 3 movies similar to the ${genre} genre.`;
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    res.json({ suggestions: result.response.text() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
