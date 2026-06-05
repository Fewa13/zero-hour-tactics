const express = require('express');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const { WebSocketServer } = require('ws');
const http = require('http');

const app = express();
const PORT = process.env.PORT || 3000;

// Create HTTP server
const server = http.createServer(app);

// Create WebSocket server
const wss = new WebSocketServer({ server, path: '/ws' });

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/zerohour';
let db;
let usersCollection;
let accountsCollection;

// Connect to MongoDB
async function connectDB() {
  try {
    const client = await MongoClient.connect(MONGODB_URI);
    db = client.db();
    usersCollection = db.collection('users');
    accountsCollection = db.collection('accounts');
    
    // Create indexes
    await usersCollection.createIndex({ username: 1 }, { unique: true });
    await accountsCollection.createIndex({ userId: 1 });
    
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

connectDB();

// API Routes

// Register
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  if (username.length < 3 || password.length < 6) {
    return res.status(400).json({ error: 'Username must be 3+ chars, password 6+ chars' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const userResult = await usersCollection.insertOne({
      username,
      password: hashedPassword,
      createdAt: new Date()
    });

    const userId = userResult.insertedId.toString();

    const defaultAccount = {
      name: username,
      money: 0,
      inventory: {},
      storage: [],
      setoutSlots: [],
      equipped: { gun: null, armor: null, helmet: null, backpack: null, ammo: null },
      weaponMods: {}
    };

    await accountsCollection.insertOne({
      userId,
      data: defaultAccount,
      updatedAt: new Date()
    });

    res.json({ success: true, message: 'Account created successfully', userId });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Username already exists' });
    }
    console.error('Register error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  try {
    const user = await usersCollection.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const account = await accountsCollection.findOne({ userId: user._id.toString() });

    if (!account) {
      return res.status(500).json({ error: 'Error loading account' });
    }

    res.json({
      success: true,
      userId: user._id.toString(),
      username: user.username,
      account: account.data
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Save
app.post('/api/save', async (req, res) => {
  const { userId, accountData } = req.body;

  if (!userId || !accountData) {
    return res.status(400).json({ error: 'User ID and account data required' });
  }

  try {
    const result = await accountsCollection.updateOne(
      { userId },
      { $set: { data: accountData, updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Account not found' });
    }

    res.json({ success: true, message: 'Account saved successfully' });
  } catch (error) {
    console.error('Save error:', error);
    res.status(500).json({ error: 'Error saving account' });
  }
});

// Export
app.post('/api/export', async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'User ID required' });
  }

  try {
    const user = await usersCollection.findOne({ _id: { $eq: userId } });
    const account = await accountsCollection.findOne({ userId });

    if (!user || !account) {
      return res.status(404).json({ error: 'Account not found' });
    }

    const exportData = {
      username: user.username,
      data: JSON.stringify(account.data)
    };
    const exportCode = Buffer.from(JSON.stringify(exportData)).toString('base64');

    res.json({ success: true, code: exportCode });
  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Import
app.post('/api/import', async (req, res) => {
  const { code, password } = req.body;

  if (!code || !password) {
    return res.status(400).json({ error: 'Import code and password required' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be 6+ characters' });
  }

  try {
    const exportData = JSON.parse(Buffer.from(code, 'base64').toString());
    const { username, data } = exportData;

    if (!username || !data) {
      return res.status(400).json({ error: 'Invalid import code' });
    }

    const existingUser = await usersCollection.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ error: 'Username already registered. Cannot import.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userResult = await usersCollection.insertOne({
      username,
      password: hashedPassword,
      createdAt: new Date()
    });

    const userId = userResult.insertedId.toString();

    await accountsCollection.insertOne({
      userId,
      data: JSON.parse(data),
      updatedAt: new Date()
    });

    res.json({
      success: true,
      message: 'Account imported successfully',
      userId,
      username,
      account: JSON.parse(data)
    });
  } catch (error) {
    console.error('Import error:', error);
    res.status(400).json({ error: 'Invalid import code format' });
  }
});

// Load
app.get('/api/load/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const account = await accountsCollection.findOne({ userId });

    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }

    res.json({ success: true, account: account.data });
  } catch (error) {
    console.error('Load error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Health
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', database: 'mongodb' });
});

// WebSocket multiplayer logic
const rooms = new Map();

wss.on('connection', (ws, req) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const roomId = url.searchParams.get('room') || 'default';
  
  if (!rooms.has(roomId)) {
    rooms.set(roomId, { players: new Map(), nextId: 1 });
  }
  
  const room = rooms.get(roomId);
  
  // Check if room is full (max 2 players)
  if (room.players.size >= 2) {
    ws.send(JSON.stringify({ type: 'full' }));
    ws.close();
    return;
  }
  
  const playerId = `p${room.nextId++}`;
  const playerNumber = room.players.size + 1;
  
  const player = {
    id: playerId,
    ws,
    x: playerNumber === 1 ? 5 : 25, // Different spawn positions
    y: playerNumber === 1 ? 5 : 25,
    angle: 0,
    pitch: 0,
    jumpHeight: 0,
    firing: false,
    hp: 100,
    alive: true,
    equippedGun: null,
    equippedArmor: null,
    equippedHelmet: null
  };
  
  room.players.set(playerId, player);
  
  // Send welcome message
  ws.send(JSON.stringify({
    type: 'welcome',
    id: playerId,
    number: playerNumber
  }));
  
  console.log(`Player ${playerId} joined room ${roomId} (${room.players.size}/2)`);
  
  // Broadcast initial state
  broadcastState(room);
  
  ws.on('message', (data) => {
    try {
      const msg = data.toString();
      
      if (msg === 'ping') {
        ws.send('pong');
        return;
      }
      
      const update = JSON.parse(msg);
      
      if (update.type === 'update') {
        // Update player position and state
        Object.assign(player, {
          x: update.x,
          y: update.y,
          angle: update.angle,
          pitch: update.pitch,
          jumpHeight: update.jumpHeight,
          firing: update.firing,
          equippedGun: update.equippedGun,
          equippedArmor: update.equippedArmor,
          equippedHelmet: update.equippedHelmet
        });
        broadcastState(room);
      }
      else if (update.type === 'hit') {
        // Handle hit
        const target = room.players.get(update.target);
        if (target) {
          target.hp = Math.max(0, target.hp - update.damage);
          if (target.hp <= 0) {
            target.alive = false;
            target.hp = 0;
          }
          
          // Send hit confirmation to shooter
          ws.send(JSON.stringify({
            type: 'hit',
            shooter: playerId,
            target: update.target,
            hp: target.hp
          }));
          
          // Send hit notification to target
          target.ws.send(JSON.stringify({
            type: 'hit',
            shooter: playerId,
            target: update.target,
            hp: target.hp
          }));
          
          broadcastState(room);
        }
      }
      else if (update.type === 'ability1' || update.type === 'ability2') {
        // Broadcast ability use to other players
        room.players.forEach((p, id) => {
          if (id !== playerId && p.ws.readyState === 1) {
            p.ws.send(JSON.stringify({
              ...update,
              playerId
            }));
          }
        });
      }
      else if (update.type === 'zhroute') {
        // Store player's route for Zero Hour mode
        player.route = update.route;
      }
      else if (update.type === 'pickitem' || update.type === 'createchest' || update.type === 'dropitem') {
        // Broadcast item interactions
        room.players.forEach((p, id) => {
          if (id !== playerId && p.ws.readyState === 1) {
            p.ws.send(JSON.stringify({
              ...update,
              playerId
            }));
          }
        });
      }
    } catch (err) {
      console.error('Message error:', err);
    }
  });
  
  ws.on('close', () => {
    room.players.delete(playerId);
    console.log(`Player ${playerId} left room ${roomId} (${room.players.size}/2)`);
    
    if (room.players.size === 0) {
      rooms.delete(roomId);
      console.log(`Room ${roomId} deleted (empty)`);
    } else {
      broadcastState(room);
    }
  });
  
  ws.on('error', (err) => {
    console.error('WebSocket error:', err);
  });
});

function broadcastState(room) {
  const state = {
    type: 'state',
    players: {}
  };
  
  room.players.forEach((player, id) => {
    state.players[id] = {
      id: player.id,
      x: player.x,
      y: player.y,
      angle: player.angle,
      pitch: player.pitch,
      jumpHeight: player.jumpHeight,
      firing: player.firing,
      hp: player.hp,
      alive: player.alive,
      equippedGun: player.equippedGun,
      equippedArmor: player.equippedArmor,
      equippedHelmet: player.equippedHelmet
    };
  });
  
  const stateStr = JSON.stringify(state);
  room.players.forEach(player => {
    if (player.ws.readyState === 1) {
      player.ws.send(stateStr);
    }
  });
}

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Database: MongoDB Atlas (persistent)');
  console.log('WebSocket server ready at /ws');
});

// Made with Bob
