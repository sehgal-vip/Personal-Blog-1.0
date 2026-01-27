// #region agent log
(function() {
  if (typeof window === 'undefined') return;
  
  const log = (location, message, data, hypothesisId) => {
    fetch('http://127.0.0.1:7242/ingest/86d63ddd-61d2-4ffe-b9c2-80b7a31ac52c', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        location,
        message,
        data,
        timestamp: Date.now(),
        sessionId: 'debug-session',
        runId: 'run1',
        hypothesisId
      })
    }).catch(() => {});
  };
  
  document.addEventListener('DOMContentLoaded', function() {
    const breadcrumbs = document.querySelector('.breadcrumbs');
    if (!breadcrumbs) {
      log('breadcrumb-debug.js:DOMContentLoaded', 'Breadcrumbs not found', {}, 'A');
      return;
    }
    
    // Hypothesis A: Check display values
    const items = breadcrumbs.querySelectorAll('.breadcrumb-item');
    const separators = breadcrumbs.querySelectorAll('.breadcrumb-separator');
    
    log('breadcrumb-debug.js:DOMContentLoaded', 'Breadcrumb container found', {
      itemCount: items.length,
      separatorCount: separators.length,
      containerDisplay: window.getComputedStyle(breadcrumbs).display,
      containerAlignItems: window.getComputedStyle(breadcrumbs).alignItems,
      containerFlexWrap: window.getComputedStyle(breadcrumbs).flexWrap
    }, 'A');
    
    // Hypothesis B: Check vertical alignment
    items.forEach((item, idx) => {
      const style = window.getComputedStyle(item);
      log('breadcrumb-debug.js:DOMContentLoaded', `Item ${idx} styles`, {
        display: style.display,
        verticalAlign: style.verticalAlign,
        alignItems: style.alignItems,
        lineHeight: style.lineHeight,
        height: style.height,
        offsetTop: item.offsetTop,
        offsetHeight: item.offsetHeight
      }, 'B');
    });
    
    // Hypothesis C: Check separator alignment
    separators.forEach((sep, idx) => {
      const style = window.getComputedStyle(sep);
      log('breadcrumb-debug.js:DOMContentLoaded', `Separator ${idx} styles`, {
        display: style.display,
        verticalAlign: style.verticalAlign,
        alignItems: style.alignItems,
        height: style.height,
        lineHeight: style.lineHeight,
        offsetTop: sep.offsetTop,
        offsetHeight: sep.offsetHeight
      }, 'C');
    });
    
    // Hypothesis D: Check flex alignment
    const allChildren = Array.from(breadcrumbs.children);
    allChildren.forEach((child, idx) => {
      const style = window.getComputedStyle(child);
      log('breadcrumb-debug.js:DOMContentLoaded', `Child ${idx} layout`, {
        tagName: child.tagName,
        className: child.className,
        display: style.display,
        alignSelf: style.alignSelf,
        offsetTop: child.offsetTop,
        offsetHeight: child.offsetHeight,
        marginTop: style.marginTop,
        marginBottom: style.marginBottom
      }, 'D');
    });
    
    // Hypothesis E: Check baseline alignment
    const rects = allChildren.map(child => child.getBoundingClientRect());
    log('breadcrumb-debug.js:DOMContentLoaded', 'Bounding rects comparison', {
      topValues: rects.map(r => r.top),
      bottomValues: rects.map(r => r.bottom),
      heightValues: rects.map(r => r.height),
      topVariance: Math.max(...rects.map(r => r.top)) - Math.min(...rects.map(r => r.top)),
      bottomVariance: Math.max(...rects.map(r => r.bottom)) - Math.min(...rects.map(r => r.bottom))
    }, 'E');
  });
})();
// #endregion
