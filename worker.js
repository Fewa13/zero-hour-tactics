// Cloudflare Workers version - serverless backend
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Serve static files
    if (url.pathname === '/' || url.pathname === '/index.html' || url.pathname === '') {
      return new Response(INDEX_HTML, {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'public, max-age=3600',
          ...corsHeaders
        }
      });
    }
    if (url.pathname === '/game.js') {
      return new Response(GAME_JS, {
        headers: {
          'Content-Type': 'application/javascript; charset=utf-8',
          'Cache-Control': 'public, max-age=3600',
          ...corsHeaders
        }
      });
    }
    if (url.pathname === '/style.css') {
      return new Response(STYLE_CSS, {
        headers: {
          'Content-Type': 'text/css; charset=utf-8',
          'Cache-Control': 'public, max-age=3600',
          ...corsHeaders
        }
      });
    }

    // API endpoints
    if (url.pathname === '/api/register' && request.method === 'POST') {
      return handleRegister(request, env, corsHeaders);
    }
    if (url.pathname === '/api/login' && request.method === 'POST') {
      return handleLogin(request, env, corsHeaders);
    }
    if (url.pathname === '/api/save' && request.method === 'POST') {
      return handleSave(request, env, corsHeaders);
    }
    if (url.pathname.startsWith('/api/load/')) {
      return handleLoad(request, env, corsHeaders);
    }
    if (url.pathname === '/api/health') {
      return new Response(JSON.stringify({ status: 'ok' }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    return new Response('Not Found', { status: 404, headers: corsHeaders });
  }
};

async function handleRegister(request, env, corsHeaders) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return jsonResponse({ error: 'Username and password required' }, 400, corsHeaders);
    }

    if (username.length < 3 || password.length < 6) {
      return jsonResponse({ error: 'Username must be 3+ chars, password 6+ chars' }, 400, corsHeaders);
    }

    // Check if user exists
    const existing = await env.DB.prepare(
      'SELECT id FROM users WHERE username = ?'
    ).bind(username).first();

    if (existing) {
      return jsonResponse({ error: 'Username already exists' }, 400, corsHeaders);
    }

    // Hash password (simple hash for Workers - in production use better hashing)
    const hashedPassword = await hashPassword(password);

    // Create user
    const result = await env.DB.prepare(
      'INSERT INTO users (username, password) VALUES (?, ?)'
    ).bind(username, hashedPassword).run();

    const userId = result.meta.last_row_id;

    // Create default account
    const defaultAccount = {
      name: username,
      money: 0,
      inventory: {},
      storage: [],
      setoutSlots: [],
      equipped: { gun: null, armor: null, helmet: null, backpack: null, ammo: null },
      weaponMods: {}
    };

    await env.DB.prepare(
      'INSERT INTO accounts (user_id, data) VALUES (?, ?)'
    ).bind(userId, JSON.stringify(defaultAccount)).run();

    return jsonResponse({ success: true, userId }, 200, corsHeaders);
  } catch (err) {
    return jsonResponse({ error: err.message }, 500, corsHeaders);
  }
}

async function handleLogin(request, env, corsHeaders) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return jsonResponse({ error: 'Username and password required' }, 400, corsHeaders);
    }

    // Get user
    const user = await env.DB.prepare(
      'SELECT * FROM users WHERE username = ?'
    ).bind(username).first();

    if (!user) {
      return jsonResponse({ error: 'Invalid username or password' }, 401, corsHeaders);
    }

    // Verify password
    const validPassword = await verifyPassword(password, user.password);
    if (!validPassword) {
      return jsonResponse({ error: 'Invalid username or password' }, 401, corsHeaders);
    }

    // Get account data
    const account = await env.DB.prepare(
      'SELECT data FROM accounts WHERE user_id = ?'
    ).bind(user.id).first();

    if (!account) {
      return jsonResponse({ error: 'Account not found' }, 404, corsHeaders);
    }

    return jsonResponse({
      success: true,
      userId: user.id,
      username: user.username,
      account: JSON.parse(account.data)
    }, 200, corsHeaders);
  } catch (err) {
    return jsonResponse({ error: err.message }, 500, corsHeaders);
  }
}

async function handleSave(request, env, corsHeaders) {
  try {
    const { userId, accountData } = await request.json();

    if (!userId || !accountData) {
      return jsonResponse({ error: 'User ID and account data required' }, 400, corsHeaders);
    }

    await env.DB.prepare(
      'UPDATE accounts SET data = ? WHERE user_id = ?'
    ).bind(JSON.stringify(accountData), userId).run();

    return jsonResponse({ success: true }, 200, corsHeaders);
  } catch (err) {
    return jsonResponse({ error: err.message }, 500, corsHeaders);
  }
}

async function handleLoad(request, env, corsHeaders) {
  try {
    const url = new URL(request.url);
    const userId = url.pathname.split('/').pop();

    const account = await env.DB.prepare(
      'SELECT data FROM accounts WHERE user_id = ?'
    ).bind(userId).first();

    if (!account) {
      return jsonResponse({ error: 'Account not found' }, 404, corsHeaders);
    }

    return jsonResponse({
      success: true,
      account: JSON.parse(account.data)
    }, 200, corsHeaders);
  } catch (err) {
    return jsonResponse({ error: err.message }, 500, corsHeaders);
  }
}

function jsonResponse(data, status, corsHeaders) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders }
  });
}

// Simple password hashing for Cloudflare Workers
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

async function verifyPassword(password, hash) {
  const passwordHash = await hashPassword(password);
  return passwordHash === hash;
}

// Placeholder for static files - will be replaced during build
const INDEX_HTML = `<!-- index.html content will be inserted here -->`;
const GAME_JS = `// game.js content will be inserted here`;
const STYLE_CSS = `/* style.css content will be inserted here */`;

// Made with Bob
