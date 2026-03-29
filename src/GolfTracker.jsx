import { useState, useEffect, useRef } from "react";

const STORAGE_KEY = "golf-outing-rounds";

// Tee-specific CR/slope data per course (men's tees)
const COURSE_TEES = {
  "Strawberry Valley Golf Course": [
    { label: "Green", courseRating: "62.1", slope: "99" },
    { label: "White", courseRating: "62.1", slope: "99" },
  ],
  "Granite Links Golf Club (Quincy/Milton)": [
    { label: "Black",  courseRating: "73.9", slope: "139" },
    { label: "Blue",   courseRating: "72.1", slope: "131" },
    { label: "White",  courseRating: "69.1", slope: "124" },
    { label: "Red",    courseRating: "70.8", slope: "119" },
  ],
  "Granite Links Golf Club (Granite/Quincy)": [
    { label: "Black",  courseRating: "73.0", slope: "141" },
    { label: "Blue",   courseRating: "70.8", slope: "133" },
    { label: "White",  courseRating: "67.0", slope: "128" },
  ],
  "Olde Scotland Links": [
    { label: "Black",  courseRating: "72.6", slope: "126" },
    { label: "Blue",   courseRating: "70.3", slope: "124" },
    { label: "White",  courseRating: "68.7", slope: "116" },
    { label: "Green",  courseRating: "65.9", slope: "110" },
    { label: "Gold",   courseRating: "68.4", slope: "111" },
  ],
  "Widow's Walk Golf Course": [
    { label: "Blue",   courseRating: "71.5", slope: "130" },
    { label: "White",  courseRating: "69.2", slope: "124" },
    { label: "Gold",   courseRating: "66.5", slope: "117" },
    { label: "Red",    courseRating: "64.0", slope: "110" },
  ],
  "South Shore Country Club": [
    { label: "Blue",   courseRating: "72.0", slope: "131" },
    { label: "White",  courseRating: "70.0", slope: "126" },
    { label: "Gold",   courseRating: "67.5", slope: "120" },
    { label: "Red",    courseRating: "65.0", slope: "113" },
  ],
  "Pembroke Country Club": [
    { label: "Blue",   courseRating: "73.3", slope: "132" },
    { label: "White",  courseRating: "70.8", slope: "127" },
    { label: "Gold",   courseRating: "68.2", slope: "119" },
    { label: "Red",    courseRating: "65.5", slope: "112" },
  ],
  "Presidents Golf Course": [
    { label: "Black",  courseRating: "68.3", slope: "127" },
    { label: "Blue",   courseRating: "66.0", slope: "117" },
    { label: "Green",  courseRating: "63.4", slope: "106" },
  ],
  "Braintree Municipal Golf Course": [
    { label: "Blue",   courseRating: "70.2", slope: "122" },
    { label: "White",  courseRating: "68.0", slope: "116" },
    { label: "Red",    courseRating: "65.5", slope: "109" },
  ],
  "D.W. Field Golf Course": [
    { label: "Blue",   courseRating: "68.4", slope: "120" },
    { label: "White",  courseRating: "66.3", slope: "115" },
    { label: "Gold",   courseRating: "63.1", slope: "106" },
  ],
  "Green Harbor Golf Club": [
    { label: "Blue",   courseRating: "69.8", slope: "118" },
    { label: "White",  courseRating: "67.8", slope: "112" },
    { label: "Red",    courseRating: "65.0", slope: "106" },
  ],
  "Atlantic Country Club": [
    { label: "Black",  courseRating: "72.9", slope: "131" },
    { label: "Blue",   courseRating: "71.8", slope: "128" },
    { label: "White",  courseRating: "69.5", slope: "122" },
    { label: "Red",    courseRating: "66.8", slope: "114" },
  ],
  "West Bridgewater Country Club": [
    { label: "Gold",   courseRating: "70.9", slope: "127" },
    { label: "Blue",   courseRating: "69.9", slope: "125" },
    { label: "White",  courseRating: "67.6", slope: "124" },
    { label: "Red",    courseRating: "67.3", slope: "115" },
  ],
  "Ridder Farm Golf Club": [
    { label: "Blue",   courseRating: "68.1", slope: "113" },
    { label: "White",  courseRating: "66.3", slope: "110" },
    { label: "Red",    courseRating: "67.1", slope: "115" },
  ],
  "Village Links Golf Club": [
    { label: "Blue",   courseRating: "70.2", slope: "119" },
    { label: "White",  courseRating: "67.8", slope: "112" },
    { label: "Red",    courseRating: "65.0", slope: "105" },
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
    strokes: "",
    putts: "",
    fairway: "–",
    drop: 0,
    gir: "–",
    scramble: "–",
  }));

const STAT_INFO = {
  "Par":      { title: "Par", body: "The expected number of strokes for a hole: Par 3, 4, or 5. Your score relative to par is the key measure of your round." },
  "Strokes":  { title: "Strokes (excl. putts)", body: "All shots taken before you start putting — tee shot, approach, chips. Separates your ball-striking from your putting." },
  "Putts":    { title: "Putts", body: "Number of strokes taken on the putting green. Tour average is ~29/round. Most amateurs average 32–36. High putts often means missed greens or poor lag putting." },
  "Total":    { title: "Total Score", body: "Strokes + Putts for the hole. This is your gross score per hole. Color coded: gold = par, blue = birdie, amber = eagle, red = bogey/double." },
  "Fairway":  { title: "Fairway Hit", body: "Did your tee shot land in the fairway? ✓ = hit, L = missed left, R = missed right. N/A on par 3s (no fairway). Tour pros hit ~60% of fairways." },
  "Drops":    { title: "Penalty Drops", body: "Number of penalty strokes taken on this hole — OB, water hazard, lost ball, unplayable lie. Each adds 1 stroke to your score." },
  "GIR":      { title: "Green in Regulation (GIR)", body: "You hit the green in regulation if your ball is on the putting surface with 2 putts remaining to make par.\n\nPar 3 → on green in 1 shot\nPar 4 → on green in 2 shots\nPar 5 → on green in 3 shots\n\nTour pros hit ~65% GIR. Tracking GIR reveals whether you're losing strokes on approach shots." },
  "U/D":      { title: "Up & Down (Scrambling)", body: "After missing the green, did you get the ball in the hole in 2 shots?\n\n✓ = Yes (chip/pitch/bunker shot + 1 putt = par saved)\n✗ = No (took 3+ shots after missing green)\n– = N/A (you hit the GIR, so scrambling doesn't apply)\n\nTour pros scramble ~60% of the time. Most amateurs are around 20–30%. This stat shows how well your short game rescues missed greens." },
  "+/–":      { title: "Score vs Par", body: "Your total score for the hole minus the par. Eagle = -2, Birdie = -1, Par = 0, Bogey = +1, Double = +2, etc." },
};

const fairwayOptions = ["–", "✓", "L", "R"];
const girOptions = ["–", "✓", "✗"];
const scrambleOptions = ["–", "✓", "✗"];

// ─── Helpers ────────────────────────────────────────────────────────────────

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
  const totalPar = holes.reduce((s, h) => s + h.par, 0);
  const fairwaysHit = holes.filter(h => h.fairway === "✓").length;
  const fairwaysAttempted = holes.filter(h => h.fairway !== "–").length;
  const girsHit = holes.filter(h => h.gir === "✓").length;
  const girsTotal = holes.length;
  const scrambleHit = holes.filter(h => h.scramble === "✓").length;
  const scrambleAttempted = holes.filter(h => h.scramble === "✓" || h.scramble === "✗").length;
  const diff = calcHandicap(totalScore, round.courseRating, round.slopeRating);
  return { totalScore, totalPutts, totalPar, fairwaysHit, fairwaysAttempted, girsHit, girsTotal, scrambleHit, scrambleAttempted, diff };
}

// USGA Handicap Index from best 8 of last 20 differentials
function calcHandicapIndex(rounds) {
  const last20 = rounds.slice(0, 20);
  const diffs = last20
    .map(r => {
      const { totalScore } = getRoundStats(r);
      return calcHandicap(totalScore, r.courseRating, r.slopeRating);
    })
    .filter(d => d !== null)
    .sort((a, b) => a - b);

  if (diffs.length < 3) return null;

  const count = diffs.length <= 6 ? 1 : diffs.length <= 8 ? 2 : diffs.length <= 11 ? 3 : diffs.length <= 14 ? 4 : diffs.length <= 16 ? 5 : diffs.length <= 18 ? 6 : 8;
  const best = diffs.slice(0, count);
  const avg = best.reduce((a, b) => a + b, 0) / best.length;
  return (avg * 0.96).toFixed(1);
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function InfoModal({ stat, onClose }) {
  if (!stat) return null;
  const info = STAT_INFO[stat];
  if (!info) return null;
  return (
    <div className="modal-overlay" onClick={onClose} style={{zIndex:200}}>
      <div className="modal info-modal" onClick={e => e.stopPropagation()} style={{maxWidth:340}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
          <h2 style={{fontSize:"1.2rem"}}>{info.title}</h2>
          <button className="nav-btn" onClick={onClose} style={{padding:"4px 10px",fontSize:"0.8rem"}}>✕</button>
        </div>
        <p style={{fontSize:"0.85rem",color:"var(--text)",lineHeight:1.6,whiteSpace:"pre-line"}}>{info.body}</p>
      </div>
    </div>
  );
}

function StatTh({ label, onInfo, style }) {
  return (
    <th style={style}>
      <span style={{cursor:"pointer",display:"inline-flex",alignItems:"center",gap:3}} onClick={() => onInfo(label)}>
        {label}
        <span style={{fontSize:"0.6rem",color:"var(--green)",opacity:0.8}}>ⓘ</span>
      </span>
    </th>
  );
}

function RoundSummary({ round }) {
  const holes = round.holes;
  const totalScore = holes.reduce((s, h) => s + holeScore(h), 0);
  const totalStrokes = holes.reduce((s, h) => s + (parseInt(h.strokes) || 0), 0);
  const totalPutts = holes.reduce((s, h) => s + (parseInt(h.putts) || 0), 0);
  const totalPar = holes.reduce((s, h) => s + h.par, 0);
  const front9Score = holes.slice(0, 9).reduce((s, h) => s + holeScore(h), 0);
  const back9Score = holes.slice(9).reduce((s, h) => s + holeScore(h), 0);
  const fairwaysHit = holes.filter(h => h.fairway === "✓").length;
  const fairwaysAttempted = holes.filter(h => h.fairway !== "–").length;
  const girsHit = holes.filter(h => h.gir === "✓").length;
  const girsAttempted = holes.filter(h => h.gir !== "–").length;
  const totalDrops = holes.reduce((s, h) => s + (parseInt(h.drop) || 0), 0);
  const scrambleHit = holes.filter(h => h.scramble === "✓").length;
  const scrambleAttempted = holes.filter(h => h.scramble === "✓" || h.scramble === "✗").length;
  const scoreToPar = totalScore - totalPar;
  const diff = calcHandicap(totalScore, round.courseRating, round.slopeRating);

  return (
    <div className="summary-grid">
      <div className="stat-card">
        <span className="stat-label">Score</span>
        <span className="stat-value">{totalScore || "–"}</span>
        {totalScore > 0 && <span className="stat-sub">{scoreToPar > 0 ? "+" : ""}{scoreToPar} vs par {totalPar}</span>}
      </div>
      <div className="stat-card">
        <span className="stat-label">Strokes</span>
        <span className="stat-value">{totalStrokes || "–"}</span>
        <span className="stat-sub">excl. putts</span>
      </div>
      <div className="stat-card">
        <span className="stat-label">Putts</span>
        <span className="stat-value">{totalPutts || "–"}</span>
        {totalPutts > 0 && <span className="stat-sub">{(totalPutts / holes.filter(h => parseInt(h.putts) > 0).length || 0).toFixed(1)} avg</span>}
      </div>
      {round.nineHole ? null : (
        <>
          <div className="stat-card">
            <span className="stat-label">Front 9</span>
            <span className="stat-value">{front9Score || "–"}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Back 9</span>
            <span className="stat-value">{back9Score || "–"}</span>
          </div>
        </>
      )}
      <div className="stat-card">
        <span className="stat-label">Fairways</span>
        <span className="stat-value">{fairwaysAttempted ? `${fairwaysHit}/${fairwaysAttempted}` : "–"}</span>
        {fairwaysAttempted > 0 && <span className="stat-sub">{Math.round((fairwaysHit / fairwaysAttempted) * 100)}%</span>}
      </div>
      <div className="stat-card">
        <span className="stat-label">GIR</span>
        <span className="stat-value">{girsAttempted ? `${girsHit}/${girsAttempted}` : "–"}</span>
        {girsAttempted > 0 && <span className="stat-sub">{Math.round((girsHit / girsAttempted) * 100)}%</span>}
      </div>
      <div className="stat-card">
        <span className="stat-label">Up & Down</span>
        <span className="stat-value">{scrambleAttempted ? `${scrambleHit}/${scrambleAttempted}` : "–"}</span>
        {scrambleAttempted > 0 && <span className="stat-sub">{Math.round((scrambleHit / scrambleAttempted) * 100)}%</span>}
      </div>
      <div className="stat-card">
        <span className="stat-label">Drops</span>
        <span className="stat-value">{totalDrops}</span>
      </div>
      <div className="stat-card">
        <span className="stat-label">Handicap Diff</span>
        <span className="stat-value">{diff !== null ? diff.toFixed(1) : "–"}</span>
        {round.courseRating && <span className="stat-sub">CR {round.courseRating} / Slope {round.slopeRating}</span>}
      </div>
    </div>
  );
}

function HoleRow({ hole, onChange }) {
  const total = holeScore(hole);
  const diff = total > 0 ? total - hole.par : null;
  const rowClass = diff === null ? "" : diff <= -2 ? "eagle-row" : diff === -1 ? "birdie-row" : diff === 1 ? "bogey-row" : diff >= 2 ? "double-row" : "";

  return (
    <tr className={`hole-row ${rowClass}`}>
      <td className="cell-hole">{hole.hole}</td>
      <td>
        <select className="select-par" value={hole.par} onChange={e => onChange("par", parseInt(e.target.value))}>
          {[3, 4, 5].map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </td>
      <td>
        <input className="input-score" type="number" min="1" max="15" value={hole.strokes} placeholder="–"
          onChange={e => onChange("strokes", e.target.value)} />
      </td>
      <td>
        <input className="input-score input-putts" type="number" min="0" max="9" value={hole.putts} placeholder="–"
          onChange={e => onChange("putts", e.target.value)} />
      </td>
      <td className="cell-total">{total > 0 ? total : "–"}</td>
      <td>
        {hole.par === 3 ? <span className="na-tag">N/A</span> : (
          <div className="toggle-group">
            {fairwayOptions.slice(1).map(o => (
              <button key={o} className={`toggle-btn ${hole.fairway === o ? "active-" + (o === "✓" ? "hit" : "miss") : ""}`}
                onClick={() => onChange("fairway", hole.fairway === o ? "–" : o)}>{o}</button>
            ))}
          </div>
        )}
      </td>
      <td>
        <input className="input-drop" type="number" min="0" max="5" value={hole.drop || ""} placeholder="0"
          onChange={e => onChange("drop", parseInt(e.target.value) || 0)} />
      </td>
      <td>
        <div className="toggle-group">
          {girOptions.slice(1).map(o => (
            <button key={o} className={`toggle-btn ${hole.gir === o ? "active-" + (o === "✓" ? "hit" : "miss") : ""}`}
              onClick={() => onChange("gir", hole.gir === o ? "–" : o)}>{o}</button>
          ))}
        </div>
      </td>
      <td>
        {hole.gir === "✓" ? <span className="na-tag">N/A</span> : (
          <div className="toggle-group">
            {scrambleOptions.slice(1).map(o => (
              <button key={o} className={`toggle-btn ${hole.scramble === o ? "active-" + (o === "✓" ? "hit" : "miss") : ""}`}
                onClick={() => onChange("scramble", hole.scramble === o ? "–" : o)}>{o}</button>
            ))}
          </div>
        )}
      </td>
      <td className="cell-diff">{diff !== null ? (diff > 0 ? "+" : "") + diff : "–"}</td>
    </tr>
  );
}

// ─── Trends Chart ────────────────────────────────────────────────────────────
function TrendsChart({ rounds }) {
  const [metric, setMetric] = useState("score");
  const metrics = [
    { key: "score", label: "Score", color: "#c8a84b" },
    { key: "putts", label: "Putts", color: "#7db8e8" },
    { key: "gir", label: "GIR %", color: "#4caf6a" },
    { key: "fairways", label: "FWY %", color: "#a87de8" },
  ];

  const data = [...rounds].reverse().map(r => {
    const s = getRoundStats(r);
    return {
      label: r.date ? r.date.slice(5) : "?",
      course: r.course,
      score: s.totalScore,
      putts: s.totalPutts,
      gir: s.girsTotal ? Math.round((s.girsHit / s.girsTotal) * 100) : 0,
      fairways: s.fairwaysAttempted ? Math.round((s.fairwaysHit / s.fairwaysAttempted) * 100) : 0,
    };
  }).filter(d => d.score > 0);

  if (data.length < 2) return (
    <div style={{textAlign:"center",padding:"40px 20px",color:"var(--text-dim)",fontSize:"0.82rem"}}>
      Need at least 2 completed rounds to show trends.
    </div>
  );

  const vals = data.map(d => d[metric]);
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const range = max - min || 1;
  const W = 100, H = 60;
  const pad = 8;
  const pts = data.map((d, i) => {
    const x = pad + (i / (data.length - 1)) * (W - pad * 2);
    const y = H - pad - ((d[metric] - min) / range) * (H - pad * 2);
    return { x, y, d };
  });

  const m = metrics.find(m => m.key === metric);
  const pathD = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

  return (
    <div>
      <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"}}>
        {metrics.map(m => (
          <button key={m.key}
            className={`nav-btn ${metric === m.key ? "active" : ""}`}
            style={metric === m.key ? {borderColor:m.color,color:m.color} : {}}
            onClick={() => setMetric(m.key)}>
            {m.label}
          </button>
        ))}
      </div>
      <div style={{background:"var(--surface2)",border:"1px solid var(--border)",borderRadius:8,padding:"16px 16px 8px",overflowX:"auto"}}>
        <svg viewBox={`0 0 ${W} ${H}`} style={{width:"100%",minWidth:200,height:120,display:"block"}}>
          {/* Grid lines */}
          {[0,0.25,0.5,0.75,1].map(t => (
            <line key={t} x1={pad} y1={pad + t*(H-pad*2)} x2={W-pad} y2={pad + t*(H-pad*2)}
              stroke="var(--border)" strokeWidth="0.3" />
          ))}
          {/* Area fill */}
          <path d={pathD + ` L ${pts[pts.length-1].x} ${H-pad} L ${pts[0].x} ${H-pad} Z`}
            fill={m.color} fillOpacity="0.08" />
          {/* Line */}
          <path d={pathD} fill="none" stroke={m.color} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
          {/* Dots */}
          {pts.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="2" fill={m.color} />
          ))}
          {/* Labels */}
          {pts.map((p, i) => (
            <text key={i} x={p.x} y={H-1} textAnchor="middle" fontSize="3.5" fill="var(--text-dim)">{p.d.label}</text>
          ))}
        </svg>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:"0.65rem",color:"var(--text-dim)",marginTop:4}}>
          <span>Min: {min}{metric==="gir"||metric==="fairways"?"%":""}</span>
          <span style={{color:m.color,fontWeight:600}}>{m.label} over time</span>
          <span>Max: {max}{metric==="gir"||metric==="fairways"?"%":""}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Stats Dashboard ─────────────────────────────────────────────────────────
function StatsDashboard({ rounds }) {
  const [window_, setWindow] = useState(10);
  const options = [5, 10, 20];
  const subset = rounds.slice(0, window_).filter(r => {
    const { totalScore } = getRoundStats(r);
    return totalScore > 0;
  });

  if (subset.length === 0) return (
    <div style={{textAlign:"center",padding:"40px 20px",color:"var(--text-dim)",fontSize:"0.82rem"}}>
      No completed rounds yet.
    </div>
  );

  const avg = arr => arr.length ? (arr.reduce((a,b)=>a+b,0)/arr.length) : null;
  const scores = subset.map(r => getRoundStats(r).totalScore);
  const putts = subset.map(r => getRoundStats(r).totalPutts);
  const girPcts = subset.map(r => { const s=getRoundStats(r); return s.girsTotal ? (s.girsHit/s.girsTotal)*100 : 0; });
  const fwyPcts = subset.map(r => { const s=getRoundStats(r); return s.fairwaysAttempted ? (s.fairwaysHit/s.fairwaysAttempted)*100 : 0; });
  const scPcts = subset.map(r => { const s=getRoundStats(r); return s.scrambleAttempted ? (s.scrambleHit/s.scrambleAttempted)*100 : 0; });
  const diffs = subset.map(r => { const s=getRoundStats(r); return calcHandicap(s.totalScore, r.courseRating, r.slopeRating); }).filter(Boolean);

  const cards = [
    { label: "Avg Score", value: avg(scores)?.toFixed(1), sub: `${Math.min(...scores)} – ${Math.max(...scores)} range` },
    { label: "Avg Putts", value: avg(putts)?.toFixed(1), sub: "per round" },
    { label: "Avg GIR", value: avg(girPcts)?.toFixed(0) + "%", sub: "greens in regulation" },
    { label: "Avg Fairways", value: avg(fwyPcts)?.toFixed(0) + "%", sub: "fairways hit" },
    { label: "Avg Scrambling", value: avg(scPcts)?.toFixed(0) + "%", sub: "up & down rate" },
    { label: "Avg Diff", value: diffs.length ? avg(diffs).toFixed(1) : "–", sub: "handicap differential" },
  ];

  return (
    <div>
      <div style={{display:"flex",gap:8,marginBottom:16}}>
        {options.map(n => (
          <button key={n} className={`nav-btn ${window_===n?"active":""}`} onClick={() => setWindow(n)}>
            Last {n}
          </button>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:10}}>
        {cards.map(c => (
          <div key={c.label} className="stat-card">
            <span className="stat-label">{c.label}</span>
            <span className="stat-value">{c.value || "–"}</span>
            <span className="stat-sub">{c.sub}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Personal Bests ──────────────────────────────────────────────────────────
function PersonalBests({ rounds }) {
  const completed = rounds.filter(r => getRoundStats(r).totalScore > 0);
  if (completed.length === 0) return (
    <div style={{textAlign:"center",padding:"40px 20px",color:"var(--text-dim)",fontSize:"0.82rem"}}>
      Complete some rounds to see personal bests.
    </div>
  );

  const best = (arr, fn, low=true) => arr.reduce((b, r) => {
    const v = fn(r); if (v===null) return b;
    return b===null || (low ? v < fn(b) : v > fn(b)) ? r : b;
  }, null);

  const scoreOf = r => getRoundStats(r).totalScore;
  const girOf = r => { const s=getRoundStats(r); return s.girsTotal ? Math.round((s.girsHit/s.girsTotal)*100) : null; };
  const scOf = r => { const s=getRoundStats(r); return s.scrambleAttempted ? Math.round((s.scrambleHit/s.scrambleAttempted)*100) : null; };
  const puttsOf = r => getRoundStats(r).totalPutts;

  const bests = [
    { label: "🏆 Best Score", round: best(completed, scoreOf, true), val: r => scoreOf(r) },
    { label: "⛳ Best GIR", round: best(completed, girOf, false), val: r => girOf(r)+"%", sub: "greens in regulation" },
    { label: "🥅 Best Scrambling", round: best(completed, scOf, false), val: r => scOf(r)+"%", sub: "up & down rate" },
    { label: "🎯 Fewest Putts", round: best(completed, puttsOf, true), val: r => puttsOf(r)+" putts" },
  ];

  return (
    <div style={{display:"flex",flexDirection:"column",gap:10}}>
      {bests.map(b => b.round ? (
        <div key={b.label} style={{background:"var(--surface2)",border:"1px solid var(--gold)",borderRadius:8,padding:"14px 18px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{fontSize:"0.68rem",color:"var(--gold)",letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:4}}>{b.label}</div>
            <div style={{fontSize:"0.85rem",color:"var(--text)"}}>{b.round.course}</div>
            <div style={{fontSize:"0.68rem",color:"var(--text-dim)"}}>{b.round.date}</div>
          </div>
          <div style={{fontFamily:"var(--font-head)",fontSize:"1.8rem",color:"var(--gold)"}}>{b.val(b.round)}</div>
        </div>
      ) : null)}
    </div>
  );
}

// ─── Course History ──────────────────────────────────────────────────────────
function CourseHistory({ rounds, onOpenRound }) {
  const [selected, setSelected] = useState(null);
  const courseMap = {};
  rounds.forEach(r => {
    const key = r.course || "Unnamed";
    if (!courseMap[key]) courseMap[key] = [];
    courseMap[key].push(r);
  });
  const courses = Object.keys(courseMap).sort();

  return (
    <div>
      {!selected ? (
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {courses.map(c => {
            const rs = courseMap[c];
            const scores = rs.map(r => getRoundStats(r).totalScore).filter(Boolean);
            const best = scores.length ? Math.min(...scores) : null;
            return (
              <div key={c} className="round-card" onClick={() => setSelected(c)}>
                <div className="round-card-info">
                  <h3>{c}</h3>
                  <p>{rs.length} round{rs.length!==1?"s":""}{best?" · Best: "+best:""}</p>
                </div>
                <div style={{color:"var(--text-dim)",fontSize:"1.2rem"}}>›</div>
              </div>
            );
          })}
          {courses.length === 0 && (
            <div style={{textAlign:"center",padding:"40px 20px",color:"var(--text-dim)",fontSize:"0.82rem"}}>No rounds yet.</div>
          )}
        </div>
      ) : (
        <div>
          <button className="nav-btn" style={{marginBottom:16}} onClick={() => setSelected(null)}>← All Courses</button>
          <h3 style={{fontFamily:"var(--font-head)",color:"var(--gold)",marginBottom:16}}>{selected}</h3>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {courseMap[selected].map(r => {
              const { totalScore, totalPar } = getRoundStats(r);
              const diff = totalScore - totalPar;
              return (
                <div key={r.id} className="round-card" onClick={() => onOpenRound(r.id)}>
                  <div className="round-card-info">
                    <p>{r.date}{r.tees ? ` · ${r.tees} tees` : ""}</p>
                    {r.conditions && <p style={{fontSize:"0.68rem",color:"var(--text-dim)"}}>🌤 {r.conditions.weather}{r.conditions.temp?" · "+r.conditions.temp+"°":""}</p>}
                    {r.partners && <p style={{fontSize:"0.68rem",color:"var(--text-dim)"}}>👥 {r.partners}</p>}
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:12}}>
                    <div className="round-card-score">{totalScore || "–"}</div>
                    {totalScore > 0 && <div style={{fontSize:"0.75rem",color:diff<=0?"var(--green)":"var(--red)",fontWeight:600}}>{diff>0?"+":""}{diff}</div>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Handicap Index Panel ─────────────────────────────────────────────────────
function HandicapPanel({ rounds }) {
  const idx = calcHandicapIndex(rounds);
  const completed = rounds.filter(r => {
    const { totalScore } = getRoundStats(r);
    return totalScore > 0 && r.courseRating && r.slopeRating;
  });
  const last20 = completed.slice(0, 20);
  const diffs = last20.map(r => {
    const { totalScore } = getRoundStats(r);
    const d = calcHandicap(totalScore, r.courseRating, r.slopeRating);
    return { r, d };
  }).filter(x => x.d !== null).sort((a, b) => a.d - b.d);

  const countBest = diffs.length <= 6 ? 1 : diffs.length <= 8 ? 2 : diffs.length <= 11 ? 3 : diffs.length <= 14 ? 4 : diffs.length <= 16 ? 5 : diffs.length <= 18 ? 6 : 8;
  const bestIds = new Set(diffs.slice(0, countBest).map(x => x.r.id));

  return (
    <div>
      <div style={{background:"linear-gradient(135deg,var(--surface2),var(--surface))",border:"1px solid var(--gold)",borderRadius:12,padding:"24px",textAlign:"center",marginBottom:20}}>
        <div style={{fontSize:"0.68rem",letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--text-dim)",marginBottom:8}}>Handicap Index</div>
        <div style={{fontFamily:"var(--font-head)",fontSize:"3.5rem",color:"var(--gold)",lineHeight:1}}>{idx ?? "–"}</div>
        <div style={{fontSize:"0.72rem",color:"var(--text-dim)",marginTop:8}}>
          {idx ? `Best ${countBest} of last ${last20.length} differentials × 0.96` : `Need at least 3 rounds with CR/Slope data`}
        </div>
      </div>
      {diffs.length > 0 && (
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          <div style={{fontSize:"0.65rem",letterSpacing:"0.08em",textTransform:"uppercase",color:"var(--text-dim)",marginBottom:4}}>Differentials used in calculation</div>
          {diffs.map(({ r, d }) => (
            <div key={r.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 12px",borderRadius:6,
              background: bestIds.has(r.id) ? "rgba(200,168,75,0.1)" : "var(--surface2)",
              border: `1px solid ${bestIds.has(r.id) ? "var(--gold)" : "var(--border)"}`}}>
              <div>
                <span style={{fontSize:"0.82rem",color:"var(--text)"}}>{r.course}</span>
                <span style={{fontSize:"0.68rem",color:"var(--text-dim)",marginLeft:8}}>{r.date}</span>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                {bestIds.has(r.id) && <span style={{fontSize:"0.6rem",color:"var(--gold)"}}>★ USED</span>}
                <span style={{fontFamily:"var(--font-head)",color: bestIds.has(r.id) ? "var(--gold)" : "var(--text-dim)"}}>{d.toFixed(1)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Share Modal ─────────────────────────────────────────────────────────────
function ShareModal({ round, onClose }) {
  const textRef = useRef();
  const { totalScore, totalPutts, totalPar, fairwaysHit, fairwaysAttempted, girsHit, girsTotal, scrambleHit, scrambleAttempted, diff } = getRoundStats(round);
  const scoreToPar = totalScore - totalPar;
  const emoji = scoreToPar <= -3 ? "🦅" : scoreToPar <= -1 ? "🐦" : scoreToPar === 0 ? "🎯" : scoreToPar <= 3 ? "⛳" : "🏌️";

  const text = [
    `${emoji} ${round.course}`,
    `📅 ${round.date}${round.tees ? ` · ${round.tees} tees` : ""}`,
    ``,
    `🏆 Score: ${totalScore} (${scoreToPar > 0 ? "+" : ""}${scoreToPar})`,
    `🎯 Putts: ${totalPutts}`,
    fairwaysAttempted ? `🌿 Fairways: ${fairwaysHit}/${fairwaysAttempted} (${Math.round(fairwaysHit/fairwaysAttempted*100)}%)` : null,
    `⛳ GIR: ${girsHit}/${girsTotal} (${Math.round(girsHit/girsTotal*100)}%)`,
    scrambleAttempted ? `🥅 Scrambling: ${scrambleHit}/${scrambleAttempted} (${Math.round(scrambleHit/scrambleAttempted*100)}%)` : null,
    diff !== null ? `📊 Differential: ${diff.toFixed(1)}` : null,
    round.conditions?.weather ? `🌤 Conditions: ${round.conditions.weather}${round.conditions.temp ? `, ${round.conditions.temp}°F` : ""}${round.conditions.cart ? ` · ${round.conditions.cart}` : ""}` : null,
    round.partners ? `👥 With: ${round.partners}` : null,
    round.notes ? `\n📝 "${round.notes}"` : null,
    ``,
    `Tracked with FairwayLog`,
  ].filter(l => l !== null).join("\n");

  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()} style={{maxWidth:400}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <h2 style={{fontSize:"1.2rem"}}>Share Round</h2>
          <button className="nav-btn" onClick={onClose}>✕</button>
        </div>
        <textarea ref={textRef} readOnly value={text}
          style={{width:"100%",background:"var(--surface2)",border:"1px solid var(--border)",borderRadius:6,
            color:"var(--text)",fontFamily:"var(--font-mono)",fontSize:"0.78rem",lineHeight:1.7,
            padding:"12px",minHeight:200,resize:"none"}} />
        <div style={{display:"flex",gap:10,marginTop:12}}>
          <button className="nav-btn primary" style={{flex:1}} onClick={copy}>
            {copied ? "✓ Copied!" : "Copy to Clipboard"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function GolfTracker() {
  const [rounds, setRounds] = useState([]);
  const [activeRoundId, setActiveRoundId] = useState(null);
  const [view, setView] = useState("list");
  const [showNewModal, setShowNewModal] = useState(false);
  const [infoStat, setInfoStat] = useState(null);
  const [shareRound, setShareRound] = useState(null);
  const [newRound, setNewRound] = useState({
    courseKey: "", course: "", date: new Date().toISOString().slice(0,10),
    tees: "", courseRating: "", slopeRating: "113",
    nineHole: false,
    conditions: { weather: "", temp: "", cart: "" },
    partners: "",
  });

  const selectedCourseTees = COURSE_TEES[newRound.courseKey] || null;

  useEffect(() => { loadRounds(); }, []);

  async function loadRounds() {
    try {
      const result = await window.storage.get(STORAGE_KEY);
      if (result) setRounds(JSON.parse(result.value));
    } catch { setRounds([]); }
  }

  async function saveRounds(updated) {
    setRounds(updated);
    try { await window.storage.set(STORAGE_KEY, JSON.stringify(updated)); } catch {}
  }

  function createRound() {
    const round = {
      id: Date.now(),
      ...newRound,
      holes: defaultHoles(newRound.nineHole ? 9 : 18),
    };
    const updated = [round, ...rounds];
    saveRounds(updated);
    setActiveRoundId(round.id);
    setView("round");
    setShowNewModal(false);
    setNewRound({
      courseKey: "", course: "", date: new Date().toISOString().slice(0,10),
      tees: "", courseRating: "", slopeRating: "113",
      nineHole: false,
      conditions: { weather: "", temp: "", cart: "" },
      partners: "",
    });
  }

  function updateHole(roundId, holeIdx, field, value) {
    const updated = rounds.map(r => {
      if (r.id !== roundId) return r;
      const holes = r.holes.map((h, i) => i === holeIdx ? { ...h, [field]: value } : h);
      return { ...r, holes };
    });
    saveRounds(updated);
  }

  function updateRoundField(roundId, field, value) {
    const updated = rounds.map(r => r.id !== roundId ? r : { ...r, [field]: value });
    saveRounds(updated);
  }

  function deleteRound(id) {
    if (!confirm("Delete this round?")) return;
    const updated = rounds.filter(r => r.id !== id);
    saveRounds(updated);
    if (activeRoundId === id) { setActiveRoundId(null); setView("list"); }
  }

  const activeRound = rounds.find(r => r.id === activeRoundId);
  const hcpIndex = calcHandicapIndex(rounds);

  const VIEWS = ["list","trends","stats","bests","courses","handicap"];

  return (
    <div className="app">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=IBM+Plex+Mono:wght@400;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --bg: #0e1a12; --surface: #162318; --surface2: #1e2e22;
          --border: #2a3d2e; --green: #4caf6a; --green-dim: #2d6b42;
          --gold: #c8a84b; --red: #e05a5a; --text: #e8f0ea; --text-dim: #7a9a80;
          --birdie: #1a3d5c; --eagle: #7b4e0e; --bogey: #3d1a1a; --double: #5c1010;
          --font-head: 'Playfair Display', serif; --font-mono: 'IBM Plex Mono', monospace;
        }
        body { background: var(--bg); }
        .app { font-family: var(--font-mono); background: var(--bg); min-height: 100vh; color: var(--text); max-width: 900px; margin: 0 auto; padding: 16px; }
        .header { display: flex; align-items: center; justify-content: space-between; padding: 20px 0 16px; border-bottom: 1px solid var(--border); margin-bottom: 16px; flex-wrap: wrap; gap: 10px; }
        .logo { font-family: var(--font-head); font-size: 1.8rem; color: var(--gold); letter-spacing: -0.5px; }
        .logo span { color: var(--green); }
        .nav { display: flex; gap: 8px; flex-wrap: wrap; }
        .nav-btn { background: none; border: 1px solid var(--border); color: var(--text-dim); font-family: var(--font-mono); font-size: 0.72rem; padding: 6px 14px; border-radius: 3px; cursor: pointer; letter-spacing: 0.05em; text-transform: uppercase; transition: all 0.15s; }
        .nav-btn:hover, .nav-btn.active { border-color: var(--green); color: var(--green); }
        .nav-btn.primary { background: var(--green); border-color: var(--green); color: #0e1a12; font-weight: 600; }
        .nav-btn.primary:hover { background: #5dc87a; }
        .nav-btn.danger { border-color: var(--red); color: var(--red); }
        .tab-bar { display: flex; gap: 4px; margin-bottom: 20px; overflow-x: auto; padding-bottom: 4px; border-bottom: 1px solid var(--border); }
        .tab-btn { background: none; border: none; border-bottom: 2px solid transparent; color: var(--text-dim); font-family: var(--font-mono); font-size: 0.7rem; padding: 6px 12px; cursor: pointer; letter-spacing: 0.06em; text-transform: uppercase; white-space: nowrap; transition: all 0.15s; margin-bottom: -1px; }
        .tab-btn.active { color: var(--gold); border-bottom-color: var(--gold); }
        .tab-btn:hover { color: var(--text); }
        .round-list { display: flex; flex-direction: column; gap: 12px; }
        .round-card { background: var(--surface); border: 1px solid var(--border); border-radius: 6px; padding: 16px 20px; display: flex; align-items: center; justify-content: space-between; cursor: pointer; transition: border-color 0.15s; }
        .round-card:hover { border-color: var(--green-dim); }
        .round-card-info h3 { font-family: var(--font-head); font-size: 1.1rem; color: var(--gold); margin-bottom: 4px; }
        .round-card-info p { font-size: 0.72rem; color: var(--text-dim); }
        .round-card-score { font-family: var(--font-head); font-size: 2.2rem; color: var(--green); min-width: 60px; text-align: right; }
        .round-card-actions { display: flex; gap: 8px; align-items: center; }
        .empty-state { text-align: center; padding: 60px 20px; color: var(--text-dim); }
        .empty-state h2 { font-family: var(--font-head); font-size: 1.6rem; color: var(--text); margin-bottom: 8px; }
        .summary-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)); gap: 10px; margin: 20px 0; }
        .stat-card { background: var(--surface2); border: 1px solid var(--border); border-radius: 6px; padding: 12px; display: flex; flex-direction: column; gap: 4px; }
        .stat-label { font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-dim); }
        .stat-value { font-family: var(--font-head); font-size: 1.5rem; color: var(--gold); }
        .stat-sub { font-size: 0.65rem; color: var(--text-dim); }
        .scorecard-wrap { overflow-x: auto; margin-top: 16px; }
        .scorecard { width: 100%; border-collapse: collapse; font-size: 0.8rem; }
        .scorecard th { background: var(--surface2); padding: 8px 10px; text-align: center; font-size: 0.65rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-dim); border-bottom: 1px solid var(--border); white-space: nowrap; }
        .scorecard th:first-child { text-align: left; }
        .hole-row td { padding: 5px 8px; text-align: center; border-bottom: 1px solid var(--border); vertical-align: middle; }
        .cell-hole { font-weight: 600; color: var(--text-dim); font-size: 0.75rem; text-align: left !important; }
        .cell-diff { font-weight: 600; font-size: 0.8rem; }
        .birdie-row td { background: rgba(26,61,92,0.35); }
        .eagle-row td { background: rgba(123,78,14,0.35); }
        .bogey-row td { background: rgba(61,26,26,0.2); }
        .double-row td { background: rgba(92,16,16,0.3); }
        .select-par { background: var(--surface2); border: 1px solid var(--border); color: var(--text); font-family: var(--font-mono); font-size: 0.78rem; padding: 3px 4px; border-radius: 3px; width: 46px; text-align: center; }
        .input-score, .input-drop { background: var(--surface2); border: 1px solid var(--border); color: var(--gold); font-family: var(--font-mono); font-size: 0.88rem; font-weight: 600; padding: 4px; border-radius: 3px; width: 44px; text-align: center; }
        .input-drop { color: var(--red); width: 36px; }
        .input-putts { color: #7db8e8 !important; }
        .cell-total { font-weight: 700; font-size: 0.9rem; color: var(--gold); text-align: center; }
        .input-score:focus, .input-drop:focus { outline: none; border-color: var(--green); }
        .toggle-group { display: flex; gap: 3px; justify-content: center; }
        .toggle-btn { background: var(--surface2); border: 1px solid var(--border); color: var(--text-dim); font-family: var(--font-mono); font-size: 0.75rem; padding: 3px 7px; border-radius: 3px; cursor: pointer; transition: all 0.1s; }
        .toggle-btn:hover { border-color: var(--green-dim); }
        .active-hit { background: var(--green-dim) !important; border-color: var(--green) !important; color: var(--green) !important; }
        .active-miss { background: rgba(224,90,90,0.2) !important; border-color: var(--red) !important; color: var(--red) !important; }
        .na-tag { font-size: 0.65rem; color: var(--border); }
        .section-divider { border: none; border-top: 2px solid var(--gold); opacity: 0.3; margin: 4px 0; }
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 100; padding: 16px; }
        .modal { background: var(--surface); border: 1px solid var(--gold); border-radius: 8px; padding: 28px; width: 100%; max-width: 460px; max-height: 90vh; overflow-y: auto; }
        .modal h2 { font-family: var(--font-head); font-size: 1.5rem; color: var(--gold); margin-bottom: 20px; }
        .field { display: flex; flex-direction: column; gap: 5px; margin-bottom: 14px; }
        .field label { font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-dim); }
        .field input { background: var(--surface2); border: 1px solid var(--border); color: var(--text); font-family: var(--font-mono); font-size: 0.9rem; padding: 9px 12px; border-radius: 4px; }
        .field input:focus { outline: none; border-color: var(--green); }
        .field-select { background: var(--surface2); border: 1px solid var(--border); color: var(--text); font-family: var(--font-mono); font-size: 0.82rem; padding: 9px 12px; border-radius: 4px; width: 100%; cursor: pointer; }
        .field-select:focus { outline: none; border-color: var(--green); }
        .field-select option[disabled] { color: var(--gold); font-weight: 600; background: var(--surface); }
        .modal-actions { display: flex; gap: 10px; margin-top: 20px; justify-content: flex-end; }
        .round-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 4px; flex-wrap: wrap; gap: 10px; }
        .round-title h2 { font-family: var(--font-head); font-size: 1.5rem; color: var(--gold); }
        .round-title p { font-size: 0.72rem; color: var(--text-dim); margin-top: 2px; }
        .legend { display: flex; gap: 16px; font-size: 0.65rem; color: var(--text-dim); margin-top: 8px; flex-wrap: wrap; }
        .legend-item { display: flex; align-items: center; gap: 5px; }
        .legend-dot { width: 10px; height: 10px; border-radius: 2px; }
        .notes-section { margin-top: 24px; border-top: 1px solid var(--border); padding-top: 16px; }
        .notes-label { display: flex; align-items: baseline; gap: 10px; margin-bottom: 8px; font-size: 0.8rem; color: var(--gold); font-weight: 600; }
        .notes-hint { font-size: 0.68rem; color: var(--text-dim); font-weight: 400; }
        .notes-input { width: 100%; background: var(--surface2); border: 1px solid var(--border); border-radius: 6px; color: var(--text); font-family: var(--font-mono); font-size: 0.82rem; line-height: 1.6; padding: 12px 14px; resize: vertical; min-height: 90px; transition: border-color 0.15s; }
        .notes-input:focus { outline: none; border-color: var(--gold); }
        .notes-input::placeholder { color: var(--border); }
        .toggle-pill { display: flex; align-items: center; gap: 10px; cursor: pointer; }
        .toggle-pill input[type=checkbox] { width: 36px; height: 20px; appearance: none; background: var(--surface2); border: 1px solid var(--border); border-radius: 10px; cursor: pointer; position: relative; transition: background 0.2s; }
        .toggle-pill input[type=checkbox]:checked { background: var(--green-dim); border-color: var(--green); }
        .toggle-pill input[type=checkbox]::after { content: ""; position: absolute; width: 14px; height: 14px; background: var(--text-dim); border-radius: 50%; top: 2px; left: 2px; transition: left 0.2s, background 0.2s; }
        .toggle-pill input[type=checkbox]:checked::after { left: 18px; background: var(--green); }
        .section-title { font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-dim); margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid var(--border); }
        .conditions-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .hcp-badge { background: rgba(200,168,75,0.12); border: 1px solid var(--gold); border-radius: 4px; padding: 4px 10px; font-size: 0.72rem; color: var(--gold); }
      `}</style>

      {/* HEADER */}
      <div className="header">
        <div className="logo">⛳ <span>Fairway</span>Log</div>
        <div className="nav">
          {hcpIndex && <span className="hcp-badge">HCP {hcpIndex}</span>}
          {activeRound && (
            <button className={`nav-btn ${view==="round"?"active":""}`} onClick={() => setView("round")}>Scorecard</button>
          )}
          <button className="nav-btn primary" onClick={() => setShowNewModal(true)}>+ New Round</button>
        </div>
      </div>

      {/* TAB BAR (not shown on scorecard view) */}
      {view !== "round" && (
        <div className="tab-bar">
          <button className={`tab-btn ${view==="list"?"active":""}`} onClick={() => setView("list")}>Rounds</button>
          <button className={`tab-btn ${view==="trends"?"active":""}`} onClick={() => setView("trends")}>Trends</button>
          <button className={`tab-btn ${view==="stats"?"active":""}`} onClick={() => setView("stats")}>Dashboard</button>
          <button className={`tab-btn ${view==="bests"?"active":""}`} onClick={() => setView("bests")}>Bests</button>
          <button className={`tab-btn ${view==="courses"?"active":""}`} onClick={() => setView("courses")}>Courses</button>
          <button className={`tab-btn ${view==="handicap"?"active":""}`} onClick={() => setView("handicap")}>Handicap</button>
        </div>
      )}

      {/* ROUNDS LIST */}
      {view === "list" && (
        <div>
          {rounds.length === 0 ? (
            <div className="empty-state">
              <h2>No rounds yet</h2>
              <p style={{marginBottom:20}}>Start tracking your on-course performance</p>
              <button className="nav-btn primary" onClick={() => setShowNewModal(true)}>+ New Round</button>
            </div>
          ) : (
            <div className="round-list">
              {rounds.map(r => {
                const { totalScore, totalPar } = getRoundStats(r);
                const diff = totalScore - totalPar;
                return (
                  <div key={r.id} className="round-card" onClick={() => { setActiveRoundId(r.id); setView("round"); }}>
                    <div className="round-card-info">
                      <h3>{r.course || "Unnamed Course"}{r.nineHole ? " (9)" : ""}</h3>
                      <p>{r.date}{r.tees ? ` · ${r.tees} tees` : ""}{r.courseRating ? ` · CR ${r.courseRating} / ${r.slopeRating}` : ""}</p>
                      {r.conditions?.weather && <p style={{fontSize:"0.68rem",color:"var(--text-dim)"}}>🌤 {r.conditions.weather}{r.conditions.temp ? ` · ${r.conditions.temp}°F` : ""}{r.conditions.cart ? ` · ${r.conditions.cart}` : ""}</p>}
                      {r.partners && <p style={{fontSize:"0.68rem",color:"var(--text-dim)"}}>👥 {r.partners}</p>}
                      {r.notes ? <p style={{fontSize:"0.68rem",color:"var(--text-dim)",marginTop:3,fontStyle:"italic",maxWidth:320,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>"{r.notes}"</p> : null}
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:16}}>
                      <div className="round-card-score">{totalScore || "–"}</div>
                      {totalScore > 0 && <div style={{fontSize:"0.75rem",color:diff<=0?"#4caf6a":"#e05a5a",fontWeight:600}}>{diff>0?"+":""}{diff}</div>}
                      <div className="round-card-actions" onClick={e => e.stopPropagation()}>
                        <button className="nav-btn" style={{fontSize:"0.65rem",padding:"4px 8px"}} onClick={() => setShareRound(r)}>⬆</button>
                        <button className="nav-btn danger" onClick={() => deleteRound(r.id)}>✕</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TRENDS */}
      {view === "trends" && <TrendsChart rounds={rounds} />}

      {/* STATS DASHBOARD */}
      {view === "stats" && <StatsDashboard rounds={rounds} />}

      {/* PERSONAL BESTS */}
      {view === "bests" && <PersonalBests rounds={rounds} />}

      {/* COURSE HISTORY */}
      {view === "courses" && <CourseHistory rounds={rounds} onOpenRound={id => { setActiveRoundId(id); setView("round"); }} />}

      {/* HANDICAP */}
      {view === "handicap" && <HandicapPanel rounds={rounds} />}

      {/* SCORECARD VIEW */}
      {view === "round" && activeRound && (
        <div>
          <div className="round-header">
            <div className="round-title">
              <h2>{activeRound.course || "Unnamed Course"}{activeRound.nineHole ? " (9-hole)" : ""}</h2>
              <p>{activeRound.date}{activeRound.tees ? ` · ${activeRound.tees} tees` : ""}</p>
              {activeRound.conditions?.weather && <p style={{fontSize:"0.68rem",color:"var(--text-dim)"}}>🌤 {activeRound.conditions.weather}{activeRound.conditions.temp?` · ${activeRound.conditions.temp}°F`:""}{activeRound.conditions.cart?` · ${activeRound.conditions.cart}`:""}</p>}
              {activeRound.partners && <p style={{fontSize:"0.68rem",color:"var(--text-dim)"}}>👥 {activeRound.partners}</p>}
            </div>
            <div style={{display:"flex",gap:8}}>
              <button className="nav-btn" style={{fontSize:"0.65rem"}} onClick={() => setShareRound(activeRound)}>⬆ Share</button>
              <button className="nav-btn" onClick={() => setView("list")}>← All Rounds</button>
            </div>
          </div>

          <RoundSummary round={activeRound} />

          <div className="legend">
            <span className="legend-item"><span className="legend-dot" style={{background:"rgba(26,61,92,0.6)"}}></span>Birdie</span>
            <span className="legend-item"><span className="legend-dot" style={{background:"rgba(123,78,14,0.6)"}}></span>Eagle or better</span>
            <span className="legend-item"><span className="legend-dot" style={{background:"rgba(61,26,26,0.4)"}}></span>Bogey</span>
            <span className="legend-item"><span className="legend-dot" style={{background:"rgba(92,16,16,0.6)"}}></span>Double+</span>
          </div>

          <div className="scorecard-wrap">
            <table className="scorecard">
              <thead>
                <tr>
                  <th style={{textAlign:"left"}}>Hole</th>
                  <StatTh label="Par" onInfo={setInfoStat} />
                  <StatTh label="Strokes" onInfo={setInfoStat} />
                  <StatTh label="Putts" onInfo={setInfoStat} />
                  <StatTh label="Total" onInfo={setInfoStat} />
                  <StatTh label="Fairway" onInfo={setInfoStat} />
                  <StatTh label="Drops" onInfo={setInfoStat} />
                  <StatTh label="GIR" onInfo={setInfoStat} />
                  <StatTh label="U/D" onInfo={setInfoStat} />
                  <StatTh label="+/–" onInfo={setInfoStat} />
                </tr>
              </thead>
              <tbody>
                {activeRound.holes.slice(0, activeRound.nineHole ? 9 : 9).map((h, i) => (
                  <HoleRow key={h.hole} hole={h} onChange={(field, val) => updateHole(activeRound.id, i, field, val)} />
                ))}
                <tr><td colSpan={10}><hr className="section-divider" /></td></tr>
                {/* Front/Only 9 subtotals */}
                {(() => {
                  const slice = activeRound.holes.slice(0, 9);
                  return (
                    <tr style={{background:"var(--surface2)",fontSize:"0.75rem",color:"var(--text-dim)"}}>
                      <td style={{paddingLeft:8,fontWeight:600,color:"var(--text)"}}>{activeRound.nineHole ? "TOTAL" : "OUT"}</td>
                      <td style={{textAlign:"center"}}>{slice.reduce((s,h)=>s+h.par,0)}</td>
                      <td style={{textAlign:"center"}}>{slice.reduce((s,h)=>s+(parseInt(h.strokes)||0),0)||"–"}</td>
                      <td style={{textAlign:"center"}}>{slice.reduce((s,h)=>s+(parseInt(h.putts)||0),0)||"–"}</td>
                      <td style={{textAlign:"center",color:"var(--gold)",fontWeight:600}}>{slice.reduce((s,h)=>s+holeScore(h),0)||"–"}</td>
                      <td style={{textAlign:"center"}}>{slice.filter(h=>h.fairway==="✓").length}/{slice.filter(h=>h.fairway!=="–").length}</td>
                      <td style={{textAlign:"center",color:"var(--red)"}}>{slice.reduce((s,h)=>s+(parseInt(h.drop)||0),0)}</td>
                      <td style={{textAlign:"center"}}>{slice.filter(h=>h.gir==="✓").length}/9</td>
                      <td style={{textAlign:"center"}}>
                        {(() => { const a=slice.filter(h=>h.scramble==="✓"||h.scramble==="✗").length; const hh=slice.filter(h=>h.scramble==="✓").length; return a?`${hh}/${a}`:"–"; })()}
                      </td>
                      <td></td>
                    </tr>
                  );
                })()}

                {/* Back 9 — only for 18-hole rounds */}
                {!activeRound.nineHole && (
                  <>
                    <tr><td colSpan={10}><hr className="section-divider" /></td></tr>
                    {activeRound.holes.slice(9).map((h, i) => (
                      <HoleRow key={h.hole} hole={h} onChange={(field, val) => updateHole(activeRound.id, i+9, field, val)} />
                    ))}
                    <tr><td colSpan={10}><hr className="section-divider" /></td></tr>
                    {/* Back 9 subtotals */}
                    {(() => {
                      const slice = activeRound.holes.slice(9);
                      return (
                        <tr style={{background:"var(--surface2)",fontSize:"0.75rem",color:"var(--text-dim)"}}>
                          <td style={{paddingLeft:8,fontWeight:600,color:"var(--text)"}}>IN</td>
                          <td style={{textAlign:"center"}}>{slice.reduce((s,h)=>s+h.par,0)}</td>
                          <td style={{textAlign:"center"}}>{slice.reduce((s,h)=>s+(parseInt(h.strokes)||0),0)||"–"}</td>
                          <td style={{textAlign:"center"}}>{slice.reduce((s,h)=>s+(parseInt(h.putts)||0),0)||"–"}</td>
                          <td style={{textAlign:"center",color:"var(--gold)",fontWeight:600}}>{slice.reduce((s,h)=>s+holeScore(h),0)||"–"}</td>
                          <td style={{textAlign:"center"}}>{slice.filter(h=>h.fairway==="✓").length}/{slice.filter(h=>h.fairway!=="–").length}</td>
                          <td style={{textAlign:"center",color:"var(--red)"}}>{slice.reduce((s,h)=>s+(parseInt(h.drop)||0),0)}</td>
                          <td style={{textAlign:"center"}}>{slice.filter(h=>h.gir==="✓").length}/9</td>
                          <td style={{textAlign:"center"}}>
                            {(() => { const a=slice.filter(h=>h.scramble==="✓"||h.scramble==="✗").length; const hh=slice.filter(h=>h.scramble==="✓").length; return a?`${hh}/${a}`:"–"; })()}
                          </td>
                          <td></td>
                        </tr>
                      );
                    })()}
                    <tr><td colSpan={10}><hr className="section-divider" style={{opacity:0.7}} /></td></tr>
                    {/* Grand totals — 18-hole only */}
                    {(() => {
                      const total = activeRound.holes.reduce((s,h)=>s+holeScore(h),0);
                      const totalStrokes = activeRound.holes.reduce((s,h)=>s+(parseInt(h.strokes)||0),0);
                      const totalPutts = activeRound.holes.reduce((s,h)=>s+(parseInt(h.putts)||0),0);
                      const par = activeRound.holes.reduce((s,h)=>s+h.par,0);
                      return (
                        <tr style={{background:"var(--surface2)",fontWeight:700}}>
                          <td style={{paddingLeft:8,color:"var(--gold)"}}>TOTAL</td>
                          <td style={{textAlign:"center",color:"var(--text)"}}>{par}</td>
                          <td style={{textAlign:"center",color:"var(--text-dim)"}}>{totalStrokes||"–"}</td>
                          <td style={{textAlign:"center",color:"var(--text-dim)"}}>{totalPutts||"–"}</td>
                          <td style={{textAlign:"center",color:"var(--gold)",fontSize:"1rem"}}>{total||"–"}</td>
                          <td style={{textAlign:"center",fontSize:"0.8rem",color:"var(--green)"}}>
                            {activeRound.holes.filter(h=>h.fairway==="✓").length}/{activeRound.holes.filter(h=>h.fairway!=="–").length}
                          </td>
                          <td style={{textAlign:"center",color:"var(--red)"}}>{activeRound.holes.reduce((s,h)=>s+(parseInt(h.drop)||0),0)}</td>
                          <td style={{textAlign:"center",color:"var(--green)"}}>{activeRound.holes.filter(h=>h.gir==="✓").length}/18</td>
                          <td style={{textAlign:"center",color:"var(--green)"}}>
                            {(() => { const a=activeRound.holes.filter(h=>h.scramble==="✓"||h.scramble==="✗").length; const hh=activeRound.holes.filter(h=>h.scramble==="✓").length; return a?`${hh}/${a}`:"–"; })()}
                          </td>
                          <td style={{textAlign:"center",color:total-par>0?"var(--red)":"var(--green)"}}>
                            {total?(total-par>0?"+":"")+(total-par):"–"}
                          </td>
                        </tr>
                      );
                    })()}
                  </>
                )}
              </tbody>
            </table>
          </div>

          {/* ROUND NOTES */}
          <div className="notes-section">
            <div className="notes-label">
              <span>📝 Round Notes</span>
              <span className="notes-hint">Jot down what cost you strokes while it's fresh</span>
            </div>
            <textarea className="notes-input"
              placeholder={'e.g. "Lost 3 shots left of every green — need to work on right-to-left miss tendency."'}
              value={activeRound.notes || ""}
              onChange={e => updateRoundField(activeRound.id, "notes", e.target.value)} />
          </div>
        </div>
      )}

      {/* NEW ROUND MODAL */}
      {showNewModal && (
        <div className="modal-overlay" onClick={() => setShowNewModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>New Round</h2>

            {/* 9-hole toggle */}
            <div className="field">
              <label className="toggle-pill">
                <input type="checkbox" checked={newRound.nineHole}
                  onChange={e => setNewRound({...newRound, nineHole: e.target.checked})} />
                <span style={{fontSize:"0.82rem",color:"var(--text)"}}>9-hole round</span>
              </label>
            </div>

            <div className="field">
              <label>Course — South Shore MA</label>
              <select className="field-select" value={newRound.courseKey || ""}
                onChange={e => {
                  const key = e.target.value;
                  const found = SOUTH_SHORE_COURSES.find(c => !c.disabled && c.name === key);
                  if (found && found.name !== "Other (type below)") {
                    const tees = COURSE_TEES[key];
                    const firstTee = tees ? tees[0] : null;
                    setNewRound({...newRound, courseKey: key, course: found.name,
                      tees: firstTee ? firstTee.label : "",
                      courseRating: firstTee ? firstTee.courseRating : "",
                      slopeRating: firstTee ? firstTee.slope : "113"});
                  } else if (found && found.name === "Other (type below)") {
                    setNewRound({...newRound, courseKey: key, course: "", tees: "", courseRating: "", slopeRating: "113"});
                  } else {
                    setNewRound({...newRound, courseKey: "", course: "", tees: "", courseRating: "", slopeRating: "113"});
                  }
                }}>
                <option value="">Select a course…</option>
                {SOUTH_SHORE_COURSES.map((c, i) =>
                  c.disabled
                    ? <option key={i} disabled value="">{c.group}</option>
                    : <option key={i} value={c.name}>{c.name} ({c.access})</option>
                )}
              </select>
            </div>

            {(newRound.courseKey === "Other (type below)" || !newRound.courseKey) && (
              <div className="field">
                <label>Course Name (custom)</label>
                <input type="text" placeholder="e.g. Pinehurst No. 2" value={newRound.course}
                  onChange={e => setNewRound({...newRound, course: e.target.value})} />
              </div>
            )}

            <div className="field">
              <label>Date</label>
              <input type="date" value={newRound.date} onChange={e => setNewRound({...newRound, date: e.target.value})} />
            </div>

            <div className="field">
              <label>Tees Played</label>
              {selectedCourseTees ? (
                <select className="field-select" value={newRound.tees}
                  onChange={e => {
                    const t = selectedCourseTees.find(t => t.label === e.target.value);
                    setNewRound({...newRound, tees: e.target.value,
                      courseRating: t ? t.courseRating : newRound.courseRating,
                      slopeRating: t ? t.slope : newRound.slopeRating});
                  }}>
                  {selectedCourseTees.map(t => (
                    <option key={t.label} value={t.label}>{t.label} — CR {t.courseRating} / Slope {t.slope}</option>
                  ))}
                </select>
              ) : (
                <input type="text" placeholder="e.g. White, Blue, Gold" value={newRound.tees}
                  onChange={e => setNewRound({...newRound, tees: e.target.value})} />
              )}
            </div>

            <div style={{display:"flex",gap:12}}>
              <div className="field" style={{flex:1}}>
                <label>Course Rating</label>
                <input type="number" placeholder="71.5" value={newRound.courseRating}
                  onChange={e => setNewRound({...newRound, courseRating: e.target.value})} />
              </div>
              <div className="field" style={{flex:1}}>
                <label>Slope</label>
                <input type="number" placeholder="113" value={newRound.slopeRating}
                  onChange={e => setNewRound({...newRound, slopeRating: e.target.value})} />
              </div>
            </div>

            {/* Weather & Conditions */}
            <div style={{marginTop:8,marginBottom:6,fontSize:"0.65rem",textTransform:"uppercase",letterSpacing:"0.08em",color:"var(--text-dim)"}}>Conditions (optional)</div>
            <div className="conditions-row">
              <div className="field">
                <label>Weather</label>
                <select className="field-select" value={newRound.conditions?.weather||""}
                  onChange={e => setNewRound({...newRound, conditions:{...newRound.conditions, weather:e.target.value}})}>
                  <option value="">–</option>
                  <option>☀️ Sunny</option>
                  <option>⛅ Partly Cloudy</option>
                  <option>☁️ Overcast</option>
                  <option>🌧 Light Rain</option>
                  <option>🌬 Windy</option>
                  <option>🥶 Cold</option>
                  <option>🌫 Foggy</option>
                </select>
              </div>
              <div className="field">
                <label>Temp (°F)</label>
                <input type="number" placeholder="72" value={newRound.conditions?.temp||""}
                  onChange={e => setNewRound({...newRound, conditions:{...newRound.conditions, temp:e.target.value}})} />
              </div>
            </div>
            <div className="field">
              <label>Cart / Walk</label>
              <select className="field-select" value={newRound.conditions?.cart||""}
                onChange={e => setNewRound({...newRound, conditions:{...newRound.conditions, cart:e.target.value}})}>
                <option value="">–</option>
                <option>🚶 Walking</option>
                <option>🛒 Cart</option>
                <option>🛍 Push Cart</option>
              </select>
            </div>

            {/* Playing Partners */}
            <div className="field">
              <label>Playing Partners (optional)</label>
              <input type="text" placeholder="e.g. Dave, Mike, John"
                value={newRound.partners||""}
                onChange={e => setNewRound({...newRound, partners:e.target.value})} />
            </div>

            <div className="modal-actions">
              <button className="nav-btn" onClick={() => setShowNewModal(false)}>Cancel</button>
              <button className="nav-btn primary" onClick={createRound}
                disabled={!newRound.course && !newRound.date}>Tee Off →</button>
            </div>
          </div>
        </div>
      )}

      {/* INFO MODAL */}
      <InfoModal stat={infoStat} onClose={() => setInfoStat(null)} />

      {/* SHARE MODAL */}
      {shareRound && <ShareModal round={shareRound} onClose={() => setShareRound(null)} />}
    </div>
  );
}
