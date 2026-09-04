/**
 * დილა არის მშვენიერი & ქართული ენა 1-ლი კლასი
 * მთავარი აპლიკაციის ლოგიკა, როუტერი, გაზიარების სისტემა და ანიმაციები
 * სრულად ადაპტირებული წერა-კითხვის არმცოდნე პირველკლასელებისთვის
 * 
 * უსაფრთხოების გარანტია:
 * - ყველა event listener მოწმდება safeOn ჰელპერით (არასოდეს აგდებს TypeError-ს)
 * - DOMContentLoaded / readyState დროული ინიციალიზაცია
 * - ერთი შეცდომა არასდროს აჩერებს სხვა ღილაკების ფუნქციონირებას
 */

// SVGElement.prototype.click პოლიფილი ძველი/headless გარემოებისთვის
if (typeof SVGElement !== 'undefined' && !SVGElement.prototype.click) {
  SVGElement.prototype.click = function() {
    try {
      const evt = new MouseEvent('click', { bubbles: true, cancelable: true, view: window });
      this.dispatchEvent(evt);
    } catch (e) {
      const evt = document.createEvent('Event');
      evt.initEvent('click', true, true);
      this.dispatchEvent(evt);
    }
  };
}

// უსაფრთხო Event Listener მიმბმელი
function safeOn(selectorOrEl, event, handler) {
  try {
    const el = (typeof selectorOrEl === 'string')
      ? (document.getElementById(selectorOrEl) || document.querySelector(selectorOrEl))
      : selectorOrEl;
    if (el) {
      el.addEventListener(event, function(e) {
        try {
          handler.call(this, e);
        } catch (err) {
          console.error(`Error in ${event} handler on`, selectorOrEl, err);
        }
      });
      return el;
    } else {
      // ელემენტი არ მოიძებნა — უსაფრთხოდ ვაგრძელებთ მუშაობას
      return null;
    }
  } catch (err) {
    console.warn(`Could not attach ${event} to`, selectorOrEl, err);
    return null;
  }
}

function initApp() {

  // --- აპლიკაციის მდგომარეობა (State) ---
  const state = {
    currentScreen: 'start', // 'start' | 'explore' | 'story' | 'animals' | 'quiz' | 'celebration'
    activeObjectId: null,   // ბუნების ობიექტი (crane, owl...)
    activeAnimalId: null,   // ცხოველთა გალერეის ობიექტი
    activeStoryKey: 'ai-ia',// 'ai-ia' | 'belebi'
    storyStepIndex: 0,
    quizMode: 'sounds',     // 'sounds' | 'nature'
    currentQuizIndex: 0,
    isProcessingAnswer: false,
    guideTimer: null,
    guideIndex: 0,
    hasGreeted: false,
    toastTimer: null
  };

  // --- DOM ელემენტები ---
  const views = {
    start: document.getElementById('view-start'),
    explore: document.getElementById('view-explore'),
    story: document.getElementById('view-story'),
    animals: document.getElementById('view-animals'),
    quiz: document.getElementById('view-quiz'),
    celebration: document.getElementById('view-celebration')
  };

  // მოდალის ელემენტები
  const modalOverlay = document.getElementById('modal-object-detail');
  const modalBigVisual = document.getElementById('modal-big-visual');
  const modalTitle = document.getElementById('modal-title');
  const modalSyllables = document.getElementById('modal-syllables-container');
  const modalSentence = document.getElementById('modal-sentence-text');

  // მოთხრობის ელემენტები
  const storyBadge = document.getElementById('story-badge');
  const storyStepNum = document.getElementById('story-step-num');
  const storyStageContent = document.getElementById('story-stage-content');
  const storySpeechText = document.getElementById('story-speech-text');

  // ცხოველთა გალერეის ელემენტები
  const animalsGrid = document.getElementById('animals-grid');

  // ვიქტორინის ელემენტები
  const quizProgress = document.getElementById('quiz-progress');
  const quizQuestionText = document.getElementById('quiz-question-text');
  const quizOptionsGrid = document.getElementById('quiz-options-grid');
  const quizFeedback = document.getElementById('quiz-feedback');

  // შეტყობინების ელემენტები (Toast)
  const shareToast = document.getElementById('share-toast');
  const shareToastMsg = document.getElementById('share-toast-msg');

  // =========================================================================
  // 1. ცალკეული რესურსების გაზიარებისა და ლინკის კოპირების სისტემა (Sharing)
  // =========================================================================

  function copyCurrentResourceLink(customHash = null, customTitle = null) {
    if (typeof AppAudio !== 'undefined' && AppAudio.playClick) {
      AppAudio.playClick();
    }

    let hashToShare = customHash;
    if (!hashToShare) {
      if (state.currentScreen === 'start') {
        hashToShare = '';
      } else if (state.currentScreen === 'explore') {
        hashToShare = state.activeObjectId ? `#nature/${state.activeObjectId}` : '#nature';
      } else if (state.currentScreen === 'story') {
        hashToShare = `#story/${state.activeStoryKey}/${state.storyStepIndex + 1}`;
      } else if (state.currentScreen === 'animals') {
        hashToShare = state.activeAnimalId ? `#animal/${state.activeAnimalId}` : '#animals';
      } else if (state.currentScreen === 'quiz') {
        hashToShare = `#game/${state.quizMode}`;
      } else {
        hashToShare = window.location.hash || '';
      }
    }

    const shareUrl = `${window.location.origin}${window.location.pathname}${hashToShare}`;
    const shareTitle = customTitle || 'დილა არის მშვენიერი - პირველი კლასის რესურსი';

    if (navigator.share && /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)) {
      navigator.share({
        title: shareTitle,
        text: 'პირველი კლასის ინტერაქტიული ქართული რესურსი:',
        url: shareUrl
      }).catch(() => {
        fallbackCopyToClipboard(shareUrl);
      });
    } else {
      fallbackCopyToClipboard(shareUrl);
    }
  }

  function fallbackCopyToClipboard(url) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(() => {
        showShareToast('🔗 ბმული დაკოპირდა!');
      }).catch(() => {
        manualPromptCopy(url);
      });
    } else {
      manualPromptCopy(url);
    }
  }

  function manualPromptCopy(url) {
    window.prompt('დააკოპირეთ ბმული გასაზიარებლად:', url);
    showShareToast('🔗 ბმული მზადაა!');
  }

  function showShareToast(message) {
    if (typeof AppAudio !== 'undefined') {
      if (AppAudio.playLinkCopiedTone) AppAudio.playLinkCopiedTone();
      if (AppAudio.playVoice) AppAudio.playVoice('link_copied', 'ბმული დაკოპირდა!');
    }

    if (shareToastMsg) shareToastMsg.textContent = message;
    if (shareToast) {
      shareToast.classList.add('show', 'toast-slide-up');
      if (state.toastTimer) clearTimeout(state.toastTimer);
      state.toastTimer = setTimeout(() => {
        shareToast.classList.remove('show', 'toast-slide-up');
      }, 3000);
    }
  }

  // =========================================================================
  // 2. URL Hash როუტერი (Deep Linking)
  // =========================================================================

  function handleHashRouting() {
    try {
      const rawHash = window.location.hash.replace(/^#\/?/, '').trim();
      if (!rawHash) {
        showScreen('start', false);
        return;
      }

      const parts = rawHash.split('/');
      const mainSection = parts[0].toLowerCase();
      const subParam = parts[1] ? parts[1].toLowerCase() : null;
      const stepParam = parts[2] ? parseInt(parts[2], 10) : 1;

      switch (mainSection) {
        case 'nature':
        case 'explore':
          showScreen('explore', false);
          if (subParam && typeof NATURE_OBJECTS !== 'undefined' && NATURE_OBJECTS[subParam]) {
            setTimeout(() => triggerNatureObject(subParam, false), 200);
          }
          break;

        case 'story':
          if (subParam && typeof STORIES_DATA !== 'undefined' && STORIES_DATA[subParam]) {
            state.activeStoryKey = subParam;
          } else {
            state.activeStoryKey = 'ai-ia';
          }
          state.storyStepIndex = (!isNaN(stepParam) && stepParam >= 1) ? stepParam - 1 : 0;
          showScreen('story', false);
          renderStoryStep();
          break;

        case 'ai-ia':
          state.activeStoryKey = 'ai-ia';
          state.storyStepIndex = 0;
          showScreen('story', false);
          renderStoryStep();
          break;

        case 'belebi':
          state.activeStoryKey = 'belebi';
          state.storyStepIndex = 0;
          showScreen('story', false);
          renderStoryStep();
          break;

        case 'animals':
        case 'gallery':
          showScreen('animals', false);
          if (subParam && typeof ANIMALS_GALLERY !== 'undefined' && ANIMALS_GALLERY[subParam]) {
            setTimeout(() => playAnimalCardInteraction(subParam, false), 300);
          }
          break;

        case 'animal':
          showScreen('animals', false);
          if (subParam && typeof ANIMALS_GALLERY !== 'undefined' && ANIMALS_GALLERY[subParam]) {
            setTimeout(() => playAnimalCardInteraction(subParam, false), 300);
          }
          break;

        case 'game':
        case 'quiz':
          state.quizMode = (subParam === 'nature') ? 'nature' : 'sounds';
          showScreen('quiz', false);
          break;

        default:
          if (typeof NATURE_OBJECTS !== 'undefined' && NATURE_OBJECTS[mainSection]) {
            showScreen('explore', false);
            setTimeout(() => triggerNatureObject(mainSection, false), 200);
          } else if (typeof ANIMALS_GALLERY !== 'undefined' && ANIMALS_GALLERY[mainSection]) {
            showScreen('animals', false);
            setTimeout(() => playAnimalCardInteraction(mainSection, false), 300);
          } else {
            showScreen('start', false);
          }
          break;
      }
    } catch (e) {
      console.error('Routing error:', e);
      showScreen('start', false);
    }
  }

  // =========================================================================
  // 3. ეკრანების გადართვის ცენტრალური ფუნქცია
  // =========================================================================

  function showScreen(screenName, updateHash = true) {
    try {
      state.currentScreen = screenName;
      if (typeof AppAudio !== 'undefined') {
        AppAudio.stopAll();
      }
      stopGuideSequence();

      // ეკრანების ჩვენება/დამალვა
      Object.keys(views).forEach(key => {
        if (views[key]) {
          views[key].classList.toggle('active', key === screenName);
        }
      });

      // ჰედერში ნავიგაციის მართვა
      const btnHeaderHome = document.getElementById('btn-header-home');
      const btnHeaderQuiz = document.getElementById('btn-header-quiz');
      if (btnHeaderHome) {
        btnHeaderHome.style.display = (screenName === 'start') ? 'none' : 'inline-flex';
      }
      if (btnHeaderQuiz) {
        btnHeaderQuiz.style.display = (screenName === 'start' || screenName === 'quiz') ? 'none' : 'inline-flex';
      }

      // URL-ის განახლება
      if (updateHash) {
        let targetHash = '';
        if (screenName === 'explore') targetHash = '#nature';
        else if (screenName === 'story') targetHash = `#story/${state.activeStoryKey}/${state.storyStepIndex + 1}`;
        else if (screenName === 'animals') targetHash = '#animals';
        else if (screenName === 'quiz') targetHash = `#game/${state.quizMode}`;
        else if (screenName === 'celebration') targetHash = '#celebration';

        if (window.location.hash !== targetHash) {
          history.pushState(null, '', targetHash || window.location.pathname);
        }
      }

      // ეკრანის სპეციფიკური ინიციალიზაცია
      if (screenName === 'explore') {
        startGuideSequence();
        speakExploreHint();
      } else if (screenName === 'story') {
        renderStoryStep();
      } else if (screenName === 'animals') {
        renderAnimalsGallery();
        speakAnimalsHint();
      } else if (screenName === 'quiz') {
        state.currentQuizIndex = 0;
        updateQuizModeUI();
        renderQuizQuestion(0);
      } else if (screenName === 'celebration') {
        renderCelebration();
      }
    } catch (e) {
      console.error('showScreen error:', e);
    }
  }

  // =========================================================================
  // 4. საწყისი მისალმება და ხმოვანი გიდი
  // =========================================================================

  function playWelcomeGreeting() {
    if (typeof AppAudio === 'undefined' || AppAudio.getMuteState()) return;
    state.hasGreeted = true;

    const btnSpeak = document.getElementById('btn-start-welcome-speak');
    const greetingText = 'გამარჯობა! დააჭირე დაწყებას ან აირჩიე სურათი, რომელსაც გინდა მოუსმინო!';
    AppAudio.playVoice(
      'welcome',
      greetingText,
      () => {
        if (btnSpeak) btnSpeak.classList.add('speaking-pulse');
      },
      () => {
        if (btnSpeak) btnSpeak.classList.remove('speaking-pulse');
      }
    );
  }

  safeOn('btn-start-welcome-speak', 'click', () => {
    if (typeof AppAudio !== 'undefined') AppAudio.playClick();
    playWelcomeGreeting();
  });

  // პირველი შეხებისას აუდიოს განბლოკვა
  const unlockAudioOnInteraction = () => {
    if (typeof AppAudio !== 'undefined') AppAudio.getAudioContext();
    if (!state.hasGreeted && state.currentScreen === 'start') {
      playWelcomeGreeting();
    }
    document.removeEventListener('pointerdown', unlockAudioOnInteraction);
    document.removeEventListener('keydown', unlockAudioOnInteraction);
  };
  document.addEventListener('pointerdown', unlockAudioOnInteraction, { once: true });
  document.addEventListener('keydown', unlockAudioOnInteraction, { once: true });

  // =========================================================================
  // 5. ბუნების ინტერაქტიული სცენა („დილა არის მშვენიერი“)
  // =========================================================================

  function speakExploreHint() {
    if (typeof AppAudio === 'undefined' || AppAudio.getMuteState()) return;
    setTimeout(() => {
      if (state.currentScreen === 'explore' && (!modalOverlay || !modalOverlay.classList.contains('active'))) {
        AppAudio.playVoice('explore_hint', 'დააკვირდი სურათს და შეეხე ნებისმიერ ობიექტს ან ცხოველს!');
      }
    }, 400);
  }

  function startGuideSequence() {
    stopGuideSequence();
    state.guideIndex = 0;

    if (typeof OBJECT_SEQUENCE === 'undefined' || !OBJECT_SEQUENCE.length) return;

    state.guideTimer = setInterval(() => {
      if (state.currentScreen !== 'explore' || (modalOverlay && modalOverlay.classList.contains('active'))) return;

      document.querySelectorAll('.guide-highlight').forEach(el => el.classList.remove('guide-highlight'));

      const currentKey = OBJECT_SEQUENCE[state.guideIndex];
      const svgEl = document.getElementById(`svg-obj-${currentKey}`);
      if (svgEl) {
        svgEl.classList.add('guide-highlight');
      }

      state.guideIndex = (state.guideIndex + 1) % OBJECT_SEQUENCE.length;
    }, 3000);
  }

  function stopGuideSequence() {
    if (state.guideTimer) {
      clearInterval(state.guideTimer);
      state.guideTimer = null;
    }
    document.querySelectorAll('.guide-highlight').forEach(el => el.classList.remove('guide-highlight'));
  }

  function triggerNatureObject(objectId, updateHash = true) {
    if (typeof NATURE_OBJECTS === 'undefined') return;
    const objData = NATURE_OBJECTS[objectId];
    if (!objData) return;

    state.activeObjectId = objectId;
    if (typeof AppAudio !== 'undefined') AppAudio.playObjectChime();
    stopGuideSequence();

    if (updateHash) {
      history.pushState(null, '', `#nature/${objectId}`);
    }

    // SVG ელემენტის ანიმაცია
    const svgElement = document.getElementById(`svg-obj-${objectId}`);
    if (svgElement && objData.animationClass) {
      svgElement.classList.remove(objData.animationClass);
      void svgElement.offsetWidth;
      svgElement.classList.add(objData.animationClass);
    }

    // მოდალის შევსება
    if (modalBigVisual) modalBigVisual.innerHTML = objData.svgThumb || '';
    if (modalTitle) modalTitle.textContent = objData.name || '';

    // მარცვლების გამოჩენა
    if (modalSyllables) {
      modalSyllables.innerHTML = '';
      if (objData.syllables) {
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
      }
    }

    if (modalSentence) modalSentence.textContent = objData.sentence || '';

    // მოდალის გახსნა
    if (modalOverlay) {
      modalOverlay.classList.add('active');
      modalOverlay.setAttribute('aria-hidden', 'false');
    }

    // გახმოვანება და ცხოველის ხმა
    playObjectAudio(objData);
  }

  function playObjectAudio(objData) {
    if (typeof AppAudio === 'undefined') return;

    if (objData.soundType && AppAudio.playAnimalSound) {
      AppAudio.playAnimalSound(objData.soundType);
    }

    const btnModalSpeak = document.getElementById('btn-modal-speak');
    setTimeout(() => {
      AppAudio.playVoice(
        objData.audioKey,
        objData.fullSpeech,
        () => {
          if (modalBigVisual) modalBigVisual.classList.add('speaking-pulse');
          if (btnModalSpeak) btnModalSpeak.classList.add('speaking-pulse');
        },
        () => {
          if (modalBigVisual) modalBigVisual.classList.remove('speaking-pulse');
          if (btnModalSpeak) btnModalSpeak.classList.remove('speaking-pulse');
        }
      );
    }, objData.soundType ? 450 : 50);
  }

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      modalOverlay.setAttribute('aria-hidden', 'true');
    }
    if (typeof AppAudio !== 'undefined') {
      AppAudio.stopAll();
      AppAudio.playClick();
    }
    state.activeObjectId = null;

    if (state.currentScreen === 'explore') {
      history.pushState(null, '', '#nature');
      startGuideSequence();
    }
  }

  // მოდალის ღილაკები (უსაფრთხო მიბმა)
  safeOn('btn-modal-close', 'click', closeModal);

  safeOn('btn-modal-replay', 'click', () => {
    if (state.activeObjectId && typeof NATURE_OBJECTS !== 'undefined') {
      if (typeof AppAudio !== 'undefined') AppAudio.playClick();
      playObjectAudio(NATURE_OBJECTS[state.activeObjectId]);
    }
  });

  safeOn('btn-modal-speak', 'click', () => {
    if (state.activeObjectId && typeof NATURE_OBJECTS !== 'undefined') {
      if (typeof AppAudio !== 'undefined') AppAudio.playClick();
      playObjectAudio(NATURE_OBJECTS[state.activeObjectId]);
    }
  });

  safeOn('btn-modal-share', 'click', () => {
    if (state.activeObjectId && typeof NATURE_OBJECTS !== 'undefined') {
      copyCurrentResourceLink(`#nature/${state.activeObjectId}`, `${NATURE_OBJECTS[state.activeObjectId].name} - დილა არის მშვენიერი`);
    }
  });

  safeOn('btn-modal-next', 'click', () => {
    if (!state.activeObjectId || typeof OBJECT_SEQUENCE === 'undefined') return;
    if (typeof AppAudio !== 'undefined') AppAudio.playClick();
    const currentIndex = OBJECT_SEQUENCE.indexOf(state.activeObjectId);
    const nextIndex = (currentIndex + 1) % OBJECT_SEQUENCE.length;
    triggerNatureObject(OBJECT_SEQUENCE[nextIndex]);
  });

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  // SVG ინტერაქტიული ობიექტების მიბმა
  document.querySelectorAll('.interactive-object').forEach(item => {
    const objectId = item.getAttribute('data-object-id');
    if (!objectId) return;

    safeOn(item, 'click', () => triggerNatureObject(objectId));
    safeOn(item, 'keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        triggerNatureObject(objectId);
      }
    });
  });

  // =========================================================================
  // 6. ანიმაციური მოთხრობის სისტემა (Story Player)
  // =========================================================================

  function renderStoryStep() {
    if (typeof STORIES_DATA === 'undefined') return;
    const storyData = STORIES_DATA[state.activeStoryKey];
    if (!storyData || !storyData.steps) return;

    const totalSteps = storyData.steps.length;
    if (state.storyStepIndex < 0) state.storyStepIndex = 0;
    if (state.storyStepIndex >= totalSteps) state.storyStepIndex = totalSteps - 1;

    const currentStep = storyData.steps[state.storyStepIndex];

    if (storyBadge) storyBadge.textContent = `${storyData.badge || ''} • ${storyData.title || ''}`;
    if (storyStepNum) storyStepNum.textContent = `${state.storyStepIndex + 1} / ${totalSteps}`;

    if (storyStageContent) {
      storyStageContent.innerHTML = currentStep.svgScene || '';
    }

    if (storySpeechText) {
      storySpeechText.textContent = currentStep.speech || '';
    }

    const btnPrev = document.getElementById('btn-story-prev');
    const btnNext = document.getElementById('btn-story-next');
    if (btnPrev) {
      btnPrev.style.visibility = (state.storyStepIndex === 0) ? 'hidden' : 'visible';
    }
    if (btnNext) {
      btnNext.innerHTML = (state.storyStepIndex === totalSteps - 1) ? '🌟 დასრულება' : '➜ შემდეგი';
    }

    playStoryStepAudio(currentStep);
    history.pushState(null, '', `#story/${state.activeStoryKey}/${state.storyStepIndex + 1}`);
  }

  function playStoryStepAudio(stepData) {
    if (typeof AppAudio === 'undefined') return;
    AppAudio.stopAll();

    if (stepData.soundType && AppAudio.playAnimalSound) {
      AppAudio.playAnimalSound(stepData.soundType);
    }

    const btnSpeak = document.getElementById('btn-story-speak');
    setTimeout(() => {
      AppAudio.playVoice(
        null,
        stepData.speech,
        () => {
          if (storySpeechText) storySpeechText.classList.add('speaking-pulse');
          if (btnSpeak) btnSpeak.classList.add('speaking-pulse');
        },
        () => {
          if (storySpeechText) storySpeechText.classList.remove('speaking-pulse');
          if (btnSpeak) btnSpeak.classList.remove('speaking-pulse');
        }
      );
    }, stepData.soundType ? 450 : 100);
  }

  safeOn('btn-story-speak', 'click', () => {
    if (typeof STORIES_DATA === 'undefined') return;
    const storyData = STORIES_DATA[state.activeStoryKey];
    if (storyData && storyData.steps && storyData.steps[state.storyStepIndex]) {
      if (typeof AppAudio !== 'undefined') AppAudio.playClick();
      playStoryStepAudio(storyData.steps[state.storyStepIndex]);
    }
  });

  safeOn('btn-story-prev', 'click', () => {
    if (state.storyStepIndex > 0) {
      if (typeof AppAudio !== 'undefined') AppAudio.playClick();
      state.storyStepIndex--;
      renderStoryStep();
    }
  });

  safeOn('btn-story-next', 'click', () => {
    if (typeof STORIES_DATA === 'undefined') return;
    const storyData = STORIES_DATA[state.activeStoryKey];
    if (!storyData || !storyData.steps) return;

    if (typeof AppAudio !== 'undefined') AppAudio.playClick();
    if (state.storyStepIndex < storyData.steps.length - 1) {
      state.storyStepIndex++;
      renderStoryStep();
    } else {
      showScreen('celebration');
    }
  });

  safeOn('btn-story-share', 'click', () => {
    const storyData = (typeof STORIES_DATA !== 'undefined') ? STORIES_DATA[state.activeStoryKey] : null;
    copyCurrentResourceLink(
      `#story/${state.activeStoryKey}/${state.storyStepIndex + 1}`,
      `${storyData ? storyData.title : 'მოთხრობა'} - ქართული ენა`
    );
  });

  safeOn('btn-story-home', 'click', () => {
    if (typeof AppAudio !== 'undefined') AppAudio.playClick();
    showScreen('start');
  });

  // =========================================================================
  // 7. ცხოველთა და ფრინველთა ხმოვანი გალერეა (Animals Gallery)
  // =========================================================================

  function renderAnimalsGallery() {
    if (!animalsGrid || typeof ANIMALS_GALLERY === 'undefined') return;
    animalsGrid.innerHTML = '';

    Object.keys(ANIMALS_GALLERY).forEach(key => {
      const animal = ANIMALS_GALLERY[key];
      const card = document.createElement('div');
      card.className = 'animal-card';
      card.id = `animal-card-${key}`;
      card.tabIndex = 0;
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `${animal.name}: მოუსმინე ხმას`);

      card.innerHTML = `
        <button class="animal-card-share" title="ამ ცხოველის ბმულის გაზიარება" aria-label="${animal.name}-ს გაზიარება">
          🔗
        </button>
        <div class="animal-card-svg">
          ${animal.svgThumb || ''}
        </div>
        <div class="animal-card-name">${animal.name || ''}</div>
        <div class="animal-sound-badge">
          <span>🔊</span> ${animal.soundLabel || ''}
        </div>
      `;

      card.addEventListener('click', (e) => {
        if (e.target.closest('.animal-card-share')) {
          e.stopPropagation();
          copyCurrentResourceLink(`#animal/${key}`, `${animal.name} და მისი ხმა`);
          return;
        }
        playAnimalCardInteraction(key);
      });

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          playAnimalCardInteraction(key);
        }
      });

      animalsGrid.appendChild(card);
    });
  }

  function playAnimalCardInteraction(animalKey, updateHash = true) {
    if (typeof ANIMALS_GALLERY === 'undefined') return;
    const animal = ANIMALS_GALLERY[animalKey];
    if (!animal) return;

    state.activeAnimalId = animalKey;
    if (updateHash) {
      history.pushState(null, '', `#animal/${animalKey}`);
    }

    const cardEl = document.getElementById(`animal-card-${animalKey}`);
    if (cardEl) {
      cardEl.classList.remove('anim-card-pop', 'speaking-pulse');
      void cardEl.offsetWidth;
      cardEl.classList.add('anim-card-pop', 'speaking-pulse');
      try {
        cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } catch (e) {}
    }

    if (typeof AppAudio !== 'undefined') {
      AppAudio.stopAll();
      if (AppAudio.playAnimalSound) AppAudio.playAnimalSound(animal.soundType);

      setTimeout(() => {
        AppAudio.playVoice(
          animal.audioKey,
          animal.fullSpeech,
          null,
          () => {
            if (cardEl) cardEl.classList.remove('speaking-pulse');
          }
        );
      }, 700);
    }
  }

  function speakAnimalsHint() {
    if (typeof AppAudio === 'undefined' || AppAudio.getMuteState()) return;
    setTimeout(() => {
      if (state.currentScreen === 'animals' && !state.activeAnimalId) {
        AppAudio.playVoice('animals_hint', 'შეეხე ნებისმიერ ცხოველს და მოუსმინე, როგორ ხმიანობს!');
      }
    }, 300);
  }

  safeOn('btn-animals-home', 'click', () => {
    if (typeof AppAudio !== 'undefined') AppAudio.playClick();
    showScreen('start');
  });

  safeOn('btn-animals-share', 'click', () => {
    copyCurrentResourceLink('#animals', 'ცხოველებისა და ფრინველების ხმები');
  });

  // =========================================================================
  // 8. თამაშის რეჟიმი („ვითამაშოთ!“)
  // =========================================================================

  function updateQuizModeUI() {
    const btnSounds = document.getElementById('btn-quiz-mode-sounds');
    const btnNature = document.getElementById('btn-quiz-mode-nature');
    if (btnSounds) {
      btnSounds.className = (state.quizMode === 'sounds') ? 'btn btn-amber' : 'btn btn-light';
    }
    if (btnNature) {
      btnNature.className = (state.quizMode === 'nature') ? 'btn btn-amber' : 'btn btn-light';
    }
  }

  function getCurrentQuizList() {
    if (state.quizMode === 'sounds') {
      return (typeof SOUND_QUIZ_QUESTIONS !== 'undefined') ? SOUND_QUIZ_QUESTIONS : [];
    }
    return (typeof NATURE_QUIZ_QUESTIONS !== 'undefined') ? NATURE_QUIZ_QUESTIONS : [];
  }

  function renderQuizQuestion(index) {
    state.isProcessingAnswer = false;
    const questions = getCurrentQuizList();
    const qData = questions[index];
    if (!qData) return;

    if (quizProgress) {
      quizProgress.innerHTML = '';
      questions.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = 'progress-dot';
        if (i < index) dot.classList.add('completed');
        if (i === index) dot.classList.add('active');
        quizProgress.appendChild(dot);
      });
    }

    if (quizQuestionText) quizQuestionText.textContent = qData.question || '';
    if (quizFeedback) {
      quizFeedback.className = 'quiz-feedback-box';
      quizFeedback.innerHTML = '';
    }

    playCurrentQuizAudio(qData);

    if (quizOptionsGrid) {
      quizOptionsGrid.innerHTML = '';
      if (qData.options) {
        qData.options.forEach((opt, optIdx) => {
          const card = document.createElement('button');
          card.type = 'button';
          card.className = 'quiz-option-card';
          card.setAttribute('aria-label', `ვარიანტი ${optIdx + 1}`);

          let thumbSvg = '';
          if (opt.key && typeof ANIMALS_GALLERY !== 'undefined' && ANIMALS_GALLERY[opt.key]) {
            thumbSvg = ANIMALS_GALLERY[opt.key].svgThumb || '';
          } else if (opt.objectKey && typeof NATURE_OBJECTS !== 'undefined' && NATURE_OBJECTS[opt.objectKey]) {
            thumbSvg = NATURE_OBJECTS[opt.objectKey].svgThumb || '';
          }

          card.innerHTML = `
            <div class="option-svg-wrapper">
              ${thumbSvg}
            </div>
          `;

          card.addEventListener('click', () => {
            handleQuizAnswer(card, opt.isCorrect, qData);
          });

          quizOptionsGrid.appendChild(card);
        });
      }
    }
  }

  function playCurrentQuizAudio(qData) {
    if (typeof AppAudio === 'undefined') return;
    AppAudio.stopAll();

    const btnSpeak = document.getElementById('btn-quiz-speak');

    if (state.quizMode === 'sounds' && qData.targetSound && AppAudio.playAnimalSound) {
      AppAudio.playAnimalSound(qData.targetSound);
      setTimeout(() => {
        AppAudio.playVoice(
          null,
          qData.promptSpeech || qData.question,
          () => {
            if (quizQuestionText) quizQuestionText.classList.add('speaking-pulse');
            if (btnSpeak) btnSpeak.classList.add('speaking-pulse');
          },
          () => {
            if (quizQuestionText) quizQuestionText.classList.remove('speaking-pulse');
            if (btnSpeak) btnSpeak.classList.remove('speaking-pulse');
          }
        );
      }, 750);
    } else {
      AppAudio.playVoice(
        qData.audioKey,
        qData.promptSpeech || qData.question,
        () => {
          if (quizQuestionText) quizQuestionText.classList.add('speaking-pulse');
          if (btnSpeak) btnSpeak.classList.add('speaking-pulse');
        },
        () => {
          if (quizQuestionText) quizQuestionText.classList.remove('speaking-pulse');
          if (btnSpeak) btnSpeak.classList.remove('speaking-pulse');
        }
      );
    }
  }

  function handleQuizAnswer(cardElement, isCorrect, qData) {
    if (state.isProcessingAnswer) return;

    if (isCorrect) {
      state.isProcessingAnswer = true;
      cardElement.classList.add('correct-answer');

      if (quizFeedback) {
        quizFeedback.className = 'quiz-feedback-box show-success';
        quizFeedback.innerHTML = '<span class="anim-star-pop">⭐</span> ყოჩაღ! სწორად გამოიცანი.';
      }

      if (typeof AppAudio !== 'undefined') {
        AppAudio.playSuccess();
        AppAudio.playVoice('correct', 'ყოჩაღ! სწორად გამოიცანი.');
      }

      setTimeout(() => {
        state.currentQuizIndex++;
        const questions = getCurrentQuizList();
        if (state.currentQuizIndex < questions.length) {
          renderQuizQuestion(state.currentQuizIndex);
        } else {
          showScreen('celebration');
        }
      }, 2200);

    } else {
      cardElement.classList.remove('anim-gentle-nudge');
      void cardElement.offsetWidth;
      cardElement.classList.add('anim-gentle-nudge');

      if (quizFeedback) {
        quizFeedback.className = 'quiz-feedback-box show-retry';
        quizFeedback.innerHTML = '<span>🌱</span> კარგად დააკვირდი და კიდევ სცადე.';
      }

      if (typeof AppAudio !== 'undefined') {
        AppAudio.playTryAgain();
        AppAudio.playVoice('try_again', 'კარგად დააკვირდი და კიდევ სცადე.');
      }
    }
  }

  safeOn('btn-quiz-speak', 'click', () => {
    const questions = getCurrentQuizList();
    if (questions[state.currentQuizIndex]) {
      if (typeof AppAudio !== 'undefined') AppAudio.playClick();
      playCurrentQuizAudio(questions[state.currentQuizIndex]);
    }
  });

  safeOn('btn-quiz-mode-sounds', 'click', () => {
    if (typeof AppAudio !== 'undefined') AppAudio.playClick();
    state.quizMode = 'sounds';
    state.currentQuizIndex = 0;
    updateQuizModeUI();
    renderQuizQuestion(0);
    history.pushState(null, '', '#game/sounds');
  });

  safeOn('btn-quiz-mode-nature', 'click', () => {
    if (typeof AppAudio !== 'undefined') AppAudio.playClick();
    state.quizMode = 'nature';
    state.currentQuizIndex = 0;
    updateQuizModeUI();
    renderQuizQuestion(0);
    history.pushState(null, '', '#game/nature');
  });

  safeOn('btn-quiz-share', 'click', () => {
    copyCurrentResourceLink(`#game/${state.quizMode}`, 'ხმოვანი თამაში - ქართული ენა');
  });

  safeOn('btn-quiz-home', 'click', () => {
    if (typeof AppAudio !== 'undefined') AppAudio.playClick();
    showScreen('start');
  });

  // =========================================================================
  // 9. საზეიმო ფინალური ეკრანი
  // =========================================================================

  function renderCelebration() {
    if (typeof AppAudio !== 'undefined') {
      AppAudio.playCelebration();
      AppAudio.playVoice('celebrate', 'შესანიშნავია! შენ ნამდვილი მკვლევარი ხარ!');
    }

    const celebrationGrid = document.getElementById('celebration-grid');
    if (celebrationGrid && typeof OBJECT_SEQUENCE !== 'undefined' && typeof NATURE_OBJECTS !== 'undefined') {
      celebrationGrid.innerHTML = '';
      OBJECT_SEQUENCE.forEach(key => {
        const item = NATURE_OBJECTS[key];
        if (!item) return;
        const itemEl = document.createElement('div');
        itemEl.className = 'celebration-item';
        itemEl.innerHTML = `
          <div class="celebration-item-svg">${item.svgThumb || ''}</div>
          <div class="celebration-item-name">${item.name || ''}</div>
        `;
        celebrationGrid.appendChild(itemEl);
      });
    }
  }

  safeOn('btn-celebration-restart-quiz', 'click', () => {
    if (typeof AppAudio !== 'undefined') AppAudio.playClick();
    showScreen('quiz');
  });

  safeOn('btn-celebration-go-explore', 'click', () => {
    if (typeof AppAudio !== 'undefined') AppAudio.playClick();
    showScreen('explore');
  });

  // =========================================================================
  // 10. მოდულებისა და ნავიგაციის ღილაკების მოვლენები
  // =========================================================================

  // მთავარი საწყისი მოქმედებები: „დაწყება“ და „ვითამაშოთ“
  safeOn('btn-start-explore', 'click', () => {
    if (typeof AppAudio !== 'undefined') AppAudio.playClick();
    showScreen('explore');
  });

  safeOn('btn-start-quiz', 'click', () => {
    if (typeof AppAudio !== 'undefined') AppAudio.playClick();
    state.quizMode = 'sounds';
    showScreen('quiz');
  });

  // 5 მოდულის ბარათები
  safeOn('card-mod-nature', 'click', () => {
    if (typeof AppAudio !== 'undefined') AppAudio.playClick();
    showScreen('explore');
  });

  safeOn('card-mod-ai-ia', 'click', () => {
    if (typeof AppAudio !== 'undefined') AppAudio.playClick();
    state.activeStoryKey = 'ai-ia';
    state.storyStepIndex = 0;
    showScreen('story');
  });

  safeOn('card-mod-belebi', 'click', () => {
    if (typeof AppAudio !== 'undefined') AppAudio.playClick();
    state.activeStoryKey = 'belebi';
    state.storyStepIndex = 0;
    showScreen('story');
  });

  safeOn('card-mod-animals', 'click', () => {
    if (typeof AppAudio !== 'undefined') AppAudio.playClick();
    showScreen('animals');
  });

  safeOn('card-mod-quiz', 'click', () => {
    if (typeof AppAudio !== 'undefined') AppAudio.playClick();
    state.quizMode = 'sounds';
    showScreen('quiz');
  });

  // Explore & Header controls
  safeOn('btn-explore-home', 'click', () => {
    if (typeof AppAudio !== 'undefined') AppAudio.playClick();
    showScreen('start');
  });

  safeOn('btn-explore-share', 'click', () => {
    copyCurrentResourceLink('#nature', 'დილა არის მშვენიერი - ბუნების სცენა');
  });

  safeOn('btn-header-home', 'click', () => {
    if (typeof AppAudio !== 'undefined') AppAudio.playClick();
    showScreen('start');
  });

  safeOn('btn-header-quiz', 'click', () => {
    if (typeof AppAudio !== 'undefined') AppAudio.playClick();
    state.quizMode = 'sounds';
    showScreen('quiz');
  });

  safeOn('btn-header-share', 'click', () => {
    copyCurrentResourceLink();
  });

  safeOn('btn-brand-home', 'click', () => {
    if (typeof AppAudio !== 'undefined') AppAudio.playClick();
    showScreen('start');
  });

  // ხმის გადამრთველი
  function updateMuteButtonUI() {
    if (typeof AppAudio === 'undefined') return;
    const isMuted = AppAudio.getMuteState();
    const btnMute = document.getElementById('btn-mute-toggle');
    if (btnMute) {
      btnMute.innerHTML = isMuted 
        ? '🔇 <span>ხმა: გამორთულია</span>' 
        : '🔊 <span>ხმა: ჩართულია</span>';
      btnMute.setAttribute('aria-pressed', isMuted ? 'true' : 'false');
    }
  }

  safeOn('btn-mute-toggle', 'click', () => {
    if (typeof AppAudio !== 'undefined') {
      AppAudio.toggleMute();
      updateMuteButtonUI();
    }
  });

  // ბრაუზერის Hashchange მოვლენა
  window.addEventListener('hashchange', handleHashRouting);

  // =========================================================================
  // 11. ინიციალიზაცია
  // =========================================================================
  updateMuteButtonUI();
  handleHashRouting();
}

// დროული ინიციალიზაცია: მუშაობს როგორც ჩვეულებრივ, ისე დაყოვნებით ჩატვირთვისას
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
