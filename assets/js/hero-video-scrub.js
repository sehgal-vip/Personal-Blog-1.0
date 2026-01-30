/**
 * Hero Video Scroll Scrub - Simple implementation
 */
(function() {
  'use strict';

  const video = document.getElementById('hero-video');
  const heroSection = document.querySelector('.hero-fullscreen');
  const heroBg = document.querySelector('.hero-bg-fixed');
  const heroContent = document.querySelector('.hero-content');
  const heroTitle = document.querySelector('.hero-title');

  if (!video || !heroSection) return;

  // Scroll distance for video scrub (200vh)
  const scrollDistance = window.innerHeight * 2;
  const heroHeight = window.innerHeight - 64; // viewport minus header

  // Create spacer for scroll room (video scrub + smaller hero exit)
  const spacer = document.createElement('div');
  spacer.style.height = (scrollDistance + heroHeight * 0.3) + 'px';
  heroSection.after(spacer);

  // Fix hero position with proper centering
  heroSection.style.cssText = 'position:fixed;top:64px;left:0;right:0;width:100%;height:calc(100vh - 64px);z-index:1;display:flex;flex-direction:column;justify-content:flex-end;align-items:center;padding:2rem;padding-bottom:4rem;box-sizing:border-box;';

  // Fix scroll indicator centering - use left:0 right:0 margin:auto approach
  const scrollIndicator = heroSection.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.style.cssText = 'position:fixed !important;bottom:2rem !important;left:0 !important;right:0 !important;margin:0 auto !important;transform:none !important;width:fit-content !important;z-index:2 !important;display:flex;flex-direction:column;align-items:center;';
  }

  // Scroll handler
  function onScroll() {
    const scrollY = window.scrollY;
    const progress = Math.min(scrollY / scrollDistance, 1);

    // Video scrub (full 0-100%)
    if (video.duration) {
      video.currentTime = progress * video.duration;
    }

    // Background fade (full 0-100%)
    if (heroBg) {
      heroBg.style.opacity = 1 - progress;
      if (progress >= 1) heroBg.style.display = 'none';
      else heroBg.style.display = '';
    }

    // Title scaling after 70%
    if (progress > 0.7) {
      const fx = (progress - 0.7) / 0.3;
      if (heroTitle) heroTitle.style.transform = 'scale(' + (1 + fx * 0.15) + ')';
    } else {
      if (heroTitle) heroTitle.style.transform = '';
    }

    // Hero exit starts at 70% (30% overlap with video scrub)
    if (progress > 0.7) {
      const exitProgress = (progress - 0.7) / 0.3; // 0 to 1 during last 30%
      const translateY = -exitProgress * heroHeight * 0.5; // Move up
      const contentTranslateY = -exitProgress * 30 - exitProgress * heroHeight * 0.3;

      heroSection.style.transform = 'translateY(' + translateY + 'px)';
      if (heroContent) heroContent.style.transform = 'translateY(' + contentTranslateY + 'px)';
      heroSection.style.opacity = Math.max(0, 1 - exitProgress * 0.8);
    } else {
      heroSection.style.transform = '';
      if (heroContent) heroContent.style.transform = '';
      heroSection.style.opacity = '1';
    }

    // Continue exit after 100% if user keeps scrolling
    if (scrollY > scrollDistance) {
      const extraScroll = scrollY - scrollDistance;
      const extraProgress = extraScroll / heroHeight;
      const translateY = -heroHeight * 0.5 - extraProgress * heroHeight * 0.5;

      heroSection.style.transform = 'translateY(' + translateY + 'px)';
      heroSection.style.opacity = Math.max(0, 0.2 - extraProgress);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
