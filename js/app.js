/* ============================================
   MatrixDestiny — Application Logic
   100% Client-Side · Vanilla JavaScript
   ============================================ */
(function () {
  'use strict';

  /* ---------- SVG Namespace ---------- */
  const SVG_NS = 'http://www.w3.org/2000/svg';
  const svgEl = (tag) => document.createElementNS(SVG_NS, tag);

  /* ---------- 22 Major Arcana Data ---------- */
  const ARCANA = {
    1: {
      title: 'The Magician',
      keywords: ['Initiative', 'Communication', 'Originality', 'Willpower'],
      text: 'You are a natural pioneer and communicator. Endowed with creative power and strong will, you initiate projects and inspire others. Your potential lies in turning ideas into reality through focused action and clear self-expression.',
      shadow: 'In shadow: manipulation, deceit, abuse of power, or scattering energy across too many projects without finishing any.'
    },
    2: {
      title: 'The High Priestess',
      keywords: ['Intuition', 'Diplomacy', 'Mystery', 'Inner Wisdom'],
      text: 'You carry deep intuitive wisdom and a gift for seeing beneath the surface. Diplomatic and receptive, you understand people on an energetic level. Your path involves trusting your inner voice and bridging the visible and hidden worlds.',
      shadow: 'In shadow: isolation, mood swings, suppressed emotions, secrecy, or doubting your own intuition.'
    },
    3: {
      title: 'The Empress',
      keywords: ['Abundance', 'Creativity', 'Nurturing', 'Fertility'],
      text: 'You embody creative abundance and the power to nurture life. Whether through art, family, or business, you bring things into bloom. Your energy is magnetic, warm, and life-giving, drawing others toward your generous nature.',
      shadow: 'In shadow: over-controlling others, dependency, superficiality, neglecting self-care while caring for everyone else.'
    },
    4: {
      title: 'The Emperor',
      keywords: ['Structure', 'Leadership', 'Authority', 'Discipline'],
      text: 'You are a builder and leader who creates lasting structures. With natural authority and strong discipline, you organize chaos into order. Your gift is providing stability and protection for those around you.',
      shadow: 'In shadow: rigidity, authoritarianism, impatience, controlling behavior, or difficulty showing vulnerability.'
    },
    5: {
      title: 'The Hierophant',
      keywords: ['Teaching', 'Tradition', 'Spirituality', 'Guidance'],
      text: 'You are a bridge between spiritual knowledge and everyday life. A natural teacher and guide, you transmit wisdom through tradition and ritual. Others seek your counsel because you embody timeless principles.',
      shadow: 'In shadow: dogmatism, conformity, self-righteousness, or hiding behind rules instead of living authentically.'
    },
    6: {
      title: 'The Lovers',
      keywords: ['Love', 'Choice', 'Harmony', 'Partnership'],
      text: 'Your life centers around love, beauty, and meaningful choices. You seek deep union and harmony in relationships. Your gift is seeing the beauty in others and helping them feel valued. Every major life path involves a choice of the heart.',
      shadow: 'In shadow: indecision, dependency in relationships, repeated poor choices, or losing yourself in another person.'
    },
    7: {
      title: 'The Chariot',
      keywords: ['Drive', 'Victory', 'Discipline', 'Breakthrough'],
      text: 'You are a warrior of purpose who achieves victory through discipline and willpower. Once you set your direction, nothing can stop you. Your path involves mastering opposing forces and driving forward with focused determination.',
      shadow: 'In shadow: aggression, recklessness, winning at all costs, or pushing forward without reflection.'
    },
    8: {
      title: 'Strength',
      keywords: ['Courage', 'Patience', 'Inner Power', 'Compassion'],
      text: 'You possess quiet inner strength and the ability to tame raw forces through patience and love rather than force. Your courage is gentle but unbreakable. You heal yourself and others through compassion and steadfast endurance.',
      shadow: 'In shadow: self-doubt, suppressed anger, passivity, or using force when gentleness is needed.'
    },
    9: {
      title: 'The Hermit',
      keywords: ['Wisdom', 'Solitude', 'Inner Light', 'Completion'],
      text: 'You are a seeker of deeper truth, often walking a solitary path to find inner light. Your wisdom comes from experience and introspection. You guide others not by preaching but by embodying the light you have found within.',
      shadow: 'In shadow: excessive isolation, coldness, intellectual arrogance, or fear of engaging with the world.'
    },
    10: {
      title: 'Wheel of Fortune',
      keywords: ['Cycles', 'Luck', 'Change', 'Destiny'],
      text: 'Your life moves in grand cycles of fortune and transformation. You understand that everything rises and falls, and you can find opportunity in every turning. Your gift is adaptability and recognizing the right moment to act.',
      shadow: 'In shadow: unpredictability, gambling, fatalism, passively waiting for luck instead of creating your own.'
    },
    11: {
      title: 'Justice',
      keywords: ['Truth', 'Balance', 'Fairness', 'Consequence'],
      text: 'You are called to live in truth and bring balance to the world. With a strong sense of justice, you see clearly what is right and act accordingly. Your life teaches that every cause has an effect and that integrity is its own reward.',
      shadow: 'In shadow: judgmentalness, harshness, legalistic thinking, or avoiding decisions out of fear of being wrong.'
    },
    12: {
      title: 'The Hanged Man',
      keywords: ['Surrender', 'New Perspective', 'Sacrifice', 'Patience'],
      text: 'Your power comes from seeing life from a different angle. By surrendering control and pausing, you gain insights others miss. Your path involves letting go of old patterns and trusting that apparent setbacks serve a higher purpose.',
      shadow: 'In shadow: martyrdom, victim mentality, stagnation, or refusing to act when action is needed.'
    },
    13: {
      title: 'Transformation',
      keywords: ['Rebirth', 'Endings', 'Release', 'Renewal'],
      text: 'You are an agent of profound transformation. Old forms must die so new life can emerge. Throughout your life you will shed skins and reinvent yourself. Your gift is helping others navigate change without fear, showing that every ending is a beginning.',
      shadow: 'In shadow: resisting change, stagnation, fear of loss, or destroying what still has value.'
    },
    14: {
      title: 'Temperance',
      keywords: ['Balance', 'Healing', 'Moderation', 'Alchemy'],
      text: 'You are an alchemist who blends opposites into harmonious wholes. Patient and measured, you bring healing through balance and moderation. Your gift is finding the middle path and helping opposing forces coexist peacefully.',
      shadow: 'In shadow: excessive compromise, people-pleasing, fear of intensity, or losing yourself in trying to please everyone.'
    },
    15: {
      title: 'The Devil',
      keywords: ['Passion', 'Shadow Work', 'Earthly Power', 'Liberation'],
      text: 'You are confronted with the raw power of earthly desires and attachments. Your journey is about recognizing the chains you forge for yourself and breaking free through honest self-awareness. When you own your shadow, its power becomes your strength.',
      shadow: 'In shadow: addiction, greed, manipulation, materialism, or staying in toxic situations out of fear.'
    },
    16: {
      title: 'The Tower',
      keywords: ['Awakening', 'Disruption', 'Truth', 'Rebuilding'],
      text: 'Your life involves sudden breakthroughs that shatter false structures. Though disruptive, these moments clear the ground for authentic rebuilding. You are meant to live in radical truth, and anything built on illusion will be struck down.',
      shadow: 'In shadow: chaos, resisting necessary change, rebuilding the same false structures, or living in fear of the next collapse.'
    },
    17: {
      title: 'The Star',
      keywords: ['Hope', 'Inspiration', 'Healing', 'Spiritual Gifts'],
      text: 'You are a beacon of hope and inspiration for others. After the storm, you bring healing light. Connected to cosmic energies, you radiate calm and faith. Your gift is reminding people that no matter how dark the night, the stars still shine.',
      shadow: 'In shadow: false hope, disconnection from reality, self-doubt, or giving away your light without replenishing it.'
    },
    18: {
      title: 'The Moon',
      keywords: ['Imagination', 'Dreams', 'The Unconscious', 'Mystery'],
      text: 'You walk between the conscious and unconscious worlds. Rich in imagination and psychic sensitivity, you perceive what others cannot. Your path involves navigating the fog of fears and illusions to find the truth hidden in the shadows.',
      shadow: 'In shadow: anxiety, deception, emotional turbulence, being lost in fantasy, or projecting fears onto reality.'
    },
    19: {
      title: 'The Sun',
      keywords: ['Joy', 'Vitality', 'Success', 'Authenticity'],
      text: 'You radiate warmth, joy, and vitality. Your presence lights up any room, and your authentic self-expression attracts abundance and success. You are meant to shine brightly and share your inner light generously with the world.',
      shadow: 'In shadow: ego inflation, needing constant attention, hiding sadness behind a mask of happiness, or burning out.'
    },
    20: {
      title: 'Judgement',
      keywords: ['Renewal', 'Calling', 'Forgiveness', 'Awakening'],
      text: 'You are called to a higher purpose, a vocation that demands you rise and answer. Your life involves moments of profound reckoning where you must forgive the past and step into a renewed version of yourself. You inspire others to awaken.',
      shadow: 'In shadow: self-condemnation, inability to forgive, refusing to answer the call, or living in the past.'
    },
    21: {
      title: 'The World',
      keywords: ['Completion', 'Wholeness', 'Fulfillment', 'Universal Connection'],
      text: 'You carry the energy of completion and universal connection. Your path leads toward wholeness, integrating all experiences into a unified self. You feel at home in the world and connected to all of life. Your gift is showing others that every ending is also a gateway.',
      shadow: 'In shadow: feeling stuck at the threshold, fear of completion, perfectionism, or not knowing what to do after reaching a goal.'
    },
    22: {
      title: 'The Fool',
      keywords: ['Freedom', 'New Beginnings', 'Trust', 'Infinite Potential'],
      text: 'You are the eternal beginner, ready to leap into the unknown with joyful trust. Unburdened by convention, you see the world with fresh eyes. Your gift is the courage to start anew, no matter how many times you have fallen. You remind others that life is an adventure.',
      shadow: 'In shadow: irresponsibility, recklessness, naivety, refusing to commit, or repeating the same mistakes by never learning from consequences.'
    }
  };

  /* ---------- Position Labels ---------- */
  const POSITION_LABELS = {
    A: 'Personal Energy',
    B: 'Hidden Talent',
    C: 'Karmic Task',
    D: 'Comfort Zone',
    E: 'Relationships',
    F: 'Spiritual Path',
    G: 'Karmic Tail',
    H: 'Material World',
    K: 'Life Purpose',
    L: 'Love Energy',
    M: 'Financial Flow',
    N: 'Family Karma'
  };

  /* ---------- Node Layout (SVG coordinates) ---------- */
  const R = 200;
  const CX = 300, CY = 300;
  const R_CARDINAL = R;
  const R_DIAGONAL = R * 0.71;

  const NODES = [
    { id: 'A', label: 'Personal', x: CX, y: CY - R_CARDINAL, type: 'main' },
    { id: 'F', label: 'Spirit', x: CX + R_DIAGONAL, y: CY - R_DIAGONAL, type: 'main' },
    { id: 'C', label: 'Karma', x: CX + R_CARDINAL, y: CY, type: 'main' },
    { id: 'H', label: 'Material', x: CX + R_DIAGONAL, y: CY + R_DIAGONAL, type: 'main' },
    { id: 'D', label: 'Comfort', x: CX, y: CY + R_CARDINAL, type: 'main' },
    { id: 'G', label: 'Karmic Tail', x: CX - R_DIAGONAL, y: CY + R_DIAGONAL, type: 'k-arm' },
    { id: 'B', label: 'Talent', x: CX - R_CARDINAL, y: CY, type: 'main' },
    { id: 'E', label: 'Relations', x: CX - R_DIAGONAL, y: CY - R_DIAGONAL, type: 'main' },
    { id: 'K', label: 'Purpose', x: CX, y: CY, type: 'center' },
    { id: 'L', label: 'Love', x: CX, y: CY - R * 0.58, type: 'inner' },
    { id: 'M', label: 'Finance', x: CX - R * 0.58, y: CY, type: 'inner' },
    { id: 'N', label: 'Family', x: CX, y: CY + R * 0.58, type: 'inner' }
  ];

  const NODE_RADIUS = { main: 30, center: 38, inner: 24, 'k-arm': 30 };
  const NODE_FONT = { main: 22, center: 26, inner: 18, 'k-arm': 22 };

  /* ---------- Calculation ---------- */
  function reduceTo22(n) {
    while (n > 22) {
      n = String(n).split('').reduce((s, d) => s + Number(d), 0);
    }
    if (n < 1) n = 1;
    return n;
  }

  function calculateMatrix(day, month, year) {
    const A = reduceTo22(day);
    const B = month;
    const C = reduceTo22(String(year).split('').reduce((s, d) => s + Number(d), 0));
    const D = reduceTo22(A + B + C);
    const E = reduceTo22(A + B);
    const F = reduceTo22(A + C);
    const G = reduceTo22(C + D);
    const H = reduceTo22(B + D);
    const K = reduceTo22(A + B + C + D);
    const L = reduceTo22(A + D);
    const M = reduceTo22(B + C);
    const N = reduceTo22(G + H);

    return { A, B, C, D, E, F, G, H, K, L, M, N };
  }

  /* ---------- SVG Rendering ---------- */
  function renderMatrix(matrix) {
    const svg = document.getElementById('matrixSvg');
    svg.innerHTML = '';

    // Defs — glow filter
    const defs = svgEl('defs');
    const filter = svgEl('filter');
    filter.setAttribute('id', 'glow');
    filter.setAttribute('x', '-50%');
    filter.setAttribute('y', '-50%');
    filter.setAttribute('width', '200%');
    filter.setAttribute('height', '200%');
    const blur = svgEl('feGaussianBlur');
    blur.setAttribute('stdDeviation', '3');
    blur.setAttribute('result', 'blur');
    const merge = svgEl('feMerge');
    const merge1 = svgEl('feMergeNode');
    merge1.setAttribute('in', 'blur');
    merge.appendChild(merge1);
    const merge2 = svgEl('feMergeNode');
    merge2.setAttribute('in', 'SourceGraphic');
    merge.appendChild(merge2);
    filter.appendChild(blur);
    filter.appendChild(merge);
    defs.appendChild(filter);
    svg.appendChild(defs);

    // Outer circle
    const circle = svgEl('circle');
    circle.setAttribute('cx', CX);
    circle.setAttribute('cy', CY);
    circle.setAttribute('r', R);
    circle.setAttribute('class', 'matrix-line');
    circle.setAttribute('fill', 'none');
    svg.appendChild(circle);

    // Inner circle (for visual depth)
    const innerCircle = svgEl('circle');
    innerCircle.setAttribute('cx', CX);
    innerCircle.setAttribute('cy', CY);
    innerCircle.setAttribute('r', R * 0.42);
    innerCircle.setAttribute('class', 'matrix-line');
    innerCircle.setAttribute('fill', 'none');
    innerCircle.setAttribute('opacity', '0.5');
    svg.appendChild(innerCircle);

    // Square 1: cardinal points (top → right → bottom → left → top)
    const sq1 = svgEl('polygon');
    const cPoints = [NODES[0], NODES[2], NODES[4], NODES[6]];
    sq1.setAttribute('points', cPoints.map(n => `${n.x},${n.y}`).join(' '));
    sq1.setAttribute('class', 'matrix-line-accent');
    sq1.setAttribute('fill', 'none');
    svg.appendChild(sq1);

    // Square 2: diagonal points (UR → LR → LL → UL → UR)
    const sq2 = svgEl('polygon');
    const dPoints = [NODES[1], NODES[3], NODES[5], NODES[7]];
    sq2.setAttribute('points', dPoints.map(n => `${n.x},${n.y}`).join(' '));
    sq2.setAttribute('class', 'matrix-star-line');
    sq2.setAttribute('fill', 'none');
    svg.appendChild(sq2);

    // Star lines — each cardinal to its two adjacent diagonals
    const starPairs = [
      [0,1],[0,7], // top to UR, top to UL
      [2,1],[2,3], // right to UR, right to LR
      [4,3],[4,5], // bottom to LR, bottom to LL
      [6,5],[6,7]  // left to LL, left to UL
    ];
    starPairs.forEach(([a,b]) => {
      const line = svgEl('line');
      line.setAttribute('x1', NODES[a].x);
      line.setAttribute('y1', NODES[a].y);
      line.setAttribute('x2', NODES[b].x);
      line.setAttribute('y2', NODES[b].y);
      line.setAttribute('class', 'matrix-star-line');
      svg.appendChild(line);
    });

    // Center lines (from center to each cardinal)
    [0, 2, 4, 6].forEach(idx => {
      const line = svgEl('line');
      line.setAttribute('x1', CX);
      line.setAttribute('y1', CY);
      line.setAttribute('x2', NODES[idx].x);
      line.setAttribute('y2', NODES[idx].y);
      line.setAttribute('class', 'matrix-star-line');
      line.setAttribute('opacity', '0.3');
      svg.appendChild(line);
    });

    // Render nodes
    NODES.forEach(node => {
      const value = matrix[node.id];
      if (!value) return;

      const r = NODE_RADIUS[node.type] || 28;
      const fontSize = NODE_FONT[node.type] || 20;

      const group = svgEl('g');
      group.setAttribute('class', `matrix-node-group${node.type === 'k-arm' ? ' k-arm' : ''}${node.type === 'center' ? ' center' : ''}`);
      group.setAttribute('data-node-id', node.id);
      group.setAttribute('data-value', value);
      group.setAttribute('role', 'button');
      group.setAttribute('tabindex', '0');
      const labelFull = POSITION_LABELS[node.id] || node.label;
      group.setAttribute('aria-label', `${labelFull}: ${value}, ${ARCANA[value].title}`);

      // Circle background
      const bg = svgEl('circle');
      bg.setAttribute('cx', node.x);
      bg.setAttribute('cy', node.y);
      bg.setAttribute('r', r);
      bg.setAttribute('class', `matrix-node-bg${node.type === 'center' ? ' center' : ''}${node.type === 'k-arm' ? ' k-arm' : ''}`);
      group.appendChild(bg);

      // Number text
      const numText = svgEl('text');
      numText.setAttribute('x', node.x);
      numText.setAttribute('y', node.y - (node.type === 'inner' ? 3 : 4));
      numText.setAttribute('class', 'matrix-node-text');
      numText.setAttribute('font-size', fontSize);
      numText.textContent = value;
      group.appendChild(numText);

      // Label text inside circle (below number)
      const labelText = svgEl('text');
      labelText.setAttribute('x', node.x);
      labelText.setAttribute('y', node.y + (node.type === 'inner' ? 12 : 14));
      labelText.setAttribute('class', 'matrix-node-label');
      labelText.textContent = node.label.toUpperCase();
      group.appendChild(labelText);

      // Click handler
      group.addEventListener('click', () => highlightNode(node.id));
      group.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          highlightNode(node.id);
        }
      });

      svg.appendChild(group);
    });

    // Title text at top
    const title = svgEl('text');
    title.setAttribute('x', CX);
    title.setAttribute('y', 28);
    title.setAttribute('class', 'matrix-title-text');
    title.textContent = 'DESTINY MATRIX';
    svg.appendChild(title);
  }

  /* ---------- Active node tracking ---------- */
  let activeNodeId = null;

  function highlightNode(nodeId) {
    // Remove previous active
    document.querySelectorAll('.matrix-node-group.active').forEach(el => {
      el.classList.remove('active');
    });

    activeNodeId = nodeId;
    const group = document.querySelector(`[data-node-id="${nodeId}"]`);
    if (group) group.classList.add('active');

    // Highlight corresponding interpretation
    document.querySelectorAll('.interpretation-item').forEach(el => {
      el.classList.remove('highlighted');
    });
    const interpItem = document.querySelector(`[data-interp-id="${nodeId}"]`);
    if (interpItem) {
      interpItem.classList.add('highlighted');
      interpItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  /* ---------- Interpretation Rendering ---------- */
  function renderInterpretations(matrix) {
    const container = document.getElementById('interpretationList');
    container.innerHTML = '';

    const order = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'K', 'L', 'M', 'N'];

    // Count arcana occurrences to flag karmic energies (3+)
    const counts = {};
    order.forEach(id => {
      const v = matrix[id];
      counts[v] = (counts[v] || 0) + 1;
    });

    order.forEach(id => {
      const value = matrix[id];
      const arcana = ARCANA[value];
      const label = POSITION_LABELS[id] || id;

      const item = document.createElement('div');
      item.className = 'interpretation-item';
      item.setAttribute('data-interp-id', id);

      const isKarmic = counts[value] >= 3;

      let html = `
        <div class="interpretation-header">
          <div class="arcana-number">${value}</div>
          <div>
            <div class="arcana-title">${arcana.title}</div>
            <div class="arcana-position">${label}</div>
          </div>
        </div>
        <div class="arcana-keywords">
          ${arcana.keywords.map(k => `<span class="keyword-tag">${k}</span>`).join('')}
        </div>
        <p class="arcana-text">${arcana.text}</p>
        <div class="arcana-shadow"><strong>Shadow:</strong> ${arcana.shadow}</div>
      `;

      if (isKarmic) {
        html += `<div class="arcana-shadow"><strong>Karmic Energy:</strong> This arcana appears ${counts[value]} times in your matrix — it demands special attention and conscious work.</div>`;
      }

      item.innerHTML = html;
      item.addEventListener('click', () => highlightNode(id));
      container.appendChild(item);
    });
  }

  /* ---------- Current Matrix State ---------- */
  let currentMatrix = null;
  let currentInput = null;

  /* ---------- Theme Management ---------- */
  function initTheme() {
    const saved = localStorage.getItem('md_theme');
    if (saved) {
      document.documentElement.setAttribute('data-theme', saved);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    }
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('md_theme', next);
  }

  /* ---------- Starfield ---------- */
  function createStarfield() {
    const field = document.getElementById('starfield');
    const count = 60;
    for (let i = 0; i < count; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      star.style.animationDelay = Math.random() * 4 + 's';
      star.style.animationDuration = (3 + Math.random() * 4) + 's';
      const size = 1 + Math.random() * 2;
      star.style.width = size + 'px';
      star.style.height = size + 'px';
      field.appendChild(star);
    }
  }

  /* ---------- Toast ---------- */
  let toastTimer = null;
  function showToast(message, type) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast show' + (type ? ' ' + type : '');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.className = 'toast';
    }, 2800);
  }

  /* ---------- History (LocalStorage) ---------- */
  const STORAGE_KEY = 'md_history';

  function getHistory() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  function saveHistory(item) {
    const history = getHistory();
    // Avoid exact duplicates (same name + date)
    const exists = history.some(h =>
      h.name === item.name && h.day === item.day && h.month === item.month && h.year === item.year
    );
    if (exists) {
      showToast('This profile is already saved.', 'error');
      return;
    }
    history.unshift(item);
    if (history.length > 50) history.pop();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    renderHistory();
    showToast('Profile saved.', 'success');
  }

  function deleteHistory(id) {
    let history = getHistory();
    history = history.filter(h => h.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    renderHistory();
    showToast('Profile removed.');
  }

  function updateHistoryName(id, newName) {
    const history = getHistory();
    const item = history.find(h => h.id === id);
    if (item) {
      item.name = newName;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
      renderHistory();
    }
  }

  function clearAllHistory() {
    localStorage.removeItem(STORAGE_KEY);
    renderHistory();
    showToast('All profiles cleared.');
  }

  function renderHistory() {
    const history = getHistory();
    const list = document.getElementById('historyList');
    const empty = document.getElementById('historyEmpty');
    const clearAllBtn = document.getElementById('clearAllBtn');

    list.innerHTML = '';

    if (history.length === 0) {
      list.appendChild(empty);
      clearAllBtn.hidden = true;
      return;
    }

    clearAllBtn.hidden = false;

    const monthNames = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    history.forEach(item => {
      const div = document.createElement('div');
      div.className = 'history-item';

      const displayName = item.name || 'Anonymous';
      const dateStr = `${monthNames[item.month]} ${item.day}, ${item.year}`;

      div.innerHTML = `
        <div class="history-item-info" data-id="${item.id}">
          <div class="history-item-icon">${item.A}</div>
          <div class="history-item-text">
            <div class="history-item-name">${escapeHtml(displayName)}</div>
            <div class="history-item-date">${dateStr}</div>
          </div>
        </div>
        <div class="history-item-actions">
          <button class="icon-btn edit" data-id="${item.id}" aria-label="Rename profile">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button class="icon-btn delete" data-id="${item.id}" aria-label="Delete profile">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      `;
      list.appendChild(div);
    });

    // Event delegation
    list.querySelectorAll('.history-item-info').forEach(el => {
      el.addEventListener('click', () => {
        const id = el.getAttribute('data-id');
        const item = getHistory().find(h => h.id === id);
        if (item) loadFromHistory(item);
      });
    });

    list.querySelectorAll('.icon-btn.edit').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        const item = getHistory().find(h => h.id === id);
        if (item) {
          const newName = prompt('Enter a new name for this profile:', item.name || '');
          if (newName !== null) {
            updateHistoryName(id, newName.trim());
          }
        }
      });
    });

    list.querySelectorAll('.icon-btn.delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        if (confirm('Remove this saved profile?')) {
          deleteHistory(id);
        }
      });
    });
  }

  function loadFromHistory(item) {
    document.getElementById('nameInput').value = item.name || '';
    document.getElementById('dayInput').value = item.day;
    document.getElementById('monthInput').value = item.month;
    document.getElementById('yearInput').value = item.year;

    currentInput = { name: item.name, day: item.day, month: item.month, year: item.year };
    currentMatrix = calculateMatrix(item.day, item.month, item.year);

    showResults();
    document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /* ---------- Utilities ---------- */
  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function formatDate(day, month, year) {
    const monthNames = ['', 'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    return `${monthNames[month]} ${day}, ${year}`;
  }

  function isValidDate(day, month, year) {
    if (!day || !month || !year) return 'Please fill in all date fields.';
    if (year < 1900 || year > 2100) return 'Year must be between 1900 and 2100.';
    if (month < 1 || month > 12) return 'Please select a valid month.';
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    // Leap year check
    const isLeap = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    if (month === 2 && isLeap) {
      if (day < 1 || day > 29) return 'February has at most 29 days in a leap year.';
    } else {
      if (day < 1 || day > daysInMonth[month - 1]) return `That day is not valid for ${monthNames_long(month)}.`;
    }
    return null;
  }

  function monthNames_long(m) {
    return ['', 'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'][m];
  }

  /* ---------- Show Results ---------- */
  function showResults() {
    const section = document.getElementById('resultsSection');
    section.hidden = false;

    const name = currentInput.name ? currentInput.name.trim() : '';
    document.getElementById('profileName').textContent = name || 'Your Matrix';
    document.getElementById('profileDate').textContent = formatDate(currentInput.day, currentInput.month, currentInput.year);

    renderMatrix(currentMatrix);
    renderInterpretations(currentMatrix);
  }

  /* ---------- Event Listeners ---------- */
  function initEvents() {
    // Theme toggle
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);

    // Form submit
    document.getElementById('birthForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('nameInput').value;
      const day = parseInt(document.getElementById('dayInput').value, 10);
      const month = parseInt(document.getElementById('monthInput').value, 10);
      const year = parseInt(document.getElementById('yearInput').value, 10);

      const error = isValidDate(day, month, year);
      const errorEl = document.getElementById('formError');
      if (error) {
        errorEl.textContent = error;
        errorEl.style.opacity = '1';
        return;
      }
      errorEl.textContent = '';
      errorEl.style.opacity = '0';

      currentInput = { name, day, month, year };
      currentMatrix = calculateMatrix(day, month, year);

      showResults();
      setTimeout(() => {
        document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    });

    // Save button
    document.getElementById('saveBtn').addEventListener('click', () => {
      if (!currentMatrix || !currentInput) {
        showToast('Calculate a matrix first.', 'error');
        return;
      }
      const item = {
        id: 'p_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
        name: currentInput.name || '',
        day: currentInput.day,
        month: currentInput.month,
        year: currentInput.year,
        A: currentMatrix.A
      };
      saveHistory(item);
    });

    // Clear all
    document.getElementById('clearAllBtn').addEventListener('click', () => {
      if (confirm('Remove all saved profiles? This cannot be undone.')) {
        clearAllHistory();
      }
    });
  }

  /* ---------- Init ---------- */
  function init() {
    initTheme();
    createStarfield();
    renderHistory();
    initEvents();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
