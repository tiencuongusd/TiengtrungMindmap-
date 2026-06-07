
import { useState, useEffect } from 'react';
import { Lesson } from '../types';

export interface AudioSettings {
  rate: number;
  voiceURI?: string;
  genderPreference?: 'male' | 'female' | 'auto';
  showVietnameseHint?: boolean;
  showPinyin?: boolean;
}

const DEFAULT_SETTINGS: AudioSettings = {
  rate: 0.8,
  genderPreference: 'auto',
  showVietnameseHint: true,
  showPinyin: true,
};

let settings: AudioSettings = { ...DEFAULT_SETTINGS };

export function getVoiceGender(voice: SpeechSynthesisVoice): 'male' | 'female' | 'unknown' {
  const name = voice.name.toLowerCase();
  
  if (
    name.includes('yunxi') || 
    name.includes('yunjian') || 
    name.includes('yunyang') || 
    name.includes('kangkang') ||
    name.includes('male') ||
    name.includes('man') ||
    name.includes('guy') ||
    name.includes('boy')
  ) {
    return 'male';
  }
  
  if (
    name.includes('xiaoxiao') || 
    name.includes('xiaoyi') || 
    name.includes('xiaochen') || 
    name.includes('xiaohan') || 
    name.includes('xiaomeng') || 
    name.includes('xiaomo') || 
    name.includes('xiaoqiu') || 
    name.includes('xiaorui') || 
    name.includes('xiaoshuang') || 
    name.includes('tingting') || 
    name.includes('lili') || 
    name.includes('sinji') || 
    name.includes('meijia') || 
    name.includes('female') ||
    name.includes('woman') ||
    name.includes('girl') ||
    name.includes('google 普通话')
  ) {
    return 'female';
  }
  
  return 'unknown';
}

// Load from localStorage if available
try {
  const saved = localStorage.getItem('audio_settings');
  if (saved) {
    const parsed = JSON.parse(saved);
    settings = { ...settings, ...parsed };
  }
} catch (e) {
  console.error("Failed to load audio settings", e);
}

export function getAudioSettings(): AudioSettings {
  return { ...settings };
}

const settingsListeners = new Set<(settings: AudioSettings) => void>();

export function subscribeToSettings(listener: (settings: AudioSettings) => void) {
  settingsListeners.add(listener);
  listener(settings);
  return () => {
    settingsListeners.delete(listener);
  };
}

export function useAudioSettings() {
  const [currentSettings, setCurrentSettings] = useState<AudioSettings>(settings);

  useEffect(() => {
    return subscribeToSettings((newSettings) => {
      setCurrentSettings(newSettings);
    });
  }, []);

  return currentSettings;
}

export function updateAudioSettings(newSettings: Partial<AudioSettings>) {
  settings = { ...settings, ...newSettings };
  try {
    localStorage.setItem('audio_settings', JSON.stringify(settings));
  } catch (e) {
    console.error("Failed to save audio settings", e);
  }
  settingsListeners.forEach((l) => l(settings));
}

export interface AudioPlayState {
  text: string | null;
  charIndex: number;
  charLength: number;
  isSpeaking: boolean;
  isWordClick?: boolean;
}

let activePlaybackState: AudioPlayState = {
  text: null,
  charIndex: -1,
  charLength: 0,
  isSpeaking: false,
  isWordClick: false,
};

const listeners = new Set<(state: AudioPlayState) => void>();

export function subscribeToAudio(listener: (state: AudioPlayState) => void) {
  listeners.add(listener);
  listener(activePlaybackState);
  return () => {
    listeners.delete(listener);
  };
}

function updatePlaybackState(updates: Partial<AudioPlayState>) {
  activePlaybackState = { ...activePlaybackState, ...updates };
  listeners.forEach((l) => l(activePlaybackState));
}

export function useAudioPlayback() {
  const [state, setState] = useState<AudioPlayState>(activePlaybackState);

  useEffect(() => {
    return subscribeToAudio((newState) => {
      setState(newState);
    });
  }, []);

  return state;
}

let fallbackTimerId: any = null;
let nativeBoundaryDetected = false;

export function stopChineseAudio() {
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
  if (fallbackTimerId) {
    clearInterval(fallbackTimerId);
    fallbackTimerId = null;
  }
  updatePlaybackState({
    text: null,
    charIndex: -1,
    charLength: 0,
    isSpeaking: false,
    isWordClick: false,
  });
}

export function playChineseAudio(text: string, isWordClick = false) {
  if (!window.speechSynthesis) {
    console.warn("Speech synthesis not supported");
    return;
  }

  // Clear previous timers & cancel active speaking
  if (fallbackTimerId) {
    clearInterval(fallbackTimerId);
    fallbackTimerId = null;
  }

  window.speechSynthesis.cancel();

  updatePlaybackState({
    text: text,
    charIndex: -1,
    charLength: 0,
    isSpeaking: true,
    isWordClick: isWordClick,
  });

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'zh-CN';
  
  // Apply settings
  utterance.rate = settings.rate;
  
  // Try to find a voice that matches preference
  const voices = window.speechSynthesis.getVoices();
  const zhVoices = voices.filter(v => v.lang.includes('zh'));
  
  let selectedVoice: SpeechSynthesisVoice | undefined;

  // 1. If a specific voiceURI is selected, try to find it
  if (settings.voiceURI) {
    selectedVoice = zhVoices.find(v => v.voiceURI === settings.voiceURI);
  }

  // 2. If no voice is found or specific voice isn't set, try to filter by gender preference
  if (!selectedVoice && settings.genderPreference && settings.genderPreference !== 'auto') {
    selectedVoice = zhVoices.find(v => getVoiceGender(v) === settings.genderPreference);
  }

  // 3. Fallback: if we still don't have a voice, find any Chinese voice
  if (!selectedVoice) {
    selectedVoice = zhVoices[0];
  }

  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }

  nativeBoundaryDetected = false;
  let startTime = 0;
  let latestNativeIndex = 0;

  // Precompute character offset times for robust fallback tracking
  const onsets: number[] = [];
  let currentTime = 0;
  let currentMsPerChar = 185 / utterance.rate; // Optimized default starting speed
  const initialPauseDuration = 100 / utterance.rate;

  for (let i = 0; i < text.length; i++) {
    onsets.push(currentTime);
    const char = text[i];
    const isPunctuation = /[\s,.\/#!$%\^&\*;:{}=\-_`~()?"'，。？！、；：\u3000-\u303F\uFF00-\uFFEF]/g.test(char);
    if (isPunctuation) {
      currentTime += initialPauseDuration;
    } else {
      currentTime += currentMsPerChar;
    }
  }

  utterance.onboundary = (event) => {
    if (event.charIndex > 0) {
      nativeBoundaryDetected = true;
    }
    const charIndex = event.charIndex;
    latestNativeIndex = charIndex;

    const elapsed = Date.now() - startTime;
    // Map words to characters and dynamically recalibrate speech speed
    if (charIndex > 0 && elapsed > 0) {
      const measuredMsPerChar = elapsed / charIndex;
      // Clamp values to realistic speeds
      const safeMsPerChar = Math.max(90, Math.min(measuredMsPerChar, 350));
      
      // 60% weight to new measurement, 40% weight to previous
      currentMsPerChar = (currentMsPerChar * 0.4) + (safeMsPerChar * 0.6);

      // Re-align onsets for remaining characters based on measured tempo
      let tempTime = elapsed;
      for (let i = charIndex; i < text.length; i++) {
        onsets[i] = tempTime;
        const char = text[i];
        const isPunctuation = /[\s,.\/#!$%\^&\*;:{}=\-_`~()?"'，。？！、；：\u3000-\u303F\uFF00-\uFFEF]/g.test(char);
        if (isPunctuation) {
          tempTime += initialPauseDuration;
        } else {
          tempTime += currentMsPerChar;
        }
      }
    }
  };

  utterance.onstart = () => {
    startTime = Date.now();
    let visualIndex = 0;

    updatePlaybackState({
      text: text,
      charIndex: 0,
      charLength: 1,
      isSpeaking: true,
    });

    fallbackTimerId = setInterval(() => {
      const elapsed = Date.now() - startTime;
      
      // Find the character index whose onset is closest/less than elapsed
      let targetIndex = 0;
      for (let i = 0; i < onsets.length; i++) {
        if (elapsed >= onsets[i]) {
          targetIndex = i;
        } else {
          break;
        }
      }

      // Blend native feedback to catch up if browser speaks faster
      if (nativeBoundaryDetected) {
        targetIndex = Math.max(targetIndex, latestNativeIndex);
      }

      // Step visually one character at a time so highlighting does not jump or skip words
      if (visualIndex < targetIndex) {
        visualIndex++;
      } else if (visualIndex > targetIndex + 1) {
        visualIndex = targetIndex;
      }

      const activeChar = text[visualIndex] || '';
      const isPunctuation = /[\s,.\/#!$%\^&\*;:{}=\-_`~()?"'，。？！、；：\u3000-\u303F\uFF00-\uFFEF]/g.test(activeChar);

      updatePlaybackState({
        text: text,
        charIndex: Math.min(visualIndex, text.length - 1),
        charLength: isPunctuation ? 0 : 1,
        isSpeaking: true,
      });
    }, 30); // Responsive 30ms interval
  };

  const cleanUpPlayback = () => {
    if (fallbackTimerId) {
      clearInterval(fallbackTimerId);
      fallbackTimerId = null;
    }
    updatePlaybackState({
      text: null,
      charIndex: -1,
      charLength: 0,
      isSpeaking: false,
      isWordClick: false,
    });
  };

  const cleanUpPlaybackGracefully = () => {
    if (fallbackTimerId) {
      clearInterval(fallbackTimerId);
      fallbackTimerId = null;
    }

    // Capture the last highlighted index and seamlessly sweep to the end of the text
    let sweepIndex = activePlaybackState.text === text ? activePlaybackState.charIndex : 0;
    if (sweepIndex < 0) sweepIndex = 0;

    const runSweepEnd = () => {
      if (activePlaybackState.text !== text || !activePlaybackState.isSpeaking) {
        return; // Guard against overlapping speech sessions
      }

      if (sweepIndex < text.length) {
        const char = text[sweepIndex];
        const isPunctuation = /[\s,.\/#!$%\^&\*;:{}=\-_`~()?"'，。？！、；：\u3000-\u303F\uFF00-\uFFEF]/g.test(char);
        
        updatePlaybackState({
          text: text,
          charIndex: sweepIndex,
          charLength: isPunctuation ? 0 : 1,
          isSpeaking: true,
        });

        sweepIndex++;
        // Move rapidly across remaining characters (55ms/char)
        setTimeout(runSweepEnd, 55);
      } else {
        // Leave the final word highlighted briefly before completing
        setTimeout(() => {
          if (activePlaybackState.text === text) {
            updatePlaybackState({
              text: null,
              charIndex: -1,
              charLength: 0,
              isSpeaking: false,
              isWordClick: false,
            });
          }
        }, 150);
      }
    };

    runSweepEnd();
  };

  utterance.onend = () => {
    cleanUpPlaybackGracefully();
  };

  utterance.onerror = () => {
    cleanUpPlayback();
  };

  window.speechSynthesis.speak(utterance);
}

export function playCorrectSound() {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    
    const playTing = (freq: number, startTime: number, duration: number, volume: number) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);
      
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(volume, startTime + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start(startTime);
      osc.stop(startTime + duration + 0.1);
    };

    // Upbeat minor-to-major ascending bell tone for a modern game sound effect (D6 to G6)
    playTing(1174.66, ctx.currentTime, 0.4, 0.18);      // D6
    playTing(1567.98, ctx.currentTime + 0.07, 0.5, 0.18); // G6
  } catch (e) {
    console.warn("Failed to play correct sound", e);
  }
}

export function playCelebrationSound() {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    const playVoice = (startFreq: number, endFreq: number, startTime: number, duration: number, volume: number) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      const vibrato = ctx.createOscillator();
      const vibratoGain = ctx.createGain();

      // Configure LFO for an excited vibrato ("zeeee" warble effect)
      vibrato.frequency.setValueAtTime(18, startTime); // speed
      vibratoGain.gain.setValueAtTime(20, startTime); // pitch swing depth

      osc.type = 'triangle'; // crisp but warm wave
      
      // Sweeping frequency up
      osc.frequency.setValueAtTime(startFreq, startTime);
      osc.frequency.exponentialRampToValueAtTime(endFreq, startTime + 0.18);
      
      // Volume envelope with high attack and gradual decay
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(volume, startTime + 0.04);
      gainNode.gain.linearRampToValueAtTime(volume, startTime + duration - 0.25);
      gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      vibrato.connect(vibratoGain);
      vibratoGain.connect(osc.frequency);
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      vibrato.start(startTime);
      osc.start(startTime);

      vibrato.stop(startTime + duration + 0.1);
      osc.stop(startTime + duration + 0.1);
    };

    // Ascending glorious major triad to celebrate!
    playVoice(329.63, 659.25, now, 1.4, 0.10);        // E4 -> E5
    playVoice(415.30, 830.61, now + 0.04, 1.4, 0.10); // G#4 -> G#5
    playVoice(493.88, 987.77, now + 0.08, 1.4, 0.10); // B4 -> B5
    playVoice(659.25, 1318.51, now + 0.12, 1.4, 0.08); // E5 -> E6
    
    // Play a delightful tiny high sparkle chime at the peak!
    setTimeout(() => {
      try {
        const chimeCtx = new AudioContextClass();
        const chimeOsc = chimeCtx.createOscillator();
        const chimeGain = chimeCtx.createGain();
        chimeOsc.type = 'sine';
        chimeOsc.frequency.setValueAtTime(1975.53, chimeCtx.currentTime); // High B6
        
        chimeGain.gain.setValueAtTime(0, chimeCtx.currentTime);
        chimeGain.gain.linearRampToValueAtTime(0.12, chimeCtx.currentTime + 0.02);
        chimeGain.gain.exponentialRampToValueAtTime(0.001, chimeCtx.currentTime + 0.65);
        
        chimeOsc.connect(chimeGain);
        chimeGain.connect(chimeCtx.destination);
        chimeOsc.start();
        chimeOsc.stop(chimeCtx.currentTime + 0.7);
      } catch {}
    }, 120);

  } catch (e) {
    console.warn("Failed to play celebration sound", e);
  }
}

