# AnimeShowoff 站点更新包 — 2026-11-18（仙侠 + 和服衣橱预览 + 名单绑定修复）

`animeshowoff-update-2026-11-18.zip` 解压到站点根目录（与现有 index.html 同级）即可，路径已对齐。

## 名单落库修复（2026-11-19 补入，同批推送）

- 新增根目录文件 `wrangler.toml`：把 D1 绑定写进仓库 — 变量名 `DB` → 数据库 `anime`（database_id `a7ec8d37-ad80-478a-8850-cd5111352be7`，库内已有 `waitlist` 表）。
- 背景：后台手设的绑定一直没进线上部署，函数拿不到 DB、名单表单报 "not configured"；改走代码侧后，推送即生效，此后绑定以此文件为准，后台不用再动。
- 推送后验活加一项：首页名单表单提交应返回成功（不再报 not configured）。

## 覆盖的已有文件（3 个，整文件替换）

- `index.html` — 模特矩阵五行各补仙侠/和服两格（图注带 "· New in the wardrobe"）。定价区、Select-All rounds 文案、JSON-LD 均未动。
- `xianxia/index.html` — 图廊换成本轮真仙侠图（借图已撤），og:image 换真图，结尾文案改为真实口径 + 预览定位。
- `cosplay/index.html` — 图廊补 F1/F4 和服图，新增一段和服预览说明。

## 新增文件（10 张图）

- `assets/male-xianxia.jpg`、`assets/male-kimono.jpg`
- `assets/f1-xianxia.jpg`、`assets/f1-kimono.jpg`
- `assets/f2-xianxia.jpg`、`assets/f2-kimono.jpg`
- `assets/f3-xianxia.jpg`、`assets/f3-kimono.jpg`
- `assets/f4-xianxia.jpg`、`assets/f4-kimono.jpg`

## 口径确认

- 首发仍是六包；定价与 Select-All rounds 文案一个字未动。
- 仙侠/和服在站内一律标注为衣橱新款预览（"New in the wardrobe"），未写成可购买的包；xianxia 页与 cosplay 页均明说不在首发包内、候补名单优先通知。
- 10 张图均为本轮管线真实产出（生成 6 张 + 换头合成 4 张，逐格记录见实验室 wardrobe-composite/REPORT.md）；F4 两张的银发辫完整保留。

## 推送后验活建议

首页矩阵拉到底两列新图、/xianxia/ 图廊五张、/cosplay/ 图廊末两张，确认图片 200 且图注对应。
