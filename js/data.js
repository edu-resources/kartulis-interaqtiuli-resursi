/**
 * დილა არის მშვენიერი - 8 ობიექტის მონაცემთა ბაზა და ვიქტორინის კითხვები
 * პირველი კლასის მოსწავლეებისთვის
 */

const NATURE_OBJECTS = {
  crane: {
    id: 'crane',
    name: 'წერო',
    syllables: ['წე', 'რო'],
    sentence: 'ეს არის წერო.',
    animationClass: 'crane-active',
    questions: [
      {
        question: 'რამდენი ფეხი აქვს წეროს?',
        answer: 'ორი'
      },
      {
        question: 'რას შვრება წერო ტბასთან?',
        answer: 'დადის'
      }
    ],
    svgThumb: `
      <svg viewBox="0 0 100 100" class="svg-thumb">
        <path d="M 50 65 Q 45 45 42 28 Q 48 26 58 35 Q 65 48 60 65 Z" fill="#f8fafc" stroke="#94a3b8" stroke-width="2"/>
        <path d="M 42 28 Q 38 18 35 15 Q 36 12 40 14 Q 44 20 44 26 Z" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.5"/>
        <path d="M 35 15 L 18 17 L 35 19 Z" fill="#f59e0b"/>
        <circle cx="37" cy="15" r="2" fill="#1e293b"/>
        <path d="M 52 50 Q 66 52 75 62 Q 62 68 50 62 Z" fill="#cbd5e1" stroke="#64748b" stroke-width="1.5"/>
        <path d="M 48 65 L 45 92" stroke="#ea580c" stroke-width="3" stroke-linecap="round"/>
        <path d="M 56 65 L 56 92" stroke="#ea580c" stroke-width="3" stroke-linecap="round"/>
        <path d="M 45 92 L 38 94 M 45 92 L 48 94" stroke="#ea580c" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M 56 92 L 50 94 M 56 92 L 60 94" stroke="#ea580c" stroke-width="2.5" stroke-linecap="round"/>
      </svg>
    `
  },
  owl: {
    id: 'owl',
    name: 'ბუ',
    syllables: ['ბუ'],
    sentence: 'ბუ ხეზე ზის.',
    animationClass: 'owl-active',
    questions: [
      {
        question: 'რომელ ხეზე ზის ბუ?',
        answer: 'მუხაზე'
      }
    ],
    svgThumb: `
      <svg viewBox="0 0 100 100" class="svg-thumb">
        <ellipse cx="50" cy="55" rx="28" ry="32" fill="#8d6e63" stroke="#5d4037" stroke-width="2"/>
        <ellipse cx="50" cy="62" rx="18" ry="20" fill="#d7ccc8"/>
        <!-- ყურები -->
        <polygon points="30,30 38,15 45,28" fill="#6d4c41"/>
        <polygon points="55,28 62,15 70,30" fill="#6d4c41"/>
        <!-- დიდი თვალები -->
        <circle cx="38" cy="42" r="11" fill="#fef08a" stroke="#f59e0b" stroke-width="2"/>
        <circle cx="62" cy="42" r="11" fill="#fef08a" stroke="#f59e0b" stroke-width="2"/>
        <circle cx="38" cy="42" r="5" fill="#1e293b"/>
        <circle cx="62" cy="42" r="5" fill="#1e293b"/>
        <circle cx="40" cy="40" r="1.5" fill="#ffffff"/>
        <circle cx="64" cy="40" r="1.5" fill="#ffffff"/>
        <!-- ნისკარტი -->
        <polygon points="46,48 54,48 50,56" fill="#f97316"/>
        <!-- ფრთები -->
        <path d="M 23 46 Q 16 65 30 75 Z" fill="#6d4c41"/>
        <path d="M 77 46 Q 84 65 70 75 Z" fill="#6d4c41"/>
        <!-- ბრჭყალები -->
        <circle cx="42" cy="86" r="3" fill="#f97316"/>
        <circle cx="58" cy="86" r="3" fill="#f97316"/>
      </svg>
    `
  },
  turtle: {
    id: 'turtle',
    name: 'კუ',
    syllables: ['კუ'],
    sentence: 'კუს ზურგზე მაგარი ბაკანი აქვს.',
    animationClass: 'turtle-active',
    questions: [
      {
        question: 'რა აქვს კუს ზურგზე?',
        answer: 'ბაკანი'
      }
    ],
    svgThumb: `
      <svg viewBox="0 0 100 100" class="svg-thumb">
        <!-- ფეხები და კუდი -->
        <ellipse cx="26" cy="62" rx="7" ry="5" fill="#84cc16"/>
        <ellipse cx="74" cy="62" rx="7" ry="5" fill="#84cc16"/>
        <ellipse cx="32" cy="74" rx="7" ry="4" fill="#65a30d"/>
        <ellipse cx="68" cy="74" rx="7" ry="4" fill="#65a30d"/>
        <polygon points="76,68 88,70 77,73" fill="#84cc16"/>
        <!-- თავი -->
        <circle cx="22" cy="54" r="9" fill="#84cc16" stroke="#4d7c0f" stroke-width="1.5"/>
        <circle cx="19" cy="52" r="2" fill="#1e293b"/>
        <!-- ბაკანი -->
        <ellipse cx="50" cy="58" rx="28" ry="20" fill="#4d7c0f" stroke="#365314" stroke-width="2.5"/>
        <path d="M 32 58 Q 50 44 68 58" stroke="#a3e635" stroke-width="2" fill="none"/>
        <line x1="42" y1="46" x2="42" y2="70" stroke="#a3e635" stroke-width="2"/>
        <line x1="58" y1="46" x2="58" y2="70" stroke="#a3e635" stroke-width="2"/>
      </svg>
    `
  },
  oak: {
    id: 'oak',
    name: 'მუხა',
    syllables: ['მუ', 'ხა'],
    sentence: 'მუხა დიდი ხეა.',
    animationClass: 'oak-active',
    questions: [
      {
        question: 'რა ნაყოფი ასხია მუხას?',
        answer: 'რკო'
      }
    ],
    svgThumb: `
      <svg viewBox="0 0 100 100" class="svg-thumb">
        <!-- ტანი -->
        <path d="M 44 95 L 42 55 Q 50 50 58 55 L 56 95 Z" fill="#6d4c41" stroke="#4e342e" stroke-width="2"/>
        <!-- დიდი მწვანე ვარჯი -->
        <circle cx="50" cy="35" r="24" fill="#15803d"/>
        <circle cx="32" cy="42" r="18" fill="#16a34a"/>
        <circle cx="68" cy="42" r="18" fill="#16a34a"/>
        <circle cx="38" cy="24" r="16" fill="#22c55e"/>
        <circle cx="62" cy="24" r="16" fill="#22c55e"/>
        <circle cx="50" cy="20" r="14" fill="#4ade80"/>
      </svg>
    `
  },
  acorn: {
    id: 'acorn',
    name: 'რკო',
    syllables: ['რკო'],
    sentence: 'რკო მუხის ნაყოფია.',
    animationClass: 'acorn-active',
    questions: [
      {
        question: 'რომელ ხეს ასხია რკო?',
        answer: 'მუხას'
      }
    ],
    svgThumb: `
      <svg viewBox="0 0 100 100" class="svg-thumb">
        <!-- ყუნწი -->
        <path d="M 50 20 Q 52 10 60 12" stroke="#5d4037" stroke-width="4" stroke-linecap="round" fill="none"/>
        <!-- ქუდი -->
        <path d="M 30 38 C 30 26, 70 26, 70 38 Z" fill="#5d4037" stroke="#3e2723" stroke-width="2"/>
        <circle cx="40" cy="32" r="1.5" fill="#8d6e63"/>
        <circle cx="50" cy="30" r="1.5" fill="#8d6e63"/>
        <circle cx="60" cy="32" r="1.5" fill="#8d6e63"/>
        <!-- ნაყოფი -->
        <path d="M 32 38 C 30 65, 45 84, 50 86 C 55 84, 70 65, 68 38 Z" fill="#b45309" stroke="#78350f" stroke-width="2"/>
        <path d="M 40 45 Q 38 65 48 76" stroke="#f59e0b" stroke-width="2" fill="none" opacity="0.6"/>
      </svg>
    `
  },
  branch: {
    id: 'branch',
    name: 'ტოტი',
    syllables: ['ტო', 'ტი'],
    sentence: 'ტოტზე ფოთლებია.',
    animationClass: 'branch-active',
    questions: [
      {
        question: 'რას ხედავ ტოტზე?',
        answer: 'ფოთლებს'
      }
    ],
    svgThumb: `
      <svg viewBox="0 0 100 100" class="svg-thumb">
        <!-- ხის ტოტი -->
        <path d="M 90 40 Q 60 46 40 45 Q 25 46 12 55" stroke="#795548" stroke-width="7" stroke-linecap="round" fill="none"/>
        <path d="M 45 45 Q 35 32 24 28" stroke="#795548" stroke-width="5" stroke-linecap="round" fill="none"/>
        <!-- მუხის ფოთლები -->
        <ellipse cx="22" cy="26" rx="8" ry="4" transform="rotate(-30 22 26)" fill="#22c55e" stroke="#15803d" stroke-width="1.5"/>
        <ellipse cx="38" cy="34" rx="8" ry="4" transform="rotate(20 38 34)" fill="#22c55e" stroke="#15803d" stroke-width="1.5"/>
        <ellipse cx="55" cy="40" rx="9" ry="5" transform="rotate(-25 55 40)" fill="#16a34a" stroke="#15803d" stroke-width="1.5"/>
        <ellipse cx="72" cy="46" rx="9" ry="5" transform="rotate(30 72 46)" fill="#4ade80" stroke="#15803d" stroke-width="1.5"/>
      </svg>
    `
  },
  violet: {
    id: 'violet',
    name: 'ია',
    syllables: ['ი', 'ა'],
    sentence: 'ია პატარა ყვავილია.',
    animationClass: 'violet-active',
    questions: [
      {
        question: 'რა ფერისაა იის ყვავილი?',
        answer: 'იისფერი'
      }
    ],
    svgThumb: `
      <svg viewBox="0 0 100 100" class="svg-thumb">
        <!-- ღერო და ფოთლები -->
        <path d="M 50 88 Q 50 65 50 50" stroke="#15803d" stroke-width="4" stroke-linecap="round" fill="none"/>
        <ellipse cx="36" cy="74" rx="14" ry="9" transform="rotate(-35 36 74)" fill="#22c55e" stroke="#15803d" stroke-width="1.5"/>
        <ellipse cx="64" cy="74" rx="14" ry="9" transform="rotate(35 64 74)" fill="#22c55e" stroke="#15803d" stroke-width="1.5"/>
        <!-- იისფერი ფურცლები -->
        <circle cx="42" cy="38" r="13" fill="#8b5cf6" stroke="#6d28d9" stroke-width="1.5"/>
        <circle cx="58" cy="38" r="13" fill="#8b5cf6" stroke="#6d28d9" stroke-width="1.5"/>
        <circle cx="36" cy="52" r="13" fill="#7c3aed" stroke="#5b21b6" stroke-width="1.5"/>
        <circle cx="64" cy="52" r="13" fill="#7c3aed" stroke="#5b21b6" stroke-width="1.5"/>
        <circle cx="50" cy="58" r="14" fill="#9333ea" stroke="#6b21a8" stroke-width="1.5"/>
        <!-- ყვითელი გული -->
        <circle cx="50" cy="48" r="7" fill="#facc15" stroke="#f59e0b" stroke-width="2"/>
      </svg>
    `
  },
  beehive: {
    id: 'beehive',
    name: 'სკა',
    syllables: ['სკა'],
    sentence: 'ფუტკრები სკაში ცხოვრობენ.',
    animationClass: 'beehive-active',
    questions: [
      {
        question: 'ვინ ცხოვრობს სკაში?',
        answer: 'ფუტკრები'
      }
    ],
    svgThumb: `
      <svg viewBox="0 0 100 100" class="svg-thumb">
        <!-- სკა ფენებად -->
        <path d="M 50 12 L 50 22" stroke="#795548" stroke-width="3"/>
        <ellipse cx="50" cy="28" rx="18" ry="8" fill="#fbbf24" stroke="#d97706" stroke-width="2"/>
        <ellipse cx="50" cy="40" rx="26" ry="10" fill="#f59e0b" stroke="#d97706" stroke-width="2"/>
        <ellipse cx="50" cy="54" rx="28" ry="11" fill="#fbbf24" stroke="#d97706" stroke-width="2"/>
        <ellipse cx="50" cy="68" rx="24" ry="10" fill="#f59e0b" stroke="#d97706" stroke-width="2"/>
        <ellipse cx="50" cy="78" rx="16" ry="7" fill="#d97706" stroke="#b45309" stroke-width="2"/>
        <!-- სკის შესასვლელი -->
        <ellipse cx="50" cy="56" rx="6" ry="7" fill="#451a03"/>
        <!-- პატარა ფუტკარი -->
        <ellipse cx="80" cy="36" rx="5" ry="3.5" fill="#facc15" stroke="#1e293b" stroke-width="1"/>
        <ellipse cx="78" cy="31" rx="3" ry="2" fill="#e0f2fe" opacity="0.8"/>
      </svg>
    `
  }
};

/**
 * ვიქტორინის კითხვების სია (დავალების რეჟიმი: „ვითამაშოთ“)
 * თითოეულ კითხვას აქვს 3 ილუსტრირებული საპასუხო ვარიანტი
 */
const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: 'რამდენი ფეხი აქვს წეროს?',
    options: [
      { label: 'ორი', objectKey: 'crane', isCorrect: true },
      { label: 'ოთხი', objectKey: 'turtle', isCorrect: false },
      { label: 'ექვსი', objectKey: 'beehive', isCorrect: false }
    ]
  },
  {
    id: 2,
    question: 'რომელ ხეზე ზის ბუ?',
    options: [
      { label: 'იის ბუჩქზე', objectKey: 'violet', isCorrect: false },
      { label: 'მუხაზე', objectKey: 'oak', isCorrect: true },
      { label: 'წყალში', objectKey: 'crane', isCorrect: false }
    ]
  },
  {
    id: 3,
    question: 'რა აქვს კუს ზურგზე?',
    options: [
      { label: 'ფრთები', objectKey: 'crane', isCorrect: false },
      { label: 'ბაკანი', objectKey: 'turtle', isCorrect: true },
      { label: 'ფოთლები', objectKey: 'branch', isCorrect: false }
    ]
  },
  {
    id: 4,
    question: 'რა ნაყოფი ასხია მუხას?',
    options: [
      { label: 'რკო', objectKey: 'acorn', isCorrect: true },
      { label: 'ია', objectKey: 'violet', isCorrect: false },
      { label: 'ვაშლი', objectKey: 'oak', isCorrect: false }
    ]
  },
  {
    id: 5,
    question: 'რომელ ხეს ასხია რკო?',
    options: [
      { label: 'მუხას', objectKey: 'oak', isCorrect: true },
      { label: 'ბალახს', objectKey: 'violet', isCorrect: false },
      { label: 'ლერწამს', objectKey: 'crane', isCorrect: false }
    ]
  },
  {
    id: 6,
    question: 'რას ხედავ ტოტზე?',
    options: [
      { label: 'ბაკანს', objectKey: 'turtle', isCorrect: false },
      { label: 'ტბას', objectKey: 'crane', isCorrect: false },
      { label: 'ფოთლებს', objectKey: 'branch', isCorrect: true }
    ]
  },
  {
    id: 7,
    question: 'რა ფერისაა იის ყვავილი?',
    options: [
      { label: 'მწვანე', objectKey: 'turtle', isCorrect: false },
      { label: 'იისფერი', objectKey: 'violet', isCorrect: true },
      { label: 'ყავისფერი', objectKey: 'acorn', isCorrect: false }
    ]
  },
  {
    id: 8,
    question: 'ვინ ცხოვრობს სკაში?',
    options: [
      { label: 'ფუტკრები', objectKey: 'beehive', isCorrect: true },
      { label: 'წეროები', objectKey: 'crane', isCorrect: false },
      { label: 'კუები', objectKey: 'turtle', isCorrect: false }
    ]
  }
];
