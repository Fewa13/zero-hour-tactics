# Deploy to Cloudflare Workers

## 🚀 Quick Deploy Steps

### 1. Create D1 Database

```bash
npx wrangler d1 create zero-hour-accounts
```

This will output something like:
```
database_id = "xxxx-xxxx-xxxx-xxxx"
```

Copy the `database_id` and update `wrangler.toml`:
```toml
[[d1_databases]]
binding = "DB"
database_name = "zero-hour-accounts"
database_id = "YOUR-DATABASE-ID-HERE"  # <-- Paste here
```

### 2. Create Database Tables

```bash
npx wrangler d1 execute zero-hour-accounts --remote --command "
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE accounts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  data TEXT NOT NULL,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
"
```

### 3. Build Worker (Embed Static Files)

Create `build.js`:
```javascript
const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');
const gameJs = fs.readFileSync('game.js', 'utf8');
const styleCss = fs.readFileSync('style.css', 'utf8');

let worker = fs.readFileSync('worker.js', 'utf8');

worker = worker.replace('`<!-- index.html content will be inserted here -->`', '`' + indexHtml.replace(/`/g, '\\`') + '`');
worker = worker.replace('`// game.js content will be inserted here`', '`' + gameJs.replace(/`/g, '\\`') + '`');
worker = worker.replace('`/* style.css content will be inserted here */`', '`' + styleCss.replace(/`/g, '\\`') + '`');

fs.writeFileSync('_worker.js', worker);
console.log('Build complete! Deploy with: npx wrangler deploy _worker.js');
```

Run:
```bash
node build.js
```

### 4. Deploy

```bash
npx wrangler deploy _worker.js
```

Your game will be live at: `https://zero-hour-tactics.YOUR-SUBDOMAIN.workers.dev`

## 📝 Alternative: Simple Deploy (Without Build)

If you don't want to embed files, use Cloudflare Pages instead:

### 1. Create D1 Database (same as above)

### 2. Deploy to Pages

```bash
npx wrangler pages deploy . --project-name=zero-hour-tactics
```

### 3. Bind D1 Database

In Cloudflare Dashboard:
1. Go to Pages → Your Project → Settings → Functions
2. Add D1 binding: `DB` → Select your database
3. Redeploy

## 🔧 Troubleshooting

### Error: "Database not found"
- Make sure you created the D1 database
- Check `database_id` in `wrangler.toml` is correct
- Run tables creation command

### Error: "Wrangler not found"
```bash
npm install -g wrangler
```

### Error: "Not logged in"
```bash
npx wrangler login
```

## 📊 Check Database

```bash
npx wrangler d1 execute zero-hour-accounts --remote --command "SELECT * FROM users;"
```

## 🎮 Done!

Your game is now live on Cloudflare Workers with:
- ✅ Serverless backend
- ✅ D1 database for accounts
- ✅ Global CDN
- ✅ Free tier (100k requests/day)

Share your URL with friends!