const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch'); // إذا Node ≥18 يمكن الاستغناء
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('.')); // يجعل index.html و style.js متاحة

app.post('/ask', async (req, res) => {
    const question = req.body.question;
    if (!question) return res.status(400).json({ answer: "No question provided." });

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4",
                messages: [
                    {role: "system", content: "You are a professional advisor. Give detailed, thoughtful, and practical advice on life, work, business, and legal matters. Do not generate anything else."},
                    {role: "user", content: question}
                ],
                max_tokens: 500
            })
        });

        const data = await response.json();
        const answer = data.choices[0].message.content;
        res.json({ answer });
    } catch (err) {
        res.status(500).json({ answer: "Error fetching from OpenAI API: " + err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
