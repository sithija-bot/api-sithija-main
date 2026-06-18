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

app.get('/download-apk', async (req, res) => {
    // URL එකෙන් text query එක (ඇප් එකේ නම) ගන්නවා
    const query = req.query.text;
    if (!query) {
        return res.json({ success: false, message: "කරුණාකර ඇප් එකේ නම (text) ලබාදෙන්න!" });
    }

    try {
        // ඔයා දීපු APK Download API එකට request එක යවනවා
        const response = await axios.get(`https://apis.davidcyriltech.my.id/download/apk?text=${encodeURIComponent(query)}`);
        
        // API එකෙන් සාර්ථකව data ලැබුනොත් ඒ ටික response එක විදිහට යවනවා
        if (response.data && response.data.success) {
            res.json({ 
                success: true, 
                result: response.data.result // API එකෙන් එන download ලින්ක් සහ විස්තර
            });
        } else {
            res.json({ 
                success: false, 
                message: response.data.message || "ඒ නමින් APK එකක් සොයාගත නොහැකි විය." 
            });
        }
    } catch (e) {
        // මොකක් හරි error එකක් ආවොත් ඒක handle කරනවා
        res.json({ success: false, message: e.message });
    }
});

app.listen(PORT, () => console.log(`API Active on port ${PORT}`));

