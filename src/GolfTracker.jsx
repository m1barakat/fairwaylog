import { useState, useEffect, useRef } from "react";

const STORAGE_KEY = "golf-outing-rounds";

const COURSE_TEES = {
  "Strawberry Valley Golf Course": [
    { label: "Green", courseRating: "62.1", slope: "99" },
    { label: "White", courseRating: "62.1", slope: "99" },
  ],
  "Granite Links Golf Club (Quincy/Milton)": [
    { label: "Black", courseRating: "73.9", slope: "139" },
    { label: "Blue",  courseRating: "72.1", slope: "131" },
    { label: "White", courseRating: "69.1", slope: "124" },
    { label: "Red",   courseRating: "70.8", slope: "119" },
  ],
  "Granite Links Golf Club (Granite/Quincy)": [
    { label: "Black", courseRating: "73.0", slope: "141" },
    { label: "Blue",  courseRating: "70.8", slope: "133" },
    { label: "White", courseRating: "67.0", slope: "128" },
  ],
  "Olde Scotland Links": [
    { label: "Black", courseRating: "72.6", slope: "126" },
    { label: "Blue",  courseRating: "70.3", slope: "124" },
    { label: "White", courseRating: "68.7", slope: "116" },
    { label: "Green", courseRating: "65.9", slope: "110" },
    { label: "Gold",  courseRating: "68.4", slope: "111" },
  ],
  "Widow's Walk Golf Course": [
    { label: "Blue",  courseRating: "71.5", slope: "130" },
    { label: "White", courseRating: "69.2", slope: "124" },
    { label: "Gold",  courseRating: "66.5", slope: "117" },
    { label: "Red",   courseRating: "64.0", slope: "110" },
  ],
  "South Shore Country Club": [
    { label: "Blue",  courseRating: "72.0", slope: "131" },
    { label: "White", courseRating: "70.0", slope: "126" },
    { label: "Gold",  courseRating: "67.5", slope: "120" },
    { label: "Red",   courseRating: "65.0", slope: "113" },
  ],
  "Pembroke Country Club": [
    { label: "Blue",  courseRating: "73.3", slope: "132" },
    { label: "White", courseRating: "70.8", slope: "127" },
    { label: "Gold",  courseRating: "68.2", slope: "119" },
    { label: "Red",   courseRating: "65.5", slope: "112" },
  ],
  "Presidents Golf Course": [
    { label: "Black", courseRating: "68.3", slope: "127" },
    { label: "Blue",  courseRating: "66.0", slope: "117" },
    { label: "Green", courseRating: "63.4", slope: "106" },
  ],
  "Braintree Municipal Golf Course": [
    { label: "Blue",  courseRating: "70.2", slope: "122" },
    { label: "White", courseRating: "68.0", slope: "116" },
    { label: "Red",   courseRating: "65.5", slope: "109" },
  ],
  "D.W. Field Golf Course": [
    { label: "Blue",  courseRating: "68.4", slope: "120" },
    { label: "White", courseRating: "66.3", slope: "115" },
    { label: "Gold",  courseRating: "63.1", slope: "106" },
  ],
  "Green Harbor Golf Club": [
    { label: "Blue",  courseRating: "69.8", slope: "118" },
    { label: "White", courseRating: "67.8", slope: "112" },
    { label: "Red",   courseRating: "65.0", slope: "106" },
  ],
  "Atlantic Country Club": [
    { label: "Black", courseRating: "72.9", slope: "131" },
    { label: "Blue",  courseRating: "71.8", slope: "128" },
    { label: "White", courseRating: "69.5", slope: "122" },
    { label: "Red",   courseRating: "66.8", slope: "114" },
  ],
  "West Bridgewater Country Club": [
    { label: "Gold",  courseRating: "70.9", slope: "127" },
    { label: "Blue",  courseRating: "69.9", slope: "125" },
    { label: "White", courseRating: "67.6", slope: "124" },
    { label: "Red",   courseRating: "67.3", slope: "115" },
  ],
  "Ridder Farm Golf Club": [
    { label: "Blue",  courseRating: "68.1", slope: "113" },
    { label: "White", courseRating: "66.3", slope: "110" },
    { label: "Red",   courseRating: "67.1", slope: "115" },
  ],
  "Village Links Golf Club": [
    { label: "Blue",  courseRating: "70.2", slope: "119" },
    { label: "White", courseRating: "67.8", slope: "112" },
    { label: "Red",   courseRating: "65.0", slope: "105" },
  ],
  "Pinehills Golf Club (Jones Course)": [
    { label: "Black",  courseRating: "75.4", slope: "137" },
    { label: "Blue",   courseRating: "72.4", slope: "133" },
    { label: "White",  courseRating: "69.8", slope: "127" },
    { label: "Silver", courseRating: "68.1", slope: "125" },
    { label: "Red",    courseRating: "71.3", slope: "127" },
  ],
  "Pinehills Golf Club (Nicklaus Course)": [
    { label: "Black",  courseRating: "75.2", slope: "135" },
    { label: "Blue",   courseRating: "72.4", slope: "130" },
    { label: "White",  courseRating: "69.5", slope: "124" },
    { label: "Silver", courseRating: "67.8", slope: "121" },
    { label: "Red",    courseRating: "70.4", slope: "124" },
  ],
};

const SOUTH_SHORE_COURSES = [
  { group: "── Abington ──", disabled: true },
  { name: "Strawberry Valley Golf Course", town: "Abington", access: "Municipal", holes: 9, par: 35 },
  { group: "── Braintree ──", disabled: true },
  { name: "Braintree Municipal Golf Course", town: "Braintree", access: "Municipal", holes: 18, par: 72 },
  { group: "── Bridgewater ──", disabled: true },
  { name: "Olde Scotland Links", town: "Bridgewater", access: "Municipal", holes: 18, par: 72 },
  { group: "── Brockton ──", disabled: true },
  { name: "D.W. Field Golf Course", town: "Brockton", access: "Municipal", holes: 18, par: 70 },
  { group: "── Canton ──", disabled: true },
  { name: "Ponkapoag Golf Club (Course 1)", town: "Canton", access: "Municipal", holes: 18, par: 72 },
  { name: "Ponkapoag Golf Club (Course 2)", town: "Canton", access: "Municipal", holes: 18, par: 70 },
  { group: "── Duxbury ──", disabled: true },
  { name: "North Hill Country Club", town: "Duxbury", access: "Municipal", holes: 9, par: 35 },
  { group: "── East Bridgewater ──", disabled: true },
  { name: "Ridder Farm Golf Club", town: "East Bridgewater", access: "Public", holes: 18, par: 70 },
  { group: "── Hingham ──", disabled: true },
  { name: "South Shore Country Club", town: "Hingham", access: "Municipal", holes: 18, par: 72 },
  { group: "── Kingston ──", disabled: true },
  { name: "Pilgrim's Harbor Golf Club", town: "Kingston", access: "Public", holes: 9, par: 35 },
  { group: "── Marshfield ──", disabled: true },
  { name: "Green Harbor Golf Club", town: "Marshfield", access: "Public", holes: 18, par: 71 },
  { group: "── Pembroke ──", disabled: true },
  { name: "Pembroke Country Club", town: "Pembroke", access: "Semi-Private", holes: 18, par: 71 },
  { group: "── Plymouth ──", disabled: true },
  { name: "Atlantic Country Club", town: "Plymouth", access: "Semi-Private", holes: 18, par: 72 },
  { name: "Pinehills Golf Club (Jones Course)", town: "Plymouth", access: "Semi-Private", holes: 18, par: 72 },
  { name: "Pinehills Golf Club (Nicklaus Course)", town: "Plymouth", access: "Semi-Private", holes: 18, par: 72 },
  { name: "Southers Marsh Golf Club", town: "Plymouth", access: "Public", holes: 18, par: 61 },
  { name: "Squirrel Run Golf Club", town: "Plymouth", access: "Public", holes: 18, par: 57 },
  { name: "Village Links Golf Club", town: "Plymouth", access: "Public", holes: 18, par: 72 },
  { group: "── Quincy ──", disabled: true },
  { name: "Presidents Golf Course", town: "North Quincy", access: "Municipal", holes: 18, par: 70 },
  { name: "Granite Links Golf Club (Quincy/Milton)", town: "Quincy", access: "Semi-Private", holes: 18, par: 71 },
  { name: "Granite Links Golf Club (Granite/Quincy)", town: "Quincy", access: "Semi-Private", holes: 18, par: 71 },
  { name: "Furnace Brook Golf Club", town: "Quincy", access: "Semi-Private", holes: 9, par: 35 },
  { group: "── Rockland ──", disabled: true },
  { name: "Rockland Golf Course", town: "Rockland", access: "Public", holes: 18, par: 54 },
  { group: "── Scituate ──", disabled: true },
  { name: "Widow's Walk Golf Course", town: "Scituate", access: "Municipal", holes: 18, par: 72 },
  { group: "── Stoughton ──", disabled: true },
  { name: "Cedar Hill Golf Course", town: "Stoughton", access: "Municipal", holes: 9, par: 33 },
  { group: "── West Bridgewater ──", disabled: true },
  { name: "West Bridgewater Country Club", town: "West Bridgewater", access: "Public", holes: 18, par: 71 },
  { group: "── Weymouth ──", disabled: true },
  { name: "Weathervane Golf Club", town: "South Weymouth", access: "Semi-Private", holes: 9, par: 36 },
  { group: "── Other / Custom ──", disabled: true },
  { name: "Other (type below)", town: "", access: "", holes: 18, par: 72 },
];

const defaultHoles = (count = 18) =>
  Array.from({ length: count }, (_, i) => ({
    hole: i + 1,
    par: i % 9 < 2 ? 4 : i % 9 === 2 ? 3 : i % 9 === 3 ? 5 : i % 9 === 4 ? 4 : i % 9 === 5 ? 3 : i % 9 === 6 ? 4 : i % 9 === 7 ? 5 : 4,
    strokes: "", putts: "", fairway: "–", drop: 0, gir: "–", scramble: "–",
  }));

const STAT_INFO = {
  "Par":     { title: "Par", body: "The expected number of strokes for a hole. Par 3, 4, or 5. Your score relative to par is the key measure of your round." },
  "Strokes": { title: "Strokes (excl. putts)", body: "All shots taken before you start putting — tee shot, approach, chips. Separates your ball-striking from your putting." },
  "Putts":   { title: "Putts", body: "Number of strokes taken on the putting green. Tour average is ~29/round. Most amateurs average 32–36." },
  "Total":   { title: "Total Score", body: "Strokes + Putts for the hole. Color coded: eagle = amber, birdie = blue, par = neutral, bogey = warm red, double+ = deep red." },
  "Fairway": { title: "Fairway Hit", body: "Did your tee shot land in the fairway? ✓ = hit, L = missed left, R = missed right. N/A on par 3s." },
  "Drops":   { title: "Penalty Drops", body: "Penalty strokes taken on this hole — OB, water hazard, lost ball, unplayable lie." },
  "GIR":     { title: "Green in Regulation", body: "Ball on the putting surface with 2 putts remaining to make par.\n\nPar 3 → on in 1\nPar 4 → on in 2\nPar 5 → on in 3\n\nTour pros hit ~65% GIR." },
  "U/D":     { title: "Up & Down (Scrambling)", body: "After missing the green, did you get up and down in 2?\n\n✓ = Yes (chip + 1 putt)\n✗ = No\n– = N/A (you hit the GIR)\n\nTour pros scramble ~60%. Most amateurs 20–30%." },
  "+/–":     { title: "Score vs Par", body: "Total score minus par. Eagle = -2, Birdie = -1, Par = 0, Bogey = +1, Double = +2." },
};

const fairwayOptions = ["–", "✓", "L", "R"];
const girOptions     = ["–", "✓", "✗"];
const scrambleOptions = ["–", "✓", "✗"];

function calcHandicap(score, courseRating, slopeRating) {
  if (!score || !courseRating || !slopeRating) return null;
  return ((score - parseFloat(courseRating)) * 113) / parseFloat(slopeRating);
}

function holeScore(h) {
  const s = parseInt(h.strokes) || 0;
  const p = parseInt(h.putts) || 0;
  return s + p > 0 ? s + p : 0;
}

function getRoundStats(round) {
  const holes = round.holes;
  const totalScore = holes.reduce((s, h) => s + holeScore(h), 0);
  const totalPutts = holes.reduce((s, h) => s + (parseInt(h.putts) || 0), 0);
  const totalPar   = holes.reduce((s, h) => s + h.par, 0);
  const fairwaysHit = holes.filter(h => h.fairway === "✓").length;
  const fairwaysAttempted = holes.filter(h => h.fairway !== "–").length;
  const girsHit    = holes.filter(h => h.gir === "✓").length;
  const girsTotal  = holes.length;
  const scrambleHit = holes.filter(h => h.scramble === "✓").length;
  const scrambleAttempted = holes.filter(h => h.scramble === "✓" || h.scramble === "✗").length;
  const diff = calcHandicap(totalScore, round.courseRating, round.slopeRating);
  return { totalScore, totalPutts, totalPar, fairwaysHit, fairwaysAttempted, girsHit, girsTotal, scrambleHit, scrambleAttempted, diff };
}

function calcHandicapIndex(rounds) {
  const last20 = rounds.slice(0, 20);
  const diffs = last20
    .map(r => { const { totalScore } = getRoundStats(r); return calcHandicap(totalScore, r.courseRating, r.slopeRating); })
    .filter(d => d !== null)
    .sort((a, b) => a - b);
  if (diffs.length < 3) return null;
  const count = diffs.length <= 6 ? 1 : diffs.length <= 8 ? 2 : diffs.length <= 11 ? 3 : diffs.length <= 14 ? 4 : diffs.length <= 16 ? 5 : diffs.length <= 18 ? 6 : 8;
  const best = diffs.slice(0, count);
  const avg = best.reduce((a, b) => a + b, 0) / best.length;
  return (avg * 0.96).toFixed(1);
}

// ─── Design tokens (used inline + in CSS string) ──────────────────────────────
const T = {
  bg:        "#0A0F0C",
  surface:   "#111916",
  surface2:  "#172012",
  surface3:  "#1D2A1A",
  border:    "#233228",
  borderHi:  "#2D4235",
  green:     "#3D8B5E",
  greenDim:  "#244D37",
  greenGlow: "rgba(61,139,94,0.15)",
  gold:      "#B8976A",
  goldDim:   "rgba(184,151,106,0.12)",
  red:       "#C05050",
  redDim:    "rgba(192,80,80,0.12)",
  blue:      "#4A7FA5",
  blueDim:   "rgba(74,127,165,0.15)",
  text:      "#E2EAE4",
  textDim:   "#6B8A72",
  textMuted: "#3D5244",
};

// ─── Global CSS ───────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: ${T.bg};
    --surface: ${T.surface};
    --surface2: ${T.surface2};
    --surface3: ${T.surface3};
    --border: ${T.border};
    --border-hi: ${T.borderHi};
    --green: ${T.green};
    --green-dim: ${T.greenDim};
    --green-glow: ${T.greenGlow};
    --gold: ${T.gold};
    --gold-dim: ${T.goldDim};
    --red: ${T.red};
    --red-dim: ${T.redDim};
    --blue: ${T.blue};
    --blue-dim: ${T.blueDim};
    --text: ${T.text};
    --text-dim: ${T.textDim};
    --text-muted: ${T.textMuted};
    --font-display: 'Cormorant Garamond', Georgia, serif;
    --font-body: 'DM Sans', system-ui, sans-serif;
    --font-mono: 'JetBrains Mono', 'Courier New', monospace;
    --radius: 10px;
    --radius-sm: 6px;
    --shadow: 0 2px 16px rgba(0,0,0,0.4);
    --shadow-lg: 0 8px 40px rgba(0,0,0,0.5);
  }

  body { background: var(--bg); color: var(--text); font-family: var(--font-body); }

  /* ── App shell ── */
  .app {
    background: var(--bg);
    min-height: 100vh;
    max-width: 860px;
    margin: 0 auto;
    padding: 0 16px 64px;
  }

  /* ── Header ── */
  .app-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 28px 0 20px;
    border-bottom: 1px solid var(--border);
    margin-bottom: 28px;
    gap: 12px;
    flex-wrap: wrap;
  }
  .app-logo {
    font-family: var(--font-display);
    font-size: 1.9rem;
    font-weight: 600;
    color: var(--text);
    letter-spacing: 0.01em;
    line-height: 1;
  }
  .app-logo em {
    color: var(--green);
    font-style: normal;
  }
  .app-logo-sub {
    font-family: var(--font-body);
    font-size: 0.68rem;
    font-weight: 400;
    color: var(--text-muted);
    letter-spacing: 0.14em;
    text-transform: uppercase;
    margin-top: 3px;
  }
  .header-right {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .hcp-chip {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    color: var(--gold);
    background: var(--gold-dim);
    border: 1px solid rgba(184,151,106,0.25);
    border-radius: 20px;
    padding: 4px 12px;
    letter-spacing: 0.04em;
  }

  /* ── Buttons ── */
  .btn {
    font-family: var(--font-body);
    font-size: 0.8rem;
    font-weight: 500;
    padding: 8px 18px;
    border-radius: var(--radius-sm);
    border: 1px solid var(--border-hi);
    background: transparent;
    color: var(--text-dim);
    cursor: pointer;
    transition: all 0.18s ease;
    letter-spacing: 0.01em;
    white-space: nowrap;
  }
  .btn:hover { border-color: var(--green); color: var(--text); }
  .btn.active { border-color: var(--green); color: var(--green); background: var(--green-glow); }
  .btn-primary {
    background: var(--green);
    border-color: var(--green);
    color: #0A1A0F;
    font-weight: 600;
  }
  .btn-primary:hover { background: #4EA370; border-color: #4EA370; color: #0A1A0F; }
  .btn-ghost {
    border-color: transparent;
    color: var(--text-dim);
    padding: 6px 10px;
    font-size: 0.75rem;
  }
  .btn-ghost:hover { color: var(--text); border-color: var(--border); background: var(--surface2); }
  .btn-danger { border-color: transparent; color: var(--text-muted); }
  .btn-danger:hover { border-color: var(--red); color: var(--red); background: var(--red-dim); }
  .btn-sm { padding: 5px 12px; font-size: 0.72rem; }
  .btn-icon { padding: 6px 10px; font-size: 0.8rem; }

  /* ── Tab bar ── */
  .tab-bar {
    display: flex;
    gap: 0;
    margin-bottom: 28px;
    border-bottom: 1px solid var(--border);
    overflow-x: auto;
    scrollbar-width: none;
  }
  .tab-bar::-webkit-scrollbar { display: none; }
  .tab-btn {
    font-family: var(--font-body);
    font-size: 0.78rem;
    font-weight: 500;
    color: var(--text-dim);
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    padding: 10px 16px;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.18s;
    margin-bottom: -1px;
    letter-spacing: 0.01em;
  }
  .tab-btn:hover { color: var(--text); }
  .tab-btn.active { color: var(--green); border-bottom-color: var(--green); font-weight: 600; }

  /* ── Round list ── */
  .round-list { display: flex; flex-direction: column; gap: 10px; }
  .round-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 18px 22px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    transition: border-color 0.18s, background 0.18s;
    gap: 16px;
  }
  .round-card:hover { border-color: var(--border-hi); background: var(--surface2); }
  .round-card-name {
    font-family: var(--font-display);
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 3px;
    line-height: 1.2;
  }
  .round-card-meta {
    font-size: 0.75rem;
    color: var(--text-dim);
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
  }
  .round-card-meta-sep { color: var(--text-muted); }
  .round-card-right { display: flex; align-items: center; gap: 14px; flex-shrink: 0; }
  .round-score {
    font-family: var(--font-mono);
    font-size: 2rem;
    font-weight: 600;
    color: var(--text);
    min-width: 52px;
    text-align: right;
    line-height: 1;
  }
  .round-score-diff {
    font-family: var(--font-mono);
    font-size: 0.78rem;
    font-weight: 600;
    min-width: 28px;
    text-align: center;
  }
  .round-actions { display: flex; gap: 6px; }

  /* ── Empty state ── */
  .empty-state {
    text-align: center;
    padding: 80px 24px;
    color: var(--text-dim);
  }
  .empty-state-title {
    font-family: var(--font-display);
    font-size: 2rem;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 8px;
  }
  .empty-state-sub { font-size: 0.88rem; margin-bottom: 28px; }

  /* ── Stat grid ── */
  .stat-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 10px;
    margin: 24px 0;
  }
  .stat-card {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .stat-label {
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--text-muted);
    font-weight: 600;
  }
  .stat-value {
    font-family: var(--font-mono);
    font-size: 1.55rem;
    font-weight: 600;
    color: var(--gold);
    line-height: 1;
  }
  .stat-sub {
    font-size: 0.68rem;
    color: var(--text-dim);
  }

  /* ── Scorecard ── */
  .scorecard-wrap { overflow-x: auto; margin-top: 20px; border-radius: var(--radius); border: 1px solid var(--border); }
  .scorecard {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.82rem;
  }
  .scorecard thead tr {
    background: var(--surface2);
    border-bottom: 1px solid var(--border);
  }
  .scorecard th {
    padding: 10px 8px;
    text-align: center;
    font-family: var(--font-body);
    font-size: 0.62rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-muted);
    white-space: nowrap;
  }
  .scorecard th:first-child { text-align: left; padding-left: 16px; }
  .scorecard th .info-trigger {
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 2px;
    color: inherit;
  }
  .scorecard th .info-trigger:hover { color: var(--green); }
  .scorecard th .info-trigger .info-icon { font-size: 0.55rem; color: var(--green); opacity: 0.6; }

  .hole-row td {
    padding: 7px 8px;
    text-align: center;
    border-bottom: 1px solid var(--border);
    vertical-align: middle;
    transition: background 0.1s;
  }
  .hole-row:last-child td { border-bottom: none; }
  .hole-row td:first-child { text-align: left; padding-left: 16px; }

  /* Score color rows */
  .row-eagle td { background: rgba(184,151,106,0.10); }
  .row-birdie td { background: rgba(74,127,165,0.12); }
  .row-bogey  td { background: rgba(192,80,80,0.07); }
  .row-double td { background: rgba(192,80,80,0.16); }

  .cell-hole {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    font-weight: 500;
    color: var(--text-muted);
  }
  .cell-total {
    font-family: var(--font-mono);
    font-weight: 600;
    font-size: 0.92rem;
    color: var(--text);
  }
  .cell-diff {
    font-family: var(--font-mono);
    font-size: 0.78rem;
    font-weight: 600;
  }

  /* Inputs inside scorecard */
  .sc-input {
    background: transparent;
    border: none;
    border-bottom: 1px solid var(--border);
    color: var(--gold);
    font-family: var(--font-mono);
    font-size: 0.9rem;
    font-weight: 500;
    padding: 3px 4px;
    width: 40px;
    text-align: center;
    transition: border-color 0.15s;
    border-radius: 0;
  }
  .sc-input:focus { outline: none; border-bottom-color: var(--green); }
  .sc-input-putts { color: var(--blue); }
  .sc-input-drop { color: var(--red); width: 32px; }
  .sc-select-par {
    background: transparent;
    border: none;
    border-bottom: 1px solid var(--border);
    color: var(--text-dim);
    font-family: var(--font-mono);
    font-size: 0.8rem;
    padding: 3px 2px;
    width: 36px;
    text-align: center;
    cursor: pointer;
  }
  .sc-select-par:focus { outline: none; }

  /* Toggle buttons */
  .toggle-group { display: flex; gap: 3px; justify-content: center; }
  .toggle-btn {
    background: none;
    border: 1px solid var(--border);
    color: var(--text-muted);
    font-family: var(--font-mono);
    font-size: 0.72rem;
    padding: 3px 6px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.12s;
    line-height: 1.2;
  }
  .toggle-btn:hover { border-color: var(--border-hi); color: var(--text-dim); }
  .toggle-hit { background: rgba(61,139,94,0.15) !important; border-color: var(--green) !important; color: var(--green) !important; }
  .toggle-miss { background: rgba(192,80,80,0.15) !important; border-color: var(--red) !important; color: var(--red) !important; }
  .na-tag { font-size: 0.6rem; color: var(--text-muted); letter-spacing: 0.05em; }

  /* Subtotal / total rows */
  .sc-subtotal td {
    background: var(--surface2);
    padding: 8px;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--text-dim);
    border-top: 1px solid var(--border-hi);
    border-bottom: 1px solid var(--border-hi);
    text-align: center;
  }
  .sc-subtotal td:first-child { text-align: left; padding-left: 16px; font-weight: 600; color: var(--text); }
  .sc-total td {
    background: var(--surface3);
    padding: 10px 8px;
    font-family: var(--font-mono);
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--text);
    text-align: center;
  }
  .sc-total td:first-child { text-align: left; padding-left: 16px; color: var(--gold); }

  /* Section divider in table */
  .sc-divider td { padding: 0; border: none; }
  .sc-divider-line { height: 1px; background: var(--border-hi); margin: 4px 0; }

  /* ── Round header ── */
  .round-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 6px;
    flex-wrap: wrap;
    gap: 14px;
  }
  .round-header-title {
    font-family: var(--font-display);
    font-size: 1.7rem;
    font-weight: 600;
    color: var(--text);
    line-height: 1.1;
  }
  .round-header-meta { font-size: 0.75rem; color: var(--text-dim); margin-top: 5px; }
  .round-header-actions { display: flex; gap: 8px; flex-shrink: 0; }

  /* Score legend */
  .score-legend {
    display: flex;
    gap: 18px;
    font-size: 0.65rem;
    color: var(--text-muted);
    margin: 12px 0 4px;
    flex-wrap: wrap;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
  .legend-swatch {
    width: 8px; height: 8px; border-radius: 2px; display: inline-block; margin-right: 5px; vertical-align: middle;
  }

  /* ── Notes ── */
  .notes-section { margin-top: 28px; padding-top: 20px; border-top: 1px solid var(--border); }
  .notes-label {
    font-size: 0.72rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--text-muted);
    margin-bottom: 10px;
  }
  .notes-textarea {
    width: 100%;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    color: var(--text);
    font-family: var(--font-body);
    font-size: 0.85rem;
    line-height: 1.65;
    padding: 14px 16px;
    resize: vertical;
    min-height: 100px;
    transition: border-color 0.18s;
  }
  .notes-textarea:focus { outline: none; border-color: var(--green); }
  .notes-textarea::placeholder { color: var(--text-muted); font-style: italic; }

  /* ── Modal ── */
  .modal-overlay {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.72);
    backdrop-filter: blur(4px);
    display: flex; align-items: center; justify-content: center;
    z-index: 100; padding: 20px;
  }
  .modal {
    background: var(--surface);
    border: 1px solid var(--border-hi);
    border-radius: 14px;
    padding: 32px;
    width: 100%;
    max-width: 460px;
    max-height: 92vh;
    overflow-y: auto;
    box-shadow: var(--shadow-lg);
  }
  .modal-title {
    font-family: var(--font-display);
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 24px;
  }
  .modal-section {
    font-size: 0.62rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--text-muted);
    margin: 20px 0 10px;
    padding-bottom: 6px;
    border-bottom: 1px solid var(--border);
  }
  .modal-actions { display: flex; gap: 10px; margin-top: 24px; justify-content: flex-end; }

  /* Form fields */
  .field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 14px; }
  .field-label {
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 0.06em;
    color: var(--text-dim);
    text-transform: uppercase;
  }
  .field-input {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    color: var(--text);
    font-family: var(--font-body);
    font-size: 0.9rem;
    padding: 10px 14px;
    transition: border-color 0.18s;
    width: 100%;
  }
  .field-input:focus { outline: none; border-color: var(--green); }
  .field-select {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    color: var(--text);
    font-family: var(--font-body);
    font-size: 0.88rem;
    padding: 10px 14px;
    width: 100%;
    cursor: pointer;
    transition: border-color 0.18s;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%236B8A72' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 14px center;
    padding-right: 36px;
  }
  .field-select:focus { outline: none; border-color: var(--green); }
  .field-select option[disabled] { color: var(--gold); font-weight: 600; background: var(--surface); }

  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

  /* Toggle pill (checkbox) */
  .toggle-pill { display: flex; align-items: center; gap: 12px; cursor: pointer; }
  .toggle-pill-track {
    width: 38px; height: 21px;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 11px;
    position: relative;
    transition: background 0.2s, border-color 0.2s;
    flex-shrink: 0;
  }
  .toggle-pill-track.on { background: var(--green-dim); border-color: var(--green); }
  .toggle-pill-thumb {
    position: absolute;
    width: 15px; height: 15px;
    background: var(--text-muted);
    border-radius: 50%;
    top: 2px; left: 2px;
    transition: left 0.2s, background 0.2s;
  }
  .toggle-pill-track.on .toggle-pill-thumb { left: 20px; background: var(--green); }
  .toggle-pill-label { font-size: 0.86rem; color: var(--text); }

  /* Info modal */
  .info-modal-title { font-family: var(--font-display); font-size: 1.4rem; font-weight: 600; color: var(--text); margin-bottom: 14px; }
  .info-modal-body { font-size: 0.85rem; color: var(--text-dim); line-height: 1.7; white-space: pre-line; }

  /* Handicap panel */
  .hcp-hero {
    background: linear-gradient(135deg, var(--surface2), var(--surface3));
    border: 1px solid rgba(184,151,106,0.2);
    border-radius: var(--radius);
    padding: 32px;
    text-align: center;
    margin-bottom: 24px;
  }
  .hcp-hero-label { font-size: 0.65rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 10px; }
  .hcp-hero-value { font-family: var(--font-mono); font-size: 4rem; font-weight: 600; color: var(--gold); line-height: 1; }
  .hcp-hero-sub { font-size: 0.72rem; color: var(--text-dim); margin-top: 10px; }

  .diff-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 14px;
    border-radius: var(--radius-sm);
    margin-bottom: 6px;
    border: 1px solid var(--border);
    background: var(--surface2);
  }
  .diff-row.used { background: var(--gold-dim); border-color: rgba(184,151,106,0.3); }
  .diff-row-left { font-size: 0.82rem; color: var(--text); }
  .diff-row-date { font-size: 0.7rem; color: var(--text-dim); margin-top: 2px; }
  .diff-row-right { display: flex; align-items: center; gap: 10px; }
  .used-badge { font-size: 0.58rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--gold); }
  .diff-value { font-family: var(--font-mono); font-size: 0.9rem; font-weight: 600; }

  /* Bests */
  .best-card {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 18px 22px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    transition: border-color 0.18s;
  }
  .best-card:hover { border-color: var(--border-hi); }
  .best-card-label { font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--gold); margin-bottom: 5px; }
  .best-card-course { font-size: 0.9rem; color: var(--text); font-weight: 500; }
  .best-card-date { font-size: 0.7rem; color: var(--text-dim); margin-top: 2px; }
  .best-card-value { font-family: var(--font-mono); font-size: 2rem; font-weight: 600; color: var(--gold); }

  /* Courses */
  .course-card {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 16px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    margin-bottom: 8px;
    transition: border-color 0.18s, background 0.18s;
  }
  .course-card:hover { border-color: var(--border-hi); background: var(--surface3); }
  .course-card-name { font-size: 0.95rem; font-weight: 500; color: var(--text); margin-bottom: 3px; }
  .course-card-sub { font-size: 0.72rem; color: var(--text-dim); }
  .course-card-arrow { color: var(--text-muted); font-size: 1.1rem; }

  /* Share textarea */
  .share-textarea {
    width: 100%;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    color: var(--text-dim);
    font-family: var(--font-mono);
    font-size: 0.78rem;
    line-height: 1.75;
    padding: 14px;
    min-height: 220px;
    resize: none;
  }

  /* Trends */
  .metric-tabs { display: flex; gap: 8px; margin-bottom: 20px; flex-wrap: wrap; }
  .chart-wrap {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 20px;
  }
  .chart-footer { display: flex; justify-content: space-between; font-size: 0.65rem; color: var(--text-muted); margin-top: 8px; }

  /* Window selector */
  .window-tabs { display: flex; gap: 8px; margin-bottom: 20px; }
`;

// ─── Info Modal ───────────────────────────────────────────────────────────────
function InfoModal({ stat, onClose }) {
  if (!stat) return null;
  const info = STAT_INFO[stat];
  if (!info) return null;
  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 200 }}>
      <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 360 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
          <div className="info-modal-title">{info.title}</div>
          <button className="btn btn-ghost btn-icon" onClick={onClose}>✕</button>
        </div>
        <div className="info-modal-body">{info.body}</div>
      </div>
    </div>
  );
}

// ─── Stat header cell ─────────────────────────────────────────────────────────
function StatTh({ label, onInfo, style }) {
  return (
    <th style={style}>
      <span className="info-trigger" onClick={() => onInfo(label)} style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 2 }}>
        {label}
        <span style={{ fontSize: "0.52rem", color: T.green, opacity: 0.7 }}>ⓘ</span>
      </span>
    </th>
  );
}

// ─── Round Summary ────────────────────────────────────────────────────────────
function RoundSummary({ round }) {
  const holes = round.holes;
  const totalScore   = holes.reduce((s, h) => s + holeScore(h), 0);
  const totalStrokes = holes.reduce((s, h) => s + (parseInt(h.strokes) || 0), 0);
  const totalPutts   = holes.reduce((s, h) => s + (parseInt(h.putts) || 0), 0);
  const totalPar     = holes.reduce((s, h) => s + h.par, 0);
  const front9Score  = holes.slice(0, 9).reduce((s, h) => s + holeScore(h), 0);
  const back9Score   = holes.slice(9).reduce((s, h) => s + holeScore(h), 0);
  const fairwaysHit  = holes.filter(h => h.fairway === "✓").length;
  const fairwaysAtt  = holes.filter(h => h.fairway !== "–").length;
  const girsHit      = holes.filter(h => h.gir === "✓").length;
  const girsAtt      = holes.filter(h => h.gir !== "–").length;
  const drops        = holes.reduce((s, h) => s + (parseInt(h.drop) || 0), 0);
  const scrHit       = holes.filter(h => h.scramble === "✓").length;
  const scrAtt       = holes.filter(h => h.scramble === "✓" || h.scramble === "✗").length;
  const scoreToPar   = totalScore - totalPar;
  const diff         = calcHandicap(totalScore, round.courseRating, round.slopeRating);

  const cards = [
    { label: "Score",     value: totalScore || "–",  sub: totalScore ? `${scoreToPar > 0 ? "+" : ""}${scoreToPar} vs par ${totalPar}` : "" },
    { label: "Strokes",   value: totalStrokes || "–", sub: "excl. putts" },
    { label: "Putts",     value: totalPutts || "–",   sub: totalPutts ? `${(totalPutts / holes.filter(h => parseInt(h.putts) > 0).length || 0).toFixed(1)} avg` : "" },
    ...(round.nineHole ? [] : [
      { label: "Front 9", value: front9Score || "–", sub: "" },
      { label: "Back 9",  value: back9Score  || "–", sub: "" },
    ]),
    { label: "Fairways",    value: fairwaysAtt ? `${fairwaysHit}/${fairwaysAtt}` : "–", sub: fairwaysAtt ? `${Math.round(fairwaysHit / fairwaysAtt * 100)}%` : "" },
    { label: "GIR",         value: girsAtt ? `${girsHit}/${girsAtt}` : "–",             sub: girsAtt ? `${Math.round(girsHit / girsAtt * 100)}%` : "" },
    { label: "Up & Down",   value: scrAtt ? `${scrHit}/${scrAtt}` : "–",                sub: scrAtt ? `${Math.round(scrHit / scrAtt * 100)}%` : "" },
    { label: "Drops",       value: drops,  sub: "penalty strokes" },
    { label: "Hcp Diff",    value: diff !== null ? diff.toFixed(1) : "–", sub: round.courseRating ? `CR ${round.courseRating} / ${round.slopeRating}` : "" },
  ];

  return (
    <div className="stat-grid">
      {cards.map(c => (
        <div className="stat-card" key={c.label}>
          <span className="stat-label">{c.label}</span>
          <span className="stat-value">{c.value}</span>
          {c.sub && <span className="stat-sub">{c.sub}</span>}
        </div>
      ))}
    </div>
  );
}

// ─── Hole Row ─────────────────────────────────────────────────────────────────
function HoleRow({ hole, onChange }) {
  const total = holeScore(hole);
  const diff  = total > 0 ? total - hole.par : null;
  const rowClass = diff === null ? "" : diff <= -2 ? "row-eagle" : diff === -1 ? "row-birdie" : diff === 1 ? "row-bogey" : diff >= 2 ? "row-double" : "";

  return (
    <tr className={`hole-row ${rowClass}`}>
      <td className="cell-hole">{hole.hole}</td>
      <td>
        <select className="sc-select-par" value={hole.par} onChange={e => onChange("par", parseInt(e.target.value))}>
          {[3, 4, 5].map(p => <option key={p}>{p}</option>)}
        </select>
      </td>
      <td>
        <input className="sc-input" type="number" min="1" max="15" value={hole.strokes} placeholder="—"
          onChange={e => onChange("strokes", e.target.value)} />
      </td>
      <td>
        <input className="sc-input sc-input-putts" type="number" min="0" max="9" value={hole.putts} placeholder="—"
          onChange={e => onChange("putts", e.target.value)} />
      </td>
      <td className="cell-total">{total > 0 ? total : "—"}</td>
      <td>
        {hole.par === 3 ? <span className="na-tag">N/A</span> : (
          <div className="toggle-group">
            {fairwayOptions.slice(1).map(o => (
              <button key={o} className={`toggle-btn ${hole.fairway === o ? (o === "✓" ? "toggle-hit" : "toggle-miss") : ""}`}
                onClick={() => onChange("fairway", hole.fairway === o ? "–" : o)}>{o}</button>
            ))}
          </div>
        )}
      </td>
      <td>
        <input className="sc-input sc-input-drop" type="number" min="0" max="5" value={hole.drop || ""} placeholder="0"
          onChange={e => onChange("drop", parseInt(e.target.value) || 0)} />
      </td>
      <td>
        <div className="toggle-group">
          {girOptions.slice(1).map(o => (
            <button key={o} className={`toggle-btn ${hole.gir === o ? (o === "✓" ? "toggle-hit" : "toggle-miss") : ""}`}
              onClick={() => onChange("gir", hole.gir === o ? "–" : o)}>{o}</button>
          ))}
        </div>
      </td>
      <td>
        {hole.gir === "✓" ? <span className="na-tag">N/A</span> : (
          <div className="toggle-group">
            {scrambleOptions.slice(1).map(o => (
              <button key={o} className={`toggle-btn ${hole.scramble === o ? (o === "✓" ? "toggle-hit" : "toggle-miss") : ""}`}
                onClick={() => onChange("scramble", hole.scramble === o ? "–" : o)}>{o}</button>
            ))}
          </div>
        )}
      </td>
      <td className="cell-diff" style={{ color: diff === null ? T.textMuted : diff < 0 ? T.blue : diff > 0 ? T.red : T.textDim }}>
        {diff !== null ? (diff > 0 ? "+" : "") + diff : "—"}
      </td>
    </tr>
  );
}

// ─── Subtotal row helper ──────────────────────────────────────────────────────
function SubtotalRow({ holes, label }) {
  const scr = (() => {
    const a = holes.filter(h => h.scramble === "✓" || h.scramble === "✗").length;
    const h = holes.filter(h => h.scramble === "✓").length;
    return a ? `${h}/${a}` : "—";
  })();
  return (
    <tr className="sc-subtotal">
      <td>{label}</td>
      <td>{holes.reduce((s, h) => s + h.par, 0)}</td>
      <td>{holes.reduce((s, h) => s + (parseInt(h.strokes) || 0), 0) || "—"}</td>
      <td style={{ color: T.blue }}>{holes.reduce((s, h) => s + (parseInt(h.putts) || 0), 0) || "—"}</td>
      <td style={{ color: T.gold, fontWeight: 700 }}>{holes.reduce((s, h) => s + holeScore(h), 0) || "—"}</td>
      <td>{holes.filter(h => h.fairway === "✓").length}/{holes.filter(h => h.fairway !== "–").length}</td>
      <td style={{ color: T.red }}>{holes.reduce((s, h) => s + (parseInt(h.drop) || 0), 0)}</td>
      <td>{holes.filter(h => h.gir === "✓").length}/{holes.length}</td>
      <td>{scr}</td>
      <td></td>
    </tr>
  );
}

// ─── Trends Chart ─────────────────────────────────────────────────────────────
function TrendsChart({ rounds }) {
  const [metric, setMetric] = useState("score");
  const metrics = [
    { key: "score",    label: "Score",    color: T.gold },
    { key: "putts",    label: "Putts",    color: T.blue },
    { key: "gir",      label: "GIR %",    color: T.green },
    { key: "fairways", label: "Fairways", color: "#8B6BAF" },
  ];

  const data = [...rounds].reverse().map(r => {
    const s = getRoundStats(r);
    return {
      label: r.date ? r.date.slice(5) : "?",
      score: s.totalScore,
      putts: s.totalPutts,
      gir: s.girsTotal ? Math.round(s.girsHit / s.girsTotal * 100) : 0,
      fairways: s.fairwaysAttempted ? Math.round(s.fairwaysHit / s.fairwaysAttempted * 100) : 0,
    };
  }).filter(d => d.score > 0);

  if (data.length < 2) return (
    <div style={{ textAlign: "center", padding: "60px 24px", color: T.textDim, fontSize: "0.85rem" }}>
      Need at least 2 completed rounds to show trends.
    </div>
  );

  const vals  = data.map(d => d[metric]);
  const min   = Math.min(...vals);
  const max   = Math.max(...vals);
  const range = max - min || 1;
  const W = 100, H = 60, pad = 8;
  const pts = data.map((d, i) => ({
    x: pad + (i / (data.length - 1)) * (W - pad * 2),
    y: H - pad - ((d[metric] - min) / range) * (H - pad * 2),
    d,
  }));
  const m = metrics.find(x => x.key === metric);
  const pathD = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");

  return (
    <div>
      <div className="metric-tabs">
        {metrics.map(m => (
          <button key={m.key} className={`btn btn-sm ${metric === m.key ? "active" : ""}`}
            style={metric === m.key ? { borderColor: m.color, color: m.color, background: m.color + "18" } : {}}
            onClick={() => setMetric(m.key)}>{m.label}</button>
        ))}
      </div>
      <div className="chart-wrap">
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", minWidth: 220, height: 130, display: "block" }}>
          {[0, 0.25, 0.5, 0.75, 1].map(t => (
            <line key={t} x1={pad} y1={pad + t * (H - pad * 2)} x2={W - pad} y2={pad + t * (H - pad * 2)}
              stroke={T.border} strokeWidth="0.4" />
          ))}
          <path d={pathD + ` L${pts[pts.length - 1].x},${H - pad} L${pts[0].x},${H - pad} Z`}
            fill={m.color} fillOpacity="0.07" />
          <path d={pathD} fill="none" stroke={m.color} strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
          {pts.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="2.2" fill={m.color} />)}
          {pts.map((p, i) => <text key={i} x={p.x} y={H - 1.5} textAnchor="middle" fontSize="3.2" fill={T.textMuted}>{p.d.label}</text>)}
        </svg>
        <div className="chart-footer">
          <span>Min: {min}{metric === "gir" || metric === "fairways" ? "%" : ""}</span>
          <span style={{ color: m.color, fontWeight: 600 }}>{m.label}</span>
          <span>Max: {max}{metric === "gir" || metric === "fairways" ? "%" : ""}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Stats Dashboard ──────────────────────────────────────────────────────────
function StatsDashboard({ rounds }) {
  const [window_, setWindow] = useState(10);
  const subset = rounds.slice(0, window_).filter(r => getRoundStats(r).totalScore > 0);

  if (subset.length === 0) return (
    <div style={{ textAlign: "center", padding: "60px 24px", color: T.textDim, fontSize: "0.85rem" }}>No completed rounds yet.</div>
  );

  const avg = arr => arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : null;
  const scores  = subset.map(r => getRoundStats(r).totalScore);
  const putts   = subset.map(r => getRoundStats(r).totalPutts);
  const girPct  = subset.map(r => { const s = getRoundStats(r); return s.girsTotal ? s.girsHit / s.girsTotal * 100 : 0; });
  const fwyPct  = subset.map(r => { const s = getRoundStats(r); return s.fairwaysAttempted ? s.fairwaysHit / s.fairwaysAttempted * 100 : 0; });
  const scrPct  = subset.map(r => { const s = getRoundStats(r); return s.scrambleAttempted ? s.scrambleHit / s.scrambleAttempted * 100 : 0; });
  const diffs   = subset.map(r => { const s = getRoundStats(r); return calcHandicap(s.totalScore, r.courseRating, r.slopeRating); }).filter(Boolean);

  const cards = [
    { label: "Avg Score",     value: avg(scores)?.toFixed(1),  sub: `${Math.min(...scores)} – ${Math.max(...scores)} range` },
    { label: "Avg Putts",     value: avg(putts)?.toFixed(1),   sub: "per round" },
    { label: "Avg GIR",       value: avg(girPct)?.toFixed(0) + "%", sub: "greens in regulation" },
    { label: "Avg Fairways",  value: avg(fwyPct)?.toFixed(0) + "%", sub: "fairways hit" },
    { label: "Scrambling",    value: avg(scrPct)?.toFixed(0) + "%", sub: "up & down rate" },
    { label: "Avg Diff",      value: diffs.length ? avg(diffs).toFixed(1) : "–", sub: "handicap differential" },
  ];

  return (
    <div>
      <div className="window-tabs">
        {[5, 10, 20].map(n => (
          <button key={n} className={`btn btn-sm ${window_ === n ? "active" : ""}`}
            onClick={() => setWindow(n)}>Last {n}</button>
        ))}
      </div>
      <div className="stat-grid">
        {cards.map(c => (
          <div className="stat-card" key={c.label}>
            <span className="stat-label">{c.label}</span>
            <span className="stat-value">{c.value || "—"}</span>
            <span className="stat-sub">{c.sub}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Personal Bests ───────────────────────────────────────────────────────────
function PersonalBests({ rounds }) {
  const completed = rounds.filter(r => getRoundStats(r).totalScore > 0);
  if (completed.length === 0) return (
    <div style={{ textAlign: "center", padding: "60px 24px", color: T.textDim, fontSize: "0.85rem" }}>Complete some rounds to see personal bests.</div>
  );

  const best = (arr, fn, low = true) =>
    arr.reduce((b, r) => { const v = fn(r); if (v === null) return b; return b === null || (low ? v < fn(b) : v > fn(b)) ? r : b; }, null);

  const scoreOf = r => getRoundStats(r).totalScore;
  const girOf   = r => { const s = getRoundStats(r); return s.girsTotal ? Math.round(s.girsHit / s.girsTotal * 100) : null; };
  const scOf    = r => { const s = getRoundStats(r); return s.scrambleAttempted ? Math.round(s.scrambleHit / s.scrambleAttempted * 100) : null; };
  const puttsOf = r => getRoundStats(r).totalPutts;

  const bests = [
    { label: "Best Score",      icon: "🏆", round: best(completed, scoreOf, true),  val: r => scoreOf(r) },
    { label: "Best GIR",        icon: "⛳", round: best(completed, girOf, false),   val: r => girOf(r) + "%" },
    { label: "Best Scrambling", icon: "🎯", round: best(completed, scOf, false),    val: r => scOf(r) + "%" },
    { label: "Fewest Putts",    icon: "🥅", round: best(completed, puttsOf, true),  val: r => puttsOf(r) + " putts" },
  ];

  return (
    <div>
      {bests.map(b => b.round ? (
        <div className="best-card" key={b.label}>
          <div>
            <div className="best-card-label">{b.icon} {b.label}</div>
            <div className="best-card-course">{b.round.course}</div>
            <div className="best-card-date">{b.round.date}</div>
          </div>
          <div className="best-card-value">{b.val(b.round)}</div>
        </div>
      ) : null)}
    </div>
  );
}

// ─── Course History ───────────────────────────────────────────────────────────
function CourseHistory({ rounds, onOpenRound }) {
  const [selected, setSelected] = useState(null);
  const courseMap = {};
  rounds.forEach(r => { const key = r.course || "Unnamed"; if (!courseMap[key]) courseMap[key] = []; courseMap[key].push(r); });
  const courses = Object.keys(courseMap).sort();

  if (!selected) return (
    <div>
      {courses.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 24px", color: T.textDim, fontSize: "0.85rem" }}>No rounds yet.</div>
      )}
      {courses.map(c => {
        const rs = courseMap[c];
        const scores = rs.map(r => getRoundStats(r).totalScore).filter(Boolean);
        const bestScore = scores.length ? Math.min(...scores) : null;
        return (
          <div className="course-card" key={c} onClick={() => setSelected(c)}>
            <div>
              <div className="course-card-name">{c}</div>
              <div className="course-card-sub">{rs.length} round{rs.length !== 1 ? "s" : ""}{bestScore ? ` · Best ${bestScore}` : ""}</div>
            </div>
            <div className="course-card-arrow">›</div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div>
      <button className="btn btn-ghost" style={{ marginBottom: 20 }} onClick={() => setSelected(null)}>← All Courses</button>
      <div style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 600, color: T.text, marginBottom: 18 }}>{selected}</div>
      {courseMap[selected].map(r => {
        const { totalScore, totalPar } = getRoundStats(r);
        const diff = totalScore - totalPar;
        return (
          <div className="round-card" key={r.id} onClick={() => onOpenRound(r.id)}>
            <div>
              <div className="round-card-meta">
                <span>{r.date}</span>
                {r.tees && <><span className="round-card-meta-sep">·</span><span>{r.tees} tees</span></>}
                {r.conditions?.weather && <><span className="round-card-meta-sep">·</span><span>{r.conditions.weather}</span></>}
                {r.partners && <><span className="round-card-meta-sep">·</span><span>{r.partners}</span></>}
              </div>
            </div>
            <div className="round-card-right">
              <div className="round-score" style={{ fontSize: "1.5rem" }}>{totalScore || "—"}</div>
              {totalScore > 0 && <div className="round-score-diff" style={{ color: diff <= 0 ? T.green : T.red }}>{diff > 0 ? "+" : ""}{diff}</div>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Handicap Panel ───────────────────────────────────────────────────────────
function HandicapPanel({ rounds }) {
  const idx = calcHandicapIndex(rounds);
  const completed = rounds.filter(r => { const { totalScore } = getRoundStats(r); return totalScore > 0 && r.courseRating && r.slopeRating; });
  const last20 = completed.slice(0, 20);
  const diffs = last20.map(r => { const { totalScore } = getRoundStats(r); return { r, d: calcHandicap(totalScore, r.courseRating, r.slopeRating) }; })
    .filter(x => x.d !== null).sort((a, b) => a.d - b.d);
  const countBest = diffs.length <= 6 ? 1 : diffs.length <= 8 ? 2 : diffs.length <= 11 ? 3 : diffs.length <= 14 ? 4 : diffs.length <= 16 ? 5 : diffs.length <= 18 ? 6 : 8;
  const bestIds = new Set(diffs.slice(0, countBest).map(x => x.r.id));

  return (
    <div>
      <div className="hcp-hero">
        <div className="hcp-hero-label">Handicap Index</div>
        <div className="hcp-hero-value">{idx ?? "—"}</div>
        <div className="hcp-hero-sub">
          {idx ? `Best ${countBest} of last ${last20.length} differentials × 0.96` : "Need at least 3 rounds with CR/Slope data"}
        </div>
      </div>
      {diffs.length > 0 && (
        <div>
          <div style={{ fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: T.textMuted, marginBottom: 12 }}>
            Differentials used in calculation
          </div>
          {diffs.map(({ r, d }) => (
            <div className={`diff-row ${bestIds.has(r.id) ? "used" : ""}`} key={r.id}>
              <div>
                <div className="diff-row-left">{r.course}</div>
                <div className="diff-row-date">{r.date}</div>
              </div>
              <div className="diff-row-right">
                {bestIds.has(r.id) && <span className="used-badge">★ Used</span>}
                <span className="diff-value" style={{ color: bestIds.has(r.id) ? T.gold : T.textDim }}>{d.toFixed(1)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Share Modal ──────────────────────────────────────────────────────────────
function ShareModal({ round, onClose }) {
  const { totalScore, totalPutts, totalPar, fairwaysHit, fairwaysAttempted, girsHit, girsTotal, scrambleHit, scrambleAttempted, diff } = getRoundStats(round);
  const scoreToPar = totalScore - totalPar;
  const emoji = scoreToPar <= -3 ? "🦅" : scoreToPar <= -1 ? "🐦" : scoreToPar === 0 ? "🎯" : scoreToPar <= 3 ? "⛳" : "🏌️";
  const text = [
    `${emoji} ${round.course}`,
    `📅 ${round.date}${round.tees ? ` · ${round.tees} tees` : ""}`,
    `🏆 Score: ${totalScore} (${scoreToPar > 0 ? "+" : ""}${scoreToPar})`,
    `🎯 Putts: ${totalPutts}`,
    fairwaysAttempted ? `🌿 Fairways: ${fairwaysHit}/${fairwaysAttempted} (${Math.round(fairwaysHit / fairwaysAttempted * 100)}%)` : null,
    `⛳ GIR: ${girsHit}/${girsTotal} (${Math.round(girsHit / girsTotal * 100)}%)`,
    scrambleAttempted ? `🥅 Scrambling: ${scrambleHit}/${scrambleAttempted} (${Math.round(scrambleHit / scrambleAttempted * 100)}%)` : null,
    diff !== null ? `📊 Differential: ${diff.toFixed(1)}` : null,
    round.conditions?.weather ? `🌤 ${round.conditions.weather}${round.conditions.temp ? `, ${round.conditions.temp}°F` : ""}${round.conditions.cart ? ` · ${round.conditions.cart}` : ""}` : null,
    round.partners ? `👥 With: ${round.partners}` : null,
    round.notes ? `\n📝 "${round.notes}"` : null,
    `\nTracked with FairwayLog`,
  ].filter(Boolean).join("\n");

  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }); };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 420 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div className="modal-title" style={{ marginBottom: 0 }}>Share Round</div>
          <button className="btn btn-ghost btn-icon" onClick={onClose}>✕</button>
        </div>
        <textarea className="share-textarea" readOnly value={text} />
        <button className="btn btn-primary" style={{ width: "100%", marginTop: 14 }} onClick={copy}>
          {copied ? "✓ Copied to clipboard" : "Copy to Clipboard"}
        </button>
      </div>
    </div>
  );
}

// ─── Toggle Pill ──────────────────────────────────────────────────────────────
function TogglePill({ checked, onChange, label }) {
  return (
    <div className="toggle-pill" onClick={() => onChange(!checked)}>
      <div className={`toggle-pill-track ${checked ? "on" : ""}`}>
        <div className="toggle-pill-thumb" />
      </div>
      <span className="toggle-pill-label">{label}</span>
    </div>
  );
}

// ─── Print ────────────────────────────────────────────────────────────────────
function printRound(round) {
  const holes = round.holes;
  const totalScore   = holes.reduce((s, h) => s + holeScore(h), 0);
  const totalStrokes = holes.reduce((s, h) => s + (parseInt(h.strokes) || 0), 0);
  const totalPutts   = holes.reduce((s, h) => s + (parseInt(h.putts) || 0), 0);
  const totalPar     = holes.reduce((s, h) => s + h.par, 0);
  const front        = holes.slice(0, 9);
  const back         = holes.slice(9);
  const scoreToPar   = totalScore - totalPar;
  const diff         = calcHandicap(totalScore, round.courseRating, round.slopeRating);

  const rowBg = h => {
    const total = holeScore(h); const d = total > 0 ? total - h.par : null;
    return d === null ? "" : d <= -2 ? "background:#fff3cd;" : d === -1 ? "background:#dbeeff;" : d === 1 ? "background:#fde8e8;" : d >= 2 ? "background:#f5c0c0;" : "";
  };
  const hRow = h => `<tr style="${rowBg(h)}"><td>${h.hole}</td><td>${h.par}</td><td>${h.strokes||"—"}</td><td>${h.putts||"—"}</td><td><b>${holeScore(h)||"—"}</b></td><td>${h.par===3?"N/A":h.fairway}</td><td>${h.drop||0}</td><td>${h.gir}</td><td>${h.gir==="✓"?"N/A":h.scramble}</td><td>${holeScore(h)>0?(holeScore(h)-h.par>0?"+":"")+(holeScore(h)-h.par):"—"}</td></tr>`;
  const subRow = (sl, lbl) => `<tr style="background:#f5f5f5;font-weight:600;"><td>${lbl}</td><td>${sl.reduce((s,h)=>s+h.par,0)}</td><td>${sl.reduce((s,h)=>s+(parseInt(h.strokes)||0),0)||"—"}</td><td>${sl.reduce((s,h)=>s+(parseInt(h.putts)||0),0)||"—"}</td><td><b>${sl.reduce((s,h)=>s+holeScore(h),0)||"—"}</b></td><td>${sl.filter(h=>h.fairway==="✓").length}/${sl.filter(h=>h.fairway!=="–").length}</td><td>${sl.reduce((s,h)=>s+(parseInt(h.drop)||0),0)}</td><td>${sl.filter(h=>h.gir==="✓").length}/${sl.length}</td><td>${(()=>{const a=sl.filter(h=>h.scramble==="✓"||h.scramble==="✗").length;const hh=sl.filter(h=>h.scramble==="✓").length;return a?`${hh}/${a}`:"—";})()}</td><td></td></tr>`;

  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${round.course}</title>
  <style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Helvetica Neue',sans-serif;color:#111;padding:24px 32px;font-size:12px}
  h1{font-family:Georgia,serif;font-size:22px;color:#1a3a1a;margin-bottom:2px}.meta{font-size:11px;color:#555;margin-bottom:3px}
  .header{border-bottom:2px solid #1a3a1a;padding-bottom:10px;margin-bottom:14px;display:flex;justify-content:space-between;align-items:flex-end}
  .logo{font-family:Georgia,serif;font-size:13px;color:#999}
  table{width:100%;border-collapse:collapse;margin-bottom:14px}
  th{background:#1a3a1a;color:#fff;padding:6px 8px;text-align:center;font-size:10px;text-transform:uppercase;letter-spacing:.06em}
  th:first-child{text-align:left}td{padding:5px 8px;text-align:center;border-bottom:1px solid #e5e5e5}td:first-child{text-align:left;font-weight:600}
  .summary{display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin-bottom:14px}
  .s{border:1px solid #ccc;border-radius:4px;padding:8px;text-align:center}.sl{font-size:9px;text-transform:uppercase;letter-spacing:.08em;color:#888;margin-bottom:2px}
  .sv{font-family:Georgia,serif;font-size:18px;color:#1a3a1a}.ss{font-size:9px;color:#888}
  .notes{border:1px solid #ccc;border-radius:4px;padding:12px;margin-top:6px}
  .nl{font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:#888;margin-bottom:5px}
  .nb{font-size:12px;line-height:1.6;white-space:pre-wrap}
  @media print{body{padding:12px 16px}}</style></head><body>
  <div class="header">
    <div><h1>${round.course}${round.nineHole?" (9-hole)":""}</h1>
    <div class="meta">${round.date}${round.tees?` · ${round.tees} tees`:""}${round.courseRating?` · CR ${round.courseRating} / Slope ${round.slopeRating}`:""}</div>
    ${round.conditions?.weather?`<div class="meta">${round.conditions.weather}${round.conditions.temp?` · ${round.conditions.temp}°F`:""}${round.conditions.cart?` · ${round.conditions.cart}`:""}</div>`:""}
    ${round.partners?`<div class="meta">With: ${round.partners}</div>`:""}</div>
    <div class="logo">FairwayLog</div>
  </div>
  <div class="summary">
    <div class="s"><div class="sl">Score</div><div class="sv">${totalScore||"—"}</div><div class="ss">${scoreToPar>0?"+":""}${scoreToPar} vs par</div></div>
    <div class="s"><div class="sl">Strokes</div><div class="sv">${totalStrokes||"—"}</div></div>
    <div class="s"><div class="sl">Putts</div><div class="sv">${totalPutts||"—"}</div></div>
    ${round.courseRating?`<div class="s"><div class="sl">Hcp Diff</div><div class="sv">${diff!==null?diff.toFixed(1):"—"}</div></div>`:`<div class="s"></div>`}
    <div class="s"><div class="sl">Par</div><div class="sv">${totalPar}</div></div>
  </div>
  <table><thead><tr><th>Hole</th><th>Par</th><th>Strokes</th><th>Putts</th><th>Total</th><th>Fairway</th><th>Drops</th><th>GIR</th><th>U/D</th><th>+/–</th></tr></thead>
  <tbody>${front.map(hRow).join("")}${subRow(front, round.nineHole?"TOTAL":"OUT")}
  ${!round.nineHole?back.map(hRow).join("")+subRow(back,"IN")+`<tr style="background:#1a3a1a;color:#fff;font-weight:700;">
    <td style="color:#fff">TOTAL</td><td>${totalPar}</td><td>${totalStrokes||"—"}</td><td>${totalPutts||"—"}</td>
    <td><b>${totalScore||"—"}</b></td><td>${holes.filter(h=>h.fairway==="✓").length}/${holes.filter(h=>h.fairway!=="–").length}</td>
    <td>${holes.reduce((s,h)=>s+(parseInt(h.drop)||0),0)}</td><td>${holes.filter(h=>h.gir==="✓").length}/18</td>
    <td>${(()=>{const a=holes.filter(h=>h.scramble==="✓"||h.scramble==="✗").length;const hh=holes.filter(h=>h.scramble==="✓").length;return a?`${hh}/${a}`:"—";})()}</td>
    <td>${totalScore?(scoreToPar>0?"+":"")+scoreToPar:"—"}</td></tr>`:""}</tbody></table>
  ${round.notes?`<div class="notes"><div class="nl">Round Notes</div><div class="nb">${round.notes}</div></div>`:""}
  <script>window.onload=()=>window.print()</script></body></html>`;

  const w = window.open("", "_blank");
  w.document.write(html);
  w.document.close();
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function GolfTracker() {
  const [rounds, setRounds]           = useState([]);
  const [activeRoundId, setActiveRoundId] = useState(null);
  const [view, setView]               = useState("list");
  const [showNewModal, setShowNewModal] = useState(false);
  const [infoStat, setInfoStat]       = useState(null);
  const [shareRound, setShareRound]   = useState(null);
  const [newRound, setNewRound]       = useState({
    courseKey: "", course: "", date: new Date().toISOString().slice(0, 10),
    tees: "", courseRating: "", slopeRating: "113",
    nineHole: false,
    conditions: { weather: "", temp: "", cart: "" },
    partners: "",
  });

  const selectedCourseTees = COURSE_TEES[newRound.courseKey] || null;

  useEffect(() => { loadRounds(); }, []);

  async function loadRounds() {
    try { const r = await window.storage.get(STORAGE_KEY); if (r) setRounds(JSON.parse(r.value)); } catch { setRounds([]); }
  }
  async function saveRounds(updated) {
    setRounds(updated);
    try { await window.storage.set(STORAGE_KEY, JSON.stringify(updated)); } catch {}
  }

  function createRound() {
    const round = { id: Date.now(), ...newRound, holes: defaultHoles(newRound.nineHole ? 9 : 18) };
    saveRounds([round, ...rounds]);
    setActiveRoundId(round.id);
    setView("round");
    setShowNewModal(false);
    setNewRound({ courseKey: "", course: "", date: new Date().toISOString().slice(0, 10), tees: "", courseRating: "", slopeRating: "113", nineHole: false, conditions: { weather: "", temp: "", cart: "" }, partners: "" });
  }

  function updateHole(roundId, holeIdx, field, value) {
    saveRounds(rounds.map(r => r.id !== roundId ? r : { ...r, holes: r.holes.map((h, i) => i === holeIdx ? { ...h, [field]: value } : h) }));
  }
  function updateRoundField(roundId, field, value) {
    saveRounds(rounds.map(r => r.id !== roundId ? r : { ...r, [field]: value }));
  }
  function deleteRound(id) {
    if (!confirm("Delete this round?")) return;
    const updated = rounds.filter(r => r.id !== id);
    saveRounds(updated);
    if (activeRoundId === id) { setActiveRoundId(null); setView("list"); }
  }

  const activeRound = rounds.find(r => r.id === activeRoundId);
  const hcpIndex    = calcHandicapIndex(rounds);

  return (
    <div className="app">
      <style>{GLOBAL_CSS}</style>

      {/* ── Header ── */}
      <header className="app-header">
        <div>
          <div className="app-logo">Fairway<em>Log</em></div>
          <div className="app-logo-sub">South Shore Golf</div>
        </div>
        <div className="header-right">
          {hcpIndex && <span className="hcp-chip">HCP {hcpIndex}</span>}
          {activeRound && (
            <button className={`btn ${view === "round" ? "active" : ""}`} onClick={() => setView("round")}>Scorecard</button>
          )}
          <button className="btn btn-primary" onClick={() => setShowNewModal(true)}>+ New Round</button>
        </div>
      </header>

      {/* ── Tab Bar ── */}
      {view !== "round" && (
        <nav className="tab-bar">
          {[["list","Rounds"],["trends","Trends"],["stats","Dashboard"],["bests","Bests"],["courses","Courses"],["handicap","Handicap"]].map(([v, label]) => (
            <button key={v} className={`tab-btn ${view === v ? "active" : ""}`} onClick={() => setView(v)}>{label}</button>
          ))}
        </nav>
      )}

      {/* ── Rounds List ── */}
      {view === "list" && (
        rounds.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-title">No rounds yet</div>
            <div className="empty-state-sub">Start tracking your on-course performance</div>
            <button className="btn btn-primary" onClick={() => setShowNewModal(true)}>+ New Round</button>
          </div>
        ) : (
          <div className="round-list">
            {rounds.map(r => {
              const { totalScore, totalPar } = getRoundStats(r);
              const diff = totalScore - totalPar;
              return (
                <div className="round-card" key={r.id} onClick={() => { setActiveRoundId(r.id); setView("round"); }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="round-card-name">{r.course || "Unnamed Course"}{r.nineHole ? " (9)" : ""}</div>
                    <div className="round-card-meta">
                      <span>{r.date}</span>
                      {r.tees && <><span className="round-card-meta-sep">·</span><span>{r.tees} tees</span></>}
                      {r.courseRating && <><span className="round-card-meta-sep">·</span><span>CR {r.courseRating}/{r.slopeRating}</span></>}
                      {r.conditions?.weather && <><span className="round-card-meta-sep">·</span><span>{r.conditions.weather}</span></>}
                      {r.partners && <><span className="round-card-meta-sep">·</span><span>{r.partners}</span></>}
                    </div>
                    {r.notes && <div style={{ fontSize: "0.72rem", color: T.textMuted, marginTop: 5, fontStyle: "italic", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 340 }}>"{r.notes}"</div>}
                  </div>
                  <div className="round-card-right">
                    <div className="round-score">{totalScore || "—"}</div>
                    {totalScore > 0 && <div className="round-score-diff" style={{ color: diff <= 0 ? T.green : T.red }}>{diff > 0 ? "+" : ""}{diff}</div>}
                    <div className="round-actions" onClick={e => e.stopPropagation()}>
                      <button className="btn btn-ghost btn-icon" onClick={() => setShareRound(r)}>↑</button>
                      <button className="btn btn-danger btn-ghost btn-icon" onClick={() => deleteRound(r.id)}>✕</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )
      )}

      {view === "trends"   && <TrendsChart rounds={rounds} />}
      {view === "stats"    && <StatsDashboard rounds={rounds} />}
      {view === "bests"    && <PersonalBests rounds={rounds} />}
      {view === "courses"  && <CourseHistory rounds={rounds} onOpenRound={id => { setActiveRoundId(id); setView("round"); }} />}
      {view === "handicap" && <HandicapPanel rounds={rounds} />}

      {/* ── Scorecard ── */}
      {view === "round" && activeRound && (() => {
        const front = activeRound.holes.slice(0, 9);
        const back  = activeRound.holes.slice(9);
        const total = activeRound.holes.reduce((s, h) => s + holeScore(h), 0);
        const totalStrokes = activeRound.holes.reduce((s, h) => s + (parseInt(h.strokes) || 0), 0);
        const totalPutts   = activeRound.holes.reduce((s, h) => s + (parseInt(h.putts) || 0), 0);
        const totalPar     = activeRound.holes.reduce((s, h) => s + h.par, 0);
        const scoreDiff    = total - totalPar;
        const scrTotal = (() => { const a = activeRound.holes.filter(h => h.scramble === "✓" || h.scramble === "✗").length; const h = activeRound.holes.filter(h => h.scramble === "✓").length; return a ? `${h}/${a}` : "—"; })();

        return (
          <div>
            <div className="round-header">
              <div>
                <div className="round-header-title">{activeRound.course || "Unnamed Course"}{activeRound.nineHole ? " (9)" : ""}</div>
                <div className="round-header-meta">
                  {activeRound.date}
                  {activeRound.tees && ` · ${activeRound.tees} tees`}
                  {activeRound.conditions?.weather && ` · ${activeRound.conditions.weather}`}
                  {activeRound.conditions?.temp && ` · ${activeRound.conditions.temp}°F`}
                  {activeRound.partners && ` · ${activeRound.partners}`}
                </div>
              </div>
              <div className="round-header-actions">
                <button className="btn btn-ghost btn-sm" onClick={() => setShareRound(activeRound)}>↑ Share</button>
                <button className="btn btn-ghost btn-sm" onClick={() => printRound(activeRound)}>Print</button>
                <button className="btn btn-ghost btn-sm" onClick={() => setView("list")}>← Rounds</button>
              </div>
            </div>

            <RoundSummary round={activeRound} />

            <div className="score-legend">
              <span><span className="legend-swatch" style={{ background: "rgba(74,127,165,0.5)" }} />Birdie</span>
              <span><span className="legend-swatch" style={{ background: "rgba(184,151,106,0.5)" }} />Eagle</span>
              <span><span className="legend-swatch" style={{ background: "rgba(192,80,80,0.35)" }} />Bogey</span>
              <span><span className="legend-swatch" style={{ background: "rgba(192,80,80,0.6)" }} />Double+</span>
            </div>

            <div className="scorecard-wrap">
              <table className="scorecard">
                <thead>
                  <tr>
                    <th style={{ textAlign: "left", paddingLeft: 16 }}>Hole</th>
                    <StatTh label="Par"     onInfo={setInfoStat} />
                    <StatTh label="Strokes" onInfo={setInfoStat} />
                    <StatTh label="Putts"   onInfo={setInfoStat} />
                    <StatTh label="Total"   onInfo={setInfoStat} />
                    <StatTh label="Fairway" onInfo={setInfoStat} />
                    <StatTh label="Drops"   onInfo={setInfoStat} />
                    <StatTh label="GIR"     onInfo={setInfoStat} />
                    <StatTh label="U/D"     onInfo={setInfoStat} />
                    <StatTh label="+/–"     onInfo={setInfoStat} />
                  </tr>
                </thead>
                <tbody>
                  {front.map((h, i) => <HoleRow key={h.hole} hole={h} onChange={(f, v) => updateHole(activeRound.id, i, f, v)} />)}
                  <SubtotalRow holes={front} label={activeRound.nineHole ? "Total" : "Out"} />

                  {!activeRound.nineHole && (
                    <>
                      {back.map((h, i) => <HoleRow key={h.hole} hole={h} onChange={(f, v) => updateHole(activeRound.id, i + 9, f, v)} />)}
                      <SubtotalRow holes={back} label="In" />
                      <tr className="sc-total">
                        <td>Total</td>
                        <td>{totalPar}</td>
                        <td style={{ color: T.textDim }}>{totalStrokes || "—"}</td>
                        <td style={{ color: T.blue }}>{totalPutts || "—"}</td>
                        <td style={{ color: T.gold, fontSize: "1rem" }}>{total || "—"}</td>
                        <td style={{ color: T.green }}>{activeRound.holes.filter(h => h.fairway === "✓").length}/{activeRound.holes.filter(h => h.fairway !== "–").length}</td>
                        <td style={{ color: T.red }}>{activeRound.holes.reduce((s, h) => s + (parseInt(h.drop) || 0), 0)}</td>
                        <td style={{ color: T.green }}>{activeRound.holes.filter(h => h.gir === "✓").length}/18</td>
                        <td>{scrTotal}</td>
                        <td style={{ color: total - totalPar > 0 ? T.red : T.green }}>{total ? (scoreDiff > 0 ? "+" : "") + scoreDiff : "—"}</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>

            <div className="notes-section">
              <div className="notes-label">Round Notes</div>
              <textarea className="notes-textarea"
                placeholder='e.g. "Lost 3 shots left of every green — need to work on right-to-left miss tendency."'
                value={activeRound.notes || ""}
                onChange={e => updateRoundField(activeRound.id, "notes", e.target.value)} />
            </div>
          </div>
        );
      })()}

      {/* ── New Round Modal ── */}
      {showNewModal && (
        <div className="modal-overlay" onClick={() => setShowNewModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-title">New Round</div>

            <TogglePill checked={newRound.nineHole} onChange={v => setNewRound({ ...newRound, nineHole: v })} label="9-hole round" />

            <div className="modal-section">Course</div>
            <div className="field">
              <label className="field-label">South Shore MA Courses</label>
              <select className="field-select" value={newRound.courseKey || ""}
                onChange={e => {
                  const key = e.target.value;
                  const found = SOUTH_SHORE_COURSES.find(c => !c.disabled && c.name === key);
                  if (found && found.name !== "Other (type below)") {
                    const tees = COURSE_TEES[key];
                    const first = tees?.[0];
                    setNewRound({ ...newRound, courseKey: key, course: found.name, tees: first?.label || "", courseRating: first?.courseRating || "", slopeRating: first?.slope || "113" });
                  } else if (found?.name === "Other (type below)") {
                    setNewRound({ ...newRound, courseKey: key, course: "", tees: "", courseRating: "", slopeRating: "113" });
                  } else {
                    setNewRound({ ...newRound, courseKey: "", course: "", tees: "", courseRating: "", slopeRating: "113" });
                  }
                }}>
                <option value="">Select a course…</option>
                {SOUTH_SHORE_COURSES.map((c, i) =>
                  c.disabled ? <option key={i} disabled value="">{c.group}</option>
                    : <option key={i} value={c.name}>{c.name} ({c.access})</option>
                )}
              </select>
            </div>

            {(newRound.courseKey === "Other (type below)" || !newRound.courseKey) && (
              <div className="field">
                <label className="field-label">Custom Course Name</label>
                <input className="field-input" type="text" placeholder="e.g. Pinehurst No. 2"
                  value={newRound.course} onChange={e => setNewRound({ ...newRound, course: e.target.value })} />
              </div>
            )}

            <div className="field">
              <label className="field-label">Date</label>
              <input className="field-input" type="date" value={newRound.date}
                onChange={e => setNewRound({ ...newRound, date: e.target.value })} />
            </div>

            <div className="field">
              <label className="field-label">Tees</label>
              {selectedCourseTees ? (
                <select className="field-select" value={newRound.tees}
                  onChange={e => {
                    const t = selectedCourseTees.find(t => t.label === e.target.value);
                    setNewRound({ ...newRound, tees: e.target.value, courseRating: t?.courseRating || newRound.courseRating, slopeRating: t?.slope || newRound.slopeRating });
                  }}>
                  {selectedCourseTees.map(t => <option key={t.label} value={t.label}>{t.label} — CR {t.courseRating} / Slope {t.slope}</option>)}
                </select>
              ) : (
                <input className="field-input" type="text" placeholder="White, Blue, Gold…"
                  value={newRound.tees} onChange={e => setNewRound({ ...newRound, tees: e.target.value })} />
              )}
            </div>

            <div className="two-col">
              <div className="field">
                <label className="field-label">Course Rating</label>
                <input className="field-input" type="number" placeholder="71.5" value={newRound.courseRating}
                  onChange={e => setNewRound({ ...newRound, courseRating: e.target.value })} />
              </div>
              <div className="field">
                <label className="field-label">Slope</label>
                <input className="field-input" type="number" placeholder="113" value={newRound.slopeRating}
                  onChange={e => setNewRound({ ...newRound, slopeRating: e.target.value })} />
              </div>
            </div>

            <div className="modal-section">Conditions</div>
            <div className="two-col">
              <div className="field">
                <label className="field-label">Weather</label>
                <select className="field-select" value={newRound.conditions?.weather || ""}
                  onChange={e => setNewRound({ ...newRound, conditions: { ...newRound.conditions, weather: e.target.value } })}>
                  <option value="">—</option>
                  {["☀️ Sunny","⛅ Partly Cloudy","☁️ Overcast","🌧 Light Rain","🌬 Windy","🥶 Cold","🌫 Foggy"].map(w => <option key={w}>{w}</option>)}
                </select>
              </div>
              <div className="field">
                <label className="field-label">Temp (°F)</label>
                <input className="field-input" type="number" placeholder="72" value={newRound.conditions?.temp || ""}
                  onChange={e => setNewRound({ ...newRound, conditions: { ...newRound.conditions, temp: e.target.value } })} />
              </div>
            </div>
            <div className="field">
              <label className="field-label">Cart / Walk</label>
              <select className="field-select" value={newRound.conditions?.cart || ""}
                onChange={e => setNewRound({ ...newRound, conditions: { ...newRound.conditions, cart: e.target.value } })}>
                <option value="">—</option>
                <option>🚶 Walking</option>
                <option>🛒 Cart</option>
                <option>🛍 Push Cart</option>
              </select>
            </div>

            <div className="modal-section">Players</div>
            <div className="field">
              <label className="field-label">Playing Partners</label>
              <input className="field-input" type="text" placeholder="Dave, Mike, John"
                value={newRound.partners || ""} onChange={e => setNewRound({ ...newRound, partners: e.target.value })} />
            </div>

            <div className="modal-actions">
              <button className="btn" onClick={() => setShowNewModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={createRound} disabled={!newRound.course && !newRound.date}>
                Tee Off →
              </button>
            </div>
          </div>
        </div>
      )}

      <InfoModal stat={infoStat} onClose={() => setInfoStat(null)} />
      {shareRound && <ShareModal round={shareRound} onClose={() => setShareRound(null)} />}
    </div>
  );
}
