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
      keywords: ['Inisiatif', 'Komunikasi', 'Orisinalitas', 'Kemauan Kuat'],
      text: 'Anda adalah pelopor dan komunikator alami. Diberkahi kekuatan kreatif dan kemauan kuat, Anda memulai proyek dan menginspirasi orang lain. Potensi Anda terletak pada mengubah ide menjadi kenyataan melalui tindakan yang fokus dan ekspresi diri yang jelas.',
      shadow: 'Dalam bayangan: manipulasi, penipuan, penyalahgunaan kekuasaan, atau menyebarkan energi ke terlalu banyak proyek tanpa menyelesaikan satu pun.'
    },
    2: {
      title: 'The High Priestess',
      keywords: ['Intuisi', 'Diplomasi', 'Misteri', 'Kebijaksanaan Batin'],
      text: 'Anda membawa kebijaksanaan intuitif yang mendalam dan karunia untuk melihat di balik permukaan. Diplomatis dan reseptif, Anda memahami orang pada tingkat energetik. Jalan Anda melibatkan kepercayaan pada suara batin dan menjembatani dunia yang terlihat dan tersembunyi.',
      shadow: 'Dalam bayangan: isolasi, perubahan suasana hati, emosi yang ditekan, kerahasiaan, atau meragukan intuisi sendiri.'
    },
    3: {
      title: 'The Empress',
      keywords: ['Kelimpahan', 'Kreativitas', 'Pemeliharaan', 'Kesuburan'],
      text: 'Anda mewujudkan kelimpahan kreatif dan kekuatan untuk memelihara kehidupan. Baik melalui seni, keluarga, atau bisnis, Anda membuat segalanya mekar. Energi Anda magnetis, hangat, dan memberi kehidupan, menarik orang lain menuju sifat murah hati Anda.',
      shadow: 'Dalam bayangan: terlalu mengendalikan orang lain, ketergantungan, kesuperfisialitas, mengabaikan perawatan diri sambil merawat orang lain.'
    },
    4: {
      title: 'The Emperor',
      keywords: ['Struktur', 'Kepemimpinan', 'Otoritas', 'Disiplin'],
      text: 'Anda adalah pembangun dan pemimpin yang menciptakan struktur abadi. Dengan otoritas alami dan disiplin kuat, Anda mengatur kekacauan menjadi tertib. Karunia Anda adalah memberikan stabilitas dan perlindungan bagi orang di sekitar Anda.',
      shadow: 'Dalam bayangan: kekakuan, otoritarian, ketidaksabaran, perilaku mengendalikan, atau kesulitan menunjukkan kerentanan.'
    },
    5: {
      title: 'The Hierophant',
      keywords: ['Pengajaran', 'Tradisi', 'Spiritualitas', 'Bimbingan'],
      text: 'Anda adalah jembatan antara pengetahuan spiritual dan kehidupan sehari-hari. Guru dan pemandu alami, Anda menularkan kebijaksanaan melalui tradisi dan ritual. Orang lain mencari nasihat Anda karena Anda mewujudkan prinsip yang abadi.',
      shadow: 'Dalam bayangan: dogmatisme, konformitas, kesombongan spiritual, atau bersembunyi di balik aturan alih-alih hidup otentik.'
    },
    6: {
      title: 'The Lovers',
      keywords: ['Cinta', 'Pilihan', 'Harmoni', 'Kemitraan'],
      text: 'Hidup Anda berpusat pada cinta, keindahan, dan pilihan yang bermakna. Anda mencari persatuan dan harmoni yang mendalam dalam hubungan. Karunia Anda adalah melihat keindahan dalam diri orang lain dan membantu mereka merasa dihargai. Setiap jalur hidup utama melibatkan pilihan hati.',
      shadow: 'Dalam bayangan: keraguan, ketergantungan dalam hubungan, pilihan buruk yang berulang, atau kehilangan diri Anda dalam orang lain.'
    },
    7: {
      title: 'The Chariot',
      keywords: ['Dorongan', 'Kemenangan', 'Disiplin', 'Terobosan'],
      text: 'Anda adalah pejuang ber tujuan yang mencapai kemenangan melalui disiplin dan kemauan kuat. Setelah Anda menetapkan arah, tidak ada yang dapat menghentikan Anda. Jalan Anda melibatkan penguasaan kekuatan yang berlawanan dan maju dengan tekad yang fokus.',
      shadow: 'Dalam bayangan: agresi, kecerobohan, menang dengan segala cara, atau maju tanpa refleksi.'
    },
    8: {
      title: 'Strength',
      keywords: ['Keberanian', 'Kesabaran', 'Kekuatan Batin', 'Kasih Sayang'],
      text: 'Anda memiliki kekuatan batin yang tenang dan kemampuan untuk menjinakkan kekuatan mentah melalui kesabaran dan cinta, bukan paksaan. Keberanian Anda lembut namun tak terhancurkan. Anda menyembuhkan diri sendiri dan orang lain melalui kasih sayang dan ketekunan yang teguh.',
      shadow: 'Dalam bayangan: keraguan diri, kemarahan yang ditekan, pasivitas, atau menggunakan kekerasan ketika kelembutan dibutuhkan.'
    },
    9: {
      title: 'The Hermit',
      keywords: ['Kebijaksanaan', 'Kesendirian', 'Cahaya Batin', 'Penyelesaian'],
      text: 'Anda adalah pencari kebenaran yang lebih dalam, sering berjalan di jalan sunyi untuk menemukan cahaya batin. Kebijaksanaan Anda berasal dari pengalaman dan introspeksi. Anda membimbing orang lain bukan dengan berkhotbah tetapi dengan mewujudkan cahaya yang Anda temukan di dalam diri.',
      shadow: 'Dalam bayangan: isolasi berlebihan, kedinginan, kesombongan intelektual, atau ketakutan untuk terlibat dengan dunia.'
    },
    10: {
      title: 'Wheel of Fortune',
      keywords: ['Siklus', 'Keberuntungan', 'Perubahan', 'Takdir'],
      text: 'Hidup Anda bergerak dalam siklus besar keberuntungan dan transformasi. Anda memahami bahwa segalanya naik dan turun, dan Anda dapat menemukan peluang di setiap putaran. Karunia Anda adalah kemampuan beradaptasi dan mengenali momen yang tepat untuk bertindak.',
      shadow: 'Dalam bayangan: ketidakpastian, perjudian, fatalisme, pasif menunggu keberuntungan alih-alih menciptakan sendiri.'
    },
    11: {
      title: 'Justice',
      keywords: ['Kebenaran', 'Keseimbangan', 'Keadilan', 'Konsekuensi'],
      text: 'Anda dipanggil untuk hidup dalam kebenaran dan membawa keseimbangan ke dunia. Dengan rasa keadilan yang kuat, Anda melihat dengan jelas apa yang benar dan bertindak sesuai itu. Hidup Anda mengajarkan bahwa setiap sebab memiliki akibat dan bahwa integritas adalah ganjarannya sendiri.',
      shadow: 'Dalam bayangan: sikap menghakimi, kekerasan, pikiran legalistis, atau menghindari keputusan karena takut salah.'
    },
    12: {
      title: 'The Hanged Man',
      keywords: ['Penyerahan', 'Perspektif Baru', 'Pengorbanan', 'Kesabaran'],
      text: 'Kekuatan Anda berasal dari melihat hidup dari sudut yang berbeda. Dengan menyerahkan kendali dan berhenti sejenak, Anda mendapatkan wawasan yang tidak dipunya orang lain. Jalan Anda melibatkan melepaskan pola lama dan percaya bahwa kemunduran yang tampak melayani tujuan yang lebih tinggi.',
      shadow: 'Dalam bayangan: martir, mentalitas korban, stagnasi, atau menolak bertindak ketika tindakan dibutuhkan.'
    },
    13: {
      title: 'Transformation',
      keywords: ['Kelahiran Kembali', 'Akhir', 'Pelepasan', 'Pembaharuan'],
      text: 'Anda adalah agen transformasi yang mendalam. Bentuk lama harus mati agar kehidupan baru dapat muncul. Sepanjang hidup Anda akan berganti kulit dan menemukan ulang diri sendiri. Karunia Anda adalah membantu orang lain menavigasi perubahan tanpa takut, menunjukkan bahwa setiap akhir adalah permulaan.',
      shadow: 'Dalam bayangan: menolak perubahan, stagnasi, ketakutan kehilangan, atau menghancurkan apa yang masih bernilai.'
    },
    14: {
      title: 'Temperance',
      keywords: ['Keseimbangan', 'Penyembuhan', 'Kesederhanaan', 'Alkimia'],
      text: 'Anda adalah alkimis yang mencampur lawan menjadi keseluruhan yang harmonis. Sabar dan terukur, Anda membawa penyembuhan melalui keseimbangan dan kesederhanaan. Karunia Anda adalah menemukan jalan tengah dan membantu kekuatan yang berlawanan hidup berdampingan secara damai.',
      shadow: 'Dalam bayangan: kompromi berlebihan, mencari muka, ketakutan akan intensitas, atau kehilangan diri dalam usaha menyenangkan semua orang.'
    },
    15: {
      title: 'The Devil',
      keywords: ['Hasrat', 'Pekerjaan Bayangan', 'Kekuatan Duniawi', 'Pembebasan'],
      text: 'Anda dihadapkan dengan kekuatan mentah hasrat dan keterikatan duniawi. Perjalanan Anda adalah tentang mengenali rantai yang Anda tempa untuk diri sendiri dan membebaskan diri melalui kesadaran diri yang jujur. Ketika Anda memiliki bayangan Anda, kekuatannya menjadi kekuatan Anda.',
      shadow: 'Dalam bayangan: kecanduan, keserakahan, manipulasi, materialisme, atau tetap dalam situasi beracun karena takut.'
    },
    16: {
      title: 'The Tower',
      keywords: ['Kesadaran', 'Gangguan', 'Kebenaran', 'Membangun Ulang'],
      text: 'Hidup Anda melibatkan terobosan mendadak yang menghancurkan struktur palsu. Meskipun mengganggu, momen-momen ini membersihkan lahan untuk pembangunan ulang yang otentik. Anda ditakdirkan untuk hidup dalam kebenaran radikal, dan apa pun yang dibangun atas ilusi akan dihancurkan.',
      shadow: 'Dalam bayangan: kekacauan, menolak perubahan yang diperlukan, membangun ulang struktur palsu yang sama, atau hidup dalam ketakutan akan keruntuhan berikutnya.'
    },
    17: {
      title: 'The Star',
      keywords: ['Harapan', 'Inspirasi', 'Penyembuhan', 'Karunia Spiritual'],
      text: 'Anda adalah suar harapan dan inspirasi bagi orang lain. Setelah badai, Anda membawa cahaya penyembuhan. Terhubung dengan energi kosmik, Anda memancarkan ketenangan dan iman. Karunia Anda adalah mengingatkan orang bahwa tidak peduli seberapa gelap malam, bintang masih bersinar.',
      shadow: 'Dalam bayangan: harapan palsu, keterputusan dari realitas, keraguan diri, atau memberikan cahaya Anda tanpa mengisinya kembali.'
    },
    18: {
      title: 'The Moon',
      keywords: ['Imajinasi', 'Mimpi', 'Alam Bawah Sadar', 'Misteri'],
      text: 'Anda berjalan di antara dunia sadar dan bawah sadar. Kaya akan imajinasi dan sensitivitas psikis, Anda merasakan apa yang tidak dapat dirasakan orang lain. Jalan Anda melibatkan menavigasi kabut ketakutan dan ilusi untuk menemukan kebenaran yang tersembunyi di balik bayangan.',
      shadow: 'Dalam bayangan: kecemasan, penipuan, gejolak emosional, terhilang dalam fantasi, atau memproyeksikan ketakutan ke realitas.'
    },
    19: {
      title: 'The Sun',
      keywords: ['Keceriaan', 'Vitalitas', 'Kesuksesan', 'Otentisitas'],
      text: 'Anda memancarkan kehangatan, sukacita, dan vitalitas. Kehadiran Anda menerangi ruangan mana pun, dan ekspresi diri yang otentik menarik kelimpahan dan kesuksesan. Anda ditakdirkan untuk bersinar terang dan berbagi cahaya batin Anda dengan murah hati kepada dunia.',
      shadow: 'Dalam bayangan: inflasi ego, butuh perhatian terus-menerus, menyembunyikan kesedihan di balik topeng kebahagiaan, atau kelelahan.'
    },
    20: {
      title: 'Judgement',
      keywords: ['Pembaharuan', 'Panggilan', 'Pengampunan', 'Kesadaran'],
      text: 'Anda dipanggil ke tujuan yang lebih tinggi, sebuah panggilan yang menuntut Anda bangkit dan menjawab. Hidup Anda melibatkan momen perhitungan mendalam di mana Anda harus mengampuni masa lalu dan melangkah ke versi diri yang diperbarui. Anda menginspirasi orang lain untuk terbangun.',
      shadow: 'Dalam bayangan: pengutukan diri, ketidakmampuan mengampuni, menolak menjawab panggilan, atau hidup di masa lalu.'
    },
    21: {
      title: 'The World',
      keywords: ['Penyelesaian', 'Keseluruhan', 'Pemenuhan', 'Koneksi Universal'],
      text: 'Anda membawa energi penyelesaian dan koneksi universal. Jalan Anda menuju keseluruhan, mengintegrasikan semua pengalaman ke dalam diri yang terpadu. Anda merasa betah di dunia dan terhubung dengan seluruh kehidupan. Karunia Anda adalah menunjukkan kepada orang lain bahwa setiap akhir juga merupakan gerbang.',
      shadow: 'Dalam bayangan: merasa terjebak di ambang batas, ketakutan akan penyelesaian, perfeksionisme, atau tidak tahu apa yang harus dilakukan setelah mencapai tujuan.'
    },
    22: {
      title: 'The Fool',
      keywords: ['Kebebasan', 'Permulaan Baru', 'Kepercayaan', 'Potensi Tak Terbatas'],
      text: 'Anda adalah pemula abadi, siap melompat ke yang tidak diketahui dengan kepercayaan penuh sukacita. Tanpa beban konvensi, Anda melihat dunia dengan mata segar. Karunia Anda adalah keberanian untuk memulai anew, tidak peduli berapa kali Anda telah jatuh. Anda mengingatkan orang lain bahwa hidup adalah petualangan.',
      shadow: 'Dalam bayangan: ketidakbertanggungjawaban, kecerobohan, kenaifitas, menolak berkomitmen, atau mengulang kesalahan yang sama dengan tidak pernah belajar dari konsekuensi.'
    }
  };

  /* ---------- Position Labels ---------- */
  const POSITION_LABELS = {
    A: 'Energi Personal',
    B: 'Bakat Tersembunyi',
    C: 'Tugas Karma',
    D: 'Zona Nyaman',
    E: 'Hubungan',
    F: 'Jalan Spiritual',
    G: 'Ekor Karma',
    H: 'Dunia Material',
    K: 'Tujuan Hidup',
    L: 'Energi Cinta',
    M: 'Aliran Keuangan',
    N: 'Karma Keluarga'
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
    { id: 'D', label: 'Nyaman', x: CX, y: CY + R_CARDINAL, type: 'main' },
    { id: 'G', label: 'Ekor Karma', x: CX - R_DIAGONAL, y: CY + R_DIAGONAL, type: 'k-arm' },
    { id: 'B', label: 'Bakat', x: CX - R_CARDINAL, y: CY, type: 'main' },
    { id: 'E', label: 'Relasi', x: CX - R_DIAGONAL, y: CY - R_DIAGONAL, type: 'main' },
    { id: 'K', label: 'Tujuan', x: CX, y: CY, type: 'center' },
    { id: 'L', label: 'Cinta', x: CX, y: CY - R * 0.58, type: 'inner' },
    { id: 'M', label: 'Keuangan', x: CX - R * 0.58, y: CY, type: 'inner' },
    { id: 'N', label: 'Keluarga', x: CX, y: CY + R * 0.58, type: 'inner' }
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
    title.textContent = 'MATRIKS TAKDIR';
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
        <div class="arcana-shadow"><strong>Bayangan:</strong> ${arcana.shadow}</div>
      `;

      if (isKarmic) {
        html += `<div class="arcana-shadow"><strong>Energi Karma:</strong> Arcana ini muncul ${counts[value]} kali dalam matriks Anda — ini menuntut perhatian khusus dan kerja sadar.</div>`;
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
      showToast('Profil ini sudah tersimpan.', 'error');
      return;
    }
    history.unshift(item);
    if (history.length > 50) history.pop();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    renderHistory();
    showToast('Profil disimpan.', 'success');
  }

  function deleteHistory(id) {
    let history = getHistory();
    history = history.filter(h => h.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    renderHistory();
    showToast('Profil dihapus.');
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
    showToast('Semua profil dihapus.');
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

    const monthNames = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

    history.forEach(item => {
      const div = document.createElement('div');
      div.className = 'history-item';

      const displayName = item.name || 'Tanpa Nama';
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
          <button class="icon-btn edit" data-id="${item.id}" aria-label="Ganti nama profil">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button class="icon-btn delete" data-id="${item.id}" aria-label="Hapus profil">
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
          const newName = prompt('Masukkan nama baru untuk profil ini:', item.name || '');
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
        if (confirm('Hapus profil tersimpan ini?')) {
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
    const monthNames = ['', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    return `${day} ${monthNames[month]} ${year}`;
  }

  function isValidDate(day, month, year) {
    if (!day || !month || !year) return 'Mohon isi semua kolom tanggal.';
    if (year < 1900 || year > 2100) return 'Tahun harus antara 1900 dan 2100.';
    if (month < 1 || month > 12) return 'Mohon pilih bulan yang valid.';
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    // Leap year check
    const isLeap = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    if (month === 2 && isLeap) {
      if (day < 1 || day > 29) return 'Februari paling banyak 29 hari di tahun kabisat.';
    } else {
      if (day < 1 || day > daysInMonth[month - 1]) return `Tanggal tersebut tidak valid untuk ${monthNames_long(month)}.`;
    }
    return null;
  }

  function monthNames_long(m) {
    return ['', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'][m];
  }

  /* ---------- Show Results ---------- */
  function showResults() {
    const section = document.getElementById('resultsSection');
    section.hidden = false;

    const name = currentInput.name ? currentInput.name.trim() : '';
    document.getElementById('profileName').textContent = name || 'Matriks Anda';
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
        showToast('Hitung matriks terlebih dahulu.', 'error');
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
      if (confirm('Hapus semua profil tersimpan? Tindakan ini tidak dapat dibatalkan.')) {
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
