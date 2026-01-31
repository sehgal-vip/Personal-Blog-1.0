/**
 * Hero Video Scroll Scrub
 *
 * Sequence:
 * - 0-70%: Video scrubs, hero text fixed
 * - 70%+: Hero text scrolls up naturally, about follows
 */
(function() {
  'use strict';

  const video = document.getElementById('hero-video');
  const heroSection = document.querySelector('.hero-fullscreen');
  const heroBg = document.querySelector('.hero-bg-fixed');
  const scrollIndicator = document.querySelector('.scroll-indicator');

  if (!video || !heroSection) return;

  // Scroll distance for video phase (70% of 200vh = 140vh)
  const scrollDistance = window.innerHeight * 2;
  const videoEndPoint = scrollDistance * 0.7; // 140vh

  // Small spacer just for video scrub phase
  const spacer = document.createElement('div');
  spacer.style.cssText = 'height:' + videoEndPoint + 'px;';
  heroSection.after(spacer);

  function onScroll() {
    const scrollY = window.scrollY;
    const progress = Math.min(scrollY / scrollDistance, 1);

    // VIDEO: 0-70% scroll = 0-100% video
    if (video.duration) {
      const videoProgress = Math.min(progress / 0.7, 1);
      video.currentTime = videoProgress * video.duration;
    }

    // HERO: Fixed during video (0-70%), then scrolls naturally
    if (scrollY < videoEndPoint) {
      // Fixed positioning during video phase
      heroSection.style.cssText = [
        'position:fixed',
        'top:64px',
        'left:0',
        'right:0',
        'width:100%',
        'height:calc(100vh - 64px)',
        'z-index:1',
        'display:flex',
        'flex-direction:column',
        'justify-content:flex-end',
        'align-items:center',
        'padding:2rem',
        'padding-bottom:4rem',
        'box-sizing:border-box'
      ].join(';');
    } else {
      // Switch to relative - scrolls naturally with page
      heroSection.style.cssText = [
        'position:relative',
        'width:100%',
        'min-height:calc(100vh - 64px)',
        'z-index:1',
        'display:flex',
        'flex-direction:column',
        'justify-content:flex-end',
        'align-items:center',
        'padding:2rem',
        'padding-bottom:4rem',
        'box-sizing:border-box'
      ].join(';');
    }

    // HERO BACKGROUND: Fade out during 70-100%
    if (heroBg) {
      if (progress <= 0.7) {
        heroBg.style.opacity = '1';
        heroBg.style.visibility = 'visible';
      } else if (progress < 1) {
        const fadeProgress = (progress - 0.7) / 0.3;
        heroBg.style.opacity = 1 - fadeProgress;
        heroBg.style.visibility = 'visible';
      } else {
        heroBg.style.opacity = '0';
        heroBg.style.visibility = 'hidden';
      }
    }

    // SCROLL INDICATOR: Fades 40-60%
    if (scrollIndicator) {
      if (progress <= 0.4) {
        scrollIndicator.style.opacity = '1';
        scrollIndicator.style.visibility = 'visible';
      } else if (progress < 0.6) {
        scrollIndicator.style.opacity = 1 - ((progress - 0.4) / 0.2);
      } else {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.visibility = 'hidden';
      }
    }
  }

  // Fixed scroll indicator positioning
  if (scrollIndicator) {
    scrollIndicator.style.cssText = [
      'position:fixed',
      'bottom:2rem',
      'left:0',
      'right:0',
      'margin:0 auto',
      'width:fit-content',
      'z-index:1'
    ].join(';');
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
