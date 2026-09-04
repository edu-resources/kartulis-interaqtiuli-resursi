/**
 * დილა არის მშვენიერი - მთავარი აპლიკაციის ლოგიკა
 * ადაპტირებული წერა-კითხვის არმცოდნე პირველკლასელებისთვის
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- აპლიკაციის მდგომარეობა ---
  const state = {
    currentScreen: 'start', // 'start' | 'explore' | 'quiz' | 'celebration'
    activeObjectId: null,
    currentQuizIndex: 0,
    isProcessingAnswer: false,
    guideTimer: null,
    guideIndex: 0,
    hasGreeted: false
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
    modalNext: document.getElementById('btn-modal-next'),
    modalClose: document.getElementById('btn-modal-close'),
    modalSpeak: document.getElementById('btn-modal-speak'),
    quizSpeak: document.getElementById('btn-quiz-speak'),
    quizHome: document.getElementById('btn-quiz-home'),
    celebrationRestartQuiz: document.getElementById('btn-celebration-restart-quiz'),
    celebrationGoExplore: document.getElementById('btn-celebration-go-explore'),
    brandHome: document.getElementById('btn-brand-home')
  };

  // მოდალის ელემენტები
  const modalOverlay = document.getElementById('modal-object-detail');
  const modalBigVisual = document.getElementById('modal-big-visual');
  const modalTitle = document.getElementById('modal-title');
  const modalSyllables = document.getElementById('modal-syllables-container');
  const modalSentence = document.getElementById('modal-sentence-text');

  // ვიქტორინის ელემენტები
  const quizProgress = document.getElementById('quiz-progress');
  const quizQuestionText = document.getElementById('quiz-question-text');
  const quizOptionsGrid = document.getElementById('quiz-options-grid');
  const quizFeedback = document.getElementById('quiz-feedback');

  // --- 1. ავტომატური მისალმება გვერდის გახსნისას ---
  function playWelcomeGreeting() {
    if (state.hasGreeted || AppAudio.getMuteState()) return;
    state.hasGreeted = true;

    const greetingText = 'გამარჯობა! დააჭირე მწვანე ღილაკს და ერთად აღმოვაჩინოთ ბუნება.';
    AppAudio.playVoice(
      'welcome',
      greetingText,
      () => {
        if (buttons.startExplore) {
          buttons.startExplore.classList.add('speaking-pulse');
        }
      },
      () => {
        if (buttons.startExplore) {
          buttons.startExplore.classList.remove('speaking-pulse');
        }
      }
    );
  }

  // ვცდილობთ მყისიერ მისალმებას
  setTimeout(playWelcomeGreeting, 600);

  // თუ ბრაუზერის პოლიტიკამ დაბლოკა ავტოპლეი, პირველივე შეხებაზე გაჟღერდეს
  const unlockAudioOnInteraction = () => {
    AppAudio.getAudioContext();
    if (!state.hasGreeted && state.currentScreen === 'start') {
      playWelcomeGreeting();
    }
    document.removeEventListener('pointerdown', unlockAudioOnInteraction);
    document.removeEventListener('keydown', unlockAudioOnInteraction);
  };
  document.addEventListener('pointerdown', unlockAudioOnInteraction, { once: true });
  document.addEventListener('keydown', unlockAudioOnInteraction, { once: true });

  // --- 2. ეკრანების გადართვის ფუნქცია ---
  function showScreen(screenName) {
    state.currentScreen = screenName;
    AppAudio.stopAll();
    stopGuideSequence();

    // ეკრანების ჩვენება/დამალვა
    Object.keys(views).forEach(key => {
      if (views[key]) {
        views[key].classList.toggle('active', key === screenName);
      }
    });

    // ჰედერში ნავიგაციის მართვა
    if (buttons.headerHome) {
      buttons.headerHome.style.display = screenName === 'start' ? 'none' : 'inline-flex';
    }
    if (buttons.headerQuiz) {
      buttons.headerQuiz.style.display = (screenName === 'start' || screenName === 'quiz') ? 'none' : 'inline-flex';
    }

    if (screenName === 'explore') {
      startGuideSequence();
    } else if (screenName === 'quiz') {
      state.currentQuizIndex = 0;
      renderQuizQuestion(0);
    } else if (screenName === 'celebration') {
      renderCelebration();
    }
  }

  // --- 3. ბუნების სცენაზე ობიექტების რიგრიგობით გამოკვეთა (გიდი) ---
  function startGuideSequence() {
    stopGuideSequence();
    state.guideIndex = 0;

    state.guideTimer = setInterval(() => {
      if (state.currentScreen !== 'explore' || modalOverlay.classList.contains('active')) return;

      // წინა გამოკვეთის გასუფთავება
      document.querySelectorAll('.guide-highlight').forEach(el => el.classList.remove('guide-highlight'));

      // მიმდინარე ობიექტის გამოკვეთა
      const currentKey = OBJECT_SEQUENCE[state.guideIndex];
      const svgEl = document.getElementById(`svg-obj-${currentKey}`);
      if (svgEl) {
        svgEl.classList.add('guide-highlight');
      }

      state.guideIndex = (state.guideIndex + 1) % OBJECT_SEQUENCE.length;
    }, 2800);
  }

  function stopGuideSequence() {
    if (state.guideTimer) {
      clearInterval(state.guideTimer);
      state.guideTimer = null;
    }
    document.querySelectorAll('.guide-highlight').forEach(el => el.classList.remove('guide-highlight'));
  }

  // --- 4. ხმის ღილაკის მართვა ---
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

  // --- 5. სწავლის რეჟიმი: ობიექტის გაცნობა ---
  function triggerObject(objectId) {
    const objData = NATURE_OBJECTS[objectId];
    if (!objData) return;

    state.activeObjectId = objectId;
    AppAudio.playObjectChime();
    stopGuideSequence();

    // SVG ელემენტის ანიმაცია
    const svgElement = document.getElementById(`svg-obj-${objectId}`);
    if (svgElement) {
      svgElement.classList.remove(objData.animationClass);
      void svgElement.offsetWidth;
      svgElement.classList.add(objData.animationClass);
    }

    // მოდალის შევსება: მხოლოდ დიდი ილუსტრაცია, სახელი, მარცვლები და ხმის ღილაკი
    modalBigVisual.innerHTML = objData.svgThumb;
    modalTitle.textContent = objData.name;

    // მარცვლების ვიზუალიზაცია
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

    // მოკლე წინადადება მასწავლებლისთვის
    modalSentence.textContent = objData.sentence;

    // მოდალის გახსნა
    modalOverlay.classList.add('active');
    modalOverlay.setAttribute('aria-hidden', 'false');

    // ორმაგი გახმოვანება: ჩვეულებრივ და ნელა მარცვლებად
    playObjectAudio(objData);
  }

  function playObjectAudio(objData) {
    AppAudio.playVoice(
      objData.audioKey,
      objData.fullSpeech,
      () => {
        modalBigVisual.classList.add('speaking-pulse');
        if (buttons.modalSpeak) buttons.modalSpeak.classList.add('speaking-pulse');
      },
      () => {
        modalBigVisual.classList.remove('speaking-pulse');
        if (buttons.modalSpeak) buttons.modalSpeak.classList.remove('speaking-pulse');
      }
    );
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    modalOverlay.setAttribute('aria-hidden', 'true');
    AppAudio.stopAll();
    AppAudio.playClick();
    state.activeObjectId = null;

    if (state.currentScreen === 'explore') {
      startGuideSequence();
    }
  }

  // მოდალის ღილაკების მოვლენები
  if (buttons.modalClose) {
    buttons.modalClose.addEventListener('click', closeModal);
  }

  // ⟳ კიდევ ერთხელ მოსმენა
  if (buttons.modalReplay) {
    buttons.modalReplay.addEventListener('click', () => {
      if (state.activeObjectId) {
        const objData = NATURE_OBJECTS[state.activeObjectId];
        AppAudio.playClick();

        // ანიმაციის ხელახლა გაშვება
        const svgElement = document.getElementById(`svg-obj-${state.activeObjectId}`);
        if (svgElement) {
          svgElement.classList.remove(objData.animationClass);
          void svgElement.offsetWidth;
          svgElement.classList.add(objData.animationClass);
        }

        playObjectAudio(objData);
      }
    });
  }

  // 🔊 ხმის ღილაკი
  if (buttons.modalSpeak) {
    buttons.modalSpeak.addEventListener('click', () => {
      if (state.activeObjectId) {
        const objData = NATURE_OBJECTS[state.activeObjectId];
        AppAudio.playClick();
        playObjectAudio(objData);
      }
    });
  }

  // ➜ შემდეგ ობიექტზე გადასვლა
  if (buttons.modalNext) {
    buttons.modalNext.addEventListener('click', () => {
      if (!state.activeObjectId) return;
      AppAudio.playClick();

      const currentIndex = OBJECT_SEQUENCE.indexOf(state.activeObjectId);
      const nextIndex = (currentIndex + 1) % OBJECT_SEQUENCE.length;
      const nextObjectId = OBJECT_SEQUENCE[nextIndex];

      triggerObject(nextObjectId);
    });
  }

  // მოდალის გარეთ დაჭერით დახურვა
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // Escape კლავიშით დახურვა
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

  // --- 6. თამაშის რეჟიმი („ვითამაშოთ“) ---
  function renderQuizQuestion(index) {
    state.isProcessingAnswer = false;
    const qData = QUIZ_QUESTIONS[index];
    if (!qData) return;

    // პროგრესის წერტილები
    quizProgress.innerHTML = '';
    QUIZ_QUESTIONS.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = 'progress-dot';
      if (i < index) dot.classList.add('completed');
      if (i === index) dot.classList.add('active');
      quizProgress.appendChild(dot);
    });

    // შეკითხვის ტექსტი (მასწავლებლისთვის)
    quizQuestionText.textContent = qData.question;

    // უკუკავშირის გასუფთავება
    quizFeedback.className = 'quiz-feedback-box';
    quizFeedback.innerHTML = '';

    // შეკითხვის ხმამაღლა გაჟღერება
    playQuizQuestionAudio(qData);

    // მხოლოდ 3 დიდი ილუსტრირებული საპასუხო ბარათი (ტექსტის გარეშე ბავშვისთვის)
    quizOptionsGrid.innerHTML = '';
    qData.options.forEach((opt, optIdx) => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'quiz-option-card';
      const objInfo = NATURE_OBJECTS[opt.objectKey] || {};
      card.setAttribute('aria-label', `სურათი ${optIdx + 1}`);

      card.innerHTML = `
        <div class="option-svg-wrapper">
          ${objInfo.svgThumb || ''}
        </div>
      `;

      card.addEventListener('click', () => {
        handleQuizAnswer(card, opt.isCorrect, qData);
      });

      quizOptionsGrid.appendChild(card);
    });
  }

  function playQuizQuestionAudio(qData) {
    AppAudio.playVoice(
      qData.audioKey,
      qData.question,
      () => {
        quizQuestionText.classList.add('speaking-pulse');
        if (buttons.quizSpeak) buttons.quizSpeak.classList.add('speaking-pulse');
      },
      () => {
        quizQuestionText.classList.remove('speaking-pulse');
        if (buttons.quizSpeak) buttons.quizSpeak.classList.remove('speaking-pulse');
      }
    );
  }

  // შეკითხვის ხელახლა მოსმენის ღილაკი
  if (buttons.quizSpeak) {
    buttons.quizSpeak.addEventListener('click', () => {
      const qData = QUIZ_QUESTIONS[state.currentQuizIndex];
      if (qData) {
        AppAudio.playClick();
        playQuizQuestionAudio(qData);
      }
    });
  }

  // პასუხის დამუშავება
  function handleQuizAnswer(cardElement, isCorrect, qData) {
    if (state.isProcessingAnswer) return;

    if (isCorrect) {
      state.isProcessingAnswer = true;
      cardElement.classList.add('correct-answer');

      // მწვანე ნათება, ვარსკვლავი და შეფასება
      quizFeedback.className = 'quiz-feedback-box show-success';
      quizFeedback.innerHTML = '<span class="anim-star-pop">⭐</span> ყოჩაღ! სწორად გამოიცანი.';

      AppAudio.playSuccess();
      AppAudio.playVoice('correct', 'ყოჩაღ! სწორად გამოიცანი.');

      // გადასვლა შემდეგ შეკითხვაზე 2.2 წამში
      setTimeout(() => {
        state.currentQuizIndex++;
        if (state.currentQuizIndex < QUIZ_QUESTIONS.length) {
          renderQuizQuestion(state.currentQuizIndex);
        } else {
          showScreen('celebration');
        }
      }, 2200);

    } else {
      // შეცდომისას: არავითარი წითელი ჯვარი! მხოლოდ რბილი შერყევა და წახალისება
      cardElement.classList.remove('anim-gentle-nudge');
      void cardElement.offsetWidth;
      cardElement.classList.add('anim-gentle-nudge');

      quizFeedback.className = 'quiz-feedback-box show-retry';
      quizFeedback.innerHTML = '<span>🌱</span> კარგად დააკვირდი და კიდევ სცადე.';

      AppAudio.playTryAgain();
      AppAudio.playVoice('try_again', 'კარგად დააკვირდი და კიდევ სცადე.');
    }
  }

  // --- 7. საზეიმო ფინალური ეკრანი ---
  function renderCelebration() {
    AppAudio.playCelebration();
    const celebrationText = 'შესანიშნავია! შენ ბუნების პატარა მკვლევარი ხარ!';
    AppAudio.playVoice('celebrate', celebrationText);

    const celebrationGrid = document.getElementById('celebration-grid');
    if (celebrationGrid) {
      celebrationGrid.innerHTML = '';
      OBJECT_SEQUENCE.forEach(key => {
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

  // --- 8. ნავიგაციის ღილაკების მოვლენები ---
  buttons.startExplore.addEventListener('click', () => {
    AppAudio.playClick();
    showScreen('explore');
  });

  buttons.startQuiz.addEventListener('click', () => {
    AppAudio.playClick();
    showScreen('quiz');
  });

  if (buttons.brandHome) {
    buttons.brandHome.addEventListener('click', () => {
      AppAudio.playClick();
      showScreen('start');
    });
    buttons.brandHome.addEventListener('keydown', (e) => {
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

  // ინიციალიზაცია
  updateMuteButtonUI();
  showScreen('start');
});
