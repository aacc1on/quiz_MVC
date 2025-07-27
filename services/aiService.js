// ====== services/aiService.js ======
const axios = require('axios');

class AIService {
  static async generateQuizFromText(text) {
    console.log('[AI_SERVICE] Quiz generation started');
    
    if (!text || typeof text !== 'string' || text.trim().length < 20) {
      throw new Error('Input text must be at least 20 characters long');
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      throw new Error('OPENROUTER_API_KEY is not configured');
    }

    const prompt = `
Generate 10 quiz questions based on the following text. For each question, pick a difficult English word from the text or related vocabulary, and provide:
- "word": the difficult word,
- "question": "Which of the following is the closest easier synonym for 'word'?",
- "options": 4 English options (one correct, three distractors),
- "correct": the correct easier synonym (must be one of the options).

Text: "${text.substring(0, 1000)}"

Return only valid JSON in this format:
{
  "quiz": [
    {
      "word": "example",
      "question": "Which of the following is the closest easier synonym for 'example'?",
      "options": ["instance", "difficult", "complex", "impossible"],
      "correct": "instance"
    }
  ]
}
`;

    try {
      const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: "mistralai/mistral-7b-instruct:free",
          messages: [
            { role: "system", content: "You are a precise quiz generator that outputs perfect JSON. Always respond with valid JSON only." },
            { role: "user", content: prompt }
          ],
          temperature: 0.3,
          max_tokens: 2000
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          },
          timeout: 30000
        }
      );

      const content = response.data.choices?.[0]?.message?.content;
      if (!content) {
        throw new Error('No content received from AI model');
      }

      let quizObj;
      try {
        quizObj = JSON.parse(content);
      } catch (e) {
        const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) || content.match(/{[\s\S]*}/);
        if (!jsonMatch) {
          throw new Error("No JSON object found in model response");
        }
        quizObj = JSON.parse(jsonMatch[0]);
      }

      if (!quizObj.quiz || !Array.isArray(quizObj.quiz)) {
        throw new Error('Invalid quiz format - missing quiz array');
      }

      // Validate questions
      quizObj.quiz.forEach((q, i) => {
        if (!q.word || !q.question || !q.options || !q.correct) {
          throw new Error(`Question ${i + 1} is missing required fields`);
        }
        if (!Array.isArray(q.options) || q.options.length !== 4) {
          throw new Error(`Question ${i + 1} must have exactly 4 options`);
        }
        if (!q.options.includes(q.correct)) {
          throw new Error(`Question ${i + 1} correct answer not found in options`);
        }
      });

      console.log(`[AI_SERVICE] Successfully generated ${quizObj.quiz.length} questions`);
      return quizObj.quiz;

    } catch (error) {
      console.error('[AI_SERVICE] Error:', error.message);
      throw error;
    }
  }
}

module.exports = AIService;
