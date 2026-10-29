/**
 * Generates an auspicious, royal Indian wedding melody
 * (Raag Bhupali & Yaman harmonized with Tanpura drone & sitar plucks)
 * using Web Audio API.
 */

class RoyalIndianSoundscape {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private droneGain: GainNode | null = null;
  private melodyInterval: number | null = null;

  private init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
  }

  // Tanpura drone on fundamental Sa (C# / 138.59 Hz) and Pa (G# / 207.65 Hz)
  private startTanpuraDrone() {
    if (!this.ctx || !this.masterGain) return;

    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.setValueAtTime(0.04, this.ctx.currentTime);
    this.droneGain.connect(this.masterGain);

    // Sa (C3 ~ 130.81Hz)
    this.droneOsc1 = this.ctx.createOscillator();
    this.droneOsc1.type = 'triangle';
    this.droneOsc1.frequency.setValueAtTime(138.59, this.ctx.currentTime);
    this.droneOsc1.connect(this.droneGain);
    this.droneOsc1.start();

    // Pa (G#3 ~ 207.65Hz)
    this.droneOsc2 = this.ctx.createOscillator();
    this.droneOsc2.type = 'sine';
    this.droneOsc2.frequency.setValueAtTime(207.65, this.ctx.currentTime);
    this.droneOsc2.connect(this.droneGain);
    this.droneOsc2.start();
  }

  private stopTanpuraDrone() {
    try {
      this.droneOsc1?.stop();
      this.droneOsc2?.stop();
    } catch {}
    this.droneOsc1 = null;
    this.droneOsc2 = null;
    this.droneGain = null;
  }

  // Play Sitar / Shehnai style plucked or sustained note with gentle vibrato
  private playRoyalNote(freq: number, offset: number, duration: number = 2.2) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime + offset;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Warm sitar-like overtones
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, now);

    // Gentle meend (pitch slide)
    osc.frequency.exponentialRampToValueAtTime(freq * 1.005, now + duration * 0.5);

    // Lowpass filter for smooth royal resonance
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.1, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + duration + 0.2);
  }

  private startMelodyCycle() {
    // Raag Bhupali auspicious wedding notes (Sa, Re, Ga, Pa, Dha, Sa')
    // Frequencies (Hz)
    const notes = [277.18, 311.13, 349.23, 415.30, 466.16, 554.37];
    const phrases = [
      [notes[0], notes[1], notes[2], notes[3]], // Sa Re Ga Pa
      [notes[4], notes[3], notes[2], notes[1]], // Dha Pa Ga Re
      [notes[2], notes[3], notes[4], notes[5]], // Ga Pa Dha Sa'
      [notes[3], notes[2], notes[1], notes[0]], // Pa Ga Re Sa
    ];

    let phraseIdx = 0;
    const tick = () => {
      if (!this.isPlaying || !this.ctx) return;
      const phrase = phrases[phraseIdx % phrases.length];
      phraseIdx++;

      phrase.forEach((freq, idx) => {
        this.playRoyalNote(freq, idx * 0.75, 2.5);
      });
    };

    tick();
    this.melodyInterval = window.setInterval(tick, 4500);
  }

  public async start(): Promise<boolean> {
    try {
      this.init();
      if (!this.ctx) return false;
      if (this.ctx.state === 'suspended') {
        await this.ctx.resume();
      }
      this.isPlaying = true;
      this.startTanpuraDrone();
      this.startMelodyCycle();
      return true;
    } catch {
      return false;
    }
  }

  public stop() {
    this.isPlaying = false;
    this.stopTanpuraDrone();
    if (this.melodyInterval) {
      clearInterval(this.melodyInterval);
      this.melodyInterval = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const soundscape = new RoyalIndianSoundscape();
