BMI 線上計算機 — 作品說明 (Project README)
本專案是一個基於 Node.js (Express) 與 Vercel Serverless Functions 架構開發的輕量化 BMI 線上計算網頁。
前端採用原生 HTML5/CSS3 與 JavaScript Fetch API，後端則部署於雲端無伺服器平台，提供即時、高效且免重新整理頁面的流暢計算體驗。

專案檔案架構 (Project Architecture)
本專案依循 Vercel 的 Serverless Functions 規範進行目錄分層，確保前後端邏輯完全分離且能流暢部署：
final-test/
├── api/
│   └── bmi.js          # 後端邏輯：負責接收資料、計算 BMI 並判定體位狀態
├── index.html          # 前端網頁：使用者操作介面 (UI) 與互動邏輯
├── package.json        # 專案設定檔：定義專案依賴套件 (Express) 與中繼資料
└── package-lock.json   # 鎖定安裝套件時的精確版本紀錄

系統架構與資料流協作說明 (Data Flow & Collaboration)
雖然本專案目前定位為輕量化實作，尚未實體串接大型資料庫（Database）與機器學習（ML）預測模組，但系統架構已預留標準的 API 擴充接口。
以下說明現階段的資料流向，以及未來導入資料庫與 ML 模組時的協作串接模式：
1. 現階段資料流向 (Current Data Flow)
使用者在前端輸入數據後，整體資料流採 非同步 HTTP POST 請求 進行傳遞：
[前端網頁: index.html] 
       │
       │ (1) 使用者點擊「開始計算」
       │ (2) JavaScript Fetch API 發送 HTTP POST 請求 (帶有 JSON 資料)
       ▼
[網址路徑: /api/bmi]
       │
       │ (3) Vercel 路由解析，觸發 Serverless 雲端函式
       ▼
[後端邏輯: api/bmi.js] 
       │
       │ (4) 進行數據驗證與邏輯運算 (體重 / 身高²)
       │ (5) 封裝計算結果與體位狀態 (狀態碼 200 OK)
       ▼
[前端網頁: index.html] 
       │
       │ (6) DOM 元素即時渲染更新，免刷新頁面顯示結果
2. 未來擴充：前後端、資料庫、ML 模組串接藍圖
若未來專案規模擴大，需加入歷史紀錄儲存（資料庫）與健康趨勢預測（ML 模組），整體的協作與串接架構將升級如下：
前端 (Frontend - index.html)：
負責收集使用者的基本資料（身高、體重、年齡、性別），並透過 API 發送至後端。
同時負責呈現 ML 模組回傳的未來健康趨勢圖表。
後端 (Backend - api/bmi.js)：
作為系統的核心控制中樞 (Controller)。收到前端資料後，執行以下協作串接：
資料庫串接：將使用者的數據與計算時間，透過資料庫驅動程式（如 Mongoose 或 SQL Client）寫入雲端資料庫（如 MongoDB 或 PostgreSQL），
用以記錄使用者的體重歷史。
ML 模組串接：後端將該使用者的歷史體重序列透過 HTTP API 或 gRPC 轉傳給專職預測的 Python ML 微服務 (Microservice)。
資料庫 (Database)：
持久化儲存使用者多個時間點的 BMI 紀錄，當使用者請求查看「歷史趨勢」時，後端會從此處撈取數據回傳前端。
ML 模組 (Machine Learning Module)：
由 Python（如 Flask/FastAPI + NumPy/Scikit-learn）架設的獨立預測端。
接收到後端轉發的歷史數據後，進行模型推論（Inference），預測使用者下個月的體重走向或肥胖風險，並將預測結果回傳給後端。

部署資訊 (Deployment)
原始碼管制：GitHub
雲端託管平台：Vercel (Serverless 環境)
線上正式版網址：https://final-test-one-sigma.vercel.app/
