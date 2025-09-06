const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files
app.use(express.static('public'));

// Proxy endpoint
app.get('/proxy', async (req, res) => {
    try {
        const url = Buffer.from(req.query.url, 'base64').toString('utf8');
        
        // Validate URL
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            return res.status(400).send('Invalid URL');
        }
        
        // Fetch the requested URL
        const response = await axios.get(url, {
            responseType: 'text',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });
        
        // Send the response back to the client
        res.send(response.data);
    } catch (error) {
        console.error('Proxy error:', error);
        res.status(500).send('Error fetching the URL');
    }
});

app.listen(port, () => {
    console.log(`Proxy server running on port ${port}`);
});
