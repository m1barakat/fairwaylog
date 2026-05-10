import { useState, useEffect, useRef, useCallback } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// COURSE DATABASE — Green center + front/back + tee GPS coords
// ══════════════════════════════════════════════════════════════════════════════
const COURSES = {
  braintree: {
    name: "Braintree Municipal", short: "Braintree", par: 72, rating: 69.5, slope: 125,
    holes: [
      { hole:1,  par:4, yards:390, hcp:12, tee:[42.2061,-71.0012], green:[42.2048,-71.0025], front:[42.2050,-71.0023], back:[42.2046,-71.0027] },
      { hole:2,  par:4, yards:370, hcp:8,  tee:[42.2045,-71.0028], green:[42.2033,-71.0041], front:[42.2035,-71.0039], back:[42.2031,-71.0043] },
      { hole:3,  par:3, yards:175, hcp:16, tee:[42.2030,-71.0044], green:[42.2020,-71.0055], front:[42.2022,-71.0053], back:[42.2018,-71.0057] },
      { hole:4,  par:5, yards:520, hcp:4,  tee:[42.2017,-71.0058], green:[42.2000,-71.0075], front:[42.2002,-71.0073], back:[42.1998,-71.0077] },
      { hole:5,  par:4, yards:395, hcp:10, tee:[42.1997,-71.0078], green:[42.1985,-71.0065], front:[42.1987,-71.0063], back:[42.1983,-71.0067] },
      { hole:6,  par:3, yards:185, hcp:18, tee:[42.1982,-71.0063], green:[42.1975,-71.0050], front:[42.1977,-71.0048], back:[42.1973,-71.0052] },
      { hole:7,  par:5, yards:510, hcp:2,  tee:[42.1972,-71.0048], green:[42.1955,-71.0030], front:[42.1957,-71.0028], back:[42.1953,-71.0032] },
      { hole:8,  par:4, yards:375, hcp:6,  tee:[42.1952,-71.0030], green:[42.1940,-71.0018], front:[42.1942,-71.0016], back:[42.1938,-71.0020] },
      { hole:9,  par:4, yards:345, hcp:14, tee:[42.1937,-71.0017], green:[42.1950,-71.0000], front:[42.1952,-71.0002], back:[42.1948,-70.9998] },
      { hole:10, par:5, yards:510, hcp:7,  tee:[42.1953,-70.9997], green:[42.1970,-71.0015], front:[42.1972,-71.0013], back:[42.1968,-71.0017] },
      { hole:11, par:4, yards:430, hcp:1,  tee:[42.1971,-71.0018], green:[42.1985,-71.0035], front:[42.1987,-71.0033], back:[42.1983,-71.0037] },
      { hole:12, par:3, yards:188, hcp:15, tee:[42.1986,-71.0038], green:[42.1998,-71.0050], front:[42.2000,-71.0048], back:[42.1996,-71.0052] },
      { hole:13, par:5, yards:474, hcp:13, tee:[42.1999,-71.0053], green:[42.2015,-71.0068], front:[42.2017,-71.0066], back:[42.2013,-71.0070] },
      { hole:14, par:4, yards:430, hcp:3,  tee:[42.2016,-71.0071], green:[42.2030,-71.0060], front:[42.2032,-71.0058], back:[42.2028,-71.0062] },
      { hole:15, par:4, yards:407, hcp:5,  tee:[42.2031,-71.0057], green:[42.2043,-71.0045], front:[42.2045,-71.0043], back:[42.2041,-71.0047] },
      { hole:16, par:3, yards:198, hcp:17, tee:[42.2044,-71.0043], green:[42.2055,-71.0035], front:[42.2057,-71.0033], back:[42.2053,-71.0037] },
      { hole:17, par:4, yards:358, hcp:9,  tee:[42.2056,-71.0032], green:[42.2066,-71.0020], front:[42.2068,-71.0018], back:[42.2064,-71.0022] },
      { hole:18, par:4, yards:334, hcp:11, tee:[42.2067,-71.0018], green:[42.2058,-71.0007], front:[42.2060,-71.0005], back:[42.2056,-71.0009] },
    ],
  },
  easton: {
    name: "Easton Country Club", short: "Easton", par: 70, rating: 67.2, slope: 118,
    holes: [
      { hole:1,  par:4, yards:355, hcp:9,  tee:[41.9980,-71.0850], green:[41.9965,-71.0868], front:[41.9967,-71.0866], back:[41.9963,-71.0870] },
      { hole:2,  par:5, yards:480, hcp:3,  tee:[41.9962,-71.0871], green:[41.9945,-71.0890], front:[41.9947,-71.0888], back:[41.9943,-71.0892] },
      { hole:3,  par:3, yards:158, hcp:17, tee:[41.9942,-71.0893], green:[41.9930,-71.0878], front:[41.9932,-71.0876], back:[41.9928,-71.0880] },
      { hole:4,  par:4, yards:370, hcp:7,  tee:[41.9927,-71.0877], green:[41.9912,-71.0862], front:[41.9914,-71.0860], back:[41.9910,-71.0864] },
      { hole:5,  par:4, yards:390, hcp:1,  tee:[41.9909,-71.0861], green:[41.9895,-71.0845], front:[41.9897,-71.0843], back:[41.9893,-71.0847] },
      { hole:6,  par:3, yards:162, hcp:15, tee:[41.9892,-71.0844], green:[41.9880,-71.0858], front:[41.9882,-71.0856], back:[41.9878,-71.0860] },
      { hole:7,  par:5, yards:495, hcp:5,  tee:[41.9877,-71.0861], green:[41.9858,-71.0878], front:[41.9860,-71.0876], back:[41.9856,-71.0880] },
      { hole:8,  par:4, yards:365, hcp:11, tee:[41.9855,-71.0881], green:[41.9840,-71.0865], front:[41.9842,-71.0863], back:[41.9838,-71.0867] },
      { hole:9,  par:4, yards:340, hcp:13, tee:[41.9837,-71.0864], green:[41.9852,-71.0848], front:[41.9854,-71.0846], back:[41.9850,-71.0850] },
      { hole:10, par:4, yards:345, hcp:10, tee:[41.9853,-71.0845], green:[41.9868,-71.0830], front:[41.9870,-71.0828], back:[41.9866,-71.0832] },
      { hole:11, par:3, yards:145, hcp:18, tee:[41.9869,-71.0827], green:[41.9882,-71.0815], front:[41.9884,-71.0813], back:[41.9880,-71.0817] },
      { hole:12, par:5, yards:500, hcp:4,  tee:[41.9883,-71.0812], green:[41.9900,-71.0795], front:[41.9902,-71.0793], back:[41.9898,-71.0797] },
      { hole:13, par:4, yards:375, hcp:8,  tee:[41.9901,-71.0792], green:[41.9916,-71.0808], front:[41.9918,-71.0806], back:[41.9914,-71.0810] },
      { hole:14, par:4, yards:380, hcp:2,  tee:[41.9917,-71.0811], green:[41.9930,-71.0825], front:[41.9932,-71.0823], back:[41.9928,-71.0827] },
      { hole:15, par:3, yards:170, hcp:16, tee:[41.9931,-71.0828], green:[41.9944,-71.0815], front:[41.9946,-71.0813], back:[41.9942,-71.0817] },
      { hole:16, par:4, yards:410, hcp:6,  tee:[41.9945,-71.0812], green:[41.9960,-71.0830], front:[41.9962,-71.0828], back:[41.9958,-71.0832] },
      { hole:17, par:4, yards:355, hcp:12, tee:[41.9961,-71.0833], green:[41.9973,-71.0848], front:[41.9975,-71.0846], back:[41.9971,-71.0850] },
      { hole:18, par:4, yards:385, hcp:14, tee:[41.9974,-71.0851], green:[41.9983,-71.0863], front:[41.9985,-71.0861], back:[41.9981,-71.0865] },
    ],
  },
  pinehills: {
    name: "Pinehills Jones", short: "Pinehills", par: 72, rating: 73.1, slope: 135,
    holes: [
      { hole:1,  par:4, yards:400, hcp:10, tee:[41.8720,-70.6450], green:[41.8705,-70.6468], front:[41.8707,-70.6466], back:[41.8703,-70.6470] },
      { hole:2,  par:5, yards:545, hcp:4,  tee:[41.8702,-70.6471], green:[41.8685,-70.6492], front:[41.8687,-70.6490], back:[41.8683,-70.6494] },
      { hole:3,  par:3, yards:195, hcp:14, tee:[41.8682,-70.6495], green:[41.8668,-70.6480], front:[41.8670,-70.6478], back:[41.8666,-70.6482] },
      { hole:4,  par:4, yards:420, hcp:6,  tee:[41.8665,-70.6479], green:[41.8650,-70.6462], front:[41.8652,-70.6460], back:[41.8648,-70.6464] },
      { hole:5,  par:4, yards:385, hcp:12, tee:[41.8647,-70.6461], green:[41.8632,-70.6445], front:[41.8634,-70.6443], back:[41.8630,-70.6447] },
      { hole:6,  par:3, yards:210, hcp:16, tee:[41.8629,-70.6444], green:[41.8615,-70.6430], front:[41.8617,-70.6428], back:[41.8613,-70.6432] },
      { hole:7,  par:5, yards:560, hcp:2,  tee:[41.8612,-70.6429], green:[41.8595,-70.6410], front:[41.8597,-70.6408], back:[41.8593,-70.6412] },
      { hole:8,  par:4, yards:415, hcp:8,  tee:[41.8592,-70.6409], green:[41.8575,-70.6425], front:[41.8577,-70.6423], back:[41.8573,-70.6427] },
      { hole:9,  par:4, yards:395, hcp:18, tee:[41.8572,-70.6428], green:[41.8587,-70.6445], front:[41.8589,-70.6443], back:[41.8585,-70.6447] },
      { hole:10, par:4, yards:405, hcp:11, tee:[41.8588,-70.6448], green:[41.8602,-70.6462], front:[41.8604,-70.6460], back:[41.8600,-70.6464] },
      { hole:11, par:3, yards:200, hcp:15, tee:[41.8603,-70.6465], green:[41.8618,-70.6450], front:[41.8620,-70.6448], back:[41.8616,-70.6452] },
      { hole:12, par:5, yards:555, hcp:5,  tee:[41.8619,-70.6447], green:[41.8635,-70.6430], front:[41.8637,-70.6428], back:[41.8633,-70.6432] },
      { hole:13, par:4, yards:390, hcp:9,  tee:[41.8636,-70.6427], green:[41.8650,-70.6443], front:[41.8652,-70.6441], back:[41.8648,-70.6445] },
      { hole:14, par:4, yards:430, hcp:3,  tee:[41.8651,-70.6446], green:[41.8665,-70.6460], front:[41.8667,-70.6458], back:[41.8663,-70.6462] },
      { hole:15, par:3, yards:185, hcp:17, tee:[41.8666,-70.6463], green:[41.8680,-70.6478], front:[41.8682,-70.6476], back:[41.8678,-70.6480] },
      { hole:16, par:5, yards:540, hcp:1,  tee:[41.8681,-70.6481], green:[41.8697,-70.6498], front:[41.8699,-70.6496], back:[41.8695,-70.6500] },
      { hole:17, par:4, yards:410, hcp:7,  tee:[41.8698,-70.6501], green:[41.8712,-70.6515], front:[41.8714,-70.6513], back:[41.8710,-70.6517] },
      { hole:18, par:4, yards:440, hcp:13, tee:[41.8713,-70.6518], green:[41.8725,-70.6503], front:[41.8727,-70.6501], back:[41.8723,-70.6505] },
    ],
  },
  ridder: {
    name: "Ridder Farm GCC", short: "Ridder Farm", par: 70, rating: 68.1, slope: 113,
    holes: [
      { hole:1,  par:4, yards:335, hcp:10, tee:[42.0285,-70.9675], green:[42.0272,-70.9690], front:[42.0274,-70.9688], back:[42.0270,-70.9692] },
      { hole:2,  par:4, yards:373, hcp:6,  tee:[42.0269,-70.9693], green:[42.0252,-70.9710], front:[42.0254,-70.9708], back:[42.0250,-70.9712] },
      { hole:3,  par:3, yards:155, hcp:12, tee:[42.0249,-70.9713], green:[42.0239,-70.9700], front:[42.0241,-70.9698], back:[42.0237,-70.9702] },
      { hole:4,  par:4, yards:294, hcp:16, tee:[42.0236,-70.9699], green:[42.0225,-70.9685], front:[42.0227,-70.9683], back:[42.0223,-70.9687] },
      { hole:5,  par:4, yards:387, hcp:4,  tee:[42.0222,-70.9683], green:[42.0208,-70.9668], front:[42.0210,-70.9666], back:[42.0206,-70.9670] },
      { hole:6,  par:4, yards:312, hcp:14, tee:[42.0205,-70.9666], green:[42.0195,-70.9652], front:[42.0197,-70.9650], back:[42.0193,-70.9654] },
      { hole:7,  par:4, yards:263, hcp:18, tee:[42.0192,-70.9650], green:[42.0183,-70.9638], front:[42.0185,-70.9636], back:[42.0181,-70.9640] },
      { hole:8,  par:3, yards:198, hcp:8,  tee:[42.0180,-70.9637], green:[42.0169,-70.9625], front:[42.0171,-70.9623], back:[42.0167,-70.9627] },
      { hole:9,  par:4, yards:395, hcp:2,  tee:[42.0166,-70.9624], green:[42.0180,-70.9607], front:[42.0182,-70.9605], back:[42.0178,-70.9609] },
      { hole:10, par:4, yards:314, hcp:15, tee:[42.0181,-70.9604], green:[42.0194,-70.9590], front:[42.0196,-70.9588], back:[42.0192,-70.9592] },
      { hole:11, par:5, yards:460, hcp:5,  tee:[42.0195,-70.9587], green:[42.0213,-70.9570], front:[42.0215,-70.9568], back:[42.0211,-70.9572] },
      { hole:12, par:4, yards:345, hcp:11, tee:[42.0214,-70.9567], green:[42.0228,-70.9552], front:[42.0230,-70.9550], back:[42.0226,-70.9554] },
      { hole:13, par:3, yards:170, hcp:17, tee:[42.0229,-70.9549], green:[42.0241,-70.9538], front:[42.0243,-70.9536], back:[42.0239,-70.9540] },
      { hole:14, par:4, yards:421, hcp:1,  tee:[42.0242,-70.9535], green:[42.0258,-70.9518], front:[42.0260,-70.9516], back:[42.0256,-70.9520] },
      { hole:15, par:3, yards:225, hcp:13, tee:[42.0259,-70.9515], green:[42.0272,-70.9502], front:[42.0274,-70.9500], back:[42.0270,-70.9504] },
      { hole:16, par:4, yards:385, hcp:9,  tee:[42.0273,-70.9499], green:[42.0287,-70.9485], front:[42.0289,-70.9483], back:[42.0285,-70.9487] },
      { hole:17, par:5, yards:473, hcp:7,  tee:[42.0288,-70.9482], green:[42.0305,-70.9465], front:[42.0307,-70.9463], back:[42.0303,-70.9467] },
      { hole:18, par:4, yards:320, hcp:3,  tee:[42.0306,-70.9462], green:[42.0293,-70.9475], front:[42.0295,-70.9473], back:[42.0291,-70.9477] },
    ],
  },
  brookside: {
    name: "Brookside (Bourne)", short: "Brookside", par: 72, rating: 68.8, slope: 117,
    holes: [
      { hole:1,  par:4, yards:360, hcp:11, tee:[41.7380,-70.5690], green:[41.7365,-70.5708], front:[41.7367,-70.5706], back:[41.7363,-70.5710] },
      { hole:2,  par:5, yards:490, hcp:5,  tee:[41.7362,-70.5711], green:[41.7345,-70.5730], front:[41.7347,-70.5728], back:[41.7343,-70.5732] },
      { hole:3,  par:3, yards:155, hcp:15, tee:[41.7342,-70.5733], green:[41.7328,-70.5718], front:[41.7330,-70.5716], back:[41.7326,-70.5720] },
      { hole:4,  par:4, yards:375, hcp:7,  tee:[41.7325,-70.5717], green:[41.7310,-70.5700], front:[41.7312,-70.5698], back:[41.7308,-70.5702] },
      { hole:5,  par:4, yards:395, hcp:3,  tee:[41.7307,-70.5699], green:[41.7292,-70.5682], front:[41.7294,-70.5680], back:[41.7290,-70.5684] },
      { hole:6,  par:3, yards:165, hcp:17, tee:[41.7289,-70.5681], green:[41.7275,-70.5665], front:[41.7277,-70.5663], back:[41.7273,-70.5667] },
      { hole:7,  par:5, yards:510, hcp:1,  tee:[41.7272,-70.5664], green:[41.7255,-70.5645], front:[41.7257,-70.5643], back:[41.7253,-70.5647] },
      { hole:8,  par:4, yards:370, hcp:9,  tee:[41.7252,-70.5644], green:[41.7237,-70.5628], front:[41.7239,-70.5626], back:[41.7235,-70.5630] },
      { hole:9,  par:4, yards:335, hcp:13, tee:[41.7234,-70.5627], green:[41.7249,-70.5611], front:[41.7251,-70.5609], back:[41.7247,-70.5613] },
      { hole:10, par:4, yards:350, hcp:12, tee:[41.7250,-70.5608], green:[41.7265,-70.5593], front:[41.7267,-70.5591], back:[41.7263,-70.5595] },
      { hole:11, par:3, yards:160, hcp:16, tee:[41.7266,-70.5590], green:[41.7280,-70.5607], front:[41.7282,-70.5605], back:[41.7278,-70.5609] },
      { hole:12, par:5, yards:505, hcp:4,  tee:[41.7281,-70.5610], green:[41.7297,-70.5627], front:[41.7299,-70.5625], back:[41.7295,-70.5629] },
      { hole:13, par:4, yards:380, hcp:8,  tee:[41.7298,-70.5630], green:[41.7313,-70.5645], front:[41.7315,-70.5643], back:[41.7311,-70.5647] },
      { hole:14, par:4, yards:365, hcp:6,  tee:[41.7314,-70.5648], green:[41.7328,-70.5662], front:[41.7330,-70.5660], back:[41.7326,-70.5664] },
      { hole:15, par:3, yards:172, hcp:18, tee:[41.7329,-70.5665], green:[41.7343,-70.5650], front:[41.7345,-70.5648], back:[41.7341,-70.5652] },
      { hole:16, par:5, yards:515, hcp:2,  tee:[41.7344,-70.5647], green:[41.7360,-70.5663], front:[41.7362,-70.5661], back:[41.7358,-70.5665] },
      { hole:17, par:4, yards:355, hcp:10, tee:[41.7361,-70.5666], green:[41.7374,-70.5680], front:[41.7376,-70.5678], back:[41.7372,-70.5682] },
      { hole:18, par:4, yards:370, hcp:14, tee:[41.7375,-70.5683], green:[41.7383,-70.5697], front:[41.7385,-70.5695], back:[41.7381,-70.5699] },
    ],
  },
};

// ══════════════════════════════════════════════════════════════════════════════
// CLUBS — 30th percentile carries
// ══════════════════════════════════════════════════════════════════════════════
const CLUBS = [
  { name:"60°",    carry:51,  color:"#b197fc" },
  { name:"54°",    carry:57,  color:"#74c0fc" },
  { name:"PW",     carry:65,  color:"#38d9a9" },
  { name:"9i",     carry:72,  color:"#69db7c" },
  { name:"7i",     carry:80,  color:"#a9e34b" },
  { name:"9W",     carry:88,  color:"#ffd97d" },
  { name:"5W",     carry:100, color:"#ffa94d" },
  { name:"Driver", carry:130, color:"#ff6b6b" },
];

// ══════════════════════════════════════════════════════════════════════════════
// HELPERS
// ══════════════════════════════════════════════════════════════════════════════
function haversineYards(lat1,lng1,lat2,lng2) {
  const R=6371000, toR=Math.PI/180;
  const φ1=lat1*toR, φ2=lat2*toR;
  const Δφ=(lat2-lat1)*toR, Δλ=(lng2-lng1)*toR;
  const a=Math.sin(Δφ/2)**2+Math.cos(φ1)*Math.cos(φ2)*Math.sin(Δλ/2)**2;
  return Math.round(R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a))/0.9144);
}
function getBestClub(y) {
  const m=CLUBS.filter(c=>c.carry<=y); return m.length?m[m.length-1]:CLUBS[0];
}
function nearestHole(course,lat,lng) {
  let best=null,bestD=Infinity;
  course.holes.forEach(h=>{const d=haversineYards(lat,lng,...h.tee);if(d<bestD){bestD=d;best=h;}});
  return best;
}
function scoreBg(s,par) {
  if(!s||s===0) return "transparent";
  if(s<=par-2) return "#7effc0"; if(s===par-1) return "#4dd99a";
  if(s===par) return "transparent"; if(s===par+1) return "#ffd97d";
  return "#ff8888";
}
function scoreColor(s,par) {
  if(!s||s===0) return "#2a4455";
  if(s<=par-1) return "#0a1628"; if(s===par) return "#ddeeff";
  return "#0a1628";
}
function fmtPlusMinus(n) {
  if(n===0) return "E"; return n>0?`+${n}`:`${n}`;
}
function handicapDiff(score,rating,slope) {
  return ((score-rating)*113/slope).toFixed(1);
}
function emptyScores() {
  return Array.from({length:18},()=>({strokes:0,putts:0,gir:false}));
}

// ══════════════════════════════════════════════════════════════════════════════
// GPS PANEL (bottom sheet)
// ══════════════════════════════════════════════════════════════════════════════
function GPSPanel({ course, holeIdx, onHoleChange, onClose }) {
  const [gpsStatus,setGpsStatus]=useState("idle");
  const [position,setPosition]=useState(null);
  const [gpsError,setGpsError]=useState(null);
  const [pinMode,setPinMode]=useState("center");
  const [shots,setShots]=useState([]);
  const [tab,setTab]=useState("dist");
  const [flash,setFlash]=useState(false);
  const [simDist,setSimDist]=useState(165);
  const watchRef=useRef(null);
  const isPreview=true;

  const hole=course.holes[holeIdx];
  const dist=gpsStatus==="active"?(isPreview?simDist:null):null;
  const distF=dist?dist-12:null, distB=dist?dist+14:null;
  const pinDist=dist?(pinMode==="front"?distF:pinMode==="back"?distB:dist):null;
  const rec=pinDist?getBestClub(pinDist):null;
  const layups=pinDist&&pinDist>100
    ?CLUBS.filter(c=>c.carry<pinDist-15&&c.carry>=45).slice(-5).reverse().map(c=>({...c,leaves:pinDist-c.carry}))
    :[];

  const startGPS=()=>{
    setGpsStatus("requesting");
    if(isPreview){setTimeout(()=>setGpsStatus("active"),1000);return;}
    if(!navigator.geolocation){setGpsError("Not supported");setGpsStatus("error");return;}
    watchRef.current=navigator.geolocation.watchPosition(
      pos=>{
        const{latitude:lat,longitude:lng,accuracy}=pos.coords;
        setPosition({lat,lng,accuracy});setGpsStatus("active");setGpsError(null);
        const nearest=nearestHole(course,lat,lng);
        if(nearest)onHoleChange(nearest.hole-1);
      },
      err=>{setGpsError(err.message);setGpsStatus("error");},
      {enableHighAccuracy:true,maximumAge:3000,timeout:15000}
    );
  };
  const stopGPS=()=>{
    if(watchRef.current){navigator.geolocation.clearWatch(watchRef.current);watchRef.current=null;}
    setGpsStatus("idle");setPosition(null);
  };
  useEffect(()=>()=>stopGPS(),[]);

  const logShot=()=>{
    setShots(s=>[...s,{hole:hole.hole,dist:pinDist,time:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}]);
    setFlash(true);setTimeout(()=>setFlash(false),900);
  };

  const holeShots=shots.filter(s=>s.hole===hole.hole);

  return (
    <div style={gps.overlay} onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div style={gps.sheet}>
        {/* Drag handle */}
        <div style={gps.drag} />

        {/* Header */}
        <div style={gps.header}>
          <div style={gps.headerLeft}>
            <div style={gps.blip(gpsStatus)}/>
            <span style={gps.title}>GPS Caddie</span>
            {gpsStatus==="active"&&<span style={gps.acc}>{isPreview?"PREVIEW":"±8y"}</span>}
          </div>
          <button style={gps.closeX} onClick={onClose}>✕</button>
        </div>

        {/* Hole row */}
        <div style={gps.holeRow}>
          <button style={gps.hArr} onClick={()=>onHoleChange(Math.max(0,holeIdx-1))}>‹</button>
          <div style={gps.holeBox}>
            <div style={gps.hNum}>H{hole.hole}</div>
            <div style={gps.hMeta}>Par {hole.par} · {hole.yards}y · HCP {hole.hcp}</div>
          </div>
          <button style={gps.hArr} onClick={()=>onHoleChange(Math.min(17,holeIdx+1))}>›</button>
        </div>

        {/* Tabs */}
        <div style={gps.tabs}>
          {["dist","layup","shots"].map(t=>(
            <button key={t} style={gps.tabBtn(tab===t)} onClick={()=>setTab(t)}>
              {t==="dist"?"📍 Dist":t==="layup"?"🎯 Layup":`📋 Shots${holeShots.length?` (${holeShots.length})`:`(${shots.length})`}`}
            </button>
          ))}
        </div>

        {/* Body */}
        <div style={gps.body}>
          {gpsStatus!=="active"?(
            <div style={gps.startScreen}>
              {gpsStatus==="requesting"?(
                <div style={gps.acquiring}>
                  <div style={gps.spinnerRing}/>
                  <span style={{color:"#ffd97d",fontSize:14}}>Acquiring signal…</span>
                </div>
              ):(
                <>
                  <div style={gps.bigIcon}>📡</div>
                  <p style={gps.startMsg}>Live distances, club recs & shot tracking</p>
                  <button style={gps.startBtn} onClick={startGPS}>Start GPS</button>
                  {gpsStatus==="error"&&<p style={{color:"#ff8888",fontSize:12,marginTop:8}}>{gpsError}</p>}
                  <p style={gps.previewLabel}>Preview: use slider to simulate distance</p>
                </>
              )}
            </div>
          ):(
            <>
              {tab==="dist"&&(
                <div style={gps.distTab}>
                  <div style={gps.pinRow}>
                    {["front","center","back"].map(m=>(
                      <button key={m} style={gps.pinBtn(pinMode===m)} onClick={()=>{
                        setPinMode(m);
                        if(m==="front")setSimDist(s=>s-12<20?20:s-12);
                        else if(m==="back")setSimDist(s=>s+14>450?450:s+14);
                      }}>{m.charAt(0).toUpperCase()+m.slice(1)}</button>
                    ))}
                  </div>

                  <div style={gps.bigBlock}>
                    <div style={gps.bigNum}>{pinDist??simDist}</div>
                    <div style={gps.bigLbl}>yards to {pinMode}</div>
                  </div>

                  {rec&&(
                    <div style={gps.recRow}>
                      <div style={{...gps.recDot,background:rec.color}}/>
                      <span style={gps.recClub}>{rec.name}</span>
                      <span style={gps.recCarry}>{rec.carry}y 30th-pct</span>
                    </div>
                  )}

                  <div style={gps.fbRow}>
                    <div style={gps.fbCard} onClick={()=>{setPinMode("front");}}>
                      <div style={gps.fbNum}>{distF??simDist-12}</div>
                      <div style={gps.fbLbl}>Front</div>
                    </div>
                    <div style={gps.fbSep}/>
                    <div style={gps.fbCard} onClick={()=>{setPinMode("back");}}>
                      <div style={gps.fbNum}>{distB??simDist+14}</div>
                      <div style={gps.fbLbl}>Back</div>
                    </div>
                  </div>

                  {isPreview&&(
                    <div style={gps.simRow}>
                      <span style={gps.simLbl}>Simulate:</span>
                      <input type="range" min={20} max={430} value={simDist}
                        onChange={e=>setSimDist(Number(e.target.value))} style={gps.simSlider}/>
                      <span style={gps.simVal}>{simDist}y</span>
                    </div>
                  )}

                  <button style={flash?gps.logFlash:gps.logBtn} onClick={logShot}>
                    {flash?"✓ Shot Logged!":"📍 Log Shot Here"}
                  </button>
                  <button style={gps.stopBtn} onClick={()=>{stopGPS();}}>Stop GPS</button>
                </div>
              )}

              {tab==="layup"&&(
                <div style={gps.layupTab}>
                  <div style={gps.layupHead}>
                    <span style={gps.layupDist}>{pinDist??simDist}y</span>
                    <span style={gps.layupSub}>30th-pct layup targets</span>
                  </div>
                  {layups.length===0?(
                    <p style={gps.empty}>Too close — attack the pin!</p>
                  ):layups.map((l,i)=>(
                    <div key={i} style={gps.layRow}>
                      <div style={{...gps.layDot,background:l.color}}/>
                      <span style={gps.layClub}>{l.name}</span>
                      <span style={gps.layCarry}>{l.carry}y carry</span>
                      <span style={gps.layLeaves}>leaves <b style={{color:"#7effc0"}}>{l.leaves}y</b></span>
                    </div>
                  ))}
                  {isPreview&&(
                    <div style={gps.simRow}>
                      <span style={gps.simLbl}>Simulate:</span>
                      <input type="range" min={20} max={430} value={simDist}
                        onChange={e=>setSimDist(Number(e.target.value))} style={gps.simSlider}/>
                      <span style={gps.simVal}>{simDist}y</span>
                    </div>
                  )}
                  <button style={flash?gps.logFlash:gps.logBtn} onClick={logShot}>
                    {flash?"✓ Shot Logged!":"📍 Log Shot Here"}
                  </button>
                </div>
              )}

              {tab==="shots"&&(
                <div style={gps.shotsTab}>
                  <div style={gps.shotsHead}>H{hole.hole} — {holeShots.length} shot{holeShots.length!==1?"s":""}</div>
                  {holeShots.length===0?(
                    <p style={gps.empty}>No shots logged this hole.</p>
                  ):holeShots.map((s,i)=>(
                    <div key={i} style={gps.shotRow}>
                      <span style={gps.shotN}>#{i+1}</span>
                      <span style={gps.shotD}>{s.dist}y to pin</span>
                      <span style={gps.shotT}>{s.time}</span>
                    </div>
                  ))}
                  {shots.length>0&&(
                    <div style={{marginTop:16}}>
                      <div style={gps.shotsHead}>All Shots — {shots.length} total</div>
                      {shots.map((s,i)=>(
                        <div key={i} style={gps.shotRow}>
                          <span style={gps.shotN}>H{s.hole}</span>
                          <span style={gps.shotD}>{s.dist}y</span>
                          <span style={gps.shotT}>{s.time}</span>
                        </div>
                      ))}
                      <button style={gps.clearBtn} onClick={()=>setShots([])}>Clear All</button>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SCORECARD VIEW
// ══════════════════════════════════════════════════════════════════════════════
function ScorecardView({ course, scores }) {
  const front=course.holes.slice(0,9), back=course.holes.slice(9,18);
  const fPar=front.reduce((a,h)=>a+h.par,0);
  const bPar=back.reduce((a,h)=>a+h.par,0);
  const fScore=front.reduce((a,h,i)=>a+(scores[i].strokes||0),0);
  const bScore=back.reduce((a,h,i)=>a+(scores[i+9].strokes||0),0);
  const total=fScore+bScore, totalPar=fPar+bPar;
  const putts=scores.reduce((a,s)=>a+(s.putts||0),0);
  const gir=scores.filter(s=>s.gir).length;

  const Row=({holes,startIdx,label,parSum,scoreSum})=>(
    <div style={sc.group}>
      <div style={sc.groupLabel}>{label}</div>
      <div style={sc.row}>
        {holes.map((h,i)=>{
          const s=scores[startIdx+i];
          const diff=s.strokes&&s.strokes>0?s.strokes-h.par:null;
          return (
            <div key={i} style={sc.cell(s.strokes,h.par)}>
              <div style={sc.cellHole}>{h.hole}</div>
              <div style={sc.cellPar}>{h.par}</div>
              <div style={sc.cellScore(s.strokes,h.par)}>{s.strokes||"·"}</div>
              {diff!==null&&<div style={sc.cellDiff(diff)}>{diff>0?`+${diff}`:diff}</div>}
            </div>
          );
        })}
        <div style={sc.totalCell}>
          <div style={sc.cellHole}>TOT</div>
          <div style={sc.cellPar}>{parSum}</div>
          <div style={{...sc.cellScore(scoreSum,parSum),fontSize:14}}>{scoreSum||"—"}</div>
          <div style={sc.cellDiff(scoreSum-parSum)}>{scoreSum?fmtPlusMinus(scoreSum-parSum):"—"}</div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={sc.wrap}>
      <Row holes={front} startIdx={0} label="FRONT 9" parSum={fPar} scoreSum={fScore}/>
      <Row holes={back} startIdx={9} label="BACK 9" parSum={bPar} scoreSum={bScore}/>
      <div style={sc.summary}>
        <div style={sc.sumItem}><div style={sc.sumVal}>{total||"—"}</div><div style={sc.sumLbl}>Total</div></div>
        <div style={sc.sumItem}><div style={{...sc.sumVal,color:total&&total-totalPar>0?"#ff8888":total&&total-totalPar<0?"#7effc0":"#ffd97d"}}>{total?fmtPlusMinus(total-totalPar):"—"}</div><div style={sc.sumLbl}>vs Par</div></div>
        <div style={sc.sumItem}><div style={sc.sumVal}>{putts||"—"}</div><div style={sc.sumLbl}>Putts</div></div>
        <div style={sc.sumItem}><div style={sc.sumVal}>{gir}/18</div><div style={sc.sumLbl}>GIR</div></div>
        <div style={sc.sumItem}><div style={sc.sumVal}>{total?handicapDiff(total,course.rating,course.slope):"—"}</div><div style={sc.sumLbl}>Diff</div></div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// STATS VIEW
// ══════════════════════════════════════════════════════════════════════════════
function StatsView({ course, scores }) {
  const played=scores.filter(s=>s.strokes>0);
  if(played.length===0) return <p style={{color:"#2a4455",textAlign:"center",padding:40}}>Play some holes first!</p>;
  const total=scores.reduce((a,s)=>a+(s.strokes||0),0);
  const putts=scores.reduce((a,s)=>a+(s.putts||0),0);
  const gir=scores.filter(s=>s.gir).length;
  const totalPar=course.holes.slice(0,played.length).reduce((a,h)=>a+h.par,0);
  const toPar=total-totalPar;
  const pph=played.length>0?(putts/played.length).toFixed(1):0;
  const girPct=played.length>0?Math.round(gir/played.length*100):0;
  const bogeyPlus=played.filter((s,i)=>{const h=course.holes[scores.indexOf(s)];return h&&s.strokes>h.par+1;}).length;

  const bars=course.holes.map((h,i)=>({hole:h.hole,par:h.par,score:scores[i].strokes||0}))
    .filter(b=>b.score>0);

  return (
    <div style={st.wrap}>
      <div style={st.grid}>
        {[
          {v:total,l:"Gross Score",c:"#7effc0"},
          {v:fmtPlusMinus(toPar),l:"vs Par",c:toPar>0?"#ff8888":toPar<0?"#7effc0":"#ffd97d"},
          {v:putts,l:"Total Putts",c:"#74c0fc"},
          {v:pph,l:"Putts/Hole",c:"#74c0fc"},
          {v:`${girPct}%`,l:"GIR",c:"#a9e34b"},
          {v:played.length,l:"Holes",c:"#ddeeff"},
        ].map((item,i)=>(
          <div key={i} style={st.card}>
            <div style={{...st.cardVal,color:item.c}}>{item.v}</div>
            <div style={st.cardLbl}>{item.l}</div>
          </div>
        ))}
      </div>
      <div style={st.section}>Score vs Par by Hole</div>
      <div style={st.chart}>
        {bars.map((b,i)=>{
          const diff=b.score-b.par;
          const barH=Math.max(4,Math.abs(diff)*14+4);
          const color=diff<=-1?"#7effc0":diff===0?"#3d7080":diff===1?"#ffd97d":"#ff8888";
          return (
            <div key={i} style={st.barCol}>
              <div style={{...st.bar,height:barH,background:color}}/>
              <div style={st.barLbl}>{b.hole}</div>
            </div>
          );
        })}
      </div>
      <div style={st.legend}>
        {[["Eagle/Birdie","#7effc0"],["Par","#3d7080"],["Bogey","#ffd97d"],["Double+","#ff8888"]].map(([l,c])=>(
          <div key={l} style={st.legItem}><div style={{...st.legDot,background:c}}/><span>{l}</span></div>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN APP
// ══════════════════════════════════════════════════════════════════════════════
export default function FairwayLog() {
  const [screen,setScreen]=useState("home"); // home | round | scorecard | stats
  const [course,setCourse]=useState(null);
  const [scores,setScores]=useState(emptyScores());
  const [holeIdx,setHoleIdx]=useState(0);
  const [showGPS,setShowGPS]=useState(false);
  const [navTab,setNavTab]=useState("play"); // play | scorecard | stats

  const hole=course?.holes[holeIdx];
  const score=scores[holeIdx];
  const totalStroke=scores.reduce((a,s)=>a+(s.strokes||0),0);
  const totalPar=course?course.holes.slice(0,scores.filter(s=>s.strokes>0).length).reduce((a,h)=>a+h.par,0):0;
  const toPar=totalStroke-totalPar;
  const holesPlayed=scores.filter(s=>s.strokes>0).length;

  const adj=(field,delta)=>setScores(s=>s.map((h,i)=>i===holeIdx?{...h,[field]:Math.max(0,(h[field]||0)+delta)}:h));
  const toggleGIR=()=>setScores(s=>s.map((h,i)=>i===holeIdx?{...h,gir:!h.gir}:h));

  const startRound=(c)=>{setCourse(c);setScores(emptyScores());setHoleIdx(0);setScreen("round");setNavTab("play");};
  const endRound=()=>{setScreen("home");setCourse(null);};

  // ── HOME ──────────────────────────────────────────────────────────────────
  if(screen==="home") return (
    <div style={app.root}>
      <div style={app.homeHeader}>
        <div style={app.logo}>⛳</div>
        <h1 style={app.logoTitle}>FairwayLog</h1>
        <p style={app.logoSub}>South Shore · GPS Caddie</p>
      </div>
      <div style={app.section}>Start a Round</div>
      {Object.values(COURSES).map(c=>(
        <button key={c.name} style={app.courseCard} onClick={()=>startRound(c)}>
          <div style={app.ccLeft}>
            <div style={app.ccName}>{c.name}</div>
            <div style={app.ccMeta}>Par {c.par} · {c.rating}/{c.slope}</div>
          </div>
          <div style={app.ccRight}>▶</div>
        </button>
      ))}
      <div style={app.homeFooter}>
        <div style={app.footerStat}>📍 GPS Caddie</div>
        <div style={app.footerStat}>🎯 30th-pct Carries</div>
        <div style={app.footerStat}>📊 Live Stats</div>
      </div>
    </div>
  );

  // ── ROUND ─────────────────────────────────────────────────────────────────
  return (
    <div style={app.root}>
      {/* Top bar */}
      <div style={app.topBar}>
        <button style={app.topBack} onClick={endRound}>← End</button>
        <div style={app.topCenter}>
          <div style={app.topCourse}>{course.short}</div>
          <div style={app.topScore}>
            {totalStroke>0&&<span style={app.topStroke}>{totalStroke}</span>}
            {holesPlayed>0&&<span style={app.topPar(toPar)}> {fmtPlusMinus(toPar)}</span>}
            {totalStroke===0&&<span style={{color:"#2a4455"}}>0 holes</span>}
          </div>
        </div>
        <div style={app.topHoles}>{holesPlayed}/18</div>
      </div>

      {/* Hole strip */}
      <div style={app.holeStrip}>
        {course.holes.map((h,i)=>{
          const s=scores[i];
          const bg=scoreBg(s.strokes,h.par);
          const col=scoreColor(s.strokes,h.par);
          return (
            <button key={i} style={app.stripCell(i===holeIdx,bg)} onClick={()=>setHoleIdx(i)}>
              <div style={app.stripH}>{h.hole}</div>
              <div style={{...app.stripS,color:col,background:bg||"transparent"}}>{s.strokes||"·"}</div>
            </button>
          );
        })}
      </div>

      {/* Nav tabs */}
      <div style={app.navTabs}>
        {[["play","⛳ Play"],["scorecard","📋 Card"],["stats","📊 Stats"]].map(([t,l])=>(
          <button key={t} style={app.navTab(navTab===t)} onClick={()=>setNavTab(t)}>{l}</button>
        ))}
      </div>

      {/* PLAY TAB */}
      {navTab==="play"&&hole&&(
        <div style={app.playArea}>
          {/* Hole header */}
          <div style={app.holeHeader}>
            <button style={app.holeArrow} onClick={()=>setHoleIdx(i=>Math.max(0,i-1))}>‹</button>
            <div style={app.holeTitle}>
              <div style={app.holeTitleH}>Hole {hole.hole}</div>
              <div style={app.holeTitleMeta}>Par {hole.par} · {hole.yards}y · HCP {hole.hcp}</div>
            </div>
            <button style={app.holeArrow} onClick={()=>setHoleIdx(i=>Math.min(17,i+1))}>›</button>
            {/* GPS BUTTON */}
            <button style={app.gpsBtn} onClick={()=>setShowGPS(true)}>
              <span style={{fontSize:18}}>📍</span>
              <span style={app.gpsBtnTxt}>GPS</span>
            </button>
          </div>

          {/* Strokes */}
          <div style={app.inputCard}>
            <div style={app.inputRow}>
              <div style={app.inputLbl}>STROKES</div>
              <div style={app.counter}>
                <button style={app.cBtnMinus} onClick={()=>adj("strokes",-1)}>-</button>
                <div style={app.cNum(score.strokes,hole.par)}>{score.strokes||0}</div>
                <button style={app.cBtnPlus} onClick={()=>adj("strokes",1)}>+</button>
              </div>
              {score.strokes>0&&(
                <div style={app.scoreDiff(score.strokes-hole.par)}>
                  {fmtPlusMinus(score.strokes-hole.par)}
                </div>
              )}
            </div>

            <div style={app.divider}/>

            <div style={app.inputRow}>
              <div style={app.inputLbl}>PUTTS</div>
              <div style={app.counter}>
                <button style={app.cBtnMinus} onClick={()=>adj("putts",-1)}>-</button>
                <div style={app.cNum(null,null)}>{score.putts||0}</div>
                <button style={app.cBtnPlus} onClick={()=>adj("putts",1)}>+</button>
              </div>
              {score.putts>=3&&<div style={{color:"#ff8888",fontSize:12,fontWeight:700}}>3-putt</div>}
              {score.putts===1&&<div style={{color:"#7effc0",fontSize:12}}>1-putt</div>}
            </div>

            <div style={app.divider}/>

            <button style={app.girBtn(score.gir)} onClick={toggleGIR}>
              <span>{score.gir?"✓":""}</span> GIR {score.gir?"Yes":"No"}
            </button>
          </div>

          {/* Hole nav */}
          <div style={app.holeNav}>
            <button style={app.prevBtn} onClick={()=>setHoleIdx(i=>Math.max(0,i-1))}>← H{Math.max(1,hole.hole-1)}</button>
            {holeIdx<17?(
              <button style={app.nextBtn} onClick={()=>setHoleIdx(i=>i+1)}>H{hole.hole+1} →</button>
            ):(
              <button style={{...app.nextBtn,background:"linear-gradient(135deg,#ffd97d,#f4a932)"}}
                onClick={()=>setNavTab("scorecard")}>Finish →</button>
            )}
          </div>
        </div>
      )}

      {/* SCORECARD TAB */}
      {navTab==="scorecard"&&<ScorecardView course={course} scores={scores}/>}

      {/* STATS TAB */}
      {navTab==="stats"&&<StatsView course={course} scores={scores}/>}

      {/* GPS PANEL */}
      {showGPS&&(
        <GPSPanel
          course={course}
          holeIdx={holeIdx}
          onHoleChange={setHoleIdx}
          onClose={()=>setShowGPS(false)}
        />
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// STYLES
// ══════════════════════════════════════════════════════════════════════════════
const C={
  bg:"#07111e",bg2:"#0d1f30",bg3:"#0a1928",
  green:"#7effc0",green2:"#4dd99a",green3:"rgba(126,255,192,0.12)",
  yellow:"#ffd97d",red:"#ff8888",blue:"#74c0fc",
  text:"#ddeeff",dim:"#3d7080",dark:"#1a3040",
  border:"rgba(126,255,192,0.15)",borderFaint:"rgba(255,255,255,0.07)",
  font:"'DM Mono','Fira Mono',monospace",
};

const app={
  root:{minHeight:"100vh",background:`linear-gradient(160deg,${C.bg} 0%,${C.bg2} 60%,${C.bg3} 100%)`,color:C.text,fontFamily:C.font,maxWidth:430,margin:"0 auto",paddingBottom:40},
  homeHeader:{textAlign:"center",padding:"36px 16px 20px"},
  logo:{fontSize:48,marginBottom:4},
  logoTitle:{margin:0,fontSize:28,fontWeight:800,color:C.green,letterSpacing:-1},
  logoSub:{margin:"6px 0 0",fontSize:13,color:C.dim},
  section:{padding:"6px 16px 10px",fontSize:10,color:C.dim,textTransform:"uppercase",letterSpacing:2,fontWeight:600},
  courseCard:{display:"flex",alignItems:"center",margin:"0 12px 8px",padding:"14px 16px",background:"rgba(126,255,192,0.05)",border:`1px solid ${C.border}`,borderRadius:14,cursor:"pointer",width:"calc(100% - 24px)",textAlign:"left"},
  ccLeft:{flex:1},
  ccName:{fontSize:16,fontWeight:700,color:C.text},
  ccMeta:{fontSize:12,color:C.dim,marginTop:3},
  ccRight:{color:C.green,fontSize:18},
  homeFooter:{display:"flex",justifyContent:"center",gap:16,padding:"24px 16px",borderTop:`1px solid ${C.borderFaint}`,marginTop:12},
  footerStat:{fontSize:11,color:C.dim},

  topBar:{display:"flex",alignItems:"center",padding:"14px 12px 10px",borderBottom:`1px solid ${C.borderFaint}`},
  topBack:{background:"none",border:`1px solid ${C.borderFaint}`,color:C.dim,padding:"6px 10px",borderRadius:8,cursor:"pointer",fontSize:12,fontFamily:C.font},
  topCenter:{flex:1,textAlign:"center"},
  topCourse:{fontSize:11,color:C.dim},
  topScore:{display:"flex",alignItems:"baseline",justifyContent:"center",gap:6},
  topStroke:{fontSize:22,fontWeight:800,color:C.text},
  topPar:(n)=>({fontSize:14,fontWeight:700,color:n>0?C.red:n<0?C.green:C.yellow}),
  topHoles:{fontSize:12,color:C.dim,minWidth:32,textAlign:"right"},

  holeStrip:{display:"flex",overflowX:"auto",padding:"6px 8px",gap:2,borderBottom:`1px solid ${C.borderFaint}`,scrollbarWidth:"none"},
  stripCell:(active,bg)=>({minWidth:30,padding:"4px 2px",borderRadius:6,cursor:"pointer",border:active?`1px solid ${C.green}`:`1px solid transparent`,background:active?"rgba(126,255,192,0.1)":"transparent",display:"flex",flexDirection:"column",alignItems:"center",gap:1}),
  stripH:{fontSize:9,color:C.dim},
  stripS:{fontSize:12,fontWeight:700,width:22,height:22,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:4},

  navTabs:{display:"flex",borderBottom:`1px solid ${C.borderFaint}`},
  navTab:(a)=>({flex:1,padding:"11px 0",background:"none",border:"none",cursor:"pointer",color:a?C.green:C.dim,borderBottom:a?`2px solid ${C.green}`:"2px solid transparent",fontSize:12,fontFamily:C.font,fontWeight:a?700:400}),

  playArea:{padding:"0 12px"},
  holeHeader:{display:"flex",alignItems:"center",gap:8,padding:"14px 0 12px"},
  holeArrow:{width:34,height:34,background:C.green3,border:`1px solid ${C.border}`,color:C.green,fontSize:20,borderRadius:8,cursor:"pointer",flexShrink:0},
  holeTitle:{flex:1},
  holeTitleH:{fontSize:20,fontWeight:800,color:C.green},
  holeTitleMeta:{fontSize:11,color:C.dim,marginTop:2},
  gpsBtn:{display:"flex",flexDirection:"column",alignItems:"center",gap:1,background:C.green3,border:`1px solid ${C.border}`,borderRadius:10,padding:"8px 10px",cursor:"pointer",flexShrink:0},
  gpsBtnTxt:{fontSize:9,color:C.green,fontFamily:C.font,fontWeight:700,letterSpacing:1},

  inputCard:{background:"rgba(255,255,255,0.03)",border:`1px solid ${C.borderFaint}`,borderRadius:16,padding:"4px 16px 12px",marginBottom:12},
  inputRow:{display:"flex",alignItems:"center",gap:12,padding:"12px 0"},
  inputLbl:{fontSize:10,color:C.dim,width:58,letterSpacing:1.5,flexShrink:0},
  counter:{display:"flex",alignItems:"center",flex:1,gap:0},
  cBtnMinus:{width:40,height:40,background:"rgba(255,255,255,0.05)",border:`1px solid ${C.borderFaint}`,color:C.text,fontSize:20,borderRadius:"10px 0 0 10px",cursor:"pointer",fontFamily:C.font},
  cBtnPlus:{width:40,height:40,background:C.green3,border:`1px solid ${C.border}`,color:C.green,fontSize:20,borderRadius:"0 10px 10px 0",cursor:"pointer",fontFamily:C.font},
  cNum:(s,par)=>({flex:1,textAlign:"center",fontSize:30,fontWeight:800,color:!s||s===0?C.text:s<par?C.green:s===par?C.text:s===par+1?C.yellow:C.red,background:"rgba(0,0,0,0.2)",height:40,display:"flex",alignItems:"center",justifyContent:"center"}),
  scoreDiff:(d)=>({fontSize:13,fontWeight:700,color:d<0?C.green:d===0?C.dim:d===1?C.yellow:C.red,minWidth:28,textAlign:"right"}),
  divider:{height:1,background:C.borderFaint,margin:"0 -4px"},
  girBtn:(on)=>({width:"100%",marginTop:8,padding:"9px 0",background:on?C.green3:"transparent",border:`1px solid ${on?C.border:C.borderFaint}`,borderRadius:8,color:on?C.green:C.dim,fontSize:12,fontFamily:C.font,cursor:"pointer",fontWeight:on?700:400}),

  holeNav:{display:"flex",gap:8,marginTop:4},
  prevBtn:{flex:1,padding:"11px 0",background:"rgba(255,255,255,0.04)",border:`1px solid ${C.borderFaint}`,borderRadius:10,color:C.dim,fontSize:13,fontFamily:C.font,cursor:"pointer"},
  nextBtn:{flex:2,padding:"11px 0",background:"linear-gradient(135deg,rgba(126,255,192,0.2),rgba(77,217,154,0.1))",border:`1px solid ${C.border}`,borderRadius:10,color:C.green,fontSize:13,fontWeight:700,fontFamily:C.font,cursor:"pointer"},
};

const sc={
  wrap:{padding:"12px"},
  group:{marginBottom:12},
  groupLabel:{fontSize:9,color:C.dim,letterSpacing:2,textTransform:"uppercase",marginBottom:6,fontWeight:600},
  row:{display:"flex",gap:2},
  cell:(s,par)=>({flex:1,background:"rgba(255,255,255,0.03)",borderRadius:6,padding:"4px 0",textAlign:"center",border:`1px solid ${s>0?scoreBg(s,par)!="transparent"?"rgba(0,0,0,0.2)":C.borderFaint:C.borderFaint}`,backgroundColor:s>0?scoreBg(s,par):"rgba(255,255,255,0.03)"}),
  totalCell:{minWidth:38,background:"rgba(126,255,192,0.08)",borderRadius:6,padding:"4px 0",textAlign:"center",border:`1px solid ${C.border}`},
  cellHole:{fontSize:8,color:C.dim},
  cellPar:{fontSize:9,color:C.dim},
  cellScore:(s,par)=>({fontSize:12,fontWeight:700,color:scoreColor(s,par)}),
  cellDiff:(d)=>({fontSize:8,color:d<0?C.green:d===0?C.dim:d===1?C.yellow:C.red}),
  summary:{display:"flex",background:"rgba(255,255,255,0.03)",border:`1px solid ${C.borderFaint}`,borderRadius:12,padding:"12px 0",marginTop:4},
  sumItem:{flex:1,textAlign:"center"},
  sumVal:{fontSize:18,fontWeight:700,color:C.text},
  sumLbl:{fontSize:10,color:C.dim,marginTop:2},
};

const st={
  wrap:{padding:"12px"},
  grid:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:16},
  card:{background:"rgba(255,255,255,0.03)",border:`1px solid ${C.borderFaint}`,borderRadius:12,padding:"12px 8px",textAlign:"center"},
  cardVal:{fontSize:22,fontWeight:800},
  cardLbl:{fontSize:10,color:C.dim,marginTop:3},
  section:{fontSize:10,color:C.dim,letterSpacing:2,textTransform:"uppercase",marginBottom:10,fontWeight:600},
  chart:{display:"flex",alignItems:"flex-end",gap:3,height:60,padding:"0 4px 0",borderBottom:`1px solid ${C.borderFaint}`},
  barCol:{display:"flex",flexDirection:"column",alignItems:"center",flex:1,gap:3},
  bar:{flex:"none",borderRadius:"2px 2px 0 0",minWidth:6,transition:"height 0.3s"},
  barLbl:{fontSize:8,color:C.dim},
  legend:{display:"flex",gap:12,justifyContent:"center",padding:"8px 0",flexWrap:"wrap"},
  legItem:{display:"flex",alignItems:"center",gap:4,fontSize:10,color:C.dim},
  legDot:{width:8,height:8,borderRadius:"50%"},
};

const gps={
  overlay:{position:"fixed",inset:0,background:"rgba(0,0,0,0.75)",backdropFilter:"blur(8px)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:999},
  sheet:{width:"100%",maxWidth:430,background:`linear-gradient(160deg,#0d1f32 0%,${C.bg3} 100%)`,border:`1px solid ${C.border}`,borderRadius:"20px 20px 0 0",maxHeight:"88vh",overflowY:"auto",paddingBottom:32},
  drag:{width:40,height:4,background:"rgba(255,255,255,0.15)",borderRadius:2,margin:"10px auto 0"},
  header:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 16px 10px",borderBottom:`1px solid ${C.borderFaint}`},
  headerLeft:{display:"flex",alignItems:"center",gap:8},
  blip:(s)=>({width:8,height:8,borderRadius:"50%",background:s==="active"?C.green:s==="requesting"?C.yellow:"#2a4455",boxShadow:s==="active"?`0 0 8px ${C.green}`:"none"}),
  title:{fontSize:16,fontWeight:700,color:C.green},
  acc:{fontSize:10,color:C.dim,background:"rgba(0,0,0,0.3)",padding:"2px 6px",borderRadius:6},
  closeX:{background:"rgba(255,255,255,0.06)",border:`1px solid ${C.borderFaint}`,color:C.dim,width:30,height:30,borderRadius:8,cursor:"pointer",fontSize:13},
  holeRow:{display:"flex",alignItems:"center",justifyContent:"center",gap:16,padding:"12px 16px 6px"},
  hArr:{width:34,height:34,background:C.green3,border:`1px solid ${C.border}`,color:C.green,fontSize:20,borderRadius:8,cursor:"pointer"},
  holeBox:{textAlign:"center",minWidth:100},
  hNum:{fontSize:26,fontWeight:800,color:C.green,lineHeight:1},
  hMeta:{fontSize:11,color:C.dim,marginTop:3},
  tabs:{display:"flex",borderBottom:`1px solid ${C.borderFaint}`},
  tabBtn:(a)=>({flex:1,padding:"9px 4px",background:"none",border:"none",cursor:"pointer",color:a?C.green:C.dim,borderBottom:a?`2px solid ${C.green}`:"2px solid transparent",fontSize:11,fontFamily:C.font,fontWeight:a?700:400}),
  body:{padding:"0"},

  startScreen:{display:"flex",flexDirection:"column",alignItems:"center",padding:"28px 16px",gap:8},
  bigIcon:{fontSize:40},
  startMsg:{color:C.dim,fontSize:13,margin:"0 0 6px",textAlign:"center"},
  startBtn:{background:`linear-gradient(135deg,${C.green},${C.green2})`,color:"#0a1628",border:"none",borderRadius:12,padding:"13px 36px",fontSize:15,fontWeight:700,fontFamily:C.font,cursor:"pointer"},
  previewLabel:{color:"#1e3040",fontSize:11,margin:0},
  acquiring:{display:"flex",alignItems:"center",gap:10},
  spinnerRing:{width:20,height:20,border:"2px solid rgba(255,217,125,0.2)",borderTop:`2px solid ${C.yellow}`,borderRadius:"50%",animation:"spin 0.8s linear infinite"},

  distTab:{padding:"10px 16px 0"},
  pinRow:{display:"flex",justifyContent:"center",gap:6,marginBottom:10},
  pinBtn:(a)=>({padding:"5px 14px",borderRadius:20,cursor:"pointer",background:a?C.green:"rgba(126,255,192,0.07)",color:a?"#0a1628":C.green,border:a?"none":`1px solid ${C.border}`,fontSize:12,fontWeight:a?700:400,fontFamily:C.font}),
  bigBlock:{textAlign:"center",margin:"4px 0 8px"},
  bigNum:{fontSize:76,fontWeight:800,color:C.green,lineHeight:1},
  bigLbl:{fontSize:13,color:C.dim},
  recRow:{display:"flex",alignItems:"center",gap:8,justifyContent:"center",background:"rgba(255,217,125,0.07)",border:"1px solid rgba(255,217,125,0.2)",borderRadius:20,padding:"7px 16px",margin:"0 0 10px"},
  recDot:{width:10,height:10,borderRadius:"50%"},
  recClub:{fontSize:15,fontWeight:700,color:C.yellow},
  recCarry:{fontSize:12,color:C.dim},
  fbRow:{display:"flex",background:"rgba(255,255,255,0.03)",border:`1px solid ${C.borderFaint}`,borderRadius:12,marginBottom:10,cursor:"pointer"},
  fbCard:{flex:1,textAlign:"center",padding:"12px 0"},
  fbSep:{width:1,background:C.borderFaint},
  fbNum:{fontSize:24,fontWeight:700,color:C.text},
  fbLbl:{fontSize:11,color:C.dim,marginTop:2},
  simRow:{display:"flex",alignItems:"center",gap:8,marginBottom:10,background:"rgba(0,0,0,0.2)",borderRadius:8,padding:"7px 10px"},
  simLbl:{fontSize:10,color:"#1e3040",whiteSpace:"nowrap"},
  simSlider:{flex:1,accentColor:C.green},
  simVal:{fontSize:12,color:C.dim,minWidth:32,textAlign:"right"},
  logBtn:{display:"block",width:"100%",background:`linear-gradient(135deg,${C.green},${C.green2})`,color:"#0a1628",border:"none",borderRadius:12,padding:"13px 0",fontSize:14,fontWeight:700,fontFamily:C.font,cursor:"pointer",marginBottom:6},
  logFlash:{display:"block",width:"100%",background:"linear-gradient(135deg,#ffd97d,#f4a932)",color:"#0a1628",border:"none",borderRadius:12,padding:"13px 0",fontSize:14,fontWeight:700,fontFamily:C.font,cursor:"pointer",marginBottom:6},
  stopBtn:{display:"block",width:"100%",background:"rgba(255,100,100,0.07)",color:"#ff8888",border:"1px solid rgba(255,100,100,0.2)",borderRadius:12,padding:"9px 0",fontSize:12,fontFamily:C.font,cursor:"pointer"},

  layupTab:{padding:"12px 16px 0"},
  layupHead:{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:10},
  layupDist:{fontSize:18,fontWeight:700,color:C.green},
  layupSub:{fontSize:11,color:C.dim},
  layRow:{display:"flex",alignItems:"center",gap:8,background:"rgba(255,255,255,0.03)",borderRadius:10,padding:"10px 12px",marginBottom:6},
  layDot:{width:9,height:9,borderRadius:"50%",flexShrink:0},
  layClub:{width:52,fontSize:14,fontWeight:700,color:C.text},
  layCarry:{flex:1,fontSize:13,color:C.green},
  layLeaves:{fontSize:12,color:C.dim},
  empty:{color:C.dim,textAlign:"center",fontSize:13,padding:"20px 0"},

  shotsTab:{padding:"12px 16px 0"},
  shotsHead:{fontSize:10,color:C.dim,textTransform:"uppercase",letterSpacing:1.5,marginBottom:8,fontWeight:600},
  shotRow:{display:"flex",alignItems:"center",gap:8,padding:"9px 12px",background:"rgba(255,255,255,0.03)",borderRadius:8,marginBottom:5},
  shotN:{color:C.dim,fontSize:12,width:28},
  shotD:{flex:1,color:C.green,fontWeight:600,fontSize:14},
  shotT:{color:"#1e3040",fontSize:11},
  clearBtn:{display:"block",width:"100%",marginTop:8,background:"rgba(255,100,100,0.07)",color:"#ff8888",border:"1px solid rgba(255,100,100,0.2)",borderRadius:10,padding:"9px 0",fontSize:12,fontFamily:C.font,cursor:"pointer"},
};
