# AnimeShowoff 展示站 — 部署手册（站长点击步骤）

本站是「站位版」：只有展示 + 候补名单，**不接支付、不接生成 API**。
部署 = 把 `animeshowoff-site.zip` 解压后的全部文件推到 Cloudflare Pages 项目
（zip 第一层就是 `index.html`，不要多套一层文件夹）。

## 一、建 D1 数据库（存候补名单邮箱）

1. Cloudflare 控制台 → **Storage & Databases → D1 SQL Database → Create**。
2. 数据库名填：`animeshowoff-waitlist` → Create。
3. 进入该数据库 → **Console** 标签 → 把 `schema.sql` 的内容整段粘贴进去 → **Execute**。
   （建一张 `waitlist` 表：email 唯一、tier、created_at。）
4. 回到数据库列表，记下它的名字，第四步要用。

## 二、部署站点文件

5. 按既有流程把本站文件推送到 Pages 项目（GitHub 仓库 → Cloudflare Pages，或直接
   Direct Upload 拖 zip 解压后的文件夹）。确认构建设置：Framework preset = None，
   Build command 留空，Output directory = `/`（根目录）。

## 三、绑定 D1 到 Pages（关键一步，变量名必须大写 DB）

6. Pages 项目 → **Settings → Functions → D1 database bindings → Add binding**：
   - Variable name：`DB`（必须全大写，代码里写死的是 `env.DB`）
   - D1 database：选第一步建的 `animeshowoff-waitlist`
7. 保存后**重新部署一次**（Deployments → 最新一条 → Retry deployment，或推一次新
   commit）——绑定只对新部署生效，不重部署名单会提交失败。

## 四、验收清单（逐个打开，应全部 200）

- [ ] https://animeshowoff.com/ — 首页：模特矩阵、定价三档、名单表单都在
- [ ] https://animeshowoff.com/robots.txt
- [ ] https://animeshowoff.com/sitemap.xml
- [ ] https://animeshowoff.com/llms.txt
- [ ] https://animeshowoff.com/anime-portrait/ 、/cosplay/ 、/xianxia/ 三个落地页
- [ ] 在首页名单表单填一个自己的邮箱提交 → 应显示 "You're on the list."
- [ ] 回到 D1 → `animeshowoff-waitlist` → Console 跑 `SELECT * FROM waitlist;`
      应能看到刚提交的那行。同一个邮箱再提交一次，应仍提示成功（不报错、不重复入行）。

## 五、备注

- 名单数据只在 D1 里，导出：Console 跑 `SELECT email, tier, created_at FROM waitlist ORDER BY created_at;` 复制即可。
- 上线（接 Stripe + 生成 API）是下一阶段的事，本包不含任何支付/生成代码。
- 函数文件 `functions/waitlist.js` 对应路由 `POST /waitlist`，Pages 自动挂载，无需改。
