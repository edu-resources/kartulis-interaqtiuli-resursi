/**
 * დილა არის მშვენიერი & ქართული ენა 1-ლი კლასი
 * საგანმანათლებლო რესურსების მონაცემთა ბაზა
 * ადაპტირებული წერა-კითხვის არმცოდნე პირველკლასელებისთვის
 */

// 1. ბუნების 8 ობიექტი („დილა არის მშვენიერი“)
const OBJECT_SEQUENCE = ['crane', 'owl', 'turtle', 'oak', 'acorn', 'branch', 'violet', 'beehive'];

const NATURE_OBJECTS = {
  crane: {
    id: 'crane',
    name: 'წერო',
    audioKey: 'crane',
    soundType: 'crane',
    syllables: ['წე', 'რო'],
    sentence: 'წერო ტბასთან დგას.',
    fullSpeech: 'ეს არის წერო. წერო ტბასთან დგას. წერო. წე... რო...',
    animationClass: 'crane-active',
    svgThumb: `
      <svg viewBox="0 0 100 100" class="svg-thumb" aria-hidden="true">
        <path d="M 50 65 Q 45 45 42 28 Q 48 26 58 35 Q 65 48 60 65 Z" fill="#f8fafc" stroke="#94a3b8" stroke-width="2"/>
        <path d="M 42 28 Q 38 18 35 15 Q 36 12 40 14 Q 44 20 44 26 Z" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.5"/>
        <path d="M 35 15 L 18 17 L 35 19 Z" fill="#f59e0b"/>
        <circle cx="37" cy="15" r="2.5" fill="#1e293b"/>
        <path d="M 35 12 Q 38 8 42 13" stroke="#ef4444" stroke-width="2" fill="none"/>
        <path d="M 52 50 Q 66 52 75 62 Q 62 68 50 62 Z" fill="#cbd5e1" stroke="#64748b" stroke-width="1.5"/>
        <path d="M 48 65 L 45 92" stroke="#ea580c" stroke-width="3.5" stroke-linecap="round"/>
        <path d="M 56 65 L 56 92" stroke="#ea580c" stroke-width="3.5" stroke-linecap="round"/>
        <path d="M 45 92 L 38 94 M 45 92 L 48 94" stroke="#ea580c" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M 56 92 L 50 94 M 56 92 L 60 94" stroke="#ea580c" stroke-width="2.5" stroke-linecap="round"/>
      </svg>
    `
  },
  owl: {
    id: 'owl',
    name: 'ბუ',
    audioKey: 'owl',
    soundType: 'owl',
    syllables: ['ბუ'],
    sentence: 'ბუ ხეზე ზის.',
    fullSpeech: 'ეს არის ბუ. ბუ ხეზე ზის და ღამით ფხიზლობს. ბუ. ბუ...',
    animationClass: 'owl-active',
    svgThumb: `
      <svg viewBox="0 0 100 100" class="svg-thumb" aria-hidden="true">
        <ellipse cx="50" cy="55" rx="28" ry="32" fill="#8d6e63" stroke="#5d4037" stroke-width="2"/>
        <ellipse cx="50" cy="62" rx="18" ry="20" fill="#d7ccc8"/>
        <polygon points="30,30 38,15 45,28" fill="#6d4c41"/>
        <polygon points="55,28 62,15 70,30" fill="#6d4c41"/>
        <circle cx="38" cy="42" r="11" fill="#fef08a" stroke="#f59e0b" stroke-width="2"/>
        <circle cx="62" cy="42" r="11" fill="#fef08a" stroke="#f59e0b" stroke-width="2"/>
        <circle cx="38" cy="42" r="5" fill="#1e293b"/>
        <circle cx="62" cy="42" r="5" fill="#1e293b"/>
        <circle cx="40" cy="40" r="1.5" fill="#ffffff"/>
        <circle cx="64" cy="40" r="1.5" fill="#ffffff"/>
        <polygon points="46,48 54,48 50,56" fill="#f97316"/>
        <path d="M 23 46 Q 16 65 30 75 Z" fill="#6d4c41"/>
        <path d="M 77 46 Q 84 65 70 75 Z" fill="#6d4c41"/>
        <circle cx="42" cy="86" r="3.5" fill="#f97316"/>
        <circle cx="58" cy="86" r="3.5" fill="#f97316"/>
      </svg>
    `
  },
  turtle: {
    id: 'turtle',
    name: 'კუ',
    audioKey: 'turtle',
    soundType: null,
    syllables: ['კუ'],
    sentence: 'კუს ზურგზე მაგარი ბაკანი აქვს.',
    fullSpeech: 'ეს არის კუ. კუს ზურგზე მაგარი ბაკანი აქვს და ნელა დადის. კუ. კუ...',
    animationClass: 'turtle-active',
    svgThumb: `
      <svg viewBox="0 0 100 100" class="svg-thumb" aria-hidden="true">
        <ellipse cx="26" cy="62" rx="7" ry="5" fill="#84cc16"/>
        <ellipse cx="74" cy="62" rx="7" ry="5" fill="#84cc16"/>
        <ellipse cx="32" cy="74" rx="7" ry="4" fill="#65a30d"/>
        <ellipse cx="68" cy="74" rx="7" ry="4" fill="#65a30d"/>
        <polygon points="76,68 88,70 77,73" fill="#84cc16"/>
        <circle cx="22" cy="54" r="9" fill="#84cc16" stroke="#4d7c0f" stroke-width="1.5"/>
        <circle cx="19" cy="52" r="2.5" fill="#1e293b"/>
        <circle cx="20" cy="51" r="0.8" fill="#ffffff"/>
        <ellipse cx="50" cy="58" rx="28" ry="20" fill="#4d7c0f" stroke="#365314" stroke-width="2.5"/>
        <path d="M 32 58 Q 50 44 68 58" stroke="#a3e635" stroke-width="2.5" fill="none"/>
        <line x1="42" y1="46" x2="42" y2="70" stroke="#a3e635" stroke-width="2.5"/>
        <line x1="58" y1="46" x2="58" y2="70" stroke="#a3e635" stroke-width="2.5"/>
      </svg>
    `
  },
  oak: {
    id: 'oak',
    name: 'მუხა',
    audioKey: 'oak',
    soundType: null,
    syllables: ['მუ', 'ხა'],
    sentence: 'მუხა დიდი და ძლიერი ხეა.',
    fullSpeech: 'ეს არის მუხა. მუხა დიდი და ძლიერი ხეა. მუხა. მუ... ხა...',
    animationClass: 'oak-active',
    svgThumb: `
      <svg viewBox="0 0 100 100" class="svg-thumb" aria-hidden="true">
        <path d="M 44 95 L 42 55 Q 50 50 58 55 L 56 95 Z" fill="#6d4c41" stroke="#4e342e" stroke-width="2"/>
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
    audioKey: 'acorn',
    soundType: null,
    syllables: ['რკო'],
    sentence: 'რკო მუხის ნაყოფია.',
    fullSpeech: 'ეს არის რკო. რკო მუხის ნაყოფია. რკო. რკო...',
    animationClass: 'acorn-active',
    svgThumb: `
      <svg viewBox="0 0 100 100" class="svg-thumb" aria-hidden="true">
        <path d="M 50 20 Q 52 10 60 12" stroke="#5d4037" stroke-width="4" stroke-linecap="round" fill="none"/>
        <path d="M 30 38 C 30 26, 70 26, 70 38 Z" fill="#5d4037" stroke="#3e2723" stroke-width="2"/>
        <circle cx="40" cy="32" r="1.5" fill="#8d6e63"/>
        <circle cx="50" cy="30" r="1.5" fill="#8d6e63"/>
        <circle cx="60" cy="32" r="1.5" fill="#8d6e63"/>
        <path d="M 32 38 C 30 65, 45 84, 50 86 C 55 84, 70 65, 68 38 Z" fill="#b45309" stroke="#78350f" stroke-width="2"/>
        <path d="M 40 45 Q 38 65 48 76" stroke="#f59e0b" stroke-width="2" fill="none" opacity="0.6"/>
      </svg>
    `
  },
  branch: {
    id: 'branch',
    name: 'ტოტი',
    audioKey: 'branch',
    soundType: null,
    syllables: ['ტო', 'ტი'],
    sentence: 'ტოტზე მწვანე ფოთლებია.',
    fullSpeech: 'ეს არის ტოტი. ტოტზე მწვანე ფოთლებია. ტოტი. ტო... ტი...',
    animationClass: 'branch-active',
    svgThumb: `
      <svg viewBox="0 0 100 100" class="svg-thumb" aria-hidden="true">
        <path d="M 90 40 Q 60 46 40 45 Q 25 46 12 55" stroke="#795548" stroke-width="7" stroke-linecap="round" fill="none"/>
        <path d="M 45 45 Q 35 32 24 28" stroke="#795548" stroke-width="5" stroke-linecap="round" fill="none"/>
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
    audioKey: 'violet',
    soundType: null,
    syllables: ['ი', 'ა'],
    sentence: 'ია სათუთი, იისფერი ყვავილია.',
    fullSpeech: 'ეს არის ია. ია სათუთი, იისფერი ყვავილია. ია. ი... ა...',
    animationClass: 'violet-active',
    svgThumb: `
      <svg viewBox="0 0 100 100" class="svg-thumb" aria-hidden="true">
        <path d="M 50 88 Q 50 65 50 50" stroke="#15803d" stroke-width="4" stroke-linecap="round" fill="none"/>
        <ellipse cx="36" cy="74" rx="14" ry="9" transform="rotate(-35 36 74)" fill="#22c55e" stroke="#15803d" stroke-width="1.5"/>
        <ellipse cx="64" cy="74" rx="14" ry="9" transform="rotate(35 64 74)" fill="#22c55e" stroke="#15803d" stroke-width="1.5"/>
        <circle cx="42" cy="38" r="12" fill="#8b5cf6" stroke="#6d28d9" stroke-width="1.5"/>
        <circle cx="58" cy="38" r="12" fill="#8b5cf6" stroke="#6d28d9" stroke-width="1.5"/>
        <circle cx="36" cy="52" r="12" fill="#7c3aed" stroke="#5b21b6" stroke-width="1.5"/>
        <circle cx="64" cy="52" r="12" fill="#7c3aed" stroke="#5b21b6" stroke-width="1.5"/>
        <circle cx="50" cy="58" r="13" fill="#9333ea" stroke="#6b21a8" stroke-width="1.5"/>
        <circle cx="50" cy="48" r="6.5" fill="#facc15" stroke="#f59e0b" stroke-width="2"/>
      </svg>
    `
  },
  beehive: {
    id: 'beehive',
    name: 'სკა',
    audioKey: 'beehive',
    soundType: 'bee',
    syllables: ['სკა'],
    sentence: 'მშრომელი ფუტკრები სკაში ცხოვრობენ.',
    fullSpeech: 'ეს არის სკა. მშრომელი ფუტკრები სკაში ცხოვრობენ და ტკბილ თაფლს აკეთებენ. სკა. სკა...',
    animationClass: 'beehive-active',
    svgThumb: `
      <svg viewBox="0 0 100 100" class="svg-thumb" aria-hidden="true">
        <path d="M 50 12 L 50 22" stroke="#795548" stroke-width="3"/>
        <ellipse cx="50" cy="28" rx="18" ry="8" fill="#fbbf24" stroke="#d97706" stroke-width="2"/>
        <ellipse cx="50" cy="40" rx="26" ry="10" fill="#f59e0b" stroke="#d97706" stroke-width="2"/>
        <ellipse cx="50" cy="54" rx="28" ry="11" fill="#fbbf24" stroke="#d97706" stroke-width="2"/>
        <ellipse cx="50" cy="68" rx="24" ry="10" fill="#f59e0b" stroke="#d97706" stroke-width="2"/>
        <ellipse cx="50" cy="78" rx="16" ry="7" fill="#d97706" stroke="#b45309" stroke-width="2"/>
        <ellipse cx="50" cy="56" rx="6" ry="7" fill="#451a03"/>
        <ellipse cx="80" cy="36" rx="5" ry="3.5" fill="#facc15" stroke="#1e293b" stroke-width="1"/>
        <ellipse cx="78" cy="31" rx="3" ry="2" fill="#e0f2fe" opacity="0.8"/>
      </svg>
    `
  }
};

// 2. ცხოველებისა და ფრინველების ხმოვანი გალერეა (10 პერსონაჟი რეალური ხმებით)
const ANIMALS_GALLERY = {
  owl: {
    id: 'owl',
    name: 'ბუ',
    audioKey: 'animal_owl',
    soundType: 'owl',
    soundLabel: 'ჰუუ... ჰუუ...',
    syllables: ['ბუ'],
    description: 'ბუ ღამის ფრინველია და ხეზე ზის.',
    fullSpeech: 'ეს არის ბუ! ბუ გამოსცემს ხმას: ჰუუ, ჰუუ...',
    svgThumb: NATURE_OBJECTS.owl.svgThumb
  },
  bird: {
    id: 'bird',
    name: 'მერცხალი / ჩიტი',
    audioKey: 'animal_bird',
    soundType: 'bird',
    soundLabel: 'ჭიკ-ჭიკ-ჭიკ!',
    syllables: ['მერ', 'ცხა', 'ლი'],
    description: 'მერცხალი გაზაფხულის ჩიტია და ტკბილად გალობს.',
    fullSpeech: 'ეს არის მერცხალი! ჩიტი გალობს: ჭიკ-ჭიკ, ჭიკ-ჭიკ!',
    svgThumb: `
      <svg viewBox="0 0 100 100" class="svg-thumb" aria-hidden="true">
        <path d="M 20 50 Q 40 40 60 52 Q 80 65 92 80 Q 75 70 65 72 L 55 60 Z" fill="#1e293b"/>
        <path d="M 40 45 Q 60 30 80 20 Q 60 45 45 52 Z" fill="#334155"/>
        <ellipse cx="32" cy="42" rx="14" ry="11" fill="#1e293b"/>
        <circle cx="28" cy="40" r="2.5" fill="#ffffff"/>
        <circle cx="27" cy="40" r="1.2" fill="#0f172a"/>
        <polygon points="18,42 26,38 26,45" fill="#f59e0b"/>
        <path d="M 26 46 Q 32 50 36 46" stroke="#dc2626" stroke-width="2.5" fill="none"/>
        <ellipse cx="45" cy="55" rx="16" ry="10" fill="#f8fafc"/>
      </svg>
    `
  },
  frog: {
    id: 'frog',
    name: 'ბაყაყი',
    audioKey: 'animal_frog',
    soundType: 'frog',
    soundLabel: 'ყვა-ყვა-ყვა!',
    syllables: ['ბა', 'ყა', 'ყი'],
    description: 'ბაყაყი ტბის პირას ხტუნავს და ყიყინებს.',
    fullSpeech: 'ეს არის ბაყაყი! ბაყაყი ყიყინებს: ყვა, ყვა, ყვა!',
    svgThumb: `
      <svg viewBox="0 0 100 100" class="svg-thumb" aria-hidden="true">
        <ellipse cx="50" cy="62" rx="30" ry="22" fill="#4ade80" stroke="#16a34a" stroke-width="2"/>
        <ellipse cx="50" cy="66" rx="20" ry="14" fill="#bbf7d0"/>
        <!-- დიდი თვალები -->
        <circle cx="34" cy="38" r="13" fill="#4ade80" stroke="#16a34a" stroke-width="2"/>
        <circle cx="66" cy="38" r="13" fill="#4ade80" stroke="#16a34a" stroke-width="2"/>
        <circle cx="34" cy="38" r="7" fill="#facc15"/>
        <circle cx="66" cy="38" r="7" fill="#facc15"/>
        <circle cx="34" cy="38" r="3.5" fill="#0f172a"/>
        <circle cx="66" cy="38" r="3.5" fill="#0f172a"/>
        <!-- ღიმილი -->
        <path d="M 32 58 Q 50 72 68 58" stroke="#15803d" stroke-width="3" fill="none" stroke-linecap="round"/>
        <!-- თათები -->
        <ellipse cx="20" cy="74" rx="8" ry="4" fill="#22c55e"/>
        <ellipse cx="80" cy="74" rx="8" ry="4" fill="#22c55e"/>
      </svg>
    `
  },
  bee: {
    id: 'bee',
    name: 'ფუტკარი',
    audioKey: 'animal_bee',
    soundType: 'bee',
    soundLabel: 'ბზზზ-ბზზზ!',
    syllables: ['ფუტ', 'კა', 'რი'],
    description: 'ფუტკარი ყვავილიდან ყვავილზე დაფრინავს და ბზუის.',
    fullSpeech: 'ეს არის მშრომელი ფუტკარი! ფუტკარი ბზუის: ბზზზ, ბზზზ!',
    svgThumb: `
      <svg viewBox="0 0 100 100" class="svg-thumb" aria-hidden="true">
        <!-- ფრთები -->
        <ellipse cx="40" cy="32" rx="14" ry="9" transform="rotate(-30 40 32)" fill="#e0f2fe" stroke="#38bdf8" stroke-width="1.5" opacity="0.85"/>
        <ellipse cx="60" cy="32" rx="14" ry="9" transform="rotate(30 60 32)" fill="#e0f2fe" stroke="#38bdf8" stroke-width="1.5" opacity="0.85"/>
        <!-- ტანი ზოლებით -->
        <ellipse cx="50" cy="58" rx="22" ry="17" fill="#facc15" stroke="#ca8a04" stroke-width="2"/>
        <path d="M 42 42 L 42 74" stroke="#1e293b" stroke-width="4"/>
        <path d="M 52 41 L 52 75" stroke="#1e293b" stroke-width="4"/>
        <path d="M 62 43 L 62 73" stroke="#1e293b" stroke-width="4"/>
        <!-- თავი და თვალები -->
        <circle cx="28" cy="55" r="11" fill="#1e293b"/>
        <circle cx="25" cy="52" r="2.5" fill="#ffffff"/>
        <!-- ულვაშები -->
        <path d="M 22 46 Q 16 38 18 34" stroke="#1e293b" stroke-width="2" fill="none" stroke-linecap="round"/>
        <path d="M 26 46 Q 24 36 28 32" stroke="#1e293b" stroke-width="2" fill="none" stroke-linecap="round"/>
        <!-- ნესტარი -->
        <polygon points="72,56 82,58 72,60" fill="#1e293b"/>
      </svg>
    `
  },
  cat: {
    id: 'cat',
    name: 'კატა / კნუტი',
    audioKey: 'animal_cat',
    soundType: 'cat',
    soundLabel: 'მიაუუ...',
    syllables: ['კა', 'ტა'],
    description: 'კატა ფაფუკი და საყვარელი ცხოველია.',
    fullSpeech: 'ეს არის კატა! კატა კნავის: მიაუ, მიაუ...',
    svgThumb: `
      <svg viewBox="0 0 100 100" class="svg-thumb" aria-hidden="true">
        <!-- ყურები -->
        <polygon points="26,38 32,18 46,32" fill="#fb923c" stroke="#ea580c" stroke-width="1.5"/>
        <polygon points="54,32 68,18 74,38" fill="#fb923c" stroke="#ea580c" stroke-width="1.5"/>
        <polygon points="30,34 34,22 42,32" fill="#fecdd3"/>
        <polygon points="58,32 66,22 70,34" fill="#fecdd3"/>
        <!-- თავი -->
        <circle cx="50" cy="50" r="24" fill="#fb923c" stroke="#ea580c" stroke-width="2"/>
        <!-- თვალები -->
        <ellipse cx="40" cy="46" rx="4.5" ry="5.5" fill="#22c55e"/>
        <ellipse cx="60" cy="46" rx="4.5" ry="5.5" fill="#22c55e"/>
        <ellipse cx="40" cy="46" rx="1.5" ry="4" fill="#0f172a"/>
        <ellipse cx="60" cy="46" rx="1.5" ry="4" fill="#0f172a"/>
        <!-- ცხვირი და პირი -->
        <polygon points="48,54 52,54 50,57" fill="#f43f5e"/>
        <path d="M 45 59 Q 50 62 55 59" stroke="#7c2d12" stroke-width="2" fill="none"/>
        <!-- ულვაშები -->
        <line x1="28" y1="52" x2="16" y2="50" stroke="#7c2d12" stroke-width="1.5"/>
        <line x1="28" y1="56" x2="16" y2="58" stroke="#7c2d12" stroke-width="1.5"/>
        <line x1="72" y1="52" x2="84" y2="50" stroke="#7c2d12" stroke-width="1.5"/>
        <line x1="72" y1="56" x2="84" y2="58" stroke="#7c2d12" stroke-width="1.5"/>
      </svg>
    `
  },
  dog: {
    id: 'dog',
    name: 'ძაღლი / ლეკვი',
    audioKey: 'animal_dog',
    soundType: 'dog',
    soundLabel: 'ჰავ-ჰავ!',
    syllables: ['ძაღ', 'ლი'],
    description: 'ძაღლი ადამიანის ერთგული მეგობარია.',
    fullSpeech: 'ეს არის ძაღლი! ერთგული ძაღლი ყეფს: ჰავ, ჰავ!',
    svgThumb: `
      <svg viewBox="0 0 100 100" class="svg-thumb" aria-hidden="true">
        <!-- ჩამოყრილი ყურები -->
        <path d="M 28 32 C 16 34, 14 55, 24 60 C 30 62, 34 50, 32 36 Z" fill="#8d6e63" stroke="#5d4037" stroke-width="1.5"/>
        <path d="M 72 32 C 84 34, 86 55, 76 60 C 70 62, 66 50, 68 36 Z" fill="#8d6e63" stroke="#5d4037" stroke-width="1.5"/>
        <!-- თავი -->
        <ellipse cx="50" cy="48" rx="25" ry="23" fill="#d7ccc8" stroke="#8d6e63" stroke-width="2"/>
        <!-- თვალები -->
        <circle cx="41" cy="42" r="4.5" fill="#3e2723"/>
        <circle cx="59" cy="42" r="4.5" fill="#3e2723"/>
        <circle cx="42.5" cy="40.5" r="1.5" fill="#ffffff"/>
        <circle cx="60.5" cy="40.5" r="1.5" fill="#ffffff"/>
        <!-- დრუნჩი და ცხვირი -->
        <ellipse cx="50" cy="56" rx="12" ry="9" fill="#f5ebe0"/>
        <ellipse cx="50" cy="52" rx="5" ry="3.5" fill="#1e293b"/>
        <path d="M 46 58 Q 50 62 54 58" stroke="#3e2723" stroke-width="2" fill="none"/>
        <!-- ენა -->
        <path d="M 48 60 Q 50 66 52 60 Z" fill="#f43f5e"/>
      </svg>
    `
  },
  rooster: {
    id: 'rooster',
    name: 'მამალი',
    audioKey: 'animal_rooster',
    soundType: 'rooster',
    soundLabel: 'ყიყლიყოოო!',
    syllables: ['მა', 'მა', 'ლი'],
    description: 'მამალი დილაადრიან იღვიძებს და ყივის.',
    fullSpeech: 'ეს არის მამალი! მამალი ყივის: ყიყლიყოო!',
    svgThumb: `
      <svg viewBox="0 0 100 100" class="svg-thumb" aria-hidden="true">
        <!-- კუდი -->
        <path d="M 65 65 Q 85 45 88 28 Q 78 50 60 58 Z" fill="#15803d"/>
        <path d="M 68 68 Q 95 60 92 42 Q 80 62 62 64 Z" fill="#0369a1"/>
        <!-- ტანი -->
        <ellipse cx="52" cy="62" rx="20" ry="16" fill="#ea580c"/>
        <!-- კისერი და თავი -->
        <path d="M 40 60 Q 32 45 35 34 Q 45 42 48 58 Z" fill="#f59e0b"/>
        <circle cx="35" cy="34" r="8" fill="#f59e0b"/>
        <circle cx="33" cy="32" r="2" fill="#0f172a"/>
        <!-- ნისკარტი -->
        <polygon points="28,34 20,37 28,39" fill="#eab308"/>
        <!-- წითელი ბიბილო და ღაბაბი -->
        <path d="M 32 26 Q 30 18 36 20 Q 40 16 42 24 Z" fill="#ef4444"/>
        <path d="M 28 39 Q 26 47 32 44 Z" fill="#ef4444"/>
        <!-- ფეხები -->
        <line x1="48" y1="78" x2="46" y2="92" stroke="#d97706" stroke-width="3"/>
        <line x1="56" y1="78" x2="58" y2="92" stroke="#d97706" stroke-width="3"/>
      </svg>
    `
  },
  sheep: {
    id: 'sheep',
    name: 'ცხვარი / ბატკანი',
    audioKey: 'animal_sheep',
    soundType: 'sheep',
    soundLabel: 'ბეე-ეე...',
    syllables: ['ცხვა', 'რი'],
    description: 'ბატკანი მწვანე მინდორზე დარბის და ბღავის.',
    fullSpeech: 'ეს არის საყვარელი ცხვარი! ცხვარი ბღავის: ბეე, ბეე!',
    svgThumb: `
      <svg viewBox="0 0 100 100" class="svg-thumb" aria-hidden="true">
        <!-- ფაფუკი მატყლი (ღრუბლისებრი წრეები) -->
        <circle cx="45" cy="50" r="14" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
        <circle cx="60" cy="50" r="14" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
        <circle cx="52" cy="62" rx="16" ry="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
        <circle cx="52" cy="40" r="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
        <!-- თავი -->
        <ellipse cx="32" cy="50" rx="11" ry="9" fill="#1e293b"/>
        <!-- ყურები -->
        <ellipse cx="36" cy="42" rx="7" ry="3.5" transform="rotate(-30 36 42)" fill="#1e293b"/>
        <!-- თვალი -->
        <circle cx="28" cy="48" r="2" fill="#ffffff"/>
        <circle cx="28" cy="48" r="1" fill="#000000"/>
        <!-- ფეხები -->
        <line x1="42" y1="72" x2="42" y2="88" stroke="#1e293b" stroke-width="3.5" stroke-linecap="round"/>
        <line x1="62" y1="72" x2="62" y2="88" stroke="#1e293b" stroke-width="3.5" stroke-linecap="round"/>
      </svg>
    `
  },
  duck: {
    id: 'duck',
    name: 'იხვი / ბატი',
    audioKey: 'animal_duck',
    soundType: 'duck',
    soundLabel: 'ყვა-ყვა!',
    syllables: ['იხ', 'ვი'],
    description: 'იხვი ტბაში მხიარულად ცურავს.',
    fullSpeech: 'ეს არის იხვი! იხვი ცურავს ტბაში და ყიყინებს: ყვა, ყვა!',
    svgThumb: `
      <svg viewBox="0 0 100 100" class="svg-thumb" aria-hidden="true">
        <!-- ტანი ტბის წყალზე -->
        <path d="M 32 60 C 25 70, 60 76, 75 66 C 85 58, 80 50, 68 52 C 55 54, 40 50, 32 60 Z" fill="#fbbf24" stroke="#d97706" stroke-width="2"/>
        <!-- ფრთა -->
        <path d="M 48 58 Q 62 55 68 64 Q 56 68 48 58 Z" fill="#f59e0b"/>
        <!-- თავი -->
        <circle cx="34" cy="44" r="12" fill="#fbbf24" stroke="#d97706" stroke-width="2"/>
        <circle cx="31" cy="42" r="2" fill="#1e293b"/>
        <!-- ნისკარტი -->
        <path d="M 24 45 L 10 47 Q 16 52 24 50 Z" fill="#f97316"/>
        <!-- ტალღა -->
        <path d="M 20 74 Q 50 78 85 74" stroke="#38bdf8" stroke-width="3" fill="none" stroke-linecap="round"/>
      </svg>
    `
  },
  bear: {
    id: 'bear',
    name: 'დათვი / ბელი',
    audioKey: 'animal_bear',
    soundType: 'bear',
    soundLabel: 'გრრრ...',
    syllables: ['დათ', 'ვი'],
    description: 'დათვი ტყეში ცხოვრობს და ჟოლოს გეახლება.',
    fullSpeech: 'ეს არის კეთილი დათვი! დათვი ბრდღვინავს: გრრრ, გრრრ!',
    svgThumb: `
      <svg viewBox="0 0 100 100" class="svg-thumb" aria-hidden="true">
        <!-- მრგვალი ყურები -->
        <circle cx="32" cy="30" r="9" fill="#6d4c41" stroke="#4e342e" stroke-width="1.5"/>
        <circle cx="68" cy="30" r="9" fill="#6d4c41" stroke="#4e342e" stroke-width="1.5"/>
        <circle cx="32" cy="30" r="5" fill="#a1887f"/>
        <circle cx="68" cy="30" r="5" fill="#a1887f"/>
        <!-- თავი -->
        <ellipse cx="50" cy="52" rx="26" ry="24" fill="#795548" stroke="#4e342e" stroke-width="2"/>
        <!-- თვალები -->
        <circle cx="40" cy="46" r="3.5" fill="#1e293b"/>
        <circle cx="60" cy="46" r="3.5" fill="#1e293b"/>
        <circle cx="41" cy="45" r="1" fill="#ffffff"/>
        <circle cx="61" cy="45" r="1" fill="#ffffff"/>
        <!-- დრუნჩი -->
        <ellipse cx="50" cy="60" rx="14" ry="10" fill="#d7ccc8"/>
        <ellipse cx="50" cy="56" rx="6" ry="4" fill="#3e2723"/>
        <path d="M 46 63 Q 50 67 54 63" stroke="#3e2723" stroke-width="2.5" fill="none"/>
      </svg>
    `
  }
};

// 3. ანიმაციური მოთხრობები სახელმძღვანელოდან
const STORIES_DATA = {
  'ai-ia': {
    id: 'ai-ia',
    title: 'აი ია',
    subtitle: 'იაკობ გოგებაშვილის პირველი გაკვეთილი',
    badge: '🌸 მოთხრობა',
    audioKey: 'story_ai_ia',
    steps: [
      {
        step: 1,
        title: 'გაზაფხულის დილა',
        speech: 'გაზაფხულის მშვენიერი დილა გათენდა. მზემ გაათბო მწვანე მინდორი.',
        soundType: 'bird',
        svgScene: `
          <svg viewBox="0 0 600 380" class="story-stage-svg">
            <rect width="600" height="380" fill="#bae6fd"/>
            <!-- მზე -->
            <g transform="translate(100, 90)" class="anim-sun-group">
              <circle cx="0" cy="0" r="45" fill="#facc15" stroke="#f59e0b" stroke-width="3"/>
              <ellipse cx="-12" cy="-6" rx="4" ry="5" fill="#78350f"/>
              <ellipse cx="12" cy="-6" rx="4" ry="5" fill="#78350f"/>
              <path d="M -12 12 Q 0 24 12 12" stroke="#78350f" stroke-width="3" fill="none"/>
            </g>
            <!-- ბორცვები -->
            <path d="M 0 240 Q 200 180 400 230 Q 500 210 600 240 L 600 380 L 0 380 Z" fill="#86efac"/>
            <path d="M 0 280 Q 250 240 600 280 L 600 380 L 0 380 Z" fill="#22c55e"/>
            <!-- ჩიტები ცაში -->
            <path d="M 280 80 Q 290 70 300 80 Q 310 70 320 80" stroke="#0284c7" stroke-width="3" fill="none" stroke-linecap="round"/>
            <path d="M 380 110 Q 390 100 400 110 Q 410 100 420 110" stroke="#0284c7" stroke-width="2.5" fill="none" stroke-linecap="round"/>
          </svg>
        `
      },
      {
        step: 2,
        title: 'ამოვიდა ია',
        speech: 'ბალახებიდან ამოიწვერა ნაზი, ლამაზი ყვავილი — ია. იას მოფრინდა ფერადი პეპელა!',
        soundType: null,
        svgScene: `
          <svg viewBox="0 0 600 380" class="story-stage-svg">
            <rect width="600" height="380" fill="#bae6fd"/>
            <path d="M 0 260 Q 300 230 600 260 L 600 380 L 0 380 Z" fill="#22c55e"/>
            <!-- ია ცენტრში იზრდება და იფურჩქნება -->
            <g transform="translate(300, 260)" class="anim-flower-bloom">
              <path d="M 0 50 Q -5 20 0 0" stroke="#15803d" stroke-width="6" fill="none" stroke-linecap="round"/>
              <ellipse cx="-20" cy="30" rx="18" ry="10" transform="rotate(-30 -20 30)" fill="#16a34a"/>
              <ellipse cx="20" cy="30" rx="18" ry="10" transform="rotate(30 20 30)" fill="#16a34a"/>
              <!-- ფურცლები -->
              <circle cx="-14" cy="-14" r="16" fill="#8b5cf6"/>
              <circle cx="14" cy="-14" r="16" fill="#8b5cf6"/>
              <circle cx="-16" cy="6" r="16" fill="#7c3aed"/>
              <circle cx="16" cy="6" r="16" fill="#7c3aed"/>
              <circle cx="0" cy="14" r="17" fill="#9333ea"/>
              <circle cx="0" cy="0" r="9" fill="#facc15" stroke="#f59e0b" stroke-width="2"/>
            </g>
            <!-- პეპელა დაფრინავს -->
            <g transform="translate(380, 160)" class="anim-butterfly-flutter">
              <ellipse cx="0" cy="0" rx="4" ry="12" fill="#1e293b"/>
              <ellipse cx="-16" cy="-8" rx="14" ry="10" transform="rotate(-20 -16 -8)" fill="#f43f5e" opacity="0.9"/>
              <ellipse cx="16" cy="-8" rx="14" ry="10" transform="rotate(20 16 -8)" fill="#f43f5e" opacity="0.9"/>
              <ellipse cx="-12" cy="8" rx="10" ry="7" fill="#fb923c" opacity="0.9"/>
              <ellipse cx="12" cy="8" rx="10" ry="7" fill="#fb923c" opacity="0.9"/>
            </g>
          </svg>
        `
      },
      {
        step: 3,
        title: 'აი ია!',
        speech: 'დედა და პატარა ბავშვი ყვავილს მიუახლოვდნენ. ბავშვმა გახარებულმა წამოიძახა: აი ია! დედა, აი ია!',
        soundType: 'bird',
        svgScene: `
          <svg viewBox="0 0 600 380" class="story-stage-svg">
            <rect width="600" height="380" fill="#bae6fd"/>
            <path d="M 0 260 Q 300 240 600 260 L 600 380 L 0 380 Z" fill="#22c55e"/>
            <!-- დედა -->
            <g transform="translate(180, 180)">
              <circle cx="0" cy="-45" r="22" fill="#fed7aa"/>
              <!-- თმა -->
              <path d="M -22 -55 Q 0 -75 22 -55 Q 24 -35 18 -25 Q -18 -25 -22 -55 Z" fill="#78350f"/>
              <!-- კაბა -->
              <path d="M -24 -15 L 24 -15 L 36 90 L -36 90 Z" fill="#0284c7"/>
            </g>
            <!-- ბავშვი, რომელიც ხელს იშვერს ყვავილისკენ -->
            <g transform="translate(280, 210)" class="anim-child-point">
              <circle cx="0" cy="-35" r="18" fill="#fed7aa"/>
              <path d="M -18 -45 Q 0 -60 18 -45 Z" fill="#b45309"/>
              <rect x="-16" y="-12" width="32" height="60" rx="8" fill="#e11d48"/>
              <!-- გამოწვდილი ხელი -->
              <line x1="12" y1="5" x2="65" y2="25" stroke="#fed7aa" stroke-width="8" stroke-linecap="round"/>
            </g>
            <!-- ია მიწაზე -->
            <g transform="translate(380, 275)">
              <circle cx="0" cy="0" r="16" fill="#8b5cf6"/>
              <circle cx="0" cy="0" r="6" fill="#facc15"/>
            </g>
            <!-- საუბრის ბუშტი -->
            <g transform="translate(350, 90)">
              <rect x="0" y="0" width="160" height="55" rx="16" fill="#ffffff" stroke="#e2e8f0" stroke-width="3"/>
              <polygon points="30,55 45,72 55,55" fill="#ffffff"/>
              <text x="80" y="36" text-anchor="middle" font-size="24" font-weight="900" fill="#7c3aed">აი ია! 🌸</text>
            </g>
          </svg>
        `
      },
      {
        step: 4,
        title: 'პირველი სიტყვა',
        speech: 'დედამ სიყვარულით გაუღიმა: ყოჩაღ! შენ გაიცანი ია. გაიმეორე: ი... ა... აი ია!',
        soundType: null,
        svgScene: `
          <svg viewBox="0 0 600 380" class="story-stage-svg">
            <rect width="600" height="380" fill="#fef08a"/>
            <!-- დიდი ბარათი -->
            <rect x="80" y="40" width="440" height="300" rx="30" fill="#ffffff" stroke="#f59e0b" stroke-width="4"/>
            <!-- ყვავილის დიდი გამოსახულება -->
            <g transform="translate(300, 150)">
              <circle cx="-25" cy="-25" r="28" fill="#8b5cf6"/>
              <circle cx="25" cy="-25" r="28" fill="#8b5cf6"/>
              <circle cx="-28" cy="12" r="28" fill="#7c3aed"/>
              <circle cx="28" cy="12" r="28" fill="#7c3aed"/>
              <circle cx="0" cy="24" r="30" fill="#9333ea"/>
              <circle cx="0" cy="0" r="14" fill="#facc15" stroke="#f59e0b" stroke-width="3"/>
            </g>
            <!-- სიტყვის დიდი ბეჭდური ფორმა (ვიზუალური ხატისთვის) -->
            <text x="300" y="290" text-anchor="middle" font-size="56" font-weight="900" fill="#15803d">ა ი   ი ა</text>
          </svg>
        `
      }
    ]
  },
  'belebi': {
    id: 'belebi',
    title: 'ბელები ქალაქში',
    subtitle: 'ბრანი და გვინი, დედა დუდუ და მამა მუმუ',
    badge: '🐻 მოთხრობა',
    audioKey: 'story_belebi',
    steps: [
      {
        step: 1,
        title: 'დათვების ოჯახი',
        speech: 'ტყის მყუდრო ბუნაგში ცხოვრობს დათვების ოჯახი: დედა დუდუ, მამა მუმუ და პატარა ბელები — ბრანი და გვინი.',
        soundType: 'bear',
        svgScene: `
          <svg viewBox="0 0 600 380" class="story-stage-svg">
            <!-- ტყის ფონი -->
            <rect width="600" height="380" fill="#dcfce7"/>
            <path d="M 0 180 Q 200 120 400 160 Q 550 140 600 180 L 600 380 L 0 380 Z" fill="#15803d"/>
            <!-- ხეები -->
            <path d="M 80 80 L 120 180 L 40 180 Z" fill="#166534"/>
            <path d="M 500 70 L 545 190 L 455 190 Z" fill="#166534"/>
            <!-- ბუნაგი -->
            <ellipse cx="300" cy="270" rx="140" ry="75" fill="#78350f"/>
            <ellipse cx="300" cy="275" rx="90" ry="50" fill="#451a03"/>
            <!-- დედა დათვი -->
            <g transform="translate(240, 240)">
              <circle cx="0" cy="0" r="32" fill="#8d6e63"/>
              <circle cx="-12" cy="-6" r="4" fill="#1e293b"/>
              <circle cx="12" cy="-6" r="4" fill="#1e293b"/>
              <ellipse cx="0" cy="10" rx="10" ry="7" fill="#d7ccc8"/>
              <ellipse cx="0" cy="6" rx="5" ry="3" fill="#1e293b"/>
            </g>
            <!-- ბელები -->
            <g transform="translate(340, 265)">
              <circle cx="0" cy="0" r="22" fill="#a1887f"/>
              <circle cx="-8" cy="-4" r="3" fill="#1e293b"/>
              <circle cx="8" cy="-4" r="3" fill="#1e293b"/>
              <ellipse cx="0" cy="6" rx="7" ry="5" fill="#d7ccc8"/>
            </g>
          </svg>
        `
      },
      {
        step: 2,
        title: 'ცნობისმოყვარე ბელები',
        speech: 'ცნობისმოყვარე ბელები ბუნაგიდან გამოვიდნენ. მათ გაიგონეს ქალაქის ხმაური და გადაწყვიტეს ქალაქის დათვალიერება.',
        soundType: null,
        svgScene: `
          <svg viewBox="0 0 600 380" class="story-stage-svg">
            <rect width="600" height="380" fill="#e0f2fe"/>
            <path d="M 0 220 Q 300 180 600 220 L 600 380 L 0 380 Z" fill="#86efac"/>
            <!-- ბილიკი -->
            <path d="M 200 380 Q 280 280 400 220 L 460 220 Q 340 280 280 380 Z" fill="#fde047"/>
            <!-- ბელები მიდიან -->
            <g transform="translate(320, 270)" class="anim-cubs-walk">
              <!-- ბელი 1 -->
              <ellipse cx="-35" cy="0" rx="22" ry="18" fill="#8d6e63"/>
              <circle cx="-46" cy="-12" r="14" fill="#8d6e63"/>
              <circle cx="-50" cy="-14" r="2.5" fill="#1e293b"/>
              <!-- ბელი 2 -->
              <ellipse cx="25" cy="0" rx="20" ry="16" fill="#a1887f"/>
              <circle cx="16" cy="-10" r="13" fill="#a1887f"/>
              <circle cx="12" cy="-12" r="2.5" fill="#1e293b"/>
            </g>
          </svg>
        `
      },
      {
        step: 3,
        title: 'ქალაქი და ზებრა-გადასასვლელი',
        speech: 'ქალაქში ფართო ქუჩა და ბევრი მანქანა დახვდათ. ჭკვიანმა ბელებმა ზებრა-გადასასვლელი იპოვეს. მანქანები გაჩერდნენ და გზა დაუთმეს!',
        soundType: null,
        svgScene: `
          <svg viewBox="0 0 600 380" class="story-stage-svg">
            <!-- ცათამბჯენები -->
            <rect width="600" height="380" fill="#bae6fd"/>
            <rect x="60" y="80" width="80" height="180" fill="#94a3b8"/>
            <rect x="160" y="50" width="100" height="210" fill="#64748b"/>
            <rect x="440" y="90" width="90" height="170" fill="#94a3b8"/>
            <!-- ასფალტის გზა -->
            <rect x="0" y="240" width="600" height="140" fill="#334155"/>
            <!-- ზებრა გადასასვლელი -->
            <rect x="220" y="250" width="160" height="14" fill="#ffffff"/>
            <rect x="220" y="275" width="160" height="14" fill="#ffffff"/>
            <rect x="220" y="300" width="160" height="14" fill="#ffffff"/>
            <rect x="220" y="325" width="160" height="14" fill="#ffffff"/>
            <rect x="220" y="350" width="160" height="14" fill="#ffffff"/>
            <!-- შუქნიშანი (მწვანე ანთია ქვეითებისთვის) -->
            <rect x="420" y="160" width="30" height="70" rx="8" fill="#1e293b"/>
            <circle cx="435" cy="175" r="8" fill="#ef4444" opacity="0.3"/>
            <circle cx="435" cy="195" r="8" fill="#eab308" opacity="0.3"/>
            <circle cx="435" cy="215" r="8" fill="#22c55e"/>
            <!-- ბელები გადადიან ზებრაზე -->
            <g transform="translate(290, 290)">
              <circle cx="-20" cy="0" r="16" fill="#8d6e63"/>
              <circle cx="20" cy="0" r="15" fill="#a1887f"/>
            </g>
          </svg>
        `
      },
      {
        step: 4,
        title: 'უსაფრთხო დაბრუნება',
        speech: 'ბელებმა ისწავლეს ქუჩის წესები და გახარებულები დაბრუნდნენ დედა დუდუსთან და მამა მუმუსთან!',
        soundType: 'bear',
        svgScene: `
          <svg viewBox="0 0 600 380" class="story-stage-svg">
            <rect width="600" height="380" fill="#fef9c3"/>
            <!-- ბედნიერი დათვების ოჯახი ერთად -->
            <g transform="translate(300, 220)">
              <!-- მამა მუმუ -->
              <circle cx="-90" cy="-30" r="45" fill="#5d4037"/>
              <!-- დედა დუდუ -->
              <circle cx="90" cy="-25" r="40" fill="#795548"/>
              <!-- ბელები შუაში ბედნიერად -->
              <circle cx="-25" cy="20" r="25" fill="#8d6e63"/>
              <circle cx="30" cy="20" r="23" fill="#a1887f"/>
              <!-- გულები და ვარსკვლავები -->
              <text x="0" y="-80" font-size="44" text-anchor="middle">❤️ ⭐ ❤️</text>
            </g>
          </svg>
        `
      }
    ]
  }
};

// 4. ხმოვანი თამაშები (სრულად მორგებული წერა-კითხვის არმცოდნე ბავშვზე)
const SOUND_QUIZ_QUESTIONS = [
  {
    id: 1,
    targetSound: 'owl',
    question: 'რომელი ფრინველი გამოსცემს ამ ხმას? მოუსმინე!',
    promptSpeech: 'ყურადღებით მოუსმინე ამ ხმას... რომელი ფრინველი გამოსცემს ამ ხმას? შეეხე სწორ სურათს!',
    options: [
      { key: 'owl', isCorrect: true },
      { key: 'cat', isCorrect: false },
      { key: 'frog', isCorrect: false }
    ]
  },
  {
    id: 2,
    targetSound: 'cat',
    question: 'ვინ ხმიანობს ასე? მოუსმინე!',
    promptSpeech: 'მოუსმინე კარგად... ვინ გამოსცემს ამ ხმას? დააჭირე სწორ სურათს!',
    options: [
      { key: 'dog', isCorrect: false },
      { key: 'cat', isCorrect: true },
      { key: 'sheep', isCorrect: false }
    ]
  },
  {
    id: 3,
    targetSound: 'frog',
    question: 'ვინ ყიყინებს ტბის პირას? მოუსმინე!',
    promptSpeech: 'მოუსმინე ამ ხმას... რომელი ცხოველი გამოსცემს ასეთ ხმას?',
    options: [
      { key: 'rooster', isCorrect: false },
      { key: 'frog', isCorrect: true },
      { key: 'bee', isCorrect: false }
    ]
  },
  {
    id: 4,
    targetSound: 'dog',
    question: 'რომელი ცხოველი ყეფს ასე? მოუსმინე!',
    promptSpeech: 'ყურადღებით მოუსმინე... რომელი ერთგული ცხოველი ყეფს ასე?',
    options: [
      { key: 'dog', isCorrect: true },
      { key: 'duck', isCorrect: false },
      { key: 'cat', isCorrect: false }
    ]
  },
  {
    id: 5,
    targetSound: 'bee',
    question: 'ვინ ბზუის ყვავილებთან? მოუსმინე!',
    promptSpeech: 'მოუსმინე... ვინ ბზუის ასე ყვავილებთან?',
    options: [
      { key: 'owl', isCorrect: false },
      { key: 'bird', isCorrect: false },
      { key: 'bee', isCorrect: true }
    ]
  },
  {
    id: 6,
    targetSound: 'rooster',
    question: 'ვინ ყივის დილაადრიან? მოუსმინე!',
    promptSpeech: 'მოუსმინე ამ მხიარულ ხმას... ვინ ყივის დილაადრიან?',
    options: [
      { key: 'sheep', isCorrect: false },
      { key: 'rooster', isCorrect: true },
      { key: 'duck', isCorrect: false }
    ]
  },
  {
    id: 7,
    targetSound: 'sheep',
    question: 'რომელი ცხოველი გამოსცემს ამ ხმას? მოუსმინე!',
    promptSpeech: 'მოუსმინე... ვინ ბღავის ასე მწვანე მინდორზე?',
    options: [
      { key: 'sheep', isCorrect: true },
      { key: 'dog', isCorrect: false },
      { key: 'bear', isCorrect: false }
    ]
  },
  {
    id: 8,
    targetSound: 'bird',
    question: 'რომელი ჩიტი გალობს ასე ლამაზად? მოუსმინე!',
    promptSpeech: 'მოუსმინე ამ ტკბილ გალობას... რომელი ჩიტი მღერის ასე?',
    options: [
      { key: 'frog', isCorrect: false },
      { key: 'cat', isCorrect: false },
      { key: 'bird', isCorrect: true }
    ]
  }
];

// ბუნების შეკითხვები (Explore Quiz)
const NATURE_QUIZ_QUESTIONS = [
  {
    id: 1,
    audioKey: 'q1',
    question: 'მაჩვენე წერო.',
    promptSpeech: 'სად არის წერო? იპოვე და შეეხე წეროს!',
    options: [
      { objectKey: 'crane', isCorrect: true },
      { objectKey: 'turtle', isCorrect: false },
      { objectKey: 'owl', isCorrect: false }
    ]
  },
  {
    id: 2,
    audioKey: 'q2',
    question: 'რომელი ცხოველი დადის ნელა?',
    promptSpeech: 'რომელ ცხოველს აქვს მაგარი ბაკანი და დადის ნელა?',
    options: [
      { objectKey: 'crane', isCorrect: false },
      { objectKey: 'turtle', isCorrect: true },
      { objectKey: 'beehive', isCorrect: false }
    ]
  },
  {
    id: 3,
    audioKey: 'q3',
    question: 'რომელი ფრინველი ზის ხეზე?',
    promptSpeech: 'რომელი დიდი თვალება ფრინველი ზის ხეზე?',
    options: [
      { objectKey: 'violet', isCorrect: false },
      { objectKey: 'owl', isCorrect: true },
      { objectKey: 'turtle', isCorrect: false }
    ]
  },
  {
    id: 4,
    audioKey: 'q4',
    question: 'რომელ ხეს ასხია რკო?',
    promptSpeech: 'მაჩვენე დიდი და ძლიერი ხე — მუხა!',
    options: [
      { objectKey: 'oak', isCorrect: true },
      { objectKey: 'violet', isCorrect: false },
      { objectKey: 'beehive', isCorrect: false }
    ]
  },
  {
    id: 5,
    audioKey: 'q5',
    question: 'მაჩვენე მუხის ნაყოფი.',
    promptSpeech: 'სად არის მუხის ნაყოფი — რკო?',
    options: [
      { objectKey: 'branch', isCorrect: false },
      { objectKey: 'acorn', isCorrect: true },
      { objectKey: 'violet', isCorrect: false }
    ]
  },
  {
    id: 6,
    audioKey: 'q6',
    question: 'რომელია პატარა იისფერი ყვავილი?',
    promptSpeech: 'მაჩვენე პატარა, ნაზი იისფერი ყვავილი — ია!',
    options: [
      { objectKey: 'oak', isCorrect: false },
      { objectKey: 'acorn', isCorrect: false },
      { objectKey: 'violet', isCorrect: true }
    ]
  },
  {
    id: 7,
    audioKey: 'q7',
    question: 'სად ცხოვრობენ ფუტკრები?',
    promptSpeech: 'სად აკეთებენ ფუტკრები ტკბილ თაფლს? მაჩვენე სკა!',
    options: [
      { objectKey: 'beehive', isCorrect: true },
      { objectKey: 'crane', isCorrect: false },
      { objectKey: 'turtle', isCorrect: false }
    ]
  },
  {
    id: 8,
    audioKey: 'q8',
    question: 'მაჩვენე ხის მწვანე ტოტი.',
    promptSpeech: 'სად არის ხის ტოტი მწვანე ფოთლებით?',
    options: [
      { objectKey: 'turtle', isCorrect: false },
      { objectKey: 'branch', isCorrect: true },
      { objectKey: 'crane', isCorrect: false }
    ]
  }
];
