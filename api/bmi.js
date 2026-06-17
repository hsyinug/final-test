const express = require('express');
const app = express();

// 解析 JSON 格式的請求主體
app.use(express.json());

// 處理 BMI 計算的 POST 請求 (路徑改為 /api/bmi)
app.post('/api/bmi', (req, res) => {
    const { height, weight } = req.body;

    if (!height || !weight || height <= 0 || weight <= 0) {
        return res.status(400).json({ error: '請輸入有效的身高與體重數值。' });
    }

    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    const roundedBmi = Math.round(bmi * 100) / 100;

    let status = '';
    if (roundedBmi < 18.5) status = '體重過輕';
    else if (roundedBmi < 24) status = '健康體位';
    else if (roundedBmi < 27) status = '過重';
    else status = '肥胖';

    res.json({
        bmi: roundedBmi,
        status: status
    });
});

// 關鍵：將整個 app 匯出給 Vercel 處理
module.exports = app;