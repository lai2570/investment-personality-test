# 投資性格測驗 by 口袋基金

3 分鐘回答 3 道題目，找到你的投資性格動物與最適合的投資組合方向。

## 技術棧

- React 18 + TypeScript
- Vite
- Tailwind CSS v4
- React Router v7

## 啟動開發

```bash
npm install
npm run dev
```

開啟 http://localhost:5173

## 建置部署

```bash
npm run build
```

產出在 `dist/` 目錄，可直接部署到 Vercel / Netlify。

### Vercel 部署

1. 將專案推上 GitHub
2. 在 Vercel 匯入 GitHub repo
3. Framework Preset 選 **Vite**
4. 部署即可

### Netlify 部署

1. 將專案推上 GitHub
2. 在 Netlify 匯入 GitHub repo
3. Build command: `npm run build`
4. Publish directory: `dist`
5. 新增 `public/_redirects` 檔案，內容：`/*  /index.html  200`

## 動物圖片

將 10 張動物圖片放到 `public/images/` 目錄：

- `animal1.png` ~ `animal10.png`

## 專案結構

```
src/
├── data/
│   ├── animals.ts      # 10 型動物資料
│   ├── questions.ts    # 3 題選項與計分碼
│   ├── portfolios.ts   # 10 個投資組合
│   └── relations.ts    # 共生/互補/鏡像配對
├── pages/
│   ├── Landing.tsx      # 首頁
│   ├── Quiz.tsx         # 測驗頁
│   └── Result.tsx       # 結果頁
├── lib/
│   └── scoring.ts       # 計分函式
├── App.tsx
└── main.tsx
```
