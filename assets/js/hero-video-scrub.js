/**
 * Hero Video Scroll Scrub
 *
 * Sequence:
 * - 0-100%: Video scrubs from start to end
 * - 0-50%: Hero fully visible
 * - 50-70%: Hero fades out (opacity 1 → 0)
 * - 70%+: Hero hidden, content sections visible
 *
 * Scroll distance = 200vh (2x viewport height)
 * Hero hidden at 70% = 140vh scroll
 */
(function() {
  'use strict';

  const video = document.getElementById('hero-video');
  const heroSection = document.querySelector('.hero-fullscreen');
  const heroBg = document.querySelector('.hero-bg-fixed');
  const scrollIndicator = document.querySelector('.scroll-indicator');

  if (!video || !heroSection) return;

  // Configuration
  const scrollDistance = window.innerHeight * 2; // 200vh total scroll for video
  const hidePoint = 0.7; // Hero hidden at 70% scroll

  // Create spacer - matches the point where hero hides
  const spacer = document.createElement('div');
  spacer.className = 'hero-scroll-spacer';
  spacer.style.cssText = 'height:' + (scrollDistance * hidePoint) + 'px;position:relative;z-index:0;';
  heroSection.after(spacer);

  // Style hero section (fixed, behind content)
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

  // Style scroll indicator
  if (scrollIndicator) {
    scrollIndicator.style.cssText = [
      'position:fixed',
      'bottom:2rem',
      'left:0',
      'right:0',
      'margin:0 auto',
      'width:fit-content',
      'z-index:1',
      'display:flex',
      'flex-direction:column',
      'align-items:center'
    ].join(';');
  }

  function onScroll() {
    const scrollY = window.scrollY;
    const progress = Math.min(scrollY / scrollDistance, 1);

    // Video scrub: 0-100% scroll = 0-100% video
    if (video.duration) {
      video.currentTime = progress * video.duration;
    }

    // Calculate fade (50% to 70% scroll)
    let opacity = 1;
    if (progress >= hidePoint) {
      opacity = 0;
    } else if (progress > 0.5) {
      // Fade from 1 to 0 between 50% and 70%
      opacity = 1 - ((progress - 0.5) / (hidePoint - 0.5));
    }

    // Apply to hero section
    heroSection.style.opacity = opacity;
    heroSection.style.visibility = opacity <= 0 ? 'hidden' : 'visible';

    // Apply to background
    if (heroBg) {
      heroBg.style.opacity = opacity;
      heroBg.style.visibility = opacity <= 0 ? 'hidden' : 'visible';
    }

    // Scroll indicator fades earlier (20% to 40%)
    if (scrollIndicator) {
      let indicatorOpacity = 1;
      if (progress >= 0.4) {
        indicatorOpacity = 0;
      } else if (progress > 0.2) {
        indicatorOpacity = 1 - ((progress - 0.2) / 0.2);
      }
      scrollIndicator.style.opacity = indicatorOpacity;
      scrollIndicator.style.visibility = indicatorOpacity <= 0 ? 'hidden' : 'visible';
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
