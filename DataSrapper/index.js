const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/scrape', async (req, res) => {
    const { url } = req.body;

    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const title = $('head title').text();
        const description = $('meta[name="description"]').attr('content');
        const content = $('body').text(); // Simplified scraping of body content

        res.json({ title, description, content });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error scraping the website' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
