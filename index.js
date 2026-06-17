const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/pinterest', async (req, res) => {
    const query = req.query.text;
    if (!query) return res.json({ success: false, message: "Query එකක් දෙන්න!" });

    try {
        // අපි මෙතනදී කෙලින්ම API එකක් පාවිච්චි කරනවා
        const response = await axios.get(`https://apis.davidcyriltech.my.id/search/pinterest?text=${encodeURIComponent(query)}`);
        
        // රිසාල්ට්ස් ටික හරියටම ගන්නවා
        if (response.data && response.data.result) {
            res.json({ success: true, result: response.data.result });
        } else {
            res.json({ success: false, message: "No results found" });
        }
    } catch (e) {
        res.json({ success: false, message: e.message });
    }
});

app.listen(PORT, () => console.log(`API Active on ${PORT}`));
