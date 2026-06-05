# MongoDB Atlas Setup (FREE FOREVER!)

## Why MongoDB Atlas?
- ✅ **FREE Forever** - No expiration (unlike Render PostgreSQL)
- ✅ **512 MB storage** - Plenty for game accounts
- ✅ **Persistent** - Data never disappears
- ✅ **Perfect for public games** - Your friends' accounts are safe!

## Setup (5 Minutes, Super Easy!)

### 1. Create MongoDB Atlas Account

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up with Google/GitHub (easiest) or email
3. **It's FREE** - No credit card needed!

### 2. Create Free Cluster

1. After signup, click **"Build a Database"**
2. Choose **"M0 FREE"** tier ✅
3. Select a cloud provider (AWS recommended)
4. Choose region closest to you
5. Cluster Name: `zerohour` (or any name)
6. Click **"Create"**
7. Wait 1-3 minutes for cluster to deploy

### 3. Create Database User

1. Click **"Database Access"** (left sidebar)
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Username: `zerohour` (or any name)
5. Password: Click **"Autogenerate Secure Password"** and **COPY IT**
6. Database User Privileges: **"Read and write to any database"**
7. Click **"Add User"**

### 4. Allow Network Access

1. Click **"Network Access"** (left sidebar)
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for Render deployment)
4. Click **"Confirm"**

### 5. Get Connection String

1. Click **"Database"** (left sidebar)
2. Click **"Connect"** button on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string (looks like):
   ```
   mongodb+srv://zerohour:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. **Replace `<password>`** with the password you copied earlier

### 6. Add to Render

1. Go to your Render dashboard
2. Click on your web service (zero-hour-tactics)
3. Click **"Environment"** tab
4. Click **"Add Environment Variable"**
5. Add:
   - **Key**: `MONGODB_URI`
   - **Value**: Paste your connection string (with password replaced)
6. Click **"Save Changes"**

### 7. Done! 🎉

Your service will automatically redeploy with MongoDB!

## Example Connection String

```
mongodb+srv://zerohour:MySecurePassword123@cluster0.abc123.mongodb.net/?retryWrites=true&w=majority
```

Replace:
- `zerohour` - your database username
- `MySecurePassword123` - your database password
- `cluster0.abc123` - your cluster address

## Testing

After setup:
1. Create an account in your game
2. Redeploy your service (or wait for next update)
3. Login again - account should still be there! ✅

## Benefits

- ✅ **FREE Forever** (no 90-day limit)
- ✅ **512 MB storage** (thousands of accounts)
- ✅ **Automatic backups**
- ✅ **99.9% uptime**
- ✅ **Perfect for public games**
- ✅ **Your friends' accounts are safe**

## Troubleshooting

**"Cannot connect to database"**
- Check MONGODB_URI is set in Render
- Make sure password in connection string is correct
- Verify "Allow Access from Anywhere" is enabled

**"Authentication failed"**
- Double-check username and password in connection string
- Make sure you replaced `<password>` with actual password

**Need help?**
- MongoDB Atlas docs: https://docs.atlas.mongodb.com/
- Check Render logs for error messages

## Free Tier Limits

- 512 MB storage (plenty for game accounts)
- Shared RAM
- No credit card required
- **Never expires!** ✅