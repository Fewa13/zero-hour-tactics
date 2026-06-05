# PostgreSQL Setup for Render

## Why PostgreSQL?
Your account data was disappearing because SQLite stores data in a local file that gets deleted when Render redeploys. PostgreSQL is a persistent database that survives deployments.

## Setup Instructions (FREE & EASY)

### 1. Create PostgreSQL Database on Render

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"PostgreSQL"**
3. Fill in:
   - **Name**: `zerohour-db` (or any name)
   - **Database**: `zerohour`
   - **User**: `zerohour` (auto-generated)
   - **Region**: Same as your web service
   - **Plan**: **Free** ✅
4. Click **"Create Database"**
5. Wait 1-2 minutes for database to be created

### 2. Get Database URL

1. Once created, click on your database
2. Find **"Internal Database URL"** (starts with `postgresql://`)
3. Copy this URL

### 3. Connect to Your Web Service

1. Go to your web service (zero-hour-tactics)
2. Click **"Environment"** tab
3. Click **"Add Environment Variable"**
4. Add:
   - **Key**: `DATABASE_URL`
   - **Value**: Paste the Internal Database URL you copied
5. Click **"Save Changes"**

### 4. Redeploy

Your service will automatically redeploy with PostgreSQL!

## That's It! 🎉

Your accounts will now persist across all deployments. The database is:
- ✅ **Free** (500 MB storage, 1 GB transfer/month)
- ✅ **Persistent** (data never disappears)
- ✅ **Automatic backups** (Render handles this)
- ✅ **Fast** (hosted on same network as your app)

## Testing

After setup, test by:
1. Creating an account
2. Redeploying your service
3. Logging in again - your account should still be there! ✅

## Local Development (Optional)

To run locally with PostgreSQL:
```bash
# Install PostgreSQL locally
# macOS: brew install postgresql
# Ubuntu: sudo apt-get install postgresql

# Create database
createdb zerohour

# Set environment variable
export DATABASE_URL="postgresql://localhost/zerohour"

# Run server
npm start
```

## Troubleshooting

**"Cannot connect to database"**
- Make sure DATABASE_URL is set in Render environment variables
- Check that the database is running (green status in Render dashboard)

**"Table does not exist"**
- The tables are created automatically on first run
- Check server logs for any errors

**Need help?**
- Check Render logs: Dashboard → Your Service → Logs
- Database status: Dashboard → Your Database → Info