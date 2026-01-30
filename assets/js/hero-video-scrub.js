/**
 * Hero Video Scroll Scrub
 *
 * Sequence:
 * - 0-70%: Video scrubs from 0% to 100%
 * - 70-100%: Hero text fades out
 * - 100%+: Content sections visible
 */
(function() {
  'use strict';

  const video = document.getElementById('hero-video');
  const heroSection = document.querySelector('.hero-fullscreen');
  const heroBg = document.querySelector('.hero-bg-fixed');
  const scrollIndicator = document.querySelector('.scroll-indicator');

  if (!video || !heroSection) return;

  // Total scroll distance (200vh)
  const scrollDistance = window.innerHeight * 2;

  // Spacer = scroll distance + viewport height so content appears after 100% scroll
  // (accounts for viewport showing content before we've scrolled to its position)
  const spacer = document.createElement('div');
  spacer.style.cssText = 'height:' + (scrollDistance + window.innerHeight) + 'px;';
  heroSection.after(spacer);

  // Fixed hero positioning
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

  // Scroll indicator styling
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

  function onScroll() {
    const scrollY = window.scrollY;
    const progress = Math.min(scrollY / scrollDistance, 1);

    // VIDEO: 0-70% scroll = 0-100% video
    if (video.duration) {
      const videoProgress = Math.min(progress / 0.7, 1);
      video.currentTime = videoProgress * video.duration;
    }

    // HERO TEXT: Visible 0-70%, fades 70-100%, hidden after 100%
    if (progress <= 0.7) {
      heroSection.style.opacity = '1';
      heroSection.style.visibility = 'visible';
      if (heroBg) {
        heroBg.style.opacity = '1';
        heroBg.style.visibility = 'visible';
      }
    } else if (progress < 1) {
      // Fade from 70% to 100%
      const fadeProgress = (progress - 0.7) / 0.3;
      const opacity = 1 - fadeProgress;
      heroSection.style.opacity = opacity;
      heroSection.style.visibility = 'visible';
      if (heroBg) {
        heroBg.style.opacity = opacity;
        heroBg.style.visibility = 'visible';
      }
    } else {
      // Hidden at 100%+
      heroSection.style.opacity = '0';
      heroSection.style.visibility = 'hidden';
      if (heroBg) {
        heroBg.style.opacity = '0';
        heroBg.style.visibility = 'hidden';
      }
    }

    // SCROLL INDICATOR: Fades earlier (40-60%)
    if (scrollIndicator) {
      if (progress <= 0.4) {
        scrollIndicator.style.opacity = '1';
      } else if (progress < 0.6) {
        scrollIndicator.style.opacity = 1 - ((progress - 0.4) / 0.2);
      } else {
        scrollIndicator.style.opacity = '0';
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
