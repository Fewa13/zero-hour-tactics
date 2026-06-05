# Account Backup Guide (100% FREE!)

## The Problem
When Render redeploys your game, the SQLite database gets deleted and accounts disappear.

## The Solution (FREE & EASY!)
Use the **Export/Import** feature I built for you! It's completely free and works forever.

## How to Backup Your Account

### Before Each Update:

1. **Login to your account**
2. **Click "Export Code"** button in Account modal
3. **Code is copied to clipboard** automatically
4. **Save the code** somewhere safe:
   - Paste into a text file
   - Save in Notes app
   - Email to yourself
   - Save in Google Docs
   - Anywhere you won't lose it!

### After Update Deploys:

1. **Click "Import Code"** button
2. **Paste your export code**
3. **Set a NEW password** (6+ characters)
4. **Done!** Your account is restored with all items, money, inventory!

## Example Workflow

```
1. You have account "Player123" with 5000 money, lots of items
2. I push an update to GitHub
3. BEFORE update deploys:
   - Login
   - Click "Export Code"
   - Save code: "eyJ1c2VybmFtZSI6IlBsYXllcjEyMyIsImRhdGEiOi..."
4. Update deploys (database wiped)
5. AFTER update:
   - Click "Import Code"
   - Paste your code
   - Set new password
   - Account restored! ✅
```

## Why This Works

- ✅ **100% FREE** - No paid services needed
- ✅ **Works Forever** - No expiration
- ✅ **You Control Your Data** - Code is yours
- ✅ **Simple** - Just copy/paste
- ✅ **Secure** - Only you have the code

## Tips

1. **Export regularly** - Not just before updates
2. **Save multiple backups** - Different locations
3. **Share with friends** - They can import your code too (if username not taken)
4. **Test it** - Try exporting and importing to make sure it works

## What Gets Saved

Everything in your account:
- Money
- Inventory (all items)
- Storage
- Equipped items
- Weapon mods
- Set-out slots

## Important Notes

- ⚠️ **Username must be unique** - Can't import if username already exists
- ⚠️ **Set NEW password** - When importing, you choose a new password
- ⚠️ **Keep code safe** - Anyone with your code can import your account

## Alternative: MongoDB Atlas (Also Free)

If you want automatic persistence without manual export/import, I can set up MongoDB Atlas (free forever, no expiration). Let me know!

## Questions?

Just ask! The export/import system is already working in your game.