/**
 * Main JavaScript Utilities
 * 
 * General functionality for the blog
 */

(function() {
  'use strict';

  /**
   * Initialize when DOM is ready
   */
  function init() {
    setupSidebar();
    setupMobileMenu();
    setupSmoothScroll();
    setupExternalLinks();
    setupReadingTime();
    setupShareButtons();
    setupLazyLoading();
    setupFireballCursor();
  }

  /**
   * Sidebar toggle functionality
   */
  function setupSidebar() {
    const toggleBtn = document.querySelector('.sidebar-toggle-btn');
    const closeBtn = document.querySelector('.sidebar-close-btn');
    const backdrop = document.querySelector('.sidebar-backdrop');
    const sidebar = document.querySelector('.sidebar');

    if (!toggleBtn || !sidebar) return;

    function openSidebar() {
      document.body.classList.add('sidebar-open');
      toggleBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      if (backdrop) backdrop.style.display = 'block';
      sidebar.style.transform = 'translateX(0)';
    }

    function closeSidebar() {
      document.body.classList.remove('sidebar-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      if (backdrop) backdrop.style.display = 'none';
      sidebar.style.transform = 'translateX(-100%)';
    }

    toggleBtn.addEventListener('click', () => {
      const isOpen = document.body.classList.contains('sidebar-open');
      if (isOpen) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', closeSidebar);
    }

    if (backdrop) {
      backdrop.addEventListener('click', closeSidebar);
    }

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && document.body.classList.contains('sidebar-open')) {
        closeSidebar();
        toggleBtn.focus();
      }
    });

    // Close sidebar when clicking a link inside it
    sidebar.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeSidebar);
    });
  }

  /**
   * Mobile menu toggle
   */
  function setupMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');

    if (!menuBtn || !mobileNav) return;

    menuBtn.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('is-open');
      menuBtn.setAttribute('aria-expanded', isOpen);
      
      // Toggle hamburger icon
      const icon = menuBtn.querySelector('svg');
      if (icon) {
        if (isOpen) {
          icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>';
        } else {
          icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>';
        }
      }

      // Prevent body scroll when menu is open
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('is-open');
        menuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close menu on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
        mobileNav.classList.remove('is-open');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.focus();
        document.body.style.overflow = '';
      }
    });
  }

  /**
   * Smooth scroll for anchor links
   */
  function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });

          // Update URL
          history.pushState(null, null, href);
        }
      });
    });
  }

  /**
   * Add rel attributes to external links
   */
  function setupExternalLinks() {
    document.querySelectorAll('a[href^="http"]').forEach(link => {
      if (!link.hostname.includes(window.location.hostname)) {
        link.setAttribute('rel', 'noopener noreferrer');
        link.setAttribute('target', '_blank');
      }
    });
  }

  /**
   * Calculate and display reading time
   */
  function setupReadingTime() {
    const content = document.querySelector('.post-content');
    const readTimeEl = document.querySelector('.reading-time');

    if (!content || !readTimeEl) return;

    const text = content.textContent || content.innerText;
    const words = text.trim().split(/\s+/).length;
    const readingTime = Math.ceil(words / 200); // Average 200 words per minute

    readTimeEl.textContent = `${readingTime} min read`;
  }

  /**
   * Share buttons functionality
   */
  function setupShareButtons() {
    // Twitter share
    document.querySelectorAll('.share-twitter').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const title = document.title;
        const url = window.location.href;
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
        window.open(twitterUrl, '_blank', 'width=550,height=450');
      });
    });

    // LinkedIn share
    document.querySelectorAll('.share-linkedin').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const url = window.location.href;
        const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        window.open(linkedinUrl, '_blank', 'width=550,height=450');
      });
    });

    // Copy URL
    document.querySelectorAll('.share-copy').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.preventDefault();
        try {
          await navigator.clipboard.writeText(window.location.href);
          showToast('Link copied to clipboard!');
        } catch (err) {
          console.error('Failed to copy:', err);
        }
      });
    });
  }

  /**
   * Show toast notification
   */
  function showToast(message) {
    // Remove existing toast
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.cssText = `
      position: fixed;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      padding: 0.75rem 1.5rem;
      background: var(--color-primary);
      color: white;
      border-radius: 8px;
      font-size: 0.875rem;
      z-index: 10000;
      animation: toast-in 0.3s ease;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'toast-out 0.3s ease forwards';
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  }

  /**
   * Lazy load images and Giscus comments
   */
  function setupLazyLoading() {
    // Lazy load images
    if ('loading' in HTMLImageElement.prototype) {
      document.querySelectorAll('img[data-src]').forEach(img => {
        img.src = img.dataset.src;
      });
    } else {
      // Fallback for browsers without native lazy loading
      const lazyImages = document.querySelectorAll('img[data-src]');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            observer.unobserve(img);
          }
        });
      });

      lazyImages.forEach(img => observer.observe(img));
    }

    // Lazy load Giscus comments
    const commentsSection = document.querySelector('.giscus-container');
    if (commentsSection) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            loadGiscus(commentsSection);
            observer.unobserve(commentsSection);
          }
        });
      }, { rootMargin: '100px' });

      observer.observe(commentsSection);
    }
  }

  /**
   * Load Giscus comments widget
   */
  function loadGiscus(container) {
    const config = window.giscusConfig;
    if (!config) return;

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', config.repo);
    script.setAttribute('data-repo-id', config.repoId);
    script.setAttribute('data-category', config.category);
    script.setAttribute('data-category-id', config.categoryId);
    script.setAttribute('data-mapping', config.mapping);
    script.setAttribute('data-reactions-enabled', config.reactionsEnabled);
    script.setAttribute('data-emit-metadata', config.emitMetadata);
    script.setAttribute('data-input-position', config.inputPosition);
    script.setAttribute('data-theme', getGiscusTheme());
    script.setAttribute('data-lang', config.lang);
    script.crossOrigin = 'anonymous';
    script.async = true;

    container.appendChild(script);
  }

  /**
   * Get Giscus theme based on current theme
   */
  function getGiscusTheme() {
    const theme = document.documentElement.getAttribute('data-theme');
    return theme === 'dark' ? 'dark' : 'light';
  }

  /**
   * Fireball cursor that appears when mouse is moving (Halley's comet style)
   */
  function setupFireballCursor() {
    // Don't initialize on mobile devices
    if (window.innerWidth <= 768 || 'ontouchstart' in window || navigator.maxTouchPoints > 0) {
      return;
    }

    const fireball = document.createElement('div');
    fireball.className = 'fireball-cursor';
    fireball.setAttribute('aria-hidden', 'true');
    const sprite = document.createElement('div');
    sprite.className = 'fireball-sprite';
    fireball.appendChild(sprite);
    document.body.appendChild(fireball);

    const tail = document.createElement('div');
    tail.className = 'comet-tail';
    tail.setAttribute('aria-hidden', 'true');
    document.body.appendChild(tail);

    let mouseX = 0;
    let mouseY = 0;
    let fireballX = 0;
    let fireballY = 0;
    let prevFireballX = 0;
    let prevFireballY = 0;
    let isMoving = false;
    let movementTimeout = null;
    let lastMoveTime = 0;
    let velocityX = 0;
    let velocityY = 0;

    function onMouseMove(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      lastMoveTime = Date.now();

      // Clear existing timeout
      if (movementTimeout) {
        clearTimeout(movementTimeout);
      }

      // Show fireball if not already moving
      if (!isMoving) {
        isMoving = true;
        fireball.classList.add('active');
        tail.classList.add('active');
        // Hide default cursor
        document.body.style.cursor = 'none';
      }

      // Set timeout to hide fireball after 300ms of no movement
      movementTimeout = setTimeout(() => {
        isMoving = false;
        fireball.classList.remove('active');
        tail.classList.remove('active');
        document.body.style.cursor = '';
      }, 300);
    }

    function animate() {
      // Smoothly follow cursor
      const dx = mouseX - fireballX;
      const dy = mouseY - fireballY;
      
      prevFireballX = fireballX;
      prevFireballY = fireballY;
      
      fireballX += dx * 0.3;
      fireballY += dy * 0.3;
      
      // Calculate velocity for tail direction
      velocityX = fireballX - prevFireballX;
      velocityY = fireballY - prevFireballY;
      
      // Update fireball position
      fireball.style.left = fireballX + 'px';
      fireball.style.top = fireballY + 'px';
      
      // Update tail position and rotation
      if (isMoving) {
        const speed = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
        if (speed > 0.1) {
          // Calculate angle for tail direction (pointing opposite to movement)
          const angle = Math.atan2(velocityY, velocityX) * (180 / Math.PI) + 90;
          
          // Position tail behind the comet (offset by half tail length)
          const tailLength = 60;
          const offsetX = -Math.sin(angle * Math.PI / 180) * (tailLength / 2);
          const offsetY = Math.cos(angle * Math.PI / 180) * (tailLength / 2);
          
          tail.style.left = (fireballX + offsetX) + 'px';
          tail.style.top = (fireballY + offsetY) + 'px';
          tail.style.transform = `translate(-50%, 0) rotate(${angle}deg)`;
          tail.style.opacity = Math.min(1, speed / 10);
        } else {
          tail.style.opacity = 0;
        }
      }
      
      requestAnimationFrame(animate);
    }

    // Initialize position
    fireballX = window.innerWidth / 2;
    fireballY = window.innerHeight / 2;
    prevFireballX = fireballX;
    prevFireballY = fireballY;
    fireball.style.left = fireballX + 'px';
    fireball.style.top = fireballY + 'px';

    window.addEventListener('mousemove', onMouseMove);
    
    // Handle mouse leaving viewport
    document.addEventListener('mouseleave', () => {
      isMoving = false;
      fireball.classList.remove('active');
      tail.classList.remove('active');
      document.body.style.cursor = '';
      if (movementTimeout) {
        clearTimeout(movementTimeout);
      }
    });

    // Start animation loop
    animate();
  }

  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Export toast for external use
  window.showToast = showToast;
})();
