/**
 * დილა არის მშვენიერი - მთავარი აპლიკაციის ლოგიკა
 * პირველი კლასის მოსწავლეებისთვის
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- აპლიკაციის მდგომარეობა ---
  const state = {
    currentScreen: 'start', // 'start' | 'explore' | 'quiz' | 'celebration'
    activeObjectId: null,
    currentQuizIndex: 0,
    discoveredObjects: new Set(),
    isProcessingAnswer: false
  };

  // --- DOM ელემენტები ---
  const views = {
    start: document.getElementById('view-start'),
    explore: document.getElementById('view-explore'),
    quiz: document.getElementById('view-quiz'),
    celebration: document.getElementById('view-celebration')
  };

  const buttons = {
    startExplore: document.getElementById('btn-start-explore'),
    startQuiz: document.getElementById('btn-start-quiz'),
    headerHome: document.getElementById('btn-header-home'),
    headerQuiz: document.getElementById('btn-header-quiz'),
    muteToggle: document.getElementById('btn-mute-toggle'),
    modalReplay: document.getElementById('btn-modal-replay'),
    modalClose: document.getElementById('btn-modal-close'),
    modalSpeak: document.getElementById('btn-modal-speak'),
    quizHome: document.getElementById('btn-quiz-home'),
    celebrationRestartQuiz: document.getElementById('btn-celebration-restart-quiz'),
    celebrationGoExplore: document.getElementById('btn-celebration-go-explore')
  };

  const modalOverlay = document.getElementById('modal-object-detail');
  const modalIcon = document.getElementById('modal-icon-container');
  const modalTitle = document.getElementById('modal-title');
  const modalSyllables = document.getElementById('modal-syllables-container');
  const modalSentence = document.getElementById('modal-sentence-text');
  const modalQaContainer = document.getElementById('modal-qa-container');

  // ვიქტორინის ელემენტები
  const quizProgress = document.getElementById('quiz-progress');
  const quizQuestionText = document.getElementById('quiz-question-text');
  const quizOptionsGrid = document.getElementById('quiz-options-grid');
  const quizFeedback = document.getElementById('quiz-feedback');

  // --- ეკრანების გადართვის ფუნქცია ---
  function showScreen(screenName) {
    state.currentScreen = screenName;
    AppAudio.stopSpeech();

    // ყველა ეკრანის დამალვა და სასურველის გამოჩენა
    Object.keys(views).forEach(key => {
      if (views[key]) {
        views[key].classList.toggle('active', key === screenName);
      }
    });

    // ჰედერში ნავიგაციის ღილაკების მართვა
    if (buttons.headerHome) {
      buttons.headerHome.style.display = screenName === 'start' ? 'none' : 'inline-flex';
    }
    if (buttons.headerQuiz) {
      buttons.headerQuiz.style.display = (screenName === 'start' || screenName === 'quiz') ? 'none' : 'inline-flex';
    }

    // ეკრანის სპეციფიკური ინიციალიზაცია
    if (screenName === 'quiz') {
      state.currentQuizIndex = 0;
      renderQuizQuestion(0);
    } else if (screenName === 'celebration') {
      renderCelebration();
    }
  }

  // --- ხმის ღილაკის მართვა ---
  function updateMuteButtonUI() {
    const isMuted = AppAudio.getMuteState();
    if (buttons.muteToggle) {
      buttons.muteToggle.innerHTML = isMuted 
        ? '🔇 <span>ხმა: გამორთულია</span>' 
        : '🔊 <span>ხმა: ჩართულია</span>';
      buttons.muteToggle.setAttribute('aria-pressed', isMuted ? 'true' : 'false');
      buttons.muteToggle.setAttribute('title', isMuted ? 'ხმის ჩართვა' : 'ხმის გამორთვა');
    }
  }

  if (buttons.muteToggle) {
    buttons.muteToggle.addEventListener('click', () => {
      AppAudio.toggleMute();
      updateMuteButtonUI();
    });
  }

  // --- ობიექტის ანიმაციის გაშვება და გაცნობის მოდალი ---
  function triggerObject(objectId) {
    const objData = NATURE_OBJECTS[objectId];
    if (!objData) return;

    state.activeObjectId = objectId;
    state.discoveredObjects.add(objectId);
    AppAudio.playObjectChime();

    // SVG ელემენტის ანიმაციის ჩართვა
    const svgElement = document.getElementById(`svg-obj-${objectId}`);
    if (svgElement) {
      svgElement.classList.remove(objData.animationClass);
      // ფორსირებული reflow ანიმაციის ხელახლა გასაშვებად
      void svgElement.offsetWidth;
      svgElement.classList.add(objData.animationClass);
    }

    // მოდალის შევსება
    modalIcon.innerHTML = objData.svgThumb;
    modalTitle.textContent = objData.name;

    // მარცვლების გამოჩენა
    modalSyllables.innerHTML = '';
    objData.syllables.forEach((syl, index) => {
      const badge = document.createElement('span');
      badge.className = 'syllable-badge';
      badge.textContent = syl;
      modalSyllables.appendChild(badge);

      if (index < objData.syllables.length - 1) {
        const divider = document.createElement('span');
        divider.className = 'syllables-divider';
        divider.textContent = '-';
        modalSyllables.appendChild(divider);
      }
    });

    // წინადადება
    modalSentence.textContent = objData.sentence;

    // შეკითხვები და პასუხები
    modalQaContainer.innerHTML = '';
    objData.questions.forEach((qa, idx) => {
      const qaCard = document.createElement('div');
      qaCard.className = 'qa-card';
      const badgeLabel = objData.questions.length > 1 ? `შეკითხვა ${idx + 1}` : 'შეკითხვა';
      qaCard.innerHTML = `
        <div class="qa-question-row">
          <span class="qa-badge">${badgeLabel}</span>
          <span class="qa-question-text">${qa.question}</span>
        </div>
        <div class="qa-answer-row">
          <span style="font-weight: 700; color: #854d0e;">პასუხი:</span>
          <span class="qa-answer-text">${qa.answer}</span>
        </div>
      `;
      modalQaContainer.appendChild(qaCard);
    });

    // მოდალის გამოჩენა
    modalOverlay.classList.add('active');
    modalOverlay.setAttribute('aria-hidden', 'false');

    // გახმოვანება
    const speechText = `${objData.name}. ${objData.syllables.join(' ')}. ${objData.sentence}`;
    AppAudio.speakText(speechText);
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    modalOverlay.setAttribute('aria-hidden', 'true');
    AppAudio.stopSpeech();
    AppAudio.playClick();
    state.activeObjectId = null;
  }

  // მოდალის მოვლენები
  if (buttons.modalClose) {
    buttons.modalClose.addEventListener('click', closeModal);
  }

  if (buttons.modalReplay) {
    buttons.modalReplay.addEventListener('click', () => {
      if (state.activeObjectId) {
        const objData = NATURE_OBJECTS[state.activeObjectId];
        AppAudio.playClick();

        // ანიმაციის განმეორება
        const svgElement = document.getElementById(`svg-obj-${state.activeObjectId}`);
        if (svgElement) {
          svgElement.classList.remove(objData.animationClass);
          void svgElement.offsetWidth;
          svgElement.classList.add(objData.animationClass);
        }

        const qaSpeech = objData.questions.map(q => `${q.question} ${q.answer}`).join('. ');
        const speechText = `${objData.name}. ${objData.sentence} ${qaSpeech}`;
        AppAudio.speakText(speechText);
      }
    });
  }

  if (buttons.modalSpeak) {
    buttons.modalSpeak.addEventListener('click', () => {
      if (state.activeObjectId) {
        const objData = NATURE_OBJECTS[state.activeObjectId];
        AppAudio.playClick();
        const speechText = `${objData.name}. ${objData.sentence}`;
        AppAudio.speakText(speechText);
      }
    });
  }

  // მოდალის გარეთ დაჭერით დახურვა
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // კლავიატურით Escape-ზე დახურვა
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  // SVG ინტერაქტიულ ობიექტებზე მოვლენების მიბმა
  const interactiveObjects = document.querySelectorAll('.interactive-object');
  interactiveObjects.forEach(item => {
    const objectId = item.getAttribute('data-object-id');
    if (!objectId) return;

    item.addEventListener('click', () => {
      triggerObject(objectId);
    });

    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        triggerObject(objectId);
      }
    });
  });

  // --- ვიქტორინის („ვითამაშოთ“) ლოგიკა ---
  function renderQuizQuestion(index) {
    state.isProcessingAnswer = false;
    const qData = QUIZ_QUESTIONS[index];
    if (!qData) return;

    // პროგრესის წერტილების განახლება
    quizProgress.innerHTML = '';
    QUIZ_QUESTIONS.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = 'progress-dot';
      if (i < index) dot.classList.add('completed');
      if (i === index) dot.classList.add('active');
      quizProgress.appendChild(dot);
    });

    // შეკითხვის ტექსტი
    quizQuestionText.textContent = qData.question;
    AppAudio.speakText(qData.question);

    // უკუკავშირის გასუფთავება
    quizFeedback.className = 'quiz-feedback-box';
    quizFeedback.innerHTML = '';

    // 3 ვარიანტის დაგენერირება
    quizOptionsGrid.innerHTML = '';
    qData.options.forEach((opt, optIdx) => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'quiz-option-card';
      card.setAttribute('aria-label', `პასუხი: ${opt.label}`);

      const objInfo = NATURE_OBJECTS[opt.objectKey] || {};
      const svgThumb = objInfo.svgThumb || '';

      card.innerHTML = `
        <div class="option-svg-wrapper">
          ${svgThumb}
        </div>
        <div class="option-label">${opt.label}</div>
      `;

      card.addEventListener('click', () => {
        handleQuizAnswer(card, opt.isCorrect, qData);
      });

      quizOptionsGrid.appendChild(card);
    });
  }

  function handleQuizAnswer(cardElement, isCorrect, qData) {
    if (state.isProcessingAnswer) return;

    if (isCorrect) {
      state.isProcessingAnswer = true;
      cardElement.classList.add('correct-answer');

      // მწვანე ვარსკვლავი და „ყოჩაღ!“
      quizFeedback.className = 'quiz-feedback-box show-success';
      quizFeedback.innerHTML = '<span class="anim-star-pop">⭐</span> ყოჩაღ!';

      AppAudio.playSuccess();
      AppAudio.speakText('ყოჩაღ!');

      // მომდევნო კითხვაზე გადასვლა 1.4 წამში
      setTimeout(() => {
        state.currentQuizIndex++;
        if (state.currentQuizIndex < QUIZ_QUESTIONS.length) {
          renderQuizQuestion(state.currentQuizIndex);
        } else {
          showScreen('celebration');
        }
      }, 1400);

    } else {
      // შეცდომისას: არავითარი წითელი ჯვარი! მხოლოდ რბილი ხმა და „კიდევ სცადე“
      cardElement.classList.remove('anim-gentle-nudge');
      void cardElement.offsetWidth;
      cardElement.classList.add('anim-gentle-nudge');

      quizFeedback.className = 'quiz-feedback-box show-retry';
      quizFeedback.innerHTML = '<span>🌱</span> კიდევ სცადე!';

      AppAudio.playTryAgain();
      AppAudio.speakText('კიდევ სცადე');
    }
  }

  // --- საზეიმო ფინალური ეკრანის დაგენერირება ---
  function renderCelebration() {
    AppAudio.playCelebration();
    const celebrationText = 'შესანიშნავია! შენ ბუნების პატარა მკვლევარი ხარ!';
    AppAudio.speakText(celebrationText);

    const celebrationGrid = document.getElementById('celebration-grid');
    if (celebrationGrid) {
      celebrationGrid.innerHTML = '';
      Object.keys(NATURE_OBJECTS).forEach(key => {
        const item = NATURE_OBJECTS[key];
        const itemEl = document.createElement('div');
        itemEl.className = 'celebration-item';
        itemEl.innerHTML = `
          <div class="celebration-item-svg">${item.svgThumb}</div>
          <div class="celebration-item-name">${item.name}</div>
        `;
        celebrationGrid.appendChild(itemEl);
      });
    }
  }

  // --- ნავიგაციის ღილაკების მოვლენები ---
  buttons.startExplore.addEventListener('click', () => {
    AppAudio.playClick();
    showScreen('explore');
  });

  buttons.startQuiz.addEventListener('click', () => {
    AppAudio.playClick();
    showScreen('quiz');
  });

  const brandHome = document.getElementById('btn-brand-home');
  if (brandHome) {
    brandHome.addEventListener('click', () => {
      AppAudio.playClick();
      showScreen('start');
    });
    brandHome.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        AppAudio.playClick();
        showScreen('start');
      }
    });
  }

  if (buttons.headerHome) {
    buttons.headerHome.addEventListener('click', () => {
      AppAudio.playClick();
      showScreen('start');
    });
  }

  if (buttons.headerQuiz) {
    buttons.headerQuiz.addEventListener('click', () => {
      AppAudio.playClick();
      showScreen('quiz');
    });
  }

  if (buttons.quizHome) {
    buttons.quizHome.addEventListener('click', () => {
      AppAudio.playClick();
      showScreen('start');
    });
  }

  if (buttons.celebrationRestartQuiz) {
    buttons.celebrationRestartQuiz.addEventListener('click', () => {
      AppAudio.playClick();
      showScreen('quiz');
    });
  }

  if (buttons.celebrationGoExplore) {
    buttons.celebrationGoExplore.addEventListener('click', () => {
      AppAudio.playClick();
      showScreen('explore');
    });
  }

  // საწყისი ეკრანის ინიციალიზაცია
  updateMuteButtonUI();
  showScreen('start');
});
