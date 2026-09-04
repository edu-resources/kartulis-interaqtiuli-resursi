/**
 * დილა არის მშვენიერი - აუდიო სისტემა
 * ადაპტირებული წერა-კითხვის არმცოდნე პირველკლასელებისთვის
 * 
 * შესაძლებლობები:
 * 1. ცხოველებისა და ფრინველების რეალისტური ხმების Web Audio სინთეზატორი
 * 2. ქართული ენის ხმოვანი ძრავა (Web Speech API + MP3 fallback)
 * 3. მელოდიური ინტერაქციის ხმები (დაწკაპუნება, წარმატება, წახალისება, საზეიმო აკორდი)
 * 4. ლინკის გაზიარებისა და მინიშნებების აუდიო უკუკავშირი
 */

const AppAudio = (() => {
  let isMuted = false;
  let audioCtx = null;
  let currentAudioElement = null;
  let isCurrentlySpeaking = false;

  // Web Audio API უსაფრთხო ინიციალიზაცია
  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  // მარტივი ტონის სინთეზი
  function playTone(frequency, type, duration, delay = 0, gainLevel = 0.12) {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime + delay);

      gain.gain.setValueAtTime(0, ctx.currentTime + delay);
      gain.gain.linearRampToValueAtTime(gainLevel, ctx.currentTime + delay + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + duration);
    } catch (e) {
      console.warn('Audio tone error:', e);
    }
  }

  // --- UI მელოდიური ეფექტები ---

  // 1. რბილი დაწკაპუნება
  function playClick() {
    if (isMuted) return;
    playTone(600, 'sine', 0.08, 0, 0.09);
  }

  // 2. წარმატების მაჟორული აკორდი
  function playSuccess() {
    if (isMuted) return;
    playTone(523.25, 'triangle', 0.35, 0.0, 0.15); // C5
    playTone(659.25, 'triangle', 0.35, 0.08, 0.15); // E5
    playTone(783.99, 'triangle', 0.4, 0.16, 0.16); // G5
    playTone(1046.50, 'sine', 0.55, 0.24, 0.18); // C6
  }

  // 3. მეგობრული წახალისება („კიდევ სცადე“)
  function playTryAgain() {
    if (isMuted) return;
    playTone(440.00, 'sine', 0.25, 0.0, 0.11);
    playTone(349.23, 'sine', 0.35, 0.12, 0.10);
  }

  // 4. საზეიმო ფინალური ფანფარა
  function playCelebration() {
    if (isMuted) return;
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
    notes.forEach((freq, idx) => {
      playTone(freq, 'sine', 0.6, idx * 0.09, 0.14);
    });
  }

  // 5. ობიექტის გაცნობის ზარის ხმა
  function playObjectChime() {
    if (isMuted) return;
    playTone(659.25, 'triangle', 0.35, 0.0, 0.13); // E5
    playTone(987.77, 'sine', 0.45, 0.12, 0.14);    // B5
  }

  // 6. ლინკის დაკოპირების ხმა
  function playLinkCopiedTone() {
    if (isMuted) return;
    playTone(784, 'sine', 0.15, 0.0, 0.12);
    playTone(1046.5, 'triangle', 0.25, 0.1, 0.15);
  }

  // --- ცხოველებისა და ფრინველების რეალისტური ხმების სინთეზატორი ---

  /**
   * 🦉 ბუს ხმა (Owl Hoot - "ჰუუ... ჰუუ...")
   */
  function playOwlHoot() {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const playSingleHoot = (startTime, duration, freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq - 30, startTime);
        osc.frequency.linearRampToValueAtTime(freq + 40, startTime + duration * 0.4);
        osc.frequency.linearRampToValueAtTime(freq - 20, startTime + duration);

        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.2, startTime + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + duration);
      };

      const now = ctx.currentTime;
      playSingleHoot(now, 0.45, 420);
      playSingleHoot(now + 0.55, 0.65, 380);
    } catch (e) {
      console.warn('Owl sound error:', e);
    }
  }

  /**
   * 🐦 ჩიტის/მერცხლის გალობა (Bird Chirp - "ჭიკ-ჭიკ-ჭიკ")
   */
  function playBirdChirp() {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const playSingleChirp = (startTime, baseFreq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(baseFreq, startTime);
        osc.frequency.exponentialRampToValueAtTime(baseFreq + 900, startTime + 0.04);
        osc.frequency.exponentialRampToValueAtTime(baseFreq + 300, startTime + 0.1);

        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.16, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.12);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.13);
      };

      const now = ctx.currentTime;
      playSingleChirp(now, 2600);
      playSingleChirp(now + 0.15, 2900);
      playSingleChirp(now + 0.32, 3200);
    } catch (e) {
      console.warn('Bird chirp error:', e);
    }
  }

  /**
   * 🐸 ბაყაყის ყიყინი (Frog Croak - "ყვა-ყვა-ყვა")
   */
  function playFrogCroak() {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const playSingleCroak = (startTime) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(130, startTime);
        osc.frequency.linearRampToValueAtTime(105, startTime + 0.2);

        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(450, startTime);
        filter.Q.setValueAtTime(4, startTime);

        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.22, startTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.22);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.24);
      };

      const now = ctx.currentTime;
      playSingleCroak(now);
      playSingleCroak(now + 0.28);
    } catch (e) {
      console.warn('Frog sound error:', e);
    }
  }

  /**
   * 🐝 ფუტკრის ბზუილი (Bee Buzz - "ბზზზზ")
   */
  function playBeeBuzz() {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const duration = 1.1;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // ვიბრატო
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(25, now);
      lfoGain.gain.setValueAtTime(15, now);
      lfo.connect(osc.frequency);

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(230, now);
      osc.frequency.linearRampToValueAtTime(260, now + duration * 0.5);
      osc.frequency.linearRampToValueAtTime(210, now + duration);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(900, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      lfo.start(now);
      osc.start(now);
      lfo.stop(now + duration);
      osc.stop(now + duration);
    } catch (e) {
      console.warn('Bee buzz error:', e);
    }
  }

  /**
   * 🐈 კატის კნავილი (Cat Meow - "მიაუუ")
   */
  function playCatMeow() {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const duration = 0.85;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(750, now + 0.35);
      osc.frequency.exponentialRampToValueAtTime(320, now + duration);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.linearRampToValueAtTime(1300, now + 0.35);
      filter.frequency.linearRampToValueAtTime(600, now + duration);
      filter.Q.setValueAtTime(2.5, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.22, now + 0.1);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.5);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch (e) {
      console.warn('Cat meow error:', e);
    }
  }

  /**
   * 🐕 ძაღლის/ლეკვის ყეფა (Dog Bark - "ჰავ-ჰავ")
   */
  function playDogBark() {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const playSingleBark = (startTime, pitch) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(pitch, startTime);
        osc.frequency.exponentialRampToValueAtTime(pitch * 0.5, startTime + 0.18);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1200, startTime);

        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.28, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.2);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.22);
      };

      const now = ctx.currentTime;
      playSingleBark(now, 420);
      playSingleBark(now + 0.25, 390);
    } catch (e) {
      console.warn('Dog bark error:', e);
    }
  }

  /**
   * 🐓 მამლის ყივილი (Rooster Crow - "ყიყლიყოოო")
   */
  function playRoosterCrow() {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(550, now);
      osc.frequency.linearRampToValueAtTime(750, now + 0.15);
      osc.frequency.linearRampToValueAtTime(580, now + 0.35);
      osc.frequency.linearRampToValueAtTime(880, now + 0.7);
      osc.frequency.linearRampToValueAtTime(650, now + 1.2);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.25, now + 0.05);
      gain.gain.linearRampToValueAtTime(0.22, now + 0.8);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 1.3);
    } catch (e) {
      console.warn('Rooster crow error:', e);
    }
  }

  /**
   * 🐑 ცხვრის ბღავილი (Sheep Baa - "ბეე-ეე")
   */
  function playSheepBaa() {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const duration = 0.85;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(6.5, now);
      lfoGain.gain.setValueAtTime(18, now);
      lfo.connect(osc.frequency);

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.linearRampToValueAtTime(230, now + duration);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(850, now);
      filter.Q.setValueAtTime(3, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      lfo.start(now);
      osc.start(now);
      lfo.stop(now + duration);
      osc.stop(now + duration);
    } catch (e) {
      console.warn('Sheep baa error:', e);
    }
  }

  /**
   * 🦆 იხვის/ბატის ყიყინი (Duck/Goose Quack - "ყვა-ყვა")
   */
  function playDuckQuack() {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const playSingleQuack = (startTime) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(330, startTime);
        osc.frequency.exponentialRampToValueAtTime(240, startTime + 0.18);

        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(750, startTime);
        filter.Q.setValueAtTime(3.5, startTime);

        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.22, startTime + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.2);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.22);
      };

      const now = ctx.currentTime;
      playSingleQuack(now);
      playSingleQuack(now + 0.24);
    } catch (e) {
      console.warn('Duck quack error:', e);
    }
  }

  /**
   * 🐻 დათვის ბრდღვინვა (Bear Growl)
   */
  function playBearGrowl() {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const duration = 0.9;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.type = 'sawtooth';
      lfo.frequency.setValueAtTime(30, now);
      lfoGain.gain.setValueAtTime(20, now);
      lfo.connect(osc.frequency);

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(95, now);
      osc.frequency.linearRampToValueAtTime(80, now + duration);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(350, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.25, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      lfo.start(now);
      osc.start(now);
      lfo.stop(now + duration);
      osc.stop(now + duration);
    } catch (e) {
      console.warn('Bear growl error:', e);
    }
  }

  /**
   * წეროს ძახილი (Crane Call)
   */
  function playCraneCall() {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(620, now);
      osc.frequency.exponentialRampToValueAtTime(890, now + 0.2);
      osc.frequency.exponentialRampToValueAtTime(540, now + 0.55);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.62);
    } catch (e) {
      console.warn('Crane call error:', e);
    }
  }

  /**
   * ცხოველის ხმის დაკვრა გასაღებით
   */
  function playAnimalSound(animalKey) {
    if (isMuted) return;
    switch (animalKey) {
      case 'owl':
        playOwlHoot();
        break;
      case 'bird':
      case 'swallow':
        playBirdChirp();
        break;
      case 'frog':
        playFrogCroak();
        break;
      case 'bee':
      case 'beehive':
        playBeeBuzz();
        break;
      case 'cat':
      case 'kitten':
        playCatMeow();
        break;
      case 'dog':
      case 'puppy':
        playDogBark();
        break;
      case 'rooster':
        playRoosterCrow();
        break;
      case 'sheep':
      case 'lamb':
        playSheepBaa();
        break;
      case 'duck':
      case 'goose':
        playDuckQuack();
        break;
      case 'bear':
      case 'bear-cub':
        playBearGrowl();
        break;
      case 'crane':
        playCraneCall();
        break;
      default:
        playObjectChime();
        break;
    }
  }

  // --- ხმოვანი გახმოვანება ქართულ ენაზე (SpeechSynthesis & MP3) ---

  function stopAll() {
    if (currentAudioElement) {
      try {
        currentAudioElement.pause();
        currentAudioElement.currentTime = 0;
      } catch (e) {}
      currentAudioElement = null;
    }
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
    }
    setSpeakingState(false);
  }

  function setSpeakingState(speaking) {
    isCurrentlySpeaking = speaking;
    document.body.classList.toggle('app-speaking', speaking);
  }

  function playVoice(audioKey, fallbackText, onStart = null, onEnd = null) {
    if (isMuted) {
      if (onEnd) onEnd();
      return;
    }

    stopAll();

    // 1. ვცდილობთ ლოკალური MP3 ფაილის დაკვრას (audio/ საქაღალდიდან)
    if (audioKey) {
      const audioPath = `audio/${audioKey}.mp3`;
      const audio = new Audio(audioPath);
      currentAudioElement = audio;

      let hasEnded = false;
      const handleEnd = () => {
        if (!hasEnded) {
          hasEnded = true;
          setSpeakingState(false);
          currentAudioElement = null;
          if (onEnd) onEnd();
        }
      };

      audio.onplay = () => {
        setSpeakingState(true);
        if (onStart) onStart();
      };

      audio.onended = handleEnd;

      audio.onerror = () => {
        currentAudioElement = null;
        speakTextFallback(fallbackText, onStart, onEnd);
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          currentAudioElement = null;
          speakTextFallback(fallbackText, onStart, onEnd);
        });
      }
    } else {
      speakTextFallback(fallbackText, onStart, onEnd);
    }
  }

  // SpeechSynthesis სარეზერვო გახმოვანება ქართული ტექსტით
  function speakTextFallback(text, onStart = null, onEnd = null) {
    if (isMuted || !text) {
      if (onEnd) onEnd();
      return;
    }

    if (!('speechSynthesis' in window)) {
      if (onStart) onStart();
      setTimeout(() => {
        if (onEnd) onEnd();
      }, 1200);
      return;
    }

    try {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85; // ნელი, ბავშვისთვის აღქმადი ტემპი
      utterance.pitch = 1.05;

      const voices = window.speechSynthesis.getVoices();
      const georgianVoice = voices.find(v => v.lang && (v.lang.startsWith('ka') || v.lang.toLowerCase().includes('geo')));
      if (georgianVoice) {
        utterance.voice = georgianVoice;
        utterance.lang = georgianVoice.lang;
      } else {
        utterance.lang = 'ka-GE';
      }

      utterance.onstart = () => {
        setSpeakingState(true);
        if (onStart) onStart();
      };

      utterance.onend = () => {
        setSpeakingState(false);
        if (onEnd) onEnd();
      };

      utterance.onerror = () => {
        setSpeakingState(false);
        if (onEnd) onEnd();
      };

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('Speech synthesis fallback error:', err);
      setSpeakingState(false);
      if (onEnd) onEnd();
    }
  }

  function toggleMute() {
    isMuted = !isMuted;
    if (isMuted) {
      stopAll();
    } else {
      playClick();
    }
    return isMuted;
  }

  function getMuteState() {
    return isMuted;
  }

  return {
    getAudioContext,
    playTone,
    playClick,
    playSuccess,
    playTryAgain,
    playCelebration,
    playObjectChime,
    playLinkCopiedTone,
    playOwlHoot,
    playBirdChirp,
    playFrogCroak,
    playBeeBuzz,
    playCatMeow,
    playDogBark,
    playRoosterCrow,
    playSheepBaa,
    playDuckQuack,
    playBearGrowl,
    playCraneCall,
    playAnimalSound,
    playVoice,
    speakTextFallback,
    stopAll,
    toggleMute,
    getMuteState
  };
})();
