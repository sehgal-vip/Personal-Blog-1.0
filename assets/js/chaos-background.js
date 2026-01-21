/**
 * Organized Chaos Background Effects
 * 
 * Creates wave-based texture distortion that responds to cursor movement,
 * embodying the "organized chaos" aesthetic with mathematical wave patterns
 * that create unpredictable-looking but rule-based visual effects.
 */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    // Wave parameters
    waveCount: 3,              // Number of overlapping wave layers
    baseFrequency: 0.02,        // Base wave frequency
    amplitude: 20,              // Wave amplitude (distortion strength)
    speed: 0.001,               // Wave animation speed
    cursorInfluence: 0.5,      // How much cursor affects waves (0-1)
    cursorRadius: 200,          // Radius of cursor influence
    
    // Performance
    throttleDelay: 16,          // ~60fps throttling
    pixelRatio: Math.min(window.devicePixelRatio || 1, 2), // Limit for performance
    
    // Visual
    opacity: 0.15,              // Texture opacity (subtle but visible)
    textureScale: 0.5,          // Texture detail level
    
    // Mobile
    reduceOnMobile: true,       // Reduce intensity on mobile
    mobileWaveCount: 2,         // Fewer waves on mobile
    mobileOpacity: 0.1,         // Lower opacity on mobile
  };

  class ChaosBackground {
    constructor() {
      // Skip on very small screens or if disabled
      if (window.innerWidth < 320) return;
      if (document.body.hasAttribute('data-disable-chaos')) return;

      this.canvas = null;
      this.ctx = null;
      this.waves = [];
      this.mouseX = window.innerWidth / 2;
      this.mouseY = window.innerHeight / 2;
      this.targetMouseX = this.mouseX;
      this.targetMouseY = this.mouseY;
      this.time = 0;
      this.isMobile = window.innerWidth <= 768;
      this.isVisible = true;
      this.animationFrame = null;
      this.throttleTimer = null;
      this.texturePattern = null;

      // Adjust config for mobile
      if (this.isMobile && CONFIG.reduceOnMobile) {
        CONFIG.waveCount = CONFIG.mobileWaveCount;
        CONFIG.opacity = CONFIG.mobileOpacity;
        CONFIG.amplitude = CONFIG.amplitude * 0.7;
      }

      this.init();
    }

    /**
     * Initialize canvas and wave system
     */
    init() {
      this.createCanvas();
      this.createWaves();
      this.createTexturePattern();
      this.setupEventListeners();
      this.animate();
    }

    /**
     * Create canvas element
     */
    createCanvas() {
      this.canvas = document.createElement('canvas');
      this.canvas.id = 'chaos-background';
      this.canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: ${CONFIG.opacity};
      `;
      document.body.appendChild(this.canvas);

      this.ctx = this.canvas.getContext('2d');
      this.resizeCanvas();
      window.addEventListener('resize', () => this.resizeCanvas());
    }

    /**
     * Resize canvas to match viewport
     */
    resizeCanvas() {
      const dpr = CONFIG.pixelRatio;
      this.canvas.width = window.innerWidth * dpr;
      this.canvas.height = window.innerHeight * dpr;
      this.canvas.style.width = window.innerWidth + 'px';
      this.canvas.style.height = window.innerHeight + 'px';
      this.ctx.scale(dpr, dpr);
    }

    /**
     * Create wave layers with different frequencies
     */
    createWaves() {
      this.waves = [];
      for (let i = 0; i < CONFIG.waveCount; i++) {
        this.waves.push({
          frequency: CONFIG.baseFrequency * (1 + i * 0.5), // Different frequencies
          amplitude: CONFIG.amplitude * (0.8 + Math.random() * 0.4), // Vary amplitude
          phase: Math.random() * Math.PI * 2, // Random phase offset
          speed: CONFIG.speed * (0.8 + Math.random() * 0.4), // Vary speed
          direction: Math.random() * Math.PI * 2, // Random direction
        });
      }
    }

    /**
     * Set up event listeners
     */
    setupEventListeners() {
      // Throttled mouse tracking
      document.addEventListener('mousemove', (e) => {
        if (this.throttleTimer) return;
        
        this.throttleTimer = setTimeout(() => {
          this.targetMouseX = e.clientX;
          this.targetMouseY = e.clientY;
          this.throttleTimer = null;
        }, CONFIG.throttleDelay);
      });

      // Touch support
      document.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
          const touch = e.touches[0];
          this.targetMouseX = touch.clientX;
          this.targetMouseY = touch.clientY;
        }
      }, { passive: true });

      // Pause when page is not visible
      document.addEventListener('visibilitychange', () => {
        this.isVisible = !document.hidden;
        if (this.isVisible) {
          this.animate();
        }
      });
    }

    /**
     * Calculate wave distortion at a point
     */
    getWaveDistortion(x, y, time) {
      let distortionX = 0;
      let distortionY = 0;

      // Calculate distance from cursor
      const dx = x - this.mouseX;
      const dy = y - this.mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const cursorInfluence = Math.max(0, 1 - distance / CONFIG.cursorRadius);

      // Sum contributions from all waves
      for (const wave of this.waves) {
        // Base wave pattern
        const waveX = x * Math.cos(wave.direction) + y * Math.sin(wave.direction);
        const baseWave = Math.sin(waveX * wave.frequency + time * wave.speed + wave.phase) * wave.amplitude;

        // Cursor influence creates distortion
        const cursorWave = cursorInfluence * Math.sin(distance * 0.1 - time * 0.005) * CONFIG.amplitude * CONFIG.cursorInfluence;

        // Combine waves with interference
        const combinedWave = baseWave + cursorWave;

        // Apply in wave direction
        distortionX += combinedWave * Math.cos(wave.direction);
        distortionY += combinedWave * Math.sin(wave.direction);
      }

      return { x: distortionX, y: distortionY };
    }

    /**
     * Render frame with optimized wave distortion
     */
    render() {
      if (!this.isVisible) return;

      const width = window.innerWidth;
      const height = window.innerHeight;

      // Smooth mouse position interpolation
      this.mouseX += (this.targetMouseX - this.mouseX) * 0.1;
      this.mouseY += (this.targetMouseY - this.mouseY) * 0.1;

      // Update time
      this.time += 0.01;

      // Clear canvas
      this.ctx.clearRect(0, 0, width, height);

      // Draw wave interference pattern
      this.ctx.save();
      this.ctx.globalCompositeOperation = 'screen'; // Lighter blend mode for subtlety
      
      // Draw multiple wave layers creating interference patterns
      for (let i = 0; i < this.waves.length; i++) {
        const wave = this.waves[i];
        this.drawWaveLayer(wave, width, height, i);
      }
      
      this.ctx.restore();
      
      // Draw subtle texture overlay
      this.drawTextureOverlay(width, height);
    }

    /**
     * Draw a single wave layer with distortion
     */
    drawWaveLayer(wave, width, height, layerIndex) {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      
      // Create radial gradient from cursor position
      const gradient = this.ctx.createRadialGradient(
        this.mouseX, this.mouseY, 0,
        this.mouseX, this.mouseY, CONFIG.cursorRadius * 2
      );
      
      // Calculate wave interference at different distances
      for (let i = 0; i <= 10; i++) {
        const t = i / 10;
        const distance = t * CONFIG.cursorRadius * 2;
        
        // Wave pattern based on distance and angle
        const angle = Math.atan2(0, distance) + wave.direction;
        const waveX = distance * Math.cos(angle);
        const waveValue = Math.sin(waveX * wave.frequency + this.time * wave.speed + wave.phase);
        
        // Cursor influence creates distortion
        const cursorInfluence = Math.max(0, 1 - t);
        const cursorWave = cursorInfluence * Math.sin(distance * 0.05 - this.time * 0.003) * CONFIG.cursorInfluence;
        
        const combinedWave = (waveValue + cursorWave) * 0.5 + 0.5;
        const opacity = combinedWave * 0.08 + 0.02; // Very subtle
        
        // Use theme colors with slight hue variation
        const hue = (layerIndex * 40 + combinedWave * 20) % 360;
        const saturation = isDark ? 25 : 35;
        const lightness = isDark ? 45 : 55;
        
        gradient.addColorStop(t, `hsla(${hue}, ${saturation}%, ${lightness}%, ${opacity})`);
      }
      
      // Draw wave pattern
      this.ctx.fillStyle = gradient;
      this.ctx.fillRect(0, 0, width, height);
    }

    /**
     * Draw subtle texture overlay that distorts with waves
     */
    drawTextureOverlay(width, height) {
      // Create noise pattern once and reuse
      if (!this.texturePattern) {
        this.createTexturePattern();
      }
      
      // Apply wave distortion to pattern position
      const centerDistortion = this.getWaveDistortion(width / 2, height / 2, this.time);
      
      this.ctx.save();
      this.ctx.globalAlpha = 0.04;
      this.ctx.translate(centerDistortion.x * 0.2, centerDistortion.y * 0.2);
      this.ctx.fillStyle = this.texturePattern;
      this.ctx.fillRect(0, 0, width, height);
      this.ctx.restore();
    }

    /**
     * Create reusable texture pattern
     */
    createTexturePattern() {
      const patternSize = 8;
      const patternCanvas = document.createElement('canvas');
      patternCanvas.width = patternSize;
      patternCanvas.height = patternSize;
      const patternCtx = patternCanvas.getContext('2d');
      
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const color = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)';
      
      // Create sparse noise pattern
      for (let i = 0; i < 4; i++) {
        const x = Math.random() * patternSize;
        const y = Math.random() * patternSize;
        patternCtx.fillStyle = color;
        patternCtx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
      }
      
      this.texturePattern = this.ctx.createPattern(patternCanvas, 'repeat');
    }

    /**
     * Animation loop
     */
    animate() {
      if (!this.isVisible) return;

      this.render();
      this.animationFrame = requestAnimationFrame(() => this.animate());
    }

    /**
     * Cleanup
     */
    destroy() {
      if (this.animationFrame) {
        cancelAnimationFrame(this.animationFrame);
      }
      if (this.throttleTimer) {
        clearTimeout(this.throttleTimer);
      }
      if (this.canvas && this.canvas.parentNode) {
        this.canvas.parentNode.removeChild(this.canvas);
      }
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      new ChaosBackground();
    });
  } else {
    new ChaosBackground();
  }
})();
