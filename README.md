# ⛳ FairwayLog

Your personal golf outing tracker — South Shore MA courses, hole-by-hole stats, handicap differential, and round notes.

---

## Deploy to Vercel (one-time setup, ~10 minutes)

### Step 1 — Create a GitHub account
Go to https://github.com and sign up (free). Skip if you already have one. 

### Step 2 — Create a new repository
1. Click the **+** icon (top right) → **New repository**
2. Name it: `fairwaylog`
3. Set it to **Public**
4. Click **Create repository**

### Step 3 — Upload these files
On the repository page, click **uploading an existing file**.
Upload everything in this folder — all files and the `src/` and `public/` folders.
Click **Commit changes**.

### Step 4 — Deploy on Vercel
1. Go to https://vercel.com and sign up with your GitHub account (free)
2. Click **Add New Project**
3. Select your `fairwaylog` repository
4. Leave all settings as default — Vercel auto-detects Vite
5. Click **Deploy**

That's it. In about 60 seconds you'll get a live URL like:
`https://fairwaylog-yourname.vercel.app`

---

## Add to iPhone Home Screen (makes it feel like an app)

1. Open your Vercel URL in **Safari** on your iPhone
2. Tap the **Share** button (box with arrow pointing up)
3. Scroll down → tap **Add to Home Screen**
4. Name it `FairwayLog` → tap **Add**

It will appear on your home screen with a golf flag icon and open full screen, no browser bar.

---

## Making changes later

1. Come back to your Claude conversation
2. Ask for whatever change you want
3. Claude updates the code and gives you a new `GolfTracker.jsx`
4. Replace the file in your GitHub repository
5. Vercel auto-deploys in ~30 seconds

---

## Project structure

```
fairwaylog/
├── index.html          # App shell
├── package.json        # Dependencies
├── vite.config.js      # Build config
├── vercel.json         # Vercel routing
├── public/
│   └── favicon.svg     # Golf flag icon
└── src/
    ├── main.jsx        # Entry point
    ├── App.jsx         # Root component
    └── GolfTracker.jsx # The full tracker (edit this for changes)
```

---

## Your data

Rounds are saved to your browser's **localStorage** — they persist across sessions on the same device/browser. To back up your data, use the browser's developer tools or ask Claude to add an export feature.
