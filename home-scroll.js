(function () {
  if (!document.body.classList.contains('home')) return;
  if (window.innerWidth < 900) return;

  const track = document.querySelector('.gallery-track');
  if (!track) return;

  const SPEED = 0.5;
  let isUserScrolling = false;
  let isItemHovering = false;
  let isTabActive = true;

  /* ----------------------------------
     1. DUPLICATE ITEMS
  ---------------------------------- */
  const originals = Array.from(track.children);
  originals.forEach(el => {
    track.appendChild(el.cloneNode(true));
  });

  /* ----------------------------------
     2. CALCULATE ORIGINAL WIDTH
  ---------------------------------- */
  let originalWidth = 0;
  originals.forEach(el => {
    originalWidth += el.offsetWidth + 7;
  });

  /* ----------------------------------
     3. AUTO DRIFT LOOP
  ---------------------------------- */
  function autoDrift() {
    if (!isUserScrolling && !isItemHovering && isTabActive) {
      track.scrollLeft += SPEED;
    }

    if (track.scrollLeft >= originalWidth) {
      track.scrollLeft -= originalWidth;
    }

    requestAnimationFrame(autoDrift);
  }

  autoDrift();

  /* ----------------------------------
     4. PAUSE ONLY ON IMAGE / CAPTION HOVER
  ---------------------------------- */
  const hoverTargets = track.querySelectorAll('img, .gallery-caption');

  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      isItemHovering = true;
    });

    el.addEventListener('mouseleave', () => {
      isItemHovering = false;
    });
  });

  /* ----------------------------------
     5. PAUSE WHEN TAB INACTIVE
  ---------------------------------- */
  document.addEventListener('visibilitychange', () => {
    isTabActive = !document.hidden;
  });

  /* ----------------------------------
     6. MOUSE WHEEL → HORIZONTAL
  ---------------------------------- */
  track.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      track.scrollLeft += e.deltaY;
      isUserScrolling = true;

      clearTimeout(track._scrollTimeout);
      track._scrollTimeout = setTimeout(() => {
        isUserScrolling = false;
      }, 1200);
    }
  }, { passive: false });

})();