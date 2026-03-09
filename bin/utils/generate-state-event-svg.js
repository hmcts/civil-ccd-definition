#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const model = JSON.parse(fs.readFileSync('build/state-event-model.json', 'utf8'));

// Build set of event IDs that have entries on the email-notifications page
const NOTIF_PAGE = 'https://hmcts.github.io/civil-service/email-notifications.html';
const notifPageEvents = new Set();
// Usage: node generate-state-event-svg.js [civil-service-path]
const civilServiceRoot = process.argv[2]
  ? path.resolve(process.cwd(), process.argv[2])
  : path.resolve(process.cwd(), '..', 'civil-service');
const notifHtmlPath = path.join(civilServiceRoot, 'docs', 'email-notifications.html');
if (fs.existsSync(notifHtmlPath)) {
  const html = fs.readFileSync(notifHtmlPath, 'utf8');
  const re = /<option value='([^']+)'>/g;
  let m;
  while ((m = re.exec(html)) !== null) notifPageEvents.add(m[1]);
  console.log(`Notification page events loaded: ${notifPageEvents.size}`);
} else {
  console.warn('email-notifications.html not found, links will be disabled');
}

// Layout constants
const COL_W = 320, PILL_W = 300, PILL_H = 22, PILL_GAP = 3, PILL_R = 8;
const DEST_ROW_H = 14; // extra height per destination row
const COL_GAP = 16, HDR_H = 44, PAD = 40, FONT = 7.5;
const TOTAL_COL = COL_W + COL_GAP;

// State ordering matching the PDF
const MAIN_FLOW = [
  'PENDING_CASE_ISSUED','CASE_ISSUED','AWAITING_CASE_DETAILS_NOTIFICATION',
  'AWAITING_RESPONDENT_ACKNOWLEDGEMENT','AWAITING_APPLICANT_INTENTION',
  'IN_MEDIATION','JUDICIAL_REFERRAL','CASE_PROGRESSION',
  'HEARING_READINESS','PREPARE_FOR_HEARING_CONDUCT_HEARING',
  'DECISION_OUTCOME','All_FINAL_ORDERS_ISSUED'
];
const EXCEPTION_FLOW = [
  'CASE_DISMISSED','PROCEEDS_IN_HERITAGE_SYSTEM',
  'CASE_SETTLED','CASE_STAYED','CLOSED','CASE_DISCONTINUED'
];

const HEADER_BG = '#1f4e79', HEADER_TEXT = '#ffc000';
const CAMUNDA_BG = '#d9d9d9', USER_BG = '#ffd966';
const SYSTEM_BG = '#cce0f5', TESTING_BG = '#fff2cc';
const DEST_BG = '#e8f0fe', DEST_TEXT = '#1a56db';

// Full state names for destination badges (no shortening needed at 320px columns)
const SHORT = {};
model.states.forEach(s => { SHORT[s.id] = s.id; });
SHORT['*'] = '*';

const globalIds = new Set(
  model.events.filter(e =>
    e.preStates.length === 1 && e.preStates[0] === '*' && e.postState === '*'
  ).map(e => e.id)
);

// Case creation events — only shown in their target state column, not everywhere
const CASE_CREATION_IDS = new Set(['CREATE_CLAIM', 'CREATE_CLAIM_SPEC', 'CREATE_LIP_CLAIM']);

function getStateEvents(stateId) {
  const events = model.events.filter(e => {
    if (globalIds.has(e.id)) return false;
    if (CASE_CREATION_IDS.has(e.id)) return false; // shown in dedicated column
    return e.preStates.includes(stateId) || e.preStates.includes('*');
  });
  // Deduplicate by event ID (same event can appear from prod + non-prod source files)
  const seen = new Set();
  return events.filter(e => {
    if (seen.has(e.id)) return false;
    seen.add(e.id);
    return true;
  });
}

function esc(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

function pillBg(ev) {
  if (ev.sourceType === 'user') return USER_BG;
  if (ev.sourceType === 'testing') return TESTING_BG;
  if (ev.name.startsWith('Email:') || ev.name.startsWith('System Event')) return SYSTEM_BG;
  return CAMUNDA_BG;
}

// Pre-state validity: which resolved transitions apply from which pre-states.
// If an event is listed here, only the specified pre-states show its resolved badges;
// from other pre-states, it shows as "stays" (no state change).
const VALID_FROM = {
  FEE_PAYMENT_OUTCOME: ['PENDING_CASE_ISSUED'],  // HEARING_READINESS path only sends notifications
};

// Condition labels for decision-gated state transitions (extracted from Java handlers)
const CONDITION_LABELS = {
  FEE_PAYMENT_OUTCOME: {
    CASE_ISSUED: 'HWF claim issued, defendant represented',
    PROCEEDS_IN_HERITAGE_SYSTEM: 'Defendant unrepresented/unregistered',
  },
  DEFENDANT_RESPONSE: {
    AWAITING_APPLICANT_INTENTION: 'All defendants have responded',
    PROCEEDS_IN_HERITAGE_SYSTEM: 'Divergent responses (via BPMN)',
  },
  CITIZEN_CLAIM_ISSUE_PAYMENT: {
    CASE_ISSUED: 'Payment OK, defendant represented',
    PROCEEDS_IN_HERITAGE_SYSTEM: 'Defendant unrepresented/unregistered',
  },
  CLAIMANT_RESPONSE_SPEC: {
    JUDICIAL_REFERRAL: 'Full defence, applicant proceeds',
    IN_MEDIATION: 'Both parties agreed to mediation',
    PROCEEDS_IN_HERITAGE_SYSTEM: 'Repayment plan rejected by claimant',
    CASE_SETTLED: 'Part-admit claim settled',
    CASE_STAYED: 'LiP v LiP, claimant won\'t proceed',
    AWAITING_APPLICANT_INTENTION: 'MINTI LiP or Welsh translation needed',
  },
  DEFENDANT_RESPONSE_SPEC: {
    AWAITING_APPLICANT_INTENTION: 'Non-divergent, all responded',
    PROCEEDS_IN_HERITAGE_SYSTEM: 'Divergent or non-full-defence (multi)',
  },
};

function getDestInfo(ev, stateId) {
  const resolved = ev.resolvedPostStates || [];
  const hasResolvedChange = resolved.length > 0 && resolved[0] !== 'NO_CHANGE';
  const isNoChange = resolved.length === 1 && resolved[0] === 'NO_CHANGE';
  const dest = ev.postState;
  const showDest = (dest !== '*' && dest !== stateId) || hasResolvedChange;

  if (showDest && hasResolvedChange) {
    // Check if resolved transitions are only valid from specific pre-states
    const validFrom = VALID_FROM[ev.id];
    if (validFrom && !validFrom.includes(stateId)) {
      return { type: 'stays' };  // transitions don't apply from this state
    }
    const conditions = CONDITION_LABELS[ev.id] || {};
    return {
      type: 'resolved',
      labels: resolved.map(s => SHORT[s] || s),
      conditions: resolved.map(s => conditions[s] || ''),
      bg: '#e6f4ea', fg: '#137333'
    };
  } else if (showDest) {
    return { type: 'static', labels: [SHORT[dest] || dest], bg: DEST_BG, fg: DEST_TEXT };
  } else if (dest === '*' && isNoChange) {
    return { type: 'stays' };
  } else if (dest === '*') {
    return { type: 'unknown' };
  }
  return { type: 'none' };
}

function sourceGroup(ev) {
  if (ev.sourceType === 'user') return 0;
  if (ev.sourceType === 'testing') return 3;
  if (ev.name.startsWith('Email:') || ev.name.startsWith('System Event')) return 2;
  return 1; // camunda/system
}

// Derive a human-readable suffix from an event ID to distinguish same-name events.
// e.g. PROCESS_CLAIM_ISSUE_SPEC → "Spec", DEFENDANT_RESPONSE_CUI → "CUI",
//      EVIDENCE_UPLOAD_APPLICANT → "Applicant", SETTLE_CLAIM_MARK_PAID_FULL → "Mark Paid Full"
function deriveSuffix(id, baseName, allIds) {
  // Known suffix patterns — try to extract meaningful tail from the ID
  const suffixPatterns = [
    { re: /_SPEC_/i, label: 'Spec' },       // SPEC anywhere (e.g. CREATE_CLAIM_SPEC_AFTER_PAYMENT)
    { re: /_SPEC$/i, label: 'Spec' },
    { re: /_CUI$/i, label: 'CUI' },
    { re: /_COSC$/i, label: 'COSC' },
    { re: /_LIP$/i, label: 'LiP' },
    { re: /_APPLICANT$/i, label: 'Applicant' },
    { re: /_RESPONDENT$/i, label: 'Respondent' },
    { re: /_CLAIMANT$/i, label: 'Claimant' },
    { re: /_DEFENDANT$/i, label: 'Defendant' },
    { re: /_MARK_PAID_FULL$/i, label: 'Mark Paid Full' },
  ];
  for (const { re, label } of suffixPatterns) {
    if (re.test(id)) return label;
  }
  // Fallback: find the longest common prefix among all IDs sharing this name,
  // then use the remaining tail as the suffix
  const commonPrefix = allIds.reduce((prefix, otherId) => {
    let i = 0;
    while (i < prefix.length && i < otherId.length && prefix[i] === otherId[i]) i++;
    return prefix.substring(0, i);
  }, id);
  let tail = id.substring(commonPrefix.length).replace(/^_/, '');
  if (tail) return tail.split('_').map(w => w.charAt(0) + w.slice(1).toLowerCase()).join(' ');
  // Last resort: abbreviate the ID — take last 2 segments
  const parts = id.split('_');
  if (parts.length >= 2) return parts.slice(-2).map(w => w.charAt(0) + w.slice(1).toLowerCase()).join(' ');
  return id;
}

// For a list of events, compute display names — appending a suffix for duplicates
function computeDisplayNames(events) {
  const nameGroups = {};
  for (const ev of events) {
    if (!nameGroups[ev.name]) nameGroups[ev.name] = [];
    nameGroups[ev.name].push(ev);
  }
  const displayNames = new Map();
  for (const [name, evs] of Object.entries(nameGroups)) {
    if (evs.length === 1) {
      displayNames.set(evs[0].id, name);
    } else {
      const allIds = evs.map(e => e.id);
      // First pass: compute raw suffixes
      const suffixes = new Map();
      for (const ev of evs) {
        suffixes.set(ev.id, deriveSuffix(ev.id, name, allIds));
      }
      // Known clean suffixes — if all siblings except one have a clean suffix,
      // the remaining one gets labelled "Unspec" (or the base variant)
      const KNOWN_SUFFIXES = new Set([
        'Spec', 'CUI', 'COSC', 'LiP',
        'Applicant', 'Respondent', 'Claimant', 'Defendant',
        'Mark Paid Full',
      ]);
      const knownCount = [...suffixes.values()].filter(s => KNOWN_SUFFIXES.has(s)).length;
      if (knownCount > 0) {
        for (const ev of evs) {
          if (!KNOWN_SUFFIXES.has(suffixes.get(ev.id))) {
            suffixes.set(ev.id, 'Unspec');
          }
        }
      }
      for (const ev of evs) {
        displayNames.set(ev.id, `${name} (${suffixes.get(ev.id)})`);
      }
    }
  }
  return displayNames;
}

function renderColumn(stateId, x, y) {
  const state = model.states.find(s => s.id === stateId);
  const allEvents = getStateEvents(stateId);

  // Split into explicit (state listed in preStates) and wildcard (* in preStates)
  const isWildcard = ev => ev.preStates.includes('*');

  // Events transitioning to the next natural state sort to the top
  const nextStateIdx = MAIN_FLOW.indexOf(stateId);
  const nextState = nextStateIdx >= 0 && nextStateIdx < MAIN_FLOW.length - 1
    ? MAIN_FLOW[nextStateIdx + 1] : null;

  function transitionsToNext(ev) {
    if (!nextState) return false;
    if (ev.postState === nextState) return true;
    const resolved = ev.resolvedPostStates || [];
    return resolved.includes(nextState);
  }

  const sortWithin = (a, b) => {
    // Events transitioning to next state first
    const aNext = transitionsToNext(a) ? 0 : 1;
    const bNext = transitionsToNext(b) ? 0 : 1;
    if (aNext !== bNext) return aNext - bNext;
    // Then by source group
    const ga = sourceGroup(a), gb = sourceGroup(b);
    if (ga !== gb) return ga - gb;
    return a.name.localeCompare(b.name);
  };
  const explicit = allEvents.filter(e => !isWildcard(e)).sort(sortWithin);
  const wildcard = allEvents.filter(e => isWildcard(e)).sort(sortWithin);
  const hasBothGroups = explicit.length > 0 && wildcard.length > 0;

  // Compute display names — disambiguate same-name events within this column
  const displayNames = computeDisplayNames(allEvents);

  const pillX = x + (COL_W - PILL_W) / 2;

  // Pre-calculate total height (some events need extra rows for destination badges)
  let totalBodyH = PILL_GAP;
  const eventLayout = [];

  function layoutEvents(events) {
    for (const ev of events) {
      const info = getDestInfo(ev, stateId);
      const conditions = info.conditions || [];
      let destH = 0;
      if (info.type === 'resolved' || info.type === 'static') {
        for (let d = 0; d < info.labels.length; d++) {
          destH += conditions[d] ? 24 : DEST_ROW_H;
        }
      }
      const extraH = destH > 0 ? destH + 2 : 0;
      const rowH = PILL_H + extraH + PILL_GAP;
      const yOff = totalBodyH;
      totalBodyH += rowH;
      eventLayout.push({ ev, info, yOff, extraH });
    }
  }

  layoutEvents(explicit);

  // Wildcard group in its own box
  let wcBoxYOff = -1, wcBoxH = 0;
  const WC_LABEL_H = 12; // height for the "Wildcard (*)" label
  const WC_PAD = 4;      // padding inside the box
  if (hasBothGroups) {
    totalBodyH += PILL_GAP;
    wcBoxYOff = totalBodyH;
    totalBodyH += WC_LABEL_H + WC_PAD;
    layoutEvents(wildcard);
    totalBodyH += WC_PAD;
    wcBoxH = totalBodyH - wcBoxYOff;
  } else {
    layoutEvents(wildcard);
  }
  totalBodyH += PILL_GAP;

  const colH = HDR_H + totalBodyH;
  let svg = '';

  // Column background
  svg += `<rect x="${x}" y="${y}" width="${COL_W}" height="${colH}" rx="4" fill="white" stroke="#ccc"/>`;
  // Header
  svg += `<rect x="${x}" y="${y}" width="${COL_W}" height="${HDR_H}" rx="4" fill="${HEADER_BG}"/>`;
  svg += `<rect x="${x}" y="${y+HDR_H-6}" width="${COL_W}" height="6" fill="${HEADER_BG}"/>`;
  svg += `<text x="${x+COL_W/2}" y="${y+17}" text-anchor="middle" font-size="8.5" font-weight="bold" fill="${HEADER_TEXT}" font-family="Arial">${esc(stateId)}</text>`;
  svg += `<text x="${x+COL_W/2}" y="${y+33}" text-anchor="middle" font-size="7.5" fill="white" font-family="Arial">${esc(state ? state.name : '')}</text>`;

  // Wildcard events box
  if (wcBoxYOff >= 0) {
    const bx = x + 4, by = y + HDR_H + wcBoxYOff;
    const bw = COL_W - 8;
    svg += `<rect x="${bx}" y="${by}" width="${bw}" height="${wcBoxH}" rx="4" fill="#f5f5f5" stroke="#aaa" stroke-width="0.5" stroke-dasharray="4,2"/>`;
    svg += `<text x="${bx + bw/2}" y="${by + 10}" text-anchor="middle" font-size="6" font-weight="bold" fill="#888" font-family="Arial">Wildcard (*) events</text>`;
  }

  // Event pills
  for (const { ev, info, yOff } of eventLayout) {
    const py = y + HDR_H + yOff;
    const bg = pillBg(ev);

    // Pill background + event name (with suffix for duplicates)
    const displayName = displayNames.get(ev.id) || ev.name;
    const hasNotifLink = notifPageEvents.has(ev.id.toLowerCase());
    svg += `<rect x="${pillX}" y="${py}" width="${PILL_W}" height="${PILL_H}" rx="${PILL_R}" fill="${bg}" stroke="#bbb" stroke-width="0.5"/>`;
    svg += `<text x="${pillX+8}" y="${py+PILL_H/2+3}" font-size="${FONT}" fill="#333" font-family="Arial">${esc(displayName)}</text>`;

    // Notification link icon (envelope)
    if (hasNotifLink) {
      // Shift left if enabling condition icon is also present
      const hasEC = !!ev.enablingCondition;
      const hasRightTag = info.type === 'stays' || info.type === 'unknown';
      const tagWidth = info.type === 'stays' ? 36 : info.type === 'unknown' ? 18 : 0;
      const ecShift = hasEC ? 16 : 0;
      const tagShift = hasRightTag ? tagWidth : 0;
      const envX = pillX + PILL_W - 16 - ecShift - tagShift;
      const envY = py + (PILL_H - 12) / 2;
      svg += `<a href="${NOTIF_PAGE}#${ev.id.toLowerCase()}" target="_blank">`;
      svg += `<g cursor="pointer">`;
      svg += `<rect x="${envX}" y="${envY}" width="12" height="12" rx="3" fill="#e8f0fe" stroke="#1a56db" stroke-width="0.5"/>`;
      svg += `<text x="${envX+6}" y="${envY+9}" text-anchor="middle" font-size="8" fill="#1a56db" font-family="Arial">\u2709</text>`;
      svg += `<title>View notifications for ${esc(ev.id)}</title>`;
      svg += `</g>`;
      svg += `</a>`;
    }

    // Enabling condition icon with hover tooltip
    // Position shifts left if a stays/unknown tag occupies the right edge
    if (ev.enablingCondition) {
      const hasRightTag = info.type === 'stays' || info.type === 'unknown';
      const tagWidth = info.type === 'stays' ? 36 : info.type === 'unknown' ? 18 : 0;
      const icX = pillX + PILL_W - 16 - (hasRightTag ? tagWidth : 0);
      const icY = py + (PILL_H - 12) / 2;
      svg += `<g cursor="pointer">`;
      svg += `<rect x="${icX}" y="${icY}" width="12" height="12" rx="3" fill="#fff3e0" stroke="#e6a817" stroke-width="0.5"/>`;
      svg += `<text x="${icX+6}" y="${icY+9}" text-anchor="middle" font-size="7" fill="#8a6d00" font-family="Arial">\u26A1</text>`;
      svg += `<title>${esc(ev.enablingCondition)}</title>`;
      svg += `</g>`;
    }

    if (info.type === 'resolved' || info.type === 'static') {
      // Render each destination as a badge; taller with condition text inside
      const conditions = info.conditions || [];
      let curY = py + PILL_H + 2;
      for (let d = 0; d < info.labels.length; d++) {
        const hasCond = !!conditions[d];
        const badgeW = PILL_W - 16;
        const badgeH = hasCond ? 22 : DEST_ROW_H - 2;
        svg += `<rect x="${pillX+8}" y="${curY}" width="${badgeW}" height="${badgeH}" rx="3" fill="${info.bg}" stroke="${info.fg}" stroke-width="0.5"/>`;
        // State name (top line)
        const textY = hasCond ? curY + 10 : curY + badgeH / 2 + 3;
        svg += `<text x="${pillX+16}" y="${textY}" font-size="7" fill="${info.fg}" font-family="Arial" font-weight="bold">\u2192 ${esc(info.labels[d])}</text>`;
        // Condition label (second line inside badge, italic)
        if (hasCond) {
          svg += `<text x="${pillX+20}" y="${curY+19}" font-size="5.5" fill="#555" font-family="Arial" font-style="italic">${esc(conditions[d])}</text>`;
        }
        curY += hasCond ? 24 : DEST_ROW_H;
      }
    } else if (info.type === 'stays') {
      const tagX = pillX + PILL_W - 36, tagY = py + (PILL_H - 14) / 2;
      svg += `<rect x="${tagX}" y="${tagY}" width="32" height="14" rx="4" fill="#f0f0f0" stroke="#ccc" stroke-width="0.5"/>`;
      svg += `<text x="${tagX+16}" y="${tagY+10}" text-anchor="middle" font-size="6.5" fill="#999" font-family="Arial">stays</text>`;
    } else if (info.type === 'unknown') {
      const tagX = pillX + PILL_W - 18, tagY = py + (PILL_H - 14) / 2;
      svg += `<rect x="${tagX}" y="${tagY}" width="14" height="14" rx="3" fill="#fff3e0" stroke="#e65100" stroke-width="0.5"/>`;
      svg += `<text x="${tagX+7}" y="${tagY+10}" text-anchor="middle" font-size="7" fill="#e65100" font-family="Arial">?</text>`;
    }
  }

  return { svg, height: colH };
}

// Render
let mainSvg = '', maxMainH = 0;
const stateX = {}, stateY = {}, stateH = {};
const titleH = 30;

// Case Creation column (before the main flow)
const creationEvents = model.events.filter(e => CASE_CREATION_IDS.has(e.id)).sort((a, b) => a.name.localeCompare(b.name));
const ccX = PAD, ccY = PAD + titleH;
const ccPillX = ccX + (COL_W - PILL_W) / 2;
let ccBodyH = PILL_GAP;
for (let i = 0; i < creationEvents.length; i++) {
  ccBodyH += PILL_H + PILL_GAP;
}
ccBodyH += PILL_GAP;
const ccColH = HDR_H + ccBodyH;
maxMainH = Math.max(maxMainH, ccColH);

// Render Case Creation column
let ccSvg = '';
ccSvg += `<rect x="${ccX}" y="${ccY}" width="${COL_W}" height="${ccColH}" rx="4" fill="white" stroke="#ccc"/>`;
ccSvg += `<rect x="${ccX}" y="${ccY}" width="${COL_W}" height="${HDR_H}" rx="4" fill="#2e4057"/>`;
ccSvg += `<rect x="${ccX}" y="${ccY+HDR_H-6}" width="${COL_W}" height="6" fill="#2e4057"/>`;
ccSvg += `<text x="${ccX+COL_W/2}" y="${ccY+17}" text-anchor="middle" font-size="8.5" font-weight="bold" fill="${HEADER_TEXT}" font-family="Arial">CASE CREATION</text>`;
ccSvg += `<text x="${ccX+COL_W/2}" y="${ccY+33}" text-anchor="middle" font-size="7.5" fill="white" font-family="Arial">Entry point events</text>`;
const ccDisplayNames = computeDisplayNames(creationEvents);
let ccPillY = ccY + HDR_H + PILL_GAP;
for (const ev of creationEvents) {
  const bg = pillBg(ev);
  const ccName = ccDisplayNames.get(ev.id) || ev.name;
  ccSvg += `<rect x="${ccPillX}" y="${ccPillY}" width="${PILL_W}" height="${PILL_H}" rx="${PILL_R}" fill="${bg}" stroke="#bbb" stroke-width="0.5"/>`;
  ccSvg += `<text x="${ccPillX+8}" y="${ccPillY+PILL_H/2+3}" font-size="${FONT}" fill="#333" font-family="Arial">${esc(ccName)}</text>`;
  ccPillY += PILL_H + PILL_GAP;
}

// Main flow columns (shifted right by one column for the Case Creation box)
const mainOffset = PAD + TOTAL_COL;
MAIN_FLOW.forEach((sid, i) => {
  const x = mainOffset + i * TOTAL_COL, y = PAD + titleH;
  stateX[sid] = x; stateY[sid] = y;
  const col = renderColumn(sid, x, y);
  mainSvg += col.svg;
  stateH[sid] = col.height;
  maxMainH = Math.max(maxMainH, col.height);
});

// Arrow from Case Creation to PENDING_CASE_ISSUED
let spineSvg = '';
const ccArrowX1 = ccX + COL_W, ccArrowY1 = ccY + HDR_H / 2;
const ccArrowX2 = stateX['PENDING_CASE_ISSUED'], ccArrowY2 = stateY['PENDING_CASE_ISSUED'] + HDR_H / 2;
spineSvg += `<line x1="${ccArrowX1}" y1="${ccArrowY1}" x2="${ccArrowX2}" y2="${ccArrowY2}" stroke="#4472c4" stroke-width="2" marker-end="url(#arrow)" opacity="0.35"/>`;

// Happy-path spine arrows (adjacent main-flow states only)
for (let i = 0; i < MAIN_FLOW.length - 1; i++) {
  const from = MAIN_FLOW[i], to = MAIN_FLOW[i + 1];
  const x1 = stateX[from] + COL_W, y1 = stateY[from] + HDR_H / 2;
  const x2 = stateX[to], y2 = stateY[to] + HDR_H / 2;
  spineSvg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#4472c4" stroke-width="2" marker-end="url(#arrow)" opacity="0.35"/>`;
}

// Exception row
const exY = PAD + titleH + maxMainH + 50;
let exSvg = '', maxExH = 0;
const totalCols = MAIN_FLOW.length + 1; // +1 for Case Creation column
const exOffset = mainOffset + Math.floor((MAIN_FLOW.length - EXCEPTION_FLOW.length) / 2) * TOTAL_COL;
EXCEPTION_FLOW.forEach((sid, i) => {
  const x = exOffset + i * TOTAL_COL, y = exY;
  stateX[sid] = x; stateY[sid] = y;
  const col = renderColumn(sid, x, y);
  exSvg += col.svg;
  stateH[sid] = col.height;
  maxExH = Math.max(maxExH, col.height);
});

// Cross-row arrows: main flow → exception states
let crossSvg = '';
const EXCEPTION_SET = new Set(EXCEPTION_FLOW);
const MAIN_SET = new Set(MAIN_FLOW);
// Collect unique main→exception transitions from model edges
const crossTransitions = {};
for (const edge of model.edges) {
  if (edge.fromState === '*' || edge.toState === '*') continue;
  const fromMain = MAIN_SET.has(edge.fromState);
  const toEx = EXCEPTION_SET.has(edge.toState);
  if (fromMain && toEx) {
    const key = `${edge.fromState}|||${edge.toState}`;
    if (!crossTransitions[key]) crossTransitions[key] = { from: edge.fromState, to: edge.toState, labels: new Set() };
    crossTransitions[key].labels.add(edge.label);
  }
}
// Group transitions by target exception state
const targetGroups = {};
for (const t of Object.values(crossTransitions)) {
  if (!targetGroups[t.to]) targetGroups[t.to] = [];
  targetGroups[t.to].push(t.from);
}

// Sort targets by their x-position (left to right) and assign horizontal bus channels
const targetOrder = Object.keys(targetGroups).sort((a, b) => stateX[a] - stateX[b]);
const gapTop = PAD + titleH + maxMainH;  // bottom of tallest main column
const gapSize = exY - gapTop;            // 50px gap
const channelSpacing = gapSize / (targetOrder.length + 1);
const BUS_COLORS = ['#c44747', '#2e7d32', '#1565c0'];

for (let ci = 0; ci < targetOrder.length; ci++) {
  const target = targetOrder[ci];
  const sources = targetGroups[target].sort((a, b) => stateX[a] - stateX[b]);
  const busY = gapTop + channelSpacing * (ci + 1);
  const color = BUS_COLORS[ci % BUS_COLORS.length];
  // X-offset per bus so vertical stubs from the same source column don't overlap
  const xOff = (ci - 1) * 16;

  const targetCx = stateX[target] + COL_W / 2;

  // Horizontal bus: spans from leftmost source to rightmost source (or target), whichever is wider
  const allX = sources.map(s => stateX[s] + COL_W / 2 + xOff);
  allX.push(targetCx);
  const busLeft = Math.min(...allX);
  const busRight = Math.max(...allX);
  crossSvg += `<line x1="${busLeft}" y1="${busY}" x2="${busRight}" y2="${busY}" stroke="${color}" stroke-width="1.5" opacity="0.45"/>`;

  // Vertical stubs: from bottom of each source column down to the bus
  for (const src of sources) {
    const srcCx = stateX[src] + COL_W / 2 + xOff;
    const srcBot = stateY[src] + stateH[src];
    crossSvg += `<line x1="${srcCx}" y1="${srcBot}" x2="${srcCx}" y2="${busY}" stroke="${color}" stroke-width="1.5" opacity="0.45"/>`;
    // Small dot at junction
    crossSvg += `<circle cx="${srcCx}" cy="${busY}" r="2" fill="${color}" opacity="0.6"/>`;
  }

  // Vertical drop: from bus down to top of target exception column
  crossSvg += `<line x1="${targetCx}" y1="${busY}" x2="${targetCx}" y2="${exY}" stroke="${color}" stroke-width="2" opacity="0.5" marker-end="url(#arrowRed-${ci})"/>`;
  // Dot at bus-to-drop junction
  crossSvg += `<circle cx="${targetCx}" cy="${busY}" r="2.5" fill="${color}" opacity="0.7"/>`;
  // Label on the bus near the target
  crossSvg += `<text x="${targetCx + 6}" y="${busY - 3}" font-size="6.5" fill="${color}" font-family="Arial" opacity="0.8">${SHORT[target] || target}</text>`;
}

// Exception-to-exception arrows (routed to avoid crossing columns)
const exToEx = {};
const exIndexOf = {};
EXCEPTION_FLOW.forEach((s, i) => { exIndexOf[s] = i; });
for (const edge of model.edges) {
  if (edge.fromState === '*' || edge.toState === '*') continue;
  if (EXCEPTION_SET.has(edge.fromState) && EXCEPTION_SET.has(edge.toState) && edge.fromState !== edge.toState) {
    const key = `${edge.fromState}|||${edge.toState}`;
    if (!exToEx[key]) exToEx[key] = { from: edge.fromState, to: edge.toState };
  }
}
let exArrowChannel = 0;
for (const t of Object.values(exToEx)) {
  const fromIdx = exIndexOf[t.from], toIdx = exIndexOf[t.to];
  const adjacent = Math.abs(fromIdx - toIdx) === 1;

  if (adjacent) {
    // Simple horizontal arrow through the gap between adjacent columns
    const goingRight = stateX[t.to] > stateX[t.from];
    const x1 = goingRight ? stateX[t.from] + COL_W : stateX[t.from];
    const x2 = goingRight ? stateX[t.to] : stateX[t.to] + COL_W;
    const y = stateY[t.from] + HDR_H / 2;
    crossSvg += `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${stateY[t.to] + HDR_H / 2}" stroke="#c44747" stroke-width="2" marker-end="url(#arrowRed-0)" opacity="0.45"/>`;
  } else {
    // Route below exception row: down from source → horizontal → up to target
    const belowY = exY + maxExH + 16 + exArrowChannel * 14;
    exArrowChannel++;
    const fromCx = stateX[t.from] + COL_W / 2;
    const fromBot = stateY[t.from] + stateH[t.from];
    const toCx = stateX[t.to] + COL_W / 2;
    const toBot = stateY[t.to] + stateH[t.to];

    // Down from source bottom
    crossSvg += `<line x1="${fromCx}" y1="${fromBot}" x2="${fromCx}" y2="${belowY}" stroke="#c44747" stroke-width="2" opacity="0.45"/>`;
    // Horizontal below columns
    crossSvg += `<line x1="${fromCx}" y1="${belowY}" x2="${toCx}" y2="${belowY}" stroke="#c44747" stroke-width="2" opacity="0.45"/>`;
    // Up to target bottom
    crossSvg += `<line x1="${toCx}" y1="${belowY}" x2="${toCx}" y2="${toBot}" stroke="#c44747" stroke-width="2" marker-end="url(#arrowRed-0)" opacity="0.45"/>`;
    // Corner dots
    crossSvg += `<circle cx="${fromCx}" cy="${belowY}" r="2" fill="#c44747" opacity="0.6"/>`;
    crossSvg += `<circle cx="${toCx}" cy="${belowY}" r="2" fill="#c44747" opacity="0.6"/>`;
  }
}

// Legend
const legX = PAD, legY = exY + maxExH + 50 + exArrowChannel * 14;
let legSvg = `<rect x="${legX}" y="${legY}" width="680" height="104" rx="6" fill="#f8f8f8" stroke="#ddd"/>`;
legSvg += `<text x="${legX+10}" y="${legY+16}" font-size="9" font-weight="bold" font-family="Arial">Legend</text>`;
// Row 1: Event source type pills (text inside boxes)
const sourceItems = [
  [CAMUNDA_BG, '#333', 'System / Camunda'],
  [USER_BG, '#333', 'User Event'],
  [SYSTEM_BG, '#333', 'Email / System Event'],
  [TESTING_BG, '#333', 'Testing Support'],
];
sourceItems.forEach(([bg, fg, label], i) => {
  const lx = legX + 10 + i * 130;
  legSvg += `<rect x="${lx}" y="${legY+26}" width="115" height="16" rx="6" fill="${bg}" stroke="#bbb" stroke-width="0.5"/>`;
  legSvg += `<text x="${lx+57}" y="${legY+38}" text-anchor="middle" font-size="7.5" fill="${fg}" font-family="Arial">${label}</text>`;
});

// Row 2: Destination badge types (text inside boxes)
const badgeItems = [
  { x: 10, w: 150, bg: DEST_BG, stroke: DEST_TEXT, fg: DEST_TEXT, label: '\u2192 CCD Static Destination' },
  { x: 170, w: 190, bg: '#e6f4ea', stroke: '#137333', fg: '#137333', label: '\u2192 Resolved from Java Handler' },
  { x: 370, w: 100, bg: '#f0f0f0', stroke: '#ccc', fg: '#999', label: 'stays \u2014 No State Change' },
  { x: 480, w: 130, bg: '#fff3e0', stroke: '#e65100', fg: '#e65100', label: '? \u2014 Unresolved (ext. worker)' },
];
badgeItems.forEach(item => {
  const bx = legX + item.x;
  legSvg += `<rect x="${bx}" y="${legY+50}" width="${item.w}" height="16" rx="4" fill="${item.bg}" stroke="${item.stroke}" stroke-width="0.5"/>`;
  legSvg += `<text x="${bx + item.w/2}" y="${legY+62}" text-anchor="middle" font-size="6.5" fill="${item.fg}" font-family="Arial" font-weight="bold">${item.label}</text>`;
});

// Enabling condition icon
legSvg += `<rect x="${legX+620}" y="${legY+50}" width="55" height="16" rx="4" fill="#fff3e0" stroke="#e6a817" stroke-width="0.5"/>`;
legSvg += `<text x="${legX+647}" y="${legY+62}" text-anchor="middle" font-size="6.5" fill="#8a6d00" font-family="Arial">\u26A1 Condition</text>`;

// Notification link icon
legSvg += `<rect x="${legX+620}" y="${legY+26}" width="55" height="16" rx="4" fill="#e8f0fe" stroke="#1a56db" stroke-width="0.5"/>`;
legSvg += `<text x="${legX+647}" y="${legY+38}" text-anchor="middle" font-size="5.5" fill="#1a56db" font-family="Arial">\u2709 Triggers Notifs</text>`;

legSvg += `<text x="${legX+10}" y="${legY+94}" font-size="7" font-family="Arial" fill="#888">Generated ${new Date().toISOString().split('T')[0]}  |  ${model.summary.stateCount} states  |  ${model.summary.eventCount} events  |  Global (*\u2192*) events not shown (${globalIds.size})  |  ${model.summary.resolvedDynamicEvents || 0} dynamic transitions resolved from civil-service</text>`;

const svgW = PAD * 2 + totalCols * TOTAL_COL;
const svgH = legY + 115;

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svgW} ${svgH}" width="${svgW}" height="${svgH}">
<defs>
<marker id="arrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#4472c4" opacity="0.4"/></marker>
<marker id="arrowRed-0" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#c44747"/></marker>
<marker id="arrowRed-1" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#2e7d32"/></marker>
<marker id="arrowRed-2" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#1565c0"/></marker>
</defs>
<rect width="100%" height="100%" fill="white"/>
<text x="${svgW/2}" y="${PAD+10}" text-anchor="middle" font-size="14" font-weight="bold" font-family="Arial" fill="${HEADER_BG}">Civil CCD State &amp; Event Model</text>
${ccSvg}${spineSvg}${mainSvg}${exSvg}${crossSvg}${legSvg}
</svg>`;

fs.writeFileSync('build/state-event-model.svg', svg);
console.log(`SVG: ${svgW}x${svgH}px`);
