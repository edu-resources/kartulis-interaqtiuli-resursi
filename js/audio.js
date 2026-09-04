/**
 * დილა არის მშვენიერი - აუდიო სისტემა
 * Web Audio API (სრულიად ოფლაინ სინთეზატორი) & SpeechSynthesis
 */

const AppAudio = (() => {
  let isMuted = false;
  let audioCtx = null;

  // AudioContext-ის უსაფრთხო ინიციალიზაცია
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

  // მარტივი, რბილი ტონის სინთეზი
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
      gain.gain.linearRampToValueAtTime(gainLevel, ctx.currentTime + delay + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + duration);
    } catch (e) {
      console.warn('Audio synthesis not supported or blocked:', e);
    }
  }

  // 1. ღილაკზე დაჭერის რბილი ხმა
  function playClick() {
    if (isMuted) return;
    playTone(520, 'sine', 0.1, 0, 0.08);
  }

  // 2. სწორი პასუხის ჟღერადობა (მაჟორული ჰარმონიული აკორდი: C5 - E5 - G5 - C6)
  function playSuccess() {
    if (isMuted) return;
    playTone(523.25, 'triangle', 0.35, 0.0, 0.15); // C5
    playTone(659.25, 'triangle', 0.35, 0.08, 0.15); // E5
    playTone(783.99, 'triangle', 0.4, 0.16, 0.16); // G5
    playTone(1046.50, 'sine', 0.55, 0.24, 0.18); // C6
  }

  // 3. შეცდომის / „კიდევ სცადე“ რბილი, თბილი ტონი (არაშემშინებელი და მეგობრული)
  function playTryAgain() {
    if (isMuted) return;
    playTone(392.00, 'sine', 0.22, 0.0, 0.12); // G4
    playTone(329.63, 'sine', 0.3, 0.14, 0.11); // E4
  }

  // 4. საზეიმო ფინალური აკორდი
  function playCelebration() {
    if (isMuted) return;
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    notes.forEach((freq, idx) => {
      playTone(freq, 'sine', 0.6, idx * 0.1, 0.14);
    });
  }

  // 5. ობიექტის გაცნობის რბილი ზარის ხმა
  function playObjectChime() {
    if (isMuted) return;
    playTone(587.33, 'triangle', 0.35, 0.0, 0.12); // D5
    playTone(880.00, 'sine', 0.45, 0.12, 0.14); // A5
  }

  // --- ქართული SpeechSynthesis (ხმოვანი წაკითხვა) ---
  function speakText(text) {
    if (isMuted || !text) return;
    if (!('speechSynthesis' in window)) return;

    try {
      window.speechSynthesis.cancel(); // წინა გახმოვანების შეწყვეტა

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85; // ოდნავ ნელი, ბავშვისთვის ადვილად აღსაქმელი ტემპი
      utterance.pitch = 1.05; // თბილი და მეგობრული ტონი

      // ვამოწმებთ, აქვს თუ არა მოწყობილობას ქართული ხმა
      const voices = window.speechSynthesis.getVoices();
      const georgianVoice = voices.find(v => v.lang.startsWith('ka') || v.lang.includes('GEO'));
      if (georgianVoice) {
        utterance.voice = georgianVoice;
        utterance.lang = georgianVoice.lang;
      } else {
        utterance.lang = 'ka-GE';
      }

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('Speech synthesis error:', err);
    }
  }

  function stopSpeech() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  // ხმის ჩართვა / გამორთვის გადამრთველი
  function toggleMute() {
    isMuted = !isMuted;
    if (isMuted) {
      stopSpeech();
    } else {
      // გააქტიურებისას დავუკრათ მოკლე დადასტურების ხმა
      playClick();
    }
    return isMuted;
  }

  function getMuteState() {
    return isMuted;
  }

  return {
    playClick,
    playSuccess,
    playTryAgain,
    playCelebration,
    playObjectChime,
    speakText,
    stopSpeech,
    toggleMute,
    getMuteState,
    getAudioContext
  };
})();
