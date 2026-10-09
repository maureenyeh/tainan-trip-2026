# 台南慢慢走｜2026 旅行手帳

以原始 tainan_trip_2026.html 製作的可維護靜態網站，保留繪本插畫、三天行程、Leaflet 互動地圖、Google Maps 導航及裝置內準備清單。網站無需 API 金鑰、資料庫或付費建置工具。

## 最簡單的更新方式

1. 在 GitHub 開啟 `trip-data.json`，點鉛筆編輯。
2. 修改 `schedule` 中的 `time`、`title`、`note`、`move`，或修改 `places` 中的地點。
3. 點 Commit changes，提交至 `main`。首次啟用 GitHub Pages 後會自動更新相同網址。

修改 JSON 時要保留雙引號與逗號。新增地點時先建立唯一 `places.id`，再填入行程項目的 `id`。`must` 表示必去／必吃；夜市維持 `kind: "備案"`、`must: false`。新增飲料應使用 `kind: "飲料"`。

`verification.status: "pending"` 表示資訊待確認。真正查核後才可改成 `confirmed`，並附上 `source` 來源與 `checkedAt` 日期。行程時間屬建議值，不等於營業資訊已確認。

修改日期時同步更新 `dates`、各日 `date`、`subtitle` 及涉及日期的備註。首頁、每日分頁、地圖與導航均讀取同一份 JSON。

## 本機預覽

安裝 Node.js 後，在專案資料夾執行：

```sh
npm run check
npm run dev
```

開啟 http://127.0.0.1:4173 。不要直接雙擊 index.html：瀏覽器會限制 file:// 讀取 JSON。

字型、Leaflet 與 OpenStreetMap 底圖需要網路；地圖套件失敗時仍顯示地點導航。清單勾選只儲存在同一裝置瀏覽器，不會同步。

## 已啟用發布：GitHub Pages

儲存庫：https://github.com/maureenyeh/tainan-trip-2026

固定網址：https://maureenyeh.github.io/tainan-trip-2026/

使用者已於 2026/10/09 確認公開發布。儲存庫已改為 public，GitHub Pages 使用 main、/(root)。保留帳號與儲存庫名稱，後續提交 main 就沿用相同網址。分享此 HTTPS 網址即可，無須另設 DNS；若日後使用自訂網域再設定 DNS。

GitHub Free 可使用公開儲存庫的 Pages；若希望原始碼維持私有，需確認帳號支援私人儲存庫 Pages，或改用其他網站託管平台。

參考：https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages

## 檔案

- `trip-data.json`：行程、地點、日期、清單及查核狀態。
- `index.html`：繪本插畫與頁面骨架。
- `styles.css`：響應式設計。
- `app.js`：資料載入、行程渲染、地圖與導航。
- `AGENTS.md`：設計規範、旅行偏好及後續維護規則。
- `scripts/check.cjs`：修改前後的資料完整性檢查。

原始手帳由使用者提供；SVG 與設計沿用原檔。店家、營業時間與座標未在此版本重新查核，網站有明確標示。
