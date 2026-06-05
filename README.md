# Zero Hour Tactics - Full Stack Game

A multiplayer FPS game with a complete backend account system.

## 🎮 Features

- **Account System**: Register, login, and save progress to server
- **Multiplayer**: Real-time multiplayer battles
- **Zero Hour Mode**: Survival mode with loot and progression
- **Boss Fights**: Epic boss battles with 3000 HP
- **Inventory System**: Collect weapons, armor, and items
- **Visual Effects**: Particle effects, enhanced graphics

## 📦 What's Included

- `game.js` - Game client code
- `index.html` - Game interface
- `style.css` - Styling
- `server.js` - Backend server (Node.js + Express)
- `package.json` - Dependencies
- `accounts.db` - SQLite database (auto-created)

## 🚀 Quick Start (Local)

### 1. Install Node.js
Download from: https://nodejs.org/ (v14 or higher)

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Server
```bash
npm start
```

### 4. Play Game
Open browser to: http://localhost:3000

## 🌐 Deploy to Hosting Service

### Option A: Railway (Recommended - Free)

1. Go to https://railway.app/
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway will auto-detect Node.js and deploy
6. Your game will be live at: `https://your-app.railway.app`

### Option B: Render (Free)

1. Go to https://render.com/
2. Sign up and create "New Web Service"
3. Connect your GitHub repository
4. Settings:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Click "Create Web Service"
6. Your game will be live at: `https://your-app.onrender.com`

### Option C: Heroku

1. Install Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli
2. Login: `heroku login`
3. Create app: `heroku create your-game-name`
4. Deploy:
```bash
git init
git add .
git commit -m "Initial commit"
git push heroku main
```
5. Your game will be live at: `https://your-game-name.herokuapp.com`

### Option D: Vercel (Requires Serverless Adaptation)

Vercel requires serverless functions. Use Railway or Render instead for easier deployment.

## 🔧 Configuration

### Custom API URL
If you deploy the backend separately, update the API URL:

1. Open browser console on your game page
2. Run: `localStorage.setItem('custom-api-url', 'https://your-backend-url.com')`
3. Refresh the page

### Environment Variables (Optional)

Create a `.env` file:
```
PORT=3000
NODE_ENV=production
```

## 📝 API Endpoints

- `POST /api/register` - Create new account
- `POST /api/login` - Login to account
- `POST /api/save` - Save account data
- `GET /api/load/:userId` - Load account data
- `GET /api/health` - Server health check

## 🎯 How to Play

### Battle Field Mode
1. Click "Battle Field" tab
2. Select difficulty
3. Click "Start Single Player" or "Start Multiplayer"

### Zero Hour Mode
1. Click "Zero Hour" tab
2. Login or create account
3. Equip gear in "Set Out" menu
4. Select map (Urban, Village, or Boss Arena)
5. Click "Start Zero Hour"

### Controls
- **WASD** - Move
- **Mouse** - Look around
- **Left Click** - Shoot
- **Right Click** - Aim down sights
- **R** - Reload
- **F** - Open chest/interact
- **B** - Open backpack
- **Space** - Jump
- **Shift** - Sprint

## 🛠️ Development

### Run in Development Mode
```bash
npm run dev
```
This uses nodemon for auto-restart on file changes.

### Database
The SQLite database (`accounts.db`) is created automatically.

To reset database:
```bash
rm accounts.db
npm start
```

### Testing
1. Create account: username `test`, password `test123`
2. Login and play
3. Check database: `sqlite3 accounts.db "SELECT * FROM users;"`

## 🔒 Security Notes

- Passwords are hashed with bcrypt
- CORS enabled for cross-origin requests
- SQL injection protected with parameterized queries
- Session management via userId

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  username TEXT UNIQUE,
  password TEXT,
  created_at DATETIME
);
```

### Accounts Table
```sql
CREATE TABLE accounts (
  id INTEGER PRIMARY KEY,
  user_id INTEGER,
  data TEXT,
  updated_at DATETIME
);
```

## 🐛 Troubleshooting

### "Cannot find module" error
```bash
rm -rf node_modules package-lock.json
npm install
```

### Port already in use
Change port in `server.js` or set environment variable:
```bash
PORT=8080 npm start
```

### Database locked
Close all connections and restart:
```bash
rm accounts.db
npm start
```

### Login not working
1. Check server is running: `curl http://localhost:3000/api/health`
2. Check browser console for errors
3. Verify API_BASE in game.js points to correct URL

## 📱 Mobile Support

The game includes touch controls for mobile devices:
- Virtual joystick for movement
- Touch buttons for actions
- Responsive layout

## 🎨 Customization

### Change Colors
Edit `style.css` to customize UI colors.

### Add Maps
Edit `game.js` map building functions:
- `buildUrbanWarfareMap()`
- `buildPastoralVillageMap()`
- `buildBossArenaMap()`

### Modify Weapons
Edit weapon stats in `game.js`:
```javascript
const GUNS = {
  "Pistol": { damage: 25, rpm: 300, ... },
  // Add your weapons here
}
```

## 📄 License

MIT License - Feel free to modify and distribute!

## 🤝 Support

For issues or questions:
1. Check this README
2. Check browser console for errors
3. Check server logs
4. Verify all files are present

## 🎉 Credits

Created with ❤️ for gamers everywhere!

---

**Enjoy the game!** 🎮✨