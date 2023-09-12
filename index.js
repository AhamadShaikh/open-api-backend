const express = require('express');
const axios = require('axios');
require('dotenv').config();
const cors = require("cors")

const app = express();

app.use(express.json());


app.use(cors({
    origin: 'http://localhost:3000/'
}))

app.post('/shayari', async (req, res) => {
    try {
        const keyword = req.query.keyword;
        console.log(keyword);
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                prompt: `Shayari about ${keyword}`,
                max_tokens: 100,
                temperature: 0.7,
                n: 1,
                model: "gpt-3.5-turbo-16k-0613",
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const shayari = response.data.choices[0].text.trim();
        res.json({ shayari });
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Something went wrong' });
    }
});


const port = process.env.PORT || 7000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
