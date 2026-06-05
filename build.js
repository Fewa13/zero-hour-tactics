const fs = require('fs');

console.log('Building Cloudflare Worker...');

// Read static files
const indexHtml = fs.readFileSync('index.html', 'utf8');
const gameJs = fs.readFileSync('game.js', 'utf8');
const styleCss = fs.readFileSync('style.css', 'utf8');

// Read worker template
let worker = fs.readFileSync('worker.js', 'utf8');

// Escape backticks in content
const escapeBackticks = (str) => str.replace(/`/g, '\\`').replace(/\$/g, '\\$');

// Replace placeholders
worker = worker.replace(
  '`<!-- index.html content will be inserted here -->`',
  '`' + escapeBackticks(indexHtml) + '`'
);
worker = worker.replace(
  '`// game.js content will be inserted here`',
  '`' + escapeBackticks(gameJs) + '`'
);
worker = worker.replace(
  '`/* style.css content will be inserted here */`',
  '`' + escapeBackticks(styleCss) + '`'
);

// Write output
fs.writeFileSync('_worker.js', worker);

console.log('✅ Build complete!');
console.log('📦 Output: _worker.js');
console.log('🚀 Deploy with: npx wrangler deploy');

// Made with Bob
